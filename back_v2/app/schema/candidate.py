from typing import Optional

from pydantic import BaseModel

from .user import BaseUser


class IsAuthenticated(BaseUser):
    image_url: str | None
    git_hub_id: str


class Candidate(BaseUser):
    class Config:
        orm_mode = True


class CandidateAnswer(BaseModel):
    answer_id: int


class SetCandidateResume(BaseModel):
    cv_path: str