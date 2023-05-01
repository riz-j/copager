from dataclasses import asdict
from typing import List
from server import sio
from data.database import db
from dataclasses import asdict
from model.Guest import Guest
from model.User import User
from model.Message import Message
from model.view_model.UserVM import UserVM

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
    lan_users: List[UserVM] = []

    user_ids_cursor = rooms.find({"_id": lan_room}, {"users": 1, "_id": 0})    
    for user_id in user_ids_cursor[0]["users"]:
        # Fetch the user document
        lan_user = users.find_one({"_id": user_id})

        # Serialize the document to a UserVM
        lan_user_vm = UserVM(
            _id=lan_user["_id"],
            displayName=lan_user["displayName"]
        )  
        # Append to the list
        lan_users.append(asdict(lan_user_vm))


    # Pack up the parcel 
    parcel = {
        "currentUser": current_user,
        "messages": lan_messages,
        "users": lan_users
    }

    # Emit the parcel to the client
    await sio.emit("onParcel", parcel, room=sid)
    
