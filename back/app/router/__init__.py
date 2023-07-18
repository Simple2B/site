# flake8: noqa F401
from fastapi import APIRouter, Request

from .candidate import candidate_router, application_form
from .questions import question_router
from .client import client_router
