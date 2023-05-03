import socketio

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=['http://localhost:5070', 'http://0.0.0.0:5070', 'http://copager-react:5070', 'http://copager-react', 'http://170.64.176.135', 'http://170.64.176.135:5070', 'http://copager.com', 'https://copager.com'])