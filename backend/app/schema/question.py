from pydantic import BaseModel


class Question(BaseModel):
    class Config:
        orm_mode = True


class VariantQuestion(Question):
    id: int
    text: str
    answer_mark: int


class QuestionOut(Question):
    id: int
    text: str
    variants: list[VariantQuestion]
