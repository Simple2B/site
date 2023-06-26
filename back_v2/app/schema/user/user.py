from pydantic import BaseModel, EmailStr
from datetime import datetime


class BaseUser(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

