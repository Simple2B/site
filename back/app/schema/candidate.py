from pydantic import BaseModel, ConfigDict

from .user import BaseUser


class IsAuthenticated(BaseUser):
    image_url: str | None = None
    git_hub_id: str


class IsAuthenticatedOut(BaseModel):
    user_uuid: str


class Candidate(BaseUser):
    model_config = ConfigDict(from_attributes=True)


class CandidateAnswer(BaseModel):
    user_uuid: str
    answer_id: int


class CandidateAnswerOut(BaseModel):
    status: str


class SetCandidateResume(BaseModel):
    cv_path: str
