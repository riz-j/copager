from dataclasses import asdict
from typing import List
from server import sio
from data.database import db
from model.Guest import Guest
from model.Message import Message

rooms = db["rooms"]
users = db["users"]
messages = db["messages"]

@sio.event
async def on_request_lan_parcel(sid, user_id, room_id):

    # Check if user already exists
    user = users.find_one({"_id": user_id})

    if user is None:
        # User doesn't exists
        # Create new guest
        new_user = Guest(
                _id = user_id,
                displayName="Homer Simpson"
                )
        # Upload new user object to database
        ack = users.insert_one(asdict(new_user))
        
        if ack.inserted_id != user_id:
            raise Exception("Failed to upload new user to database")


    # Get the current user information
    _currentUser_: Guest = users.find_one({"_id": user_id})

    # Initialize empty "_messages_" list and append messages to the "_messages_" list
    _messages_: List[Message] = []

    messages_cursor = messages.find({"room": room_id})
    for message in messages_cursor:
        _messages_.append(message)

    # Pack up the parcel 
    parcel = {
        "currentUser": _currentUser_,
        "messages": _messages_
    }

    # Emit the parcel to the client
    await sio.emit("onParcel", parcel, room=sid)
    
