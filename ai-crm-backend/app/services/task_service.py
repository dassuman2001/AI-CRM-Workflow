from sqlalchemy.orm import Session

from app.models.task import Task

from app.repositories.task_repository import TaskRepository

from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate,
)


class TaskService:

    @staticmethod
    def create_task(
        db: Session,
        payload: TaskCreate,
        user_id: int,
    ):

        task = Task(

            title=payload.title,

            description=payload.description,

            due_date=payload.due_date,

            lead_id=payload.lead_id,

            user_id=user_id,

        )

        return TaskRepository.create(
            db,
            task,
        )

    @staticmethod
    def list_tasks(db: Session):

        return TaskRepository.get_all(db)

    @staticmethod
    def get_task(
        db: Session,
        task_id: int,
    ):

        return TaskRepository.get_by_id(
            db,
            task_id,
        )

    @staticmethod
    def update_task(
        db: Session,
        task_id: int,
        payload: TaskUpdate,
    ):

        task = TaskRepository.get_by_id(
            db,
            task_id,
        )

        if task is None:

            return None

        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():

            setattr(task, key, value)

        return TaskRepository.update(
            db,
            task,
        )

    @staticmethod
    def delete_task(
        db: Session,
        task_id: int,
    ):

        task = TaskRepository.get_by_id(
            db,
            task_id,
        )

        if task is None:

            return False

        TaskRepository.delete(
            db,
            task,
        )

        return True