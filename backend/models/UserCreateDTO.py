from pydantic import BaseModel


class UserCreateDTO(BaseModel):
    fullName: str
    username: str
    password: str
    id: int | None = None
