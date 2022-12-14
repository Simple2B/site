from sqlalchemy import Column, Integer, String

from app.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(String(512), nullable=False)
    correct_answer = Column(Integer, nullable=False)

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text}>"
