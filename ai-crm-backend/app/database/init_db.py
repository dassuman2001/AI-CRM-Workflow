from app.database.database import Base
from app.database.database import engine

from app.models.user import User
from app.models.lead import Lead
from app.models.company import Company
from app.models.task import Task
from app.models.note import Note

def create_tables():

    Base.metadata.create_all(
        bind=engine
    )


if __name__ == "__main__":

    create_tables()

    print("Database initialized successfully.")