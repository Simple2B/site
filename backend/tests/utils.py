from random import randint, choice
from datetime import datetime, timedelta


from sqlalchemy.orm import Session

import app.model as m
from tests import TestData


def fill_db_by_test_data(db: Session, test_data: TestData):
    print("Filling up db with fake data")

    for c in test_data.test_users:
        user = db.query(m.User).filter_by(email=c.email).first()
        if not user:
            db.add(m.User(**c.dict()))
            db.commit()
