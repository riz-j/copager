from server import sio 
from data.database import db
from model.Room import Room
from model.view_model.UserVM import UserVM
from utils.connection_manager import ConnectionManager
from dataclasses import asdict
from typing import List

rooms = db["rooms"]
messages = db["messages"]
users = db["users"]

@sio.event
async def on_join_lan_room(sid):  
    session = await sio.get_session(sid)
    user_id = session.get("user_id")
    lan_room = session.get("lan_room")

    if not lan_room and not user_id:
        return False

    try:
        room = rooms.find_one({ "_id": lan_room })

        # If room does not exist, create a new room
        if room is None:
            new_room = Room(
                _id=lan_room,
                type="PUBLIC_LAN",
            )
            created_room = rooms.insert_one(asdict(new_room))
            rooms.update_one({"_id": created_room.inserted_id}, {"$push": {"users": user_id}})

            sio.enter_room(sid, lan_room)

            
            print(f"\n{user_id} entered room {lan_room}")

        else:
            if user_id not in room["users"]:
                rooms.update_one({"_id": room["_id"]}, {"$push": {"users": user_id}})

            sio.enter_room(sid, lan_room)
            
            print(f"\n{user_id} entered room {lan_room}")
        
        # Check if there are any other user sessions
        connection_manager = ConnectionManager()
        session_count = connection_manager.session_count(user_id)

        if session_count <= 1:
            # There is only one user session 
            # (which means that the user has recently connected)

            # Fetch the user details   
            user = users.find_one({"_id": user_id})

            # Convert user to user_vm
            user_vm = UserVM(
                _id = user.get("_id"),
                displayName = user.get("displayName"),
                displayColor = user.get("displayColor"),
                profilePic = user.get("profilePic"),
                profileStatus = user.get("profileStatus") 
            )
            # Convert the user_vm to a list format
            user_vm_list: List[UserVM] = [asdict(user_vm)]

            # Pack up the data as a parcel
            parcel = {
                "users": user_vm_list
            }

            # Send the user info as a parcel to everyone in the room
            await sio.emit("onParcel", parcel, room=lan_room)

            # Inform everyone else in the room that a user has joined 
            # ----- TO DO ------


        

    except Exception as e:
        print(f"on_lan_join_room Error: {e}")