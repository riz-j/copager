from pydantic import BaseModel
from typing import Optional

class Room(BaseModel):
    id_: str
    type: str
    name: str
    pin: Optional[int] 

    messages: list[str] 
    users: list[str] 