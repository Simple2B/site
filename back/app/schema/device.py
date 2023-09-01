from pydantic import BaseModel, ConfigDict


class DeviceToken(BaseModel):
    token: str

    model_config = ConfigDict(from_attributes=True)


class Device(DeviceToken):
    uid: str
    is_deleted: bool

    model_config = ConfigDict(from_attributes=True)
