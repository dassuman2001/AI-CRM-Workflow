from sqlalchemy.orm import Session

from app.models.note import Note

from app.repositories.note_repository import NoteRepository

from app.schemas.note_schema import (
    NoteCreate,
    NoteUpdate,
)


class NoteService:

    @staticmethod
    def create_note(
        db: Session,
        payload: NoteCreate,
        user_id: int,
    ):

        note = Note(

            content=payload.content,

            lead_id=payload.lead_id,

            user_id=user_id,

        )

        return NoteRepository.create(
            db,
            note,
        )

    @staticmethod
    def list_notes(db: Session):

        return NoteRepository.get_all(db)

    @staticmethod
    def get_note(
        db: Session,
        note_id: int,
    ):

        return NoteRepository.get_by_id(
            db,
            note_id,
        )

    @staticmethod
    def update_note(
        db: Session,
        note_id: int,
        payload: NoteUpdate,
    ):

        note = NoteRepository.get_by_id(
            db,
            note_id,
        )

        if note is None:

            return None

        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():

            setattr(
                note,
                key,
                value,
            )

        return NoteRepository.update(
            db,
            note,
        )

    @staticmethod
    def delete_note(
        db: Session,
        note_id: int,
    ):

        note = NoteRepository.get_by_id(
            db,
            note_id,
        )

        if note is None:

            return False

        NoteRepository.delete(
            db,
            note,
        )

        return True