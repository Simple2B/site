# flake8: noqa F401
from app.common import models as m
from app.database import get_db

db = get_db().__next__()
