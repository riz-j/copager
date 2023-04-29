from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class Room():
    _id: str
    type: str
    name: Optional[str]
    pin: Optional[int] 

    messages: List[str] = field(default_factory=list)
    users: List[str] = field(default_factory=list)




# from pydantic import BaseModel
# from typing import Optional

# class Room(BaseModel):
#     _id: str
#     type: str
#     name: Optional[str]
#     pin: Optional[int] 

#     messages: list[str] 
#     users: list[str] 