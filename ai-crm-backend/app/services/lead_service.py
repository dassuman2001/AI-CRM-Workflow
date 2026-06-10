from sqlalchemy.orm import Session

from app.models.lead import Lead
from app.repositories.lead_repository import LeadRepository
from app.schemas.lead_schema import LeadCreate
from app.schemas.lead_schema import LeadUpdate
from app.services.ai_service import AIService


class LeadService:

    @staticmethod
    def create_lead(
        db,
        payload,
        user_id,
    ):

        lead = Lead(

            name=payload.name,

            email=payload.email,

            phone=payload.phone,

            company=payload.company,

            status=payload.status,

            priority=payload.priority,

            source=payload.source,

            estimated_value=payload.estimated_value,

            assigned_user_id=user_id,

        )

        lead = LeadRepository.create(

            db,

            lead,

        )

        ai = AIService.analyze_lead(

            lead

        )

        lead = LeadRepository.save_ai_analysis(

            db,

            lead,

            ai["ai_summary"],

            ai["ai_score"],

            ai["next_action"],

            ai["followup_email"],

        )

        return lead

    @staticmethod
    def list_leads(
        db: Session,
        page: int,
        limit: int,
        search: str | None,
        priority: str | None,
        status: str | None,
        sort: str,
        order: str,
    ):
        total, items = LeadRepository.get_all(
            db,
            page,
            limit,
            search,
            priority,
            status,
            sort,
            order,
        )

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit,
            "items": items,
        }

    @staticmethod
    def get_lead(
        db: Session,
        lead_id: int,
    ):
        return LeadRepository.get_by_id(
            db,
            lead_id,
        )

    @staticmethod
    def update_lead(
        db: Session,
        lead_id: int,
        payload: LeadUpdate,
    ):
        lead = LeadRepository.get_by_id(
            db,
            lead_id,
        )

        if lead is None:
            return None

        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(
                lead,
                key,
                value,
            )

        return LeadRepository.update(
            db,
            lead,
        )

    @staticmethod
    def delete_lead(
        db: Session,
        lead_id: int,
    ):
        lead = LeadRepository.get_by_id(
            db,
            lead_id,
        )

        if lead is None:
            return False

        LeadRepository.delete(
            db,
            lead,
        )

        return True


    @staticmethod
    def analyze_lead(
        db,
        lead_id,
    ):

        lead = LeadRepository.get_by_id(
            db,
            lead_id,
        )

        if lead is None:

            return None

        ai = AIService.analyze_lead(
            lead
        )

        return LeadRepository.save_ai_analysis(

            db,

            lead,

            ai["ai_summary"],

            ai["ai_score"],

            ai["next_action"],

            ai["followup_email"],

        )