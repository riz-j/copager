from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class RoomVM():
    _id: str
    type: str
    name: Optional[str] = None
    displayPicture: Optional[str] = None

    messages: List[str] = field(default_factory=list)
    users: List[str] = field(default_factory=list)


# RoomVM does not have:
#   - pin