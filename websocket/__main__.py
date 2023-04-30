from aiohttp import web 
from server import sio

import behavior.base.connection
import behavior.base.message
import behavior.base.echo
import behavior.lan.lan_room
import behavior.lan.lan_parcel

app = web.Application()
sio.attach(app)


if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=8088)