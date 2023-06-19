# from datetime import datetime

# from sqlalchemy import Column, Integer, String, DateTime
# from app.database import Base


# class ContactUsData(Base):
#     __tablename__ = "contact_us_data"
#     id = Column(Integer, primary_key=True)
#     name = Column(String(128), nullable=False)
#     email = Column(String(64), nullable=False)
#     message = Column(String(512), nullable=False)
#     phone = Column(String(12), nullable=True)
#     created_at = Column(DateTime(timezone=True), default=datetime.now)

#     def __repr__(self):
#         return f"<{self.id}: from {self.name}({self.email})>"
