from dataclasses import dataclass, field
from typing import List
from model.User import User
from model.Message import Message
from model.view_model.RoomVM import RoomVM
from model.view_model.UserVM import UserVM


@dataclass
class Parcel():
    currentUser: User
    rooms: List[RoomVM] = field(default_factory=list)
    users: List[UserVM] = field(default_factory=list)
    messages: List[Message] = field(default_factory=list)


class ParcelBuilder: 
    def __init__(self):
        self.currentUser = None
        self.rooms = []
        self.users = []
        self.messages = []
    
    def set_current_user(self, user: User):
        self.currentUser = user
        return self
    
    def add_room(self, room: RoomVM):
        self.rooms.append(room)
        return self
    
    def add_user(self, user: UserVM):
        self.users.append(user)
        return self
    
    def add_message(self, message: Message):
        self.messages.append(message)
        return self
    
    def build(self):
        return Parcel(
            currentUser=self.currentUser,
            rooms=self.rooms,
            users=self.users,
            messages=self.messages,
        )
        


#
#   interface DataStore {
#       currentUser: IUser
#       rooms: RoomVM[]
#       users: UserVM[]
#       messages: Message[] 
#   }
#