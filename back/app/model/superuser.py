from typing import Self

from sqlalchemy import Column, String, func, or_

from app.hash_utils import make_hash, hash_verify
from app.database import SessionLocal


from app.database import Base
from .base_user import BaseUser


class SuperUser(Base, BaseUser):
    __tablename__ = "superusers"

    password_hash = Column(String(128), nullable=False)

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, value: str):
        self.password_hash = make_hash(value)

    @classmethod
    def authenticate(cls, db: SessionLocal, user_id: str, password: str) -> Self:
        user = (
            db.query(cls)
            .filter(
                or_(
                    func.lower(cls.username) == func.lower(user_id),
                    func.lower(cls.email) == func.lower(user_id),
                )
            )
            .first()
        )
        if user is not None and hash_verify(password, user.password):
            return user

    def __repr__(self):
        return f"<{self.id}: {self.email}>"
