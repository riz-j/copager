from aiohttp import web 
# from server import sio
from aiohttp_cors import CorsViewMixin, ResourceOptions, setup
import socketio

# sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=[])
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='http://localhost:5070')

# import behavior.base as base 

app = web.Application()
sio.attach(app)

@sio.event
async def connect(sid, environ):
    print(f"{sid} joined the server")

@sio.event
async def onMessage(sid, message):
    print(f"Message from client: {message}")


if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=8088)