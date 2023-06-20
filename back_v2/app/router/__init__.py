# flake8: noqa F401
from fastapi import APIRouter, Request

from .candidate import candidate_router
from .questions import question_router


# router = APIRouter(prefix="/api", tags=["API"])

# router.include_router(candidate_router)
# router.include_router(question_router)


# @router.get("/list-endpoints/")
# def list_endpoints(request: Request):
#     url_list = [
#         {"path": route.path, "name": route.name} for route in request.app.routes
#     ]
#     return url_list
