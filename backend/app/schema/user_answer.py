from typing import Optional

from pydantic import BaseModel, Field


class UserAnswer(BaseModel):
    class Config:
        orm_mode = True


class UserAnswer(UserAnswer):
    question_id: int
    answer_id: int
    point: int


class ContactUserData(BaseModel):
    name: Optional[str] = Field(max_length=127)
    email: Optional[str] = Field(max_length=63)
    telegram: Optional[str] = Field(max_length=64)
    phone: Optional[str] = Field(max_length=12)


class SetUserAttempt(BaseModel):
    contact_data: ContactUserData
    answers: list[UserAnswer]


class UserAnswerOut(UserAnswer):
    id: int
    created_at: str
    user_id: int
    question_id: int
    answer_id: int
