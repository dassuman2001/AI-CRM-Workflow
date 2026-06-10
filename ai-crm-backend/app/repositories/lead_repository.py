from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.lead import Lead


class LeadRepository:

    @staticmethod
    def create(
        db: Session,
        lead: Lead,
    ):
        db.add(lead)
        db.commit()
        db.refresh(lead)
        return lead

    @staticmethod
    def get_by_id(
        db: Session,
        lead_id: int,
    ):
        return (
            db.query(Lead)
            .filter(Lead.id == lead_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
        page: int,
        limit: int,
        search: str | None,
        priority: str | None,
        status: str | None,
        sort: str,
        order: str,
    ):
        query = db.query(Lead)

        if search:
            query = query.filter(
                or_(
                    Lead.name.ilike(f"%{search}%"),
                    Lead.email.ilike(f"%{search}%"),
                    Lead.company.ilike(f"%{search}%"),
                )
            )

        if priority:
            query = query.filter(Lead.priority == priority)

        if status:
            query = query.filter(Lead.status == status)

        sort_column = getattr(Lead, sort, Lead.id)

        if order.lower() == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        total = query.count()
        items = (
            query.offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        return total, items

    @staticmethod
    def update(
        db: Session,
        lead: Lead,
    ):
        db.commit()
        db.refresh(lead)
        return lead

    @staticmethod
    def delete(
        db: Session,
        lead: Lead,
    ):
        db.delete(lead)
        db.commit()


    @staticmethod
    def save_ai_analysis(
        db,
        lead,
        ai_summary,
        ai_score,
        next_action,
        followup_email,
    ):

        lead.ai_summary = ai_summary

        lead.ai_score = ai_score

        lead.next_action = next_action

        lead.followup_email = followup_email

        db.commit()

        db.refresh(lead)

        return lead