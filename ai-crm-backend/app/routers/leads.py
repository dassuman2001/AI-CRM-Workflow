from fastapi import APIRouter
from fastapi import Depends
from fastapi import Query

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.lead_schema import LeadCreate

from app.services.current_user import get_current_user

from app.services.lead_service import LeadService

from fastapi import HTTPException

from app.schemas.lead_schema import LeadUpdate


router = APIRouter(

    prefix="/api/leads",

    tags=["Leads"],

)


@router.post("")

def create_lead(

    payload: LeadCreate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return LeadService.create_lead(

        db,

        payload,

        current_user.id,

    )


@router.get("")

def list_leads(

    page: int = Query(

        1,

        ge=1,

    ),

    limit: int = Query(

        10,

        ge=1,

        le=100,

    ),

    search: str | None = None,

    priority: str | None = None,

    status: str | None = None,

    sort: str = "id",

    order: str = "desc",

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return LeadService.list_leads(

        db,

        page,

        limit,

        search,

        priority,

        status,

        sort,

        order,

    )

@router.get("/{lead_id}")
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    lead = LeadService.get_lead(
        db,
        lead_id,
    )

    if lead is None:

        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    return lead


@router.put("/{lead_id}")
def update_lead(
    lead_id: int,
    payload: LeadUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    lead = LeadService.update_lead(
        db,
        lead_id,
        payload,
    )

    if lead is None:

        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    return lead


@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    deleted = LeadService.delete_lead(
        db,
        lead_id,
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    return {
        "message": "Lead deleted successfully"
    }


@router.post("/{lead_id}/analyze")
def analyze_lead(

    lead_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    lead = LeadService.analyze_lead(

        db,

        lead_id,

    )

    if lead is None:

        raise HTTPException(

            status_code=404,

            detail="Lead not found",

        )

    return lead