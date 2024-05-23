from typing import Generator


import pytest


from .test_data import TestData, Settings
from tests.utils import fill_db_by_test_data


@pytest.fixture
def db(test_data: TestData, settings: Settings) -> Generator:
    from app.database import db

    db.url = settings.DATABASE_URI

    with db.Session() as session:
        db.Model.metadata.drop_all(bind=session.bind)
        db.Model.metadata.create_all(bind=session.bind)
        fill_db_by_test_data(session, test_data)
        yield session

        db.Model.metadata.drop_all(bind=session.bind)
