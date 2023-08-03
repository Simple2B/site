from functools import lru_cache
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.engine import Engine
from alchemical import Alchemical

from app.config import get_settings, Settings

settings: Settings = get_settings()

DB_URI = settings.DATABASE_URI if settings.DATABASE_URI else settings.DEV_DATABASE_URI

engine = create_engine(DB_URI)

# TODO: delete SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# TODO: delete Base
Base = declarative_base()

db = Alchemical(DB_URI)


class AppUser:
    pass


@lru_cache
def get_engine() -> Engine:
    return create_engine(DB_URI)


def get_db() -> Generator[Session, None, None]:
    with db.Session() as session:
        yield session
