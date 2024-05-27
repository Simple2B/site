import enum


from pydantic import BaseModel, ConfigDict


class ResponseStatus(enum.Enum):
    fail = "fail"
    success = "success"


class ResponseModal(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )
    status: ResponseStatus
