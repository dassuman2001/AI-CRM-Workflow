from pydantic import BaseModel
from pydantic import ConfigDict


class CompanyCreate(BaseModel):

    name: str

    industry: str | None = None

    website: str | None = None

    email: str | None = None

    phone: str | None = None

    address: str | None = None

    description: str | None = None


class CompanyUpdate(BaseModel):

    name: str | None = None

    industry: str | None = None

    website: str | None = None

    email: str | None = None

    phone: str | None = None

    address: str | None = None

    description: str | None = None


class CompanyResponse(BaseModel):

    id: int

    name: str

    industry: str | None

    website: str | None

    email: str | None

    phone: str | None

    address: str | None

    description: str | None

    model_config = ConfigDict(
        from_attributes=True
    )