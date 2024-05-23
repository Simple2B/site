import enum


from pydantic import BaseModel, ConfigDict


class ResponseStatus(enum.Enum):
    failed = "failed"
    success = "success"


class ResponseModal(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )
    status: ResponseStatus
