# flake8: noqa F401
from fastapi import APIRouter, Request

from .candidate import candidate_router, application_form
from .questions import question_router
from .client import client_router
from .case import case_router
from .stack import stacks_router
from .device import device_router
