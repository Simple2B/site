from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    image_url: str
    password: str
