from server import sio 

@sio.event
async def connect(sid, environ):
    print(f"{sid} joined the server")


@sio.event
def disconnect(sid):
    print(f"{sid} disconnected")


@sio.event
async def onMessage(sid, message):
    print(f"{sid}: {message}")


@sio.event
async def onPing(sid):
    print(f"PING from {sid}")
    sio.emit("onMessage", "PING from server")


@sio.event
async def onEcho(sid, message):
    sio.emit("onMessage", message, room=sid)