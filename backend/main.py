import asyncio
from fastapi import FastAPI, Depends
from typing import Any
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.core.config import settings
from app.api.deps import require_admin
from app.api.v1.router import api_router
from app.services.rss_engine import run_ingestion_cycle


scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize background RSS ingestion scheduler (every 30 mins)
    if settings.SUPABASE_URL and (settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY):
        scheduler.add_job(run_ingestion_cycle, "interval", minutes=30, id="rss_crawler", replace_existing=True)
        scheduler.start()
        print("[STARTUP] RSS Background Scheduler initialized (Interval: 30 mins).")
    else:
        print("[STARTUP] Supabase credentials not set. Background scheduler paused.")
        
    yield
    
    # Shutdown
    if scheduler.running:
        scheduler.shutdown()
        print("[SHUTDOWN] Scheduler stopped.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Nigeria-focused Citizen Accountability, Government Spending & News Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration (Supports local dev, Vercel deployments & production domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["System"])
@app.get("/api/v1/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT
    }



@app.post("/api/v1/admin/trigger-ingestion", tags=["Admin"])
async def trigger_manual_ingestion(admin: Any = Depends(require_admin)):
    """Manually triggers an RSS ingestion cycle (Admin-only)."""
    asyncio.create_task(run_ingestion_cycle())
    return {"message": "Ingestion cycle started in background", "triggered_by": str(admin.id)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
