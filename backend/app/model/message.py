from sqlalchemy import Column, Integer, String
from app.database import Base


class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)
    email = Column(String(64), nullable=False)
    message = Column(String(512), nullable=False)
    phone = Column(String(12), nullable=True)

    def __repr__(self):
        return f"<Message: {self.name}>"
