from aiohttp import web 
from server import sio

import behavior.base 
import behavior.message
import behavior.lan_room

app = web.Application()
sio.attach(app)


if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=8088)