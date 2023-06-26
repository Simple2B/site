from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String

from app.database import Base


class CandidateResume(Base):
    __tablename__ = "candidates_resumes"

    id = Column(Integer, primary_key=True)
    cv_path = Column(String(128), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.now)

    user_id = Column(Integer, ForeignKey("candidates.id"))

    def __repr__(self) -> str:
        return f"<{self.id}: at {self.created_at}>"
