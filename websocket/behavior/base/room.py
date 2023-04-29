from server import sio 
from data.database import db
from model.Room import Room


rooms = db["rooms"]

@sio.event
async def on_join_lan_room(sid, user_id, room_id):  
    try:
        room = rooms.find_one({ "_id": room_id })

        if room is None:

            new_room = {
                "_id": room_id,
                "type": "PUB_LAN",
                "messages": [],
                "users": []
            }

            created_room = rooms.insert_one(new_room)
            rooms.update_one({"_id": created_room.inserted_id}, {"$push": {"users": user_id}})

            sio.enter_room(sid, room_id)

            print(f"\n{sid} entered room {room_id}")
            return
        
        else:

            if user_id not in room["users"]:

                rooms.update_one({"_id": room["_id"]}, {"$push": {"users": user_id}})

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
    
