from sqlalchemy import Column, Integer, String
from app.database import Base


class Offer(Base):
    __tablename__ = "offers"
    id = Column(Integer, primary_key=True)
    name = Column(String(512), nullable=False)

    def __repr__(self):
        return f"<Offer: {self.name}>"
