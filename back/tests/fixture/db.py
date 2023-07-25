from typing import Generator

import pytest

from .test_data import TestData
from tests.utils import fill_db_by_test_data


@pytest.fixture
def db(test_data: TestData) -> Generator:
    from app.database import db

    with db.Session() as session:
        db.Model.metadata.drop_all(bind=session.bind)
        db.Model.metadata.create_all(bind=session.bind)
        fill_db_by_test_data(session, test_data)
        yield session
