from pydantic import BaseModel


class LeadCard(BaseModel):

    id: int

    name: str

    company: str | None

    priority: str

    ai_score: int | None


class DashboardResponse(BaseModel):

    overview: dict

    pipeline: dict

    recent_leads: list

    top_ai_leads: list