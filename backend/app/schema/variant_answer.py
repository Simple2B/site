from typing import Optional
from pydantic import BaseModel


class VariantAnswer(BaseModel):
    class Config:
        orm_mode = True


class VariantAnswerCreate(VariantAnswer):
    question_id: int
    text: str


class VariantAnswerOut(VariantAnswer):
    id: int
    question_id: int
    text: str
    points: Optional[int]
