from sqlalchemy.orm import Session

from app.models.company import Company


class CompanyRepository:

    @staticmethod
    def create(
        db: Session,
        company: Company,
    ):

        db.add(company)

        db.commit()

        db.refresh(company)

        return company

    @staticmethod
    def get_all(
        db: Session,
        user_id: int,
    ):

        return (

            db.query(Company)

            .filter(
                Company.user_id == user_id
            )

            .order_by(
                Company.id.desc()
            )

            .all()

        )

    @staticmethod
    def get_by_id(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        return (

            db.query(Company)

            .filter(

                Company.id == company_id,

                Company.user_id == user_id,

            )

            .first()

        )

    @staticmethod
    def update(
        db: Session,
        company: Company,
    ):

        db.commit()

        db.refresh(company)

        return company

    @staticmethod
    def delete(
        db: Session,
        company: Company,
    ):

        db.delete(company)

        db.commit()