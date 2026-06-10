from fastapi import APIRouter

from app.schemas.ai_schema import (

    LeadSummaryRequest,

    LeadScoreRequest,

    EmailRequest,

)


from app.services.ai_service import AIService

router = APIRouter(

    prefix="/api/ai",

    tags=["AI"],

)

from app.schemas.meeting_schema import (
    MeetingSummaryRequest,
)



@router.post(

    "/summarize-lead"

)

def summarize(

    payload: LeadSummaryRequest,

):

    return {

        "result":

        AIService.summarize_lead(

            payload.lead_name,

            payload.company,

            payload.description,

        )

    }


@router.post(

    "/score-lead"

)

def score(

    payload: LeadScoreRequest,

):

    return {

        "result":

        AIService.score_lead(

            payload.lead_name,

            payload.company,

            payload.description,

        )

    }


@router.post(

    "/generate-email"

)

def email(

    payload: EmailRequest,

):

    return {

        "result":

        AIService.generate_email(

            payload.lead_name,

            payload.company,

            payload.purpose,

        )

    }


@router.post(
    "/meeting-summary"
)
def meeting_summary(

    payload: MeetingSummaryRequest,

):

    return {

        "result":

        AIService.meeting_summary(

            payload.notes

        )

    }