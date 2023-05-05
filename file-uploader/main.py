from fastapi import FastAPI, File, UploadFile, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from environ import cors_origins, forbidden_file_extensions, root_url
import time
import os
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
        "URL": f"{root_url}/files/{new_filename}"
    }