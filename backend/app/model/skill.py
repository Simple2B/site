from sqlalchemy import Column, Integer, String

from app.database import Base


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), nullable=False)

    def __repr__(self):
        return f"<Skill: {self.name}>"
