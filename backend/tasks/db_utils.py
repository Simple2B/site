from invoke import task


@task
def create_questions(_):
    """Create test vacancy"""
    from app.database import SessionLocal
    from tests.database import QuestionData

    QuestionData.create_questions(SessionLocal())
