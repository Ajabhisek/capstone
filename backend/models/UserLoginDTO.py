from pydantic import BaseModel


class UserLoginDTO(BaseModel):
    username: str
    password: str
