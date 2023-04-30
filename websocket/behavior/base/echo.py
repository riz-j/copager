from server import sio

@sio.event
async def on_ping(sid):
    print(f"PING from {sid}")
    sio.emit("onMessage", "PING from server")


@sio.event
async def on_echo(sid, message):
    sio.emit("onMessage", message, room=sid)

