from pydantic import BaseModel

class Message(BaseModel):
    _id: str
    type: str
    message: str
    timestamp: str

    sender: str    # User ID
    room: str      # Room ID

