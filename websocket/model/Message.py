from pydantic import BaseModel, Field

class Message(BaseModel):
    id_: str = Field(..., alias='_id')
    type: str
    message: str
    timestamp: str

    sender: str    # User ID
    room: str      # Room ID

