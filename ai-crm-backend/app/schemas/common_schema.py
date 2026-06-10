from typing import Any

from pydantic import BaseModel


class PaginatedResponse(BaseModel):

    total: int

    page: int

    limit: int

    pages: int

    items: list[Any]