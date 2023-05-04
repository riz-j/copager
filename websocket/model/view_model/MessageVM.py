from dataclasses import dataclass

@dataclass
class MessageVM():
    _id: str 
    type: str
    message: str
    timestamp: str

    sender: str    # User ID
    room: str      # Room ID