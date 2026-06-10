from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.note_schema import (
    NoteCreate,
    NoteUpdate,
)

from app.services.current_user import get_current_user

from app.services.note_service import NoteService

router = APIRouter(

    prefix="/api/notes",

    tags=["Notes"],

)


@router.post("")
def create_note(

    payload: NoteCreate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return NoteService.create_note(

        db,

        payload,

        current_user.id,

    )


@router.get("")
def list_notes(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return NoteService.list_notes(db)


@router.get("/{note_id}")
def get_note(

    note_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    note = NoteService.get_note(

        db,

        note_id,

    )

    if note is None:

        raise HTTPException(

            status_code=404,

            detail="Note not found",

        )

    return note


@router.put("/{note_id}")
def update_note(

    note_id: int,

    payload: NoteUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    note = NoteService.update_note(

        db,

        note_id,

        payload,

    )

    if note is None:

        raise HTTPException(

            status_code=404,

            detail="Note not found",

        )

    return note


@router.delete("/{note_id}")
def delete_note(

    note_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    deleted = NoteService.delete_note(

        db,

        note_id,

    )

    if not deleted:

        raise HTTPException(

            status_code=404,

            detail="Note not found",

        )

    return {

        "message": "Note deleted successfully"

    }