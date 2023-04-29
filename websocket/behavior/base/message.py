from server import sio 
from data.database import db
from dataclasses import asdict
import json
import pprint

from model.Message import Message

messages = db["messages"]

@sio.event
async def on_message(sid, message):
    msg = Message(**message)
    
    # Save the message to the database
    saved_message = messages.insert_one(asdict(msg))

    # Check if the message is successfully saved in the database
    if saved_message.inserted_id == msg._id:
        pprint.pprint(message)
        await sio.emit('onMessage', message, room=msg.room)
