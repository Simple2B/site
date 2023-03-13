from pydantic import BaseModel


class Question(BaseModel):
    class Config:
        orm_mode = True


class CreateQuestion(Question):
    text: str
    correct_answer: int


class VariantQuestion(Question):
    id: int
    text: str
    point: int


class QuestionOut(Question):
    id: int
    text: str
    variants: list[VariantQuestion]
