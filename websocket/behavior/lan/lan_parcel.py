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
    user_id = session.get("user_id")
    lan_room = session.get("lan_room")

    if not lan_room and not user_id:
        return False

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
        print("\nAJWNN\n" + user_id + "\nawejnanje\n")
        # Serialize the document to a UserVM
        lan_user_vm = UserVM(
            _id = lan_user.get("_id"),
            displayName = lan_user.get("displayName"),
            profilePic = lan_user.get("profilePic"),
            profileStatus = lan_user.get("profileStatus")
        )  
        # Append to the list
        lan_users.append(asdict(lan_user_vm))

    # Because of a chance of delay in inserting current user to the database,
    # the server might have not appended the current user to the "lan_users" list.
    # Hence, we must add the current user to the lan users if current user 
    # does currently exist in the "lan_users" list.
    current_user_vm = UserVM(
        _id = current_user.get("_id"),
        displayName = current_user.get("displayName"),
        profilePic = current_user.get("profilePic"),
        profileStatus = current_user.get("profileStatus")
    )
    current_user_is_in_lan_room = False

    for lan_user in lan_users:
        if current_user["_id"] == lan_user["_id"]:
            current_user_is_in_lan_room = True

    if current_user_is_in_lan_room == False:
        lan_users.append(asdict(current_user_vm))


    # Pack up the parcel 
    parcel = {
        "currentUser": current_user,
        "messages": lan_messages,
        "users": lan_users
    }

    # Emit the parcel to the client
    await sio.emit("onParcel", parcel, room=sid)
    
