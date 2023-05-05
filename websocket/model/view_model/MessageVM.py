from dataclasses import dataclass, field
from typing import Optional

@dataclass
class MessageVM():
    _id: str 
    type: str
    message: str
    timestamp: str

    sender: str    # User ID
    room: str      # Room ID

    filename: Optional[str] = field(default=None)
    url: Optional[str] = field(default=None)