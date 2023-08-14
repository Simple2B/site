from invoke import task


@task
def init_db(_):
    """Initialization database by fake test data, works only in dev environment"""
    print("Fill by fake test data")
    from app.database import get_db

    try:
        from tests.fixture import get_test_data
        from tests.utils import fill_db_by_test_data
    except ImportError:
        print("init_db works only in dev environment")
        return

    db = get_db().__next__()
    data = get_test_data()

    fill_db_by_test_data(db=db, test_data=data)
    print("Done")
