from pydantic import BaseModel, Field
from app import model as m


class PropertyOut(BaseModel):
    title: str
    value: str

    class Config:
        orm_mode = True


class VacancyOut(BaseModel):
    id: int
    title: str
    overview: str
    about: str
    type: m.VacancyType
    offers: list[str] = Field(alias="offers")
    skills: list[str] = Field(alias="skills")
    properties: list[PropertyOut]

    class Config:
        use_enum_values = True
        orm_mode = True
