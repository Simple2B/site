from pydantic import BaseModel


class Base(BaseModel):
    class Config:
        orm_mode = True


class VariantQuestion(Base):
    id: int
    text: str

class Question(Base):
    text: str
    variants: list[VariantQuestion]
    class Config:
            orm_mode = True
    
class QuestionOut(Base):
    question: Question | None
