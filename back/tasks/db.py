from invoke import task
from app.config import Settings, get_settings
from app import model as m

NUM_TEST_USERS = 10


settings: Settings = get_settings()


@task
def init_db(_):
    """Initialization database

    Args:
        --test-data (bool, optional): wether fill database by test data. Defaults to False.
    """
    from app.database import SessionLocal

    db = SessionLocal()
    # add admin user
    admin: m.SuperUser = m.SuperUser(
        username=settings.ADMIN_USER,
        password=settings.ADMIN_PASS,
        email=settings.ADMIN_EMAIL,
    )
    db.add(admin)
    db.commit()
