from server import sio 
from data.database import db

from model.Message import Message

messages = db["messages"]

@sio.event
async def on_message(sid, message):
    msg = Message(**message)
    # msg = Message(
    #     _id = "akwbak",
    # )
    
    # Save the message to the database

    # messages.insert_one()

    # Check if the message is successfully saved in the database

    # Emit the message to the room

    print(msg.dict(by_alias=True))

    # print(f"""
    #     \n{sid}: 
    #      id_:       {msg.id_}
    #      Type:      {msg.type}
    #      Message:   {msg.message}
    #      Timestamp: {msg.timestamp} 
    #      Sender:    {msg.sender}
    #      Room:      {msg.room}
    #     """)
    
    await sio.emit('onMessage', message, room=msg.room)