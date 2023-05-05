from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class Message():
    _id: str 
    type: str
    message: str
    timestamp: datetime

    sender: str    # User ID
    room: str      # Room ID

    filename: Optional[str] = field(default=None)
    url: Optional[str] = field(default=None)