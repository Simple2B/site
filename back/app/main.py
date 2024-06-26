import jinja2

# patch https://jinja.palletsprojects.com/en/3.0.x/changes/
# pass_context replaces contextfunction and contextfilter.
jinja2.contextfunction = jinja2.pass_context
# flake8: noqa F402

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .logger import log

from app.router import (
    candidate_router,
    question_router,
    client_router,
    case_router,
    stacks_router,
    device_router,
    blacklist_ip,
    feedback_router,
)


from app.config import get_settings


app = FastAPI(version=get_settings().API_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for router in (
    candidate_router,
    question_router,
    client_router,
    case_router,
    stacks_router,
    device_router,
    blacklist_ip,
    feedback_router,
):
    app.include_router(router)


@app.get("/")
def root():
    log(log.INFO, "root")
    return RedirectResponse("/docs")
