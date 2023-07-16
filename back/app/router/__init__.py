# flake8: noqa F401
from fastapi import APIRouter, Request

from .candidate import candidate_router, attach_cv
from .questions import question_router
