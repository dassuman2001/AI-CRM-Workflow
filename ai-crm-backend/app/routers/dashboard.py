from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.services.current_user import get_current_user

from app.services.dashboard_service import DashboardService

router = APIRouter(

    prefix="/api/dashboard",

    tags=["Dashboard"],

)


@router.get("")

def dashboard(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return DashboardService.get_dashboard(

        db,

    )


@router.get("/analytics")
def analytics(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return DashboardService.get_analytics(

        db

    )