from pydantic import BaseModel


class UserAnswer(BaseModel):
    class Config:
        orm_mode = True


class UserAnswer(UserAnswer):
    question_id: int
    answer_id: int
    point: int


class SetUserAnswers(BaseModel):
    answers: list[UserAnswer]


class UserAnswerOut(UserAnswer):
    id: int
    created_at: str
    user_id: int
    question_id: int
    answer_id: int
