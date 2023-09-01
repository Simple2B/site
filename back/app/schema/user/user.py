from pydantic import BaseModel, EmailStr, ConfigDict


class BaseUser(BaseModel):
    username: str
    email: EmailStr

    model_config = ConfigDict(
        from_attributes=True,
    )
