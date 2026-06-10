from pydantic import BaseModel
from pydantic import ConfigDict


class TaskCreate(BaseModel):

    title: str

    description: str | None = None

    due_date: str | None = None

    lead_id: int


class TaskUpdate(BaseModel):

    title: str | None = None

    description: str | None = None

    due_date: str | None = None

    completed: bool | None = None


class TaskResponse(BaseModel):

    id: int

    title: str

    description: str | None

    due_date: str | None

    completed: bool

    lead_id: int

    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )