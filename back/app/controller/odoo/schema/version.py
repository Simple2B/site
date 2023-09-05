from pydantic import BaseModel


class Version(BaseModel):
    server_version: str
    server_version_info: tuple[int, int, int, str, int, str]
    # cSpell:ignore server_serie
    server_serie: str
    protocol_version: int
