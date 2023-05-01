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
async def on_request_lan_parcel(sid):
    session = await sio.get_session(sid)
    user_id = session["user_id"]
    lan_room = session["lan_room"]

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
    current_user: Guest = users.find_one({"_id": user_id})

    # Fetch all messages in the lan_room 
    lan_messages: List[Message] = []

    messages_cursor = messages.find({"room": lan_room})
    for message in messages_cursor:
        lan_messages.append(message)

    # Fetch all the users in the lan_room
    # users_id_cursor = rooms.find({"_id": lan_room})    

    # Pack up the parcel 
    parcel = {
        "currentUser": current_user,
        "messages": lan_messages
    }

    # Emit the parcel to the client
    await sio.emit("onParcel", parcel, room=sid)
    
