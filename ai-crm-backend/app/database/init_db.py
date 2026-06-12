from sqlalchemy import inspect, text

from app.database.database import Base
from app.database.database import engine

from app.models.user import User
from app.models.lead import Lead
from app.models.company import Company
from app.models.task import Task
from app.models.note import Note


def create_tables():
    Base.metadata.create_all(bind=engine)


def run_migrations():
    """
    Apply column-level migrations for existing tables.
    SQLAlchemy's create_all() only creates new tables — it never modifies
    existing ones. This function detects and adds any missing columns.
    """
    inspector = inspect(engine)

    with engine.connect() as conn:

        # --- companies: add user_id if missing ---
        companies_cols = [
            col["name"] for col in inspector.get_columns("companies")
        ]
        if "user_id" not in companies_cols:
            print("  [migrate] Adding 'user_id' column to 'companies' table...")
            conn.execute(text(
                "ALTER TABLE companies "
                "ADD COLUMN user_id INT NOT NULL DEFAULT 1"
            ))
            # Add FK constraint (skip if already exists)
            try:
                conn.execute(text(
                    "ALTER TABLE companies "
                    "ADD CONSTRAINT fk_companies_user_id "
                    "FOREIGN KEY (user_id) REFERENCES users(id)"
                ))
            except Exception:
                pass  # FK may already exist or DB doesn't support it
            conn.commit()
            print("  [migrate] 'companies.user_id' added successfully.")
        else:
            print("  [migrate] 'companies.user_id' already exists — skipping.")


if __name__ == "__main__":

    print("Creating tables...")
    create_tables()

    print("Running migrations...")
    run_migrations()

    print("Database initialized successfully.")