from pydantic import BaseModel
from typing import Optional

class Room(BaseModel):
    _id: str
    type: str
    name: Optional[str]
    pin: Optional[int] 

    messages: list[str] 
    users: list[str] 