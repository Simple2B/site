from pydantic import BaseModel, Field


class Case(BaseModel):
    title: str
    title_image_url: str
    description: str
    slug_name: str = Field(alias="slug_name")

    class Config:
        orm_mode = True


class CaseOut(Case):
    sub_title_image_url: str
    sub_title: str
    project_link: str | None
    role: str
    stacks: list[str] = Field(alias="stacks")
    images: list[str] = Field(alias="images")


class CasesOut(BaseModel):
    cases: list[CaseOut]
