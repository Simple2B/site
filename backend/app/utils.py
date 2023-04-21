import uuid
from fastapi.routing import APIRoute


def generate_uuid() -> str:
    return str(uuid.uuid4())
