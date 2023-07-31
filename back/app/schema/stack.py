from pydantic import BaseModel

class StackOut(BaseModel):
    name: str

    class Config:
        orm_mode = True