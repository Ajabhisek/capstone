from pydantic import BaseModel


class PasswordChangeDTO(BaseModel):
    id: int
    oldPassword: str
    newPassword: str
