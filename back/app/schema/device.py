from pydantic import BaseModel


class DeviceToken(BaseModel):
    token: str

    class Config:
        orm_mode = True


class Device(DeviceToken):
    uid: str
    is_deleted: bool

    class Config:
        orm_mode = True
