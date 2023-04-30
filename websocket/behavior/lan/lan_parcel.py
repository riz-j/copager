from dataclasses import asdict
import json
import pprint
from typing import List, Union
from server import sio
from data.database import db
from model.Guest import Guest
from model.User import User
from model.Room import Room
from model.Message import Message

rooms = db["rooms"]
users = db["users"]
messages = db["messages"]

@sio.event
async def on_request_lan_parcel(sid, user_id):

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


    else:
        # User exists
        # Create parcel
        print("User exists!")

    _currentUser_: Guest = users.find_one({"_id": user_id})
    print(_currentUser_)
    parcel = {
        "currentUser": _currentUser_
    }
    await sio.emit("onParcel", parcel, room=sid)
    # _rooms_ = 
    # currentUser
    # currentUser's rooms



    # _user = users.find_one({"_id": user_id})
    # _room: Room = rooms.find_one({"_id": room_id})
    # _messages_cursor: List[Message] = messages.find({"room": room_id})
    # _messages = []
    # _users: List[Union[User, Guest]] = []
    
    # for user in _room["users"]:
    #     _user = users.find_one({"_id": user})
    #     _users.append(_user)

    # for message in _messages_cursor:
    #     _messages.append(message)
    
    # parcel = {
    #     "currentUser": _user,
    #     "rooms": _room,
    #     "messages": _messages,
    #     "users": _users
    # }

    # parcel_json = json.dumps(parcel)
    # pprint.pprint(parcel_json)

    # # Send the parcel
    # await sio.emit("onParcel", parcel_json, room=sid)
