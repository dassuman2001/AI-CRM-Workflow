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
    def get_all(
        db: Session,
        user_id: int,
    ):

        return (

            db.query(Note)

            .filter(
                Note.user_id == user_id
            )

            .order_by(
                Note.id.desc()
            )

            .all()

        )

    @staticmethod
    def get_by_id(

        db: Session,

        note_id: int,

        user_id: int,

    ):

        return (

            db.query(Note)

            .filter(

                Note.id == note_id,

                Note.user_id == user_id,

            )

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