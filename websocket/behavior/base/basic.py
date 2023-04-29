from server import sio 
from data.database import db

@sio.event
async def connect(sid, environ):
    print(f"{sid} joined the server")


@sio.event
def disconnect(sid):
    print(f"{sid} disconnected")


@sio.event
async def on_ping(sid):
    print(f"PING from {sid}")
    sio.emit("onMessage", "PING from server")


@sio.event
async def on_echo(sid, message):
    sio.emit("onMessage", message, room=sid)