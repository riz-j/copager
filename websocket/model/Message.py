from pydantic import BaseModel

class Message(BaseModel):
    id_: str
    type: str
    message: str
    timestamp: str

    sender: str    # User ID
    room: str      # Room ID

