from typing import Optional

from pydantic import BaseModel


class IsAuthenticated(BaseModel):
    username: str
    email: str
    image_url: Optional[str]
    git_hub_id: str


class User(BaseModel):
    class Config:
        orm_mode = True


class UserAnswer(User):
    answer_id: int


class SetCandidateResume(BaseModel):
    cv_path: str
    answers: list[UserAnswer]
