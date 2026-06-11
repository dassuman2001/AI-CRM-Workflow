from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.copilot_schema import CopilotRequest
from app.services.current_user import get_current_user
from app.services.copilot_service import CopilotService


router = APIRouter(

    prefix="/api/copilot",

    tags=["AI Copilot"],

)


@router.post("/chat")
def chat(

    payload: CopilotRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    answer = CopilotService.chat(

        db,

        payload.message,

        current_user.id,

    )

    return {

        "answer": answer,

    }
