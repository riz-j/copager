from server import sio 

@sio.event
async def connect(sid):
    print(f"{sid} joined the server")

    