import uuid

from app import model as m


def generate_uuid() -> str:
    return str(uuid.uuid4())
