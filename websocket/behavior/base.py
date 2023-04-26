from server import sio 

@sio.event
async def connect(sid, environ):
    print(f"{sid} joined the server")

@sio.event
async def onMessage(sid, message):
    print(f"Message from client: {message}")
