# flake8: noqa F401
from app.common import models as m
from app.database import get_db
from app.controller.odoo import OdooClient

odoo = OdooClient()

db = get_db().__next__()
