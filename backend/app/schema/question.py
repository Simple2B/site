from pydantic import BaseModel


class Question(BaseModel):
    class Config:
        orm_mode = True


class CreateQuestion(Question):
    text: str
    correct_answer: int


class OutQuestion(Question):
    id: int
    text: str
    correct_answer: int
