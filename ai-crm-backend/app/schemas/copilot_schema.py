from pydantic import BaseModel


class CopilotRequest(BaseModel):

    message: str