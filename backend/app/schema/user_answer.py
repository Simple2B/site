from typing import Optional
from pydantic import BaseModel


class UserAnswer(BaseModel):
    class Config:
        orm_mode = True


class UserAnswerCreate(UserAnswer):
    id: int
    created_at: str


class UserAnswerOut(UserAnswer):
    id: int
    created_at: str
    user_id: int
    question_id: int
    answer_id: int
