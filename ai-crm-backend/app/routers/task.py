from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate,
)

from app.services.current_user import get_current_user
from app.services.task_service import TaskService


router = APIRouter(

    prefix="/api/tasks",

    tags=["Tasks"],

)


@router.post("")
def create_task(

    payload: TaskCreate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return TaskService.create_task(

        db,

        payload,

        current_user.id,

    )


@router.get("")
def list_tasks(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return TaskService.list_tasks(

        db,

        current_user.id,

    )


@router.get("/{task_id}")
def get_task(

    task_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    task = TaskService.get_task(

        db,

        task_id,

        current_user.id,

    )

    if task is None:

        raise HTTPException(

            status_code=404,

            detail="Task not found",

        )

    return task


@router.put("/{task_id}")
def update_task(

    task_id: int,

    payload: TaskUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    task = TaskService.update_task(

        db,

        task_id,

        payload,

        current_user.id,

    )

    if task is None:

        raise HTTPException(

            status_code=404,

            detail="Task not found",

        )

    return task


@router.delete("/{task_id}")
def delete_task(

    task_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    deleted = TaskService.delete_task(

        db,

        task_id,

        current_user.id,

    )

    if not deleted:

        raise HTTPException(

            status_code=404,

            detail="Task not found",

        )

    return {

        "message": "Task deleted successfully",

    }

