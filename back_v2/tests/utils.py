from sqlalchemy.orm import Session

from tests.fixture import TestData

import app.model as m


def create_test_superuser(db, test_data):
    db.add(
        m.SuperUser(
            email=test_data.test_superuser.email,
            username=test_data.test_superuser.email,
            password=test_data.test_superuser.password,
        )
    )
    db.commit()


def fill_db_by_test_data(db: Session, test_data: TestData):
    print("Filling up db with fake data")
    create_test_superuser(db, test_data)

