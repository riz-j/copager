import socketio

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=['http://localhost:3000', 'http://0.0.0.0:3000', 'http://copager-react:3000', 'http://copager-react', 'http://170.64.176.135', 'http://170.64.176.135:3000', 'http://copager.com', 'https://copager.com'])
