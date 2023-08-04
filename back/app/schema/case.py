from pydantic import BaseModel, Field

from app.common.models.case_image import EnumCaseImageType


class Case(BaseModel):
    title: str
    description: str
    slug_name: str = Field(alias="slug_name")

    class Config:
        orm_mode = True


class CaseImage(BaseModel):
    id: int
    url: str
    origin_file_name: str
    type_of_image: EnumCaseImageType

    class Config:
        orm_mode = True


class CaseOut(Case):
    sub_title: str
    project_link: str | None
    role: str
    stacks: list[str] = Field(alias="stacks")
    screenshots: list[str] = Field(alias="screenshots")
    case_images: list[CaseImage] = Field(alias="case_images")


class CasesOut(BaseModel):
    cases: list[CaseOut]
