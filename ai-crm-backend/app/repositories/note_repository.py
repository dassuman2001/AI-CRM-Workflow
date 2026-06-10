from sqlalchemy.orm import Session

from app.models.note import Note


class NoteRepository:

    @staticmethod
    def create(
        db: Session,
        note: Note,
    ):

        db.add(note)

        db.commit()

        db.refresh(note)

        return note

    @staticmethod
    def get_all(db: Session):

        return (
            db.query(Note)
            .order_by(Note.id.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        note_id: int,
    ):

        return (
            db.query(Note)
            .filter(Note.id == note_id)
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        note: Note,
    ):

        db.commit()

        db.refresh(note)

        return note

    @staticmethod
    def delete(
        db: Session,
        note: Note,
    ):

        db.delete(note)

        db.commit()