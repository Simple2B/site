from typing import List
from pydantic import BaseModel, Field, ConfigDict, TypeAdapter


class FeedBack(BaseModel):
    client_name: str = Field(..., alias="clientName")
    project_name: str | None = Field(..., alias="projectName")
    comment: str
    link: str | None

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True,
    )


FeedBackAdapter = TypeAdapter(List[FeedBack])
