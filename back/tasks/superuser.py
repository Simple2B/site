from invoke import task
from app.config import Settings, get_settings

from app.logger import log
from app.database import get_db
from app.common.models import SuperUser

db = get_db().__next__()



settings: Settings = get_settings()
SU_EMAIL = settings.ADMIN_EMAIL
SU_PASSWORD = settings.ADMIN_PASS
SU_USERNAME = settings.ADMIN_USER


@task
def create_superuser(_):
    """Create superuser with email and password from .env file"""
    su = db.query(SuperUser).filter_by(email=SU_EMAIL).first()
    if not su:
        su = SuperUser(email=SU_EMAIL, username=SU_USERNAME, password=SU_PASSWORD)
        db.add(su)
        db.commit()
        log(log.INFO, "SuperUser %s created", SU_EMAIL)
    else:
        log(log.WARNING, "SuperUser -%s already exists", SU_EMAIL)
