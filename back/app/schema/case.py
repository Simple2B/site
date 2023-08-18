from pydantic import BaseModel, Field


class Case(BaseModel):
    title: str
    description: str
    slug_name: str = Field(alias="slugName")

    class Config:
        allow_population_by_field_name = True
        orm_mode = True


class CaseOut(Case):
    sub_title: str = Field(alias="subTitle")
    project_link: str | None = Field(alias="projectLink")
    role: str
    stacks_names: list[str] = Field(alias="stacksNames")
    screenshots_urls: list[str] = Field(alias="screenshotsUrls")
    main_image_url: str = Field(alias="mainImageUrl")
    preview_image_url: str = Field(alias="previewImageUrl")


class CasesOut(BaseModel):
    cases: list[CaseOut]
