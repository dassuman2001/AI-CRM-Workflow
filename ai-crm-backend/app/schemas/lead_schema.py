from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import EmailStr


class LeadCreate(BaseModel):

    name: str

    email: EmailStr

    phone: str | None = None

    company: str | None = None

    status: str = "NEW"

    priority: str = "MEDIUM"

    source: str = "WEBSITE"

    estimated_value: float = 0


class LeadUpdate(BaseModel):

    name: str | None = None

    email: EmailStr | None = None

    phone: str | None = None

    company: str | None = None

    status: str | None = None

    priority: str | None = None

    source: str | None = None

    estimated_value: float | None = None


class LeadResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    phone: str | None

    company: str | None

    status: str

    priority: str

    source: str

    estimated_value: float

    model_config = ConfigDict(
        from_attributes=True
    )


    ai_summary: str | None

    ai_score: int | None

    next_action: str | None

    followup_email: str | None

    meeting_summary: str | None