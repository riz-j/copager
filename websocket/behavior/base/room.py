from server import sio 
from data.database import db
from model.Room import Room


rooms = db["rooms"]

@sio.event
async def on_join_lan_room(sid, user_id, room_id):  
    try:
        room = rooms.find_one({ "_id": room_id })
        print(f"The ROOM is... {room}")

        if room is None:
            # 1) Build a room
            new_room = {
                "_id": room_id,
                "type": "PUB_LAN",
                "messages": [],
                "users": []
            }

            # 2) Insert that room into the database
            created_room_id = rooms.insert_one(new_room)
            print(created_room_id)
            # 3) Insert user into that room
            rooms.update_one({"_id": created_room_id.inserted_id}, {"$push": {"users": user_id}})

            # 4) Make user join the room
            sio.enter_room(sid, room_id)

            print(f"{sid} enter room {room_id}")
            return
        
        else:
            # Check if user is already in the room
            if user_id not in room["users"]:
                # Insert user into the room
                rooms.update_one({"_id": room["_id"]}, {"$push": {"users": user_id}})

            # Make user join the room
            sio.enter_room(sid, room_id)
            
            print(f"\n{sid} enter room {room_id}")
            return
    
    except Exception as e:
        print(f"failed to connect to rooms collection: {e}")


# @sio.event
# async def on_join_lan_room(sid, room_id): 
#     try:
#         sio.enter_room(sid, room_id)

#         print(f"{sid} enter room {room_id}")
#         await sio.emit("onJoinLanRoom", "success")
#         return

#     except Exception as e:
#         print(f"{sid} FAILED to join room {room_id} \nERROR: {e}")
#         await sio.emit("onJoinLanRoom", "failed")
#         return
    
