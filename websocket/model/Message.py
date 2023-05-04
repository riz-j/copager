from dataclasses import dataclass
from datetime import datetime

@dataclass
class Message():
    _id: str 
    type: str
    message: str
    timestamp: datetime

    sender: str    # User ID
    room: str      # Room ID