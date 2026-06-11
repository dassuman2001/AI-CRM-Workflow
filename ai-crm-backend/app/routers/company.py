from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.company_schema import (
    CompanyCreate,
    CompanyUpdate,
)

from app.services.company_service import CompanyService
from app.services.current_user import get_current_user


router = APIRouter(

    prefix="/api/companies",

    tags=["Companies"],

)


@router.post("")
def create_company(

    payload: CompanyCreate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return CompanyService.create_company(

        db,

        payload,

        current_user.id,

    )


@router.get("")
def list_companies(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return CompanyService.list_companies(

        db,

        current_user.id,

    )


@router.get("/{company_id}")
def get_company(

    company_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    company = CompanyService.get_company(

        db,

        company_id,

        current_user.id,

    )

    if company is None:

        raise HTTPException(

            status_code=404,

            detail="Company not found",

        )

    return company


@router.put("/{company_id}")
def update_company(

    company_id: int,

    payload: CompanyUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    company = CompanyService.update_company(

        db,

        company_id,

        payload,

        current_user.id,

    )

    if company is None:

        raise HTTPException(

            status_code=404,

            detail="Company not found",

        )

    return company


@router.delete("/{company_id}")
def delete_company(

    company_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    deleted = CompanyService.delete_company(

        db,

        company_id,

        current_user.id,

    )

    if not deleted:

        raise HTTPException(

            status_code=404,

            detail="Company not found",

        )

    return {

        "message": "Company deleted successfully"

    }

