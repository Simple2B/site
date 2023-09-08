# flake8: noqa F401
from app.common import models as m
from app.database import get_db
from app import controller as c

odoo = c.OdooClient()
tg = c.TelegramBot()

db = get_db().__next__()
