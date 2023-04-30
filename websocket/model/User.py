from dataclasses import dataclass, field, InitVar
from typing import Optional, List

@dataclass
class User():
    id_: str
    displayName: str
    email: str
    profilePic: Optional[str] = None
    profileStatus: Optional[str] = None

    rooms: List[str] = field(default_factory=list)
    friends: List[str] = field(default_factory=list)


#     id_: string,
#     displayName: string,
#     email: string,
#     profilePic: string | undefined,
#     profileStatus: string | undefined,

#     rooms: string[]    
#     friends: string[]  
