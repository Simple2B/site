from pydantic import BaseModel, ConfigDict


class StackOut(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)
