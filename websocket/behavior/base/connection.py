from server import sio 
from data.database import db
from urllib.parse import parse_qs
from dataclasses import asdict
from utils.connection_manager import ConnectionManager

from model.Guest import Guest

users = db["users"]
rooms = db["rooms"]

@sio.event
async def connect(sid, environ):
    query_string = environ["QUERY_STRING"]
    query_params = parse_qs(query_string)
    user_id = query_params["USER_ID"][0]
    lan_room = query_params["LAN_ROOM"][0]
    
    connection_manager = ConnectionManager()
    connection_manager.add_connection(sid, user_id)

    if user_id is None:
        return False
    
    # Check if the user exists in the database
    user = users.find_one({"_id": user_id})

    if user is None:
        # Create a new user as Guest 
        new_user = Guest(
            _id=user_id,
            displayName=user_id # REPLACE: with random name generator
        )

        # Insert new user into database
        try: 
            inserted_user = users.insert_one(asdict(new_user))

            if inserted_user.inserted_id != user_id:
                raise ValueError("There is an issue with user data insertion")
        except:
            raise Exception("Failed to be insert new user to database")
    
    # Save the user_id and lan_room as values to the session object
    await sio.save_session(sid, {"user_id": user_id, "lan_room": lan_room})

    print(f"{sid} joined the server")


@sio.event
async def disconnect(sid):
    session = await sio.get_session(sid)
    user_id = session.get("user_id")
    lan_room = session.get("lan_room")

    # Remove the session from the connection list
    connection_manager = ConnectionManager()
    connection_manager.remove_connection(sid)

    # Check if the user's other sessions still exist
    other_sessions_exist = connection_manager.session_exists(user_id)
    
    # Check if user_id and lan_room contains values
    if user_id and lan_room:
        
        if other_sessions_exist == False:
            # Remove user ID reference from the LAN room document in the database
            ack = rooms.update_one({"_id": lan_room}, {"$pull": {"users": user_id}})
            
            if ack.acknowledged == False:
                raise Exception("Failed to remove User ID reference out of the LAN room document")

            print(user_id + " left the room " + lan_room)
    
    print(f"{user_id} disconnected")

