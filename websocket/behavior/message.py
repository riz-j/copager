from server import sio 

@sio.event
async def on_message(sid, message):
    print(f"{sid}: {message}")