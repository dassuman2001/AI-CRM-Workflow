from pydantic import BaseModel


class MeetingSummaryRequest(BaseModel):

    notes: str