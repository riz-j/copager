from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id_: str
    displayName: str
    email: str
    profilePic: Optional[str] = None
    profileStatus: Optional[str] = None

    rooms: list[str]
    friends: list[str]


#     id_: string,
#     displayName: string,
#     email: string,
#     profilePic: string | undefined,
#     profileStatus: string | undefined,

#     rooms: string[]    
#     friends: string[]  
