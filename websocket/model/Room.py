from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class Room():
    _id: str
    type: str
    name: Optional[str] = None
    pin: Optional[int] = None
    displayPicture: Optional[str] = None

    messages: List[str] = field(default_factory=list)
    users: List[str] = field(default_factory=list)