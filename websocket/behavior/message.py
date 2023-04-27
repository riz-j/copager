from server import sio 
import json

from model.Message import Message

@sio.event
async def on_message(sid, message):
    # message_dict = json.loads(message)
    message_obj = Message(**message)
    
    print(f"{sid}: \n  {message_obj.type}\n  {message_obj.message}\n  {message_obj.sender}")