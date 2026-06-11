from sqlalchemy.orm import Session

from app.models.company import Company

from app.repositories.company_repository import CompanyRepository

from app.schemas.company_schema import (
    CompanyCreate,
    CompanyUpdate,
)


class CompanyService:

    @staticmethod
    def create_company(
        db: Session,
        payload: CompanyCreate,
        user_id: int,
    ):

        company = Company(

            name=payload.name,

            industry=payload.industry,

            website=payload.website,

            email=payload.email,

            phone=payload.phone,

            address=payload.address,

            description=payload.description,

            user_id=user_id,

        )

        return CompanyRepository.create(
            db,
            company,
        )

    @staticmethod
    def list_companies(
        db: Session,
        user_id: int,
    ):

        return CompanyRepository.get_all(
            db,
            user_id,
        )

    @staticmethod
    def get_company(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        return CompanyRepository.get_by_id(
            db,
            company_id,
            user_id,
        )

    @staticmethod
    def update_company(
        db: Session,
        company_id: int,
        payload: CompanyUpdate,
        user_id: int,
    ):

        company = CompanyRepository.get_by_id(
            db,
            company_id,
            user_id,
        )

        if company is None:

            return None

        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():

            setattr(
                company,
                key,
                value,
            )

        return CompanyRepository.update(
            db,
            company,
        )

    @staticmethod
    def delete_company(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        company = CompanyRepository.get_by_id(
            db,
            company_id,
            user_id,
        )

        if company is None:

            return False

        CompanyRepository.delete(
            db,
            company,
        )

        return True