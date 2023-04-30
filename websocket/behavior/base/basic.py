from server import sio 
from data.database import db
from urllib.parse import parse_qs
from dataclasses import asdict

from model.Guest import Guest

users = db["users"]

@sio.event
async def connect(sid, environ):
    query_string = environ["QUERY_STRING"]
    query_params = parse_qs(query_string)
    user_id = query_params["USER_ID"][0]

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
    
    #Save the user_id as a value to the session object
    await sio.save_session(sid, {"user_id": user_id})
    print(f"{sid} joined the server")


@sio.event
def disconnect(sid):
    print(f"{sid} disconnected")


@sio.event
async def on_ping(sid):
    print(f"PING from {sid}")
    sio.emit("onMessage", "PING from server")


@sio.event
async def on_echo(sid, message):
    sio.emit("onMessage", message, room=sid)