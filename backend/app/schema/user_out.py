from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    class Config:
        orm_mode = True


class UserOut(User):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        orm_mode = True
