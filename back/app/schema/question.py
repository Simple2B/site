from pydantic import BaseModel, ConfigDict


class Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class VariantQuestion(Base):
    id: int
    text: str


class Question(Base):
    text: str
    variants: list[VariantQuestion]

    current_progress: int


class QuestionOut(Base):
    question: Question | None
