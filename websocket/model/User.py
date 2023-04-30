from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class User():
    _id: str
    displayName: str
    email: str
    profilePic: Optional[str] = None
    profileStatus: Optional[str] = None

    rooms: List[str] = field(default_factory=list)
    friends: List[str] = field(default_factory=list)
