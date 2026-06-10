from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import EmailStr


class UserRegister(BaseModel):

    first_name: str

    last_name: str

    email: EmailStr

    password: str


class UserLogin(BaseModel):

    email: EmailStr

    password: str


class UserResponse(BaseModel):

    id: int

    first_name: str

    last_name: str

    email: EmailStr

    role: str

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )

class TokenResponse(BaseModel):

    access_token: str

    token_type: str

    user: UserResponse