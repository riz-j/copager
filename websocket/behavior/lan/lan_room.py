from server import sio 
from data.database import db
from model.Room import Room
from dataclasses import asdict

rooms = db["rooms"]
messages = db["messages"]

@sio.event
async def on_join_lan_room(sid):  
    session = await sio.get_session(sid)
    user_id = session["user_id"]
    lan_room = session["lan_room"]

    try:
        room = rooms.find_one({ "_id": lan_room })

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


    except Exception as e:
        print(f"on_lan_join_room Error: {e}")