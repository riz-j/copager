from server import sio 
from data.database import db
from model.Room import Room


rooms = db["rooms"]
messages = db["messages"]

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

        else:
            if user_id not in room["users"]:
                rooms.update_one({"_id": room["_id"]}, {"$push": {"users": user_id}})

            sio.enter_room(sid, room_id)
            
            print(f"\n{sid} entered room {room_id}")


        # Send saved messages in the room to the recently connected client
        msg_list = messages.find({"room": room_id}) 
        for msg in msg_list:
            await sio.emit("onMessage", msg, room=sid) 
            # SUGGESTION: For this functionality, create an 'onPackage' listener in the client.
            #             "onMessage" potentially has notifications.
    
    except Exception as e:
        print(f"on_lan_join_room Error: {e}")



