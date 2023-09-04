import jinja2

# patch https://jinja.palletsprojects.com/en/3.0.x/changes/
# pass_context replaces contextfunction and contextfilter.
jinja2.contextfunction = jinja2.pass_context
# flake8: noqa F402

from fastapi import FastAPI

from app.router import (
    candidate_router,
    question_router,
    client_router,
    case_router,
    stacks_router,
    device_router,
)


from app.config import get_settings


app = FastAPI(version=get_settings().API_VERSION)


app.include_router(client_router)
app.include_router(candidate_router)
app.include_router(question_router)
app.include_router(case_router)
app.include_router(stacks_router)
app.include_router(device_router)


@app.get("/")
def root():
    return {"message": "Hello"}
