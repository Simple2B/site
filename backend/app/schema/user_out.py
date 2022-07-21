from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: str

    class Config:
        orm_mode = True
