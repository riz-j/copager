from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class Guest():
    _id: str
    displayName: str
    

# In the future, a Guest can be transformed into a User (a logged in User).
# Their _id will be the same but the attributes will be added (i.e. email, profile, etc)
