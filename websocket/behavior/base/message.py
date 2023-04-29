from server import sio 
from data.database import db
import pprint

from model.Message import Message

messages = db["messages"]

@sio.event
async def on_message(sid, message):
    msg = Message(**message)
    
    # Save the message to the database
    saved_message = messages.insert_one(msg.dict(by_alias=True))

    # Check if the message is successfully saved in the database
    if saved_message.inserted_id == msg.id_:
        pprint.pprint(message)
        await sio.emit('onMessage', message, room=msg.room)
