from server import sio 
from data.database import db
from dataclasses import asdict
from datetime import datetime
import pprint

from model.Message import Message

rooms = db["rooms"]
messages = db["messages"]

@sio.event
async def on_message(sid, message):
    # Convert to Message object that will be inserted into database
    msg = Message(
        _id = message.get("_id"),
        type = message.get("type"),
        message = message.get("message"),
        timestamp = datetime.utcnow(),
        sender = message.get("sender"),
        room = message.get("room")
    )
    
    # Check if destination room exists
    room = rooms.find_one({"_id": msg.room})
    if room is None:
        raise ValueError("Room not found")

    # Save the message to the database
    saved_message = messages.insert_one(asdict(msg))

    # Check if the message is successfully saved in the database
    if saved_message.inserted_id == msg._id:
        # Insert the recently created message's ID as a reference to the room
        rooms.update_one({"_id": msg.room}, {"$push": {"messages": msg._id}})

        pprint.pprint(message)
        await sio.emit('onMessage', message, room=msg.room)