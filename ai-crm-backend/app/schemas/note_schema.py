from pydantic import BaseModel
from pydantic import ConfigDict


class NoteCreate(BaseModel):

    content: str

    lead_id: int


class NoteUpdate(BaseModel):

    content: str | None = None


class NoteResponse(BaseModel):

    id: int

    content: str

    lead_id: int

    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )