from pydantic import BaseModel


class ChatInfo(BaseModel):
    id: int | None = None
    question: str
    answer: str
    pdf: str
    score: float
    context: str
