from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import Response

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.services.current_user import get_current_user

from app.models.lead import Lead
from app.models.company import Company
from app.models.task import Task
from app.models.note import Note

from app.utils.export_csv import ExportCSV

router = APIRouter(

    prefix="/api/export",

    tags=["Export"],

)


# ----------------------------------------
# Leads
# ----------------------------------------

@router.get("/leads/csv")
def export_leads(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    leads = db.query(
        Lead
    ).all()

    csv_data = ExportCSV.leads(
        leads
    )

    return Response(

        content=csv_data,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=leads.csv"

        },

    )


# ----------------------------------------
# Companies
# ----------------------------------------

@router.get("/companies/csv")
def export_companies(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    companies = db.query(
        Company
    ).all()

    csv_data = ExportCSV.companies(
        companies
    )

    return Response(

        content=csv_data,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=companies.csv"

        },

    )


# ----------------------------------------
# Tasks
# ----------------------------------------

@router.get("/tasks/csv")
def export_tasks(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    tasks = db.query(
        Task
    ).all()

    csv_data = ExportCSV.tasks(
        tasks
    )

    return Response(

        content=csv_data,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=tasks.csv"

        },

    )


# ----------------------------------------
# Notes
# ----------------------------------------

@router.get("/notes/csv")
def export_notes(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    notes = db.query(
        Note
    ).all()

    csv_data = ExportCSV.notes(
        notes
    )

    return Response(

        content=csv_data,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=notes.csv"

        },

    )