from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.init_db import create_tables, run_migrations
from app.routers.auth import router as auth_router
from app.routers.leads import router as lead_router
from app.routers.company import router as company_router
from app.routers.task import router as task_router
from app.routers.note import router as note_router
from app.routers.ai import router as ai_router
from app.routers.dashboard import router as dashboard_router
from app.routers.copilot import router as copilot_router
from app.routers.export_routes import router as export_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run DB setup (create_all + column migrations) on every startup."""
    create_tables()
    run_migrations()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://ai-crm-workflow.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


app.include_router(lead_router)
app.include_router(auth_router)
app.include_router(company_router)
app.include_router(task_router)
app.include_router(note_router)
app.include_router(ai_router)
app.include_router(dashboard_router)
app.include_router(copilot_router)
app.include_router(export_router)