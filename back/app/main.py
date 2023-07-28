import jinja2

# patch https://jinja.palletsprojects.com/en/3.0.x/changes/
# pass_context replaces contextfunction and contextfilter.
jinja2.contextfunction = jinja2.pass_context
# flake8: noqa F402

from fastapi import FastAPI
from sqladmin import Admin

from app.database import get_engine
from app.router import candidate_router, question_router, client_router, case_router
from app import admin
from app.database import engine
from app.admin import authentication_backend

from app.config import get_settings

engine = get_engine()

app = FastAPI(version=get_settings().API_VERSION)

admin = Admin(
    app=app,
    authentication_backend=authentication_backend,
    engine=engine,
    templates_dir="app/templates/admin",
)

sql_admin = Admin(app, engine)

app.include_router(client_router)
app.include_router(candidate_router)
app.include_router(question_router)
app.include_router(case_router)


@app.get("/")
def root():
    return {"message": "Hello"}
