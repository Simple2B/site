from pydantic import BaseModel


class Base(BaseModel):
    class Config:
        orm_mode = True


class VariantQuestion(Base):
    id: int
    text: str


class QuestionOut(Base):
    text: str
    variants: list[VariantQuestion]
