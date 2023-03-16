from typing import Optional

from pydantic import BaseModel, Field, EmailStr


class CreateMessage(BaseModel):
    name: str = Field(min_length=1, max_length=63)
    email: EmailStr
    message: str = Field(min_length=1, max_length=511)
    phone: Optional[str] = Field(min_length=1, max_length=12)
