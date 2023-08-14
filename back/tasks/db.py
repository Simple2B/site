from invoke import task
from app.common import models as m


@task
def init_db(_):
    """Initialization database

    Args:
        --test-data (bool, optional): wether fill database by test data. Defaults to False.
    """
    # TODO
    pass
