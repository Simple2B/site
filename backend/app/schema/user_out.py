from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    class Config:
        orm_mode = True


class UserOut(User):
    id: int
    username: str
    email: str
    created_at: str
    first_name: Optional[str]
    last_name: Optional[str]
    image_url: Optional[str]
