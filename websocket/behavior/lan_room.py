from server import sio 

@sio.event
async def on_join_lan_room(sid, room_id):  
    # SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
    try:
        sio.enter_room(sid, room_id)

        print(f"{sid} enter room {room_id}")
        await sio.emit("onJoinLanRoom", "success")

    except Exception as e:
        print(f"{sid} FAILED to join room {room_id} \nERROR: {e}")
        await sio.emit("onJoinLanRoom", "failed")
    