from server import sio 
import json

from model.Message import Message

@sio.event
async def on_message(sid, message):
    message_obj = Message(**message)
    
    # print(dir(message_obj))
    print(f"""
        \n{sid}: 
         id_:       {message_obj.id_}
         Type:      {message_obj.type}
         Message:   {message_obj.message}
         Timestamp: {message_obj.timestamp} 
         Sender:    {message_obj.sender}
         Room:      {message_obj.room}
        """)