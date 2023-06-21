from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.hybrid import hybrid_property

from app.database import Base, SessionLocal
from .base_user import BaseUser


class Candidate(Base, BaseUser):
    __tablename__ = "candidates"


    image_url = Column(String(128), nullable=True)
    git_hub_id = Column(String(32), nullable=False)

    current_question_id =  Column(Integer, nullable=True, default=None)

    _answer = relationship("CandidateAnswer", viewonly=True, lazy="dynamic")


    @classmethod
    def authenticate(cls, db: SessionLocal, git_hub_id: int):
        user = db.query(cls).filter_by(git_hub_id=git_hub_id).first()
        if user is not None:
            return user

    @hybrid_property
    def count_of_answers(self):
        return self._answer.count()

    @hybrid_property
    def question_ids(self):
        return [answer.question.id for answer in self._answer.all()]

    def __repr__(self):
        return f"<{self.id}: {self.username}>"