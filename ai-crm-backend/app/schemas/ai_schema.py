from pydantic import BaseModel


class LeadSummaryRequest(BaseModel):

    lead_name: str

    company: str

    description: str


class LeadScoreRequest(BaseModel):

    lead_name: str

    company: str

    description: str


class EmailRequest(BaseModel):

    lead_name: str

    company: str

    purpose: str