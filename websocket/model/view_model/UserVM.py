from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class UserVM():
    _id: str
    displayName: str
    displayColor: str
    profilePic: Optional[str] = None
    profileStatus: Optional[str] = None
    # guest: bool ???


# UserVM does not have:
#   - email
#   - rooms
#   - friends