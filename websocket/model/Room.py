from dataclasses import dataclass, field, InitVar
from typing import Optional, List

@dataclass
class Room():
    _id: str
    type: str
    name: Optional[str] = None
    pin: Optional[int] = None

    messages: List[str] = field(default_factory=list)
    users: List[str] = field(default_factory=list)

    # def __post_init__(self, name: Optional[str], pin: Optional[int]):
    #     if name is not None:
    #         self.name = name
    #     if pin is not None:
    #         self.pin = pin




# from pydantic import BaseModel
# from typing import Optional

# class Room(BaseModel):
#     _id: str
#     type: str
#     name: Optional[str]
#     pin: Optional[int] 

#     messages: list[str] 
#     users: list[str] 