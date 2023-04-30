from server import sio 
from data.database import db
from model.Room import Room
from dataclasses import asdict

rooms = db["rooms"]
messages = db["messages"]

@sio.event
async def on_join_lan_room(sid, user_id, room_id):  
    try:
        room = rooms.find_one({ "_id": room_id })

        if room is None:
            new_room = Room(
                _id=room_id,
                type="PUBLIC_LAN",
            )
            created_room = rooms.insert_one(asdict(new_room))
            rooms.update_one({"_id": created_room.inserted_id}, {"$push": {"users": user_id}})

            sio.enter_room(sid, room_id)

            print(f"\n{sid} entered room {room_id}")

        else:
            if user_id not in room["users"]:
                rooms.update_one({"_id": room["_id"]}, {"$push": {"users": user_id}})

            sio.enter_room(sid, room_id)
            
            print(f"\n{sid} entered room {room_id}")


    except Exception as e:
        print(f"on_lan_join_room Error: {e}")