from fastapi import FastAPI, File, UploadFile, APIRouter, HTTPException, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from environ import cors_origins, forbidden_file_extensions, root_url
import time
import os
import re
from uuid import uuid4

app = FastAPI()

app.mount("/files", StaticFiles(directory="files"), name="files")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/videos/{file_name}")
async def get_file(request: Request, file_name: str):
    path = f"files/{file_name}"
    if not os.path.exists(path):
        return Response(status_code=404)

    file_size = os.path.getsize(path)
    range_header = request.headers.get('Range', None)

    if range_header:
        byte1, byte2 = 0, None
        m = re.search('(\d+)-(\d*)', range_header)
        g = m.groups()

        byte1 = int(g[0]) if g[0] else 0
        byte2 = int(g[1]) if g[1] else file_size - 1

        if byte1 >= file_size:
            return Response(status_code=416)

        with open(path, 'rb') as f:
            f.seek(byte1)
            body = f.read(byte2 - byte1 + 1)

        resp = Response(body, status_code=206, media_type='video/mp4')
        resp.headers["Content-Range"] = f"bytes {byte1}-{byte2}/{file_size}"
    else:
        with open(path, 'rb') as f:
            body = f.read()

        resp = Response(body, media_type='video/mp4')
        resp.headers["Content-Length"] = str(file_size)

    resp.headers["Accept-Ranges"] = "bytes"
    return resp


@app.get("/hello")
async def hello():
    return {"Hello": "World"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        original_filename: str = file.filename

        file_extension: str = os.path.splitext(original_filename)[1].lower()
        if file_extension in forbidden_file_extensions:
            raise HTTPException(status_code=403, detail="Forbidden file type")
        
        file_type = "files"
        if file_extension == ".mov" or file_extension == ".mp4":
            file_type = "videos"

        timestamp: int = int(time.time())

        new_filename = str(timestamp) + "_" + str(uuid4()) + file_extension

        file_path = os.path.join("files", new_filename)
        
        with open(file_path, 'wb') as buffer:
            buffer.write(contents)

    except Exception:
        return {"message": "Error uploading file"}
    
    finally:
        file.file.close()
        
    return {
        "message": "File uploaded successfully",
        "URL": f"{root_url}/{file_type}/{new_filename}"
    }