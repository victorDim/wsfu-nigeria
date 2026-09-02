from fastapi import APIRouter
from app.api.v1.endpoints import feed, faac, accountability, officials, admin_promises, admin, whatsapp, ai

api_router = APIRouter()

api_router.include_router(feed.router, prefix="/feed", tags=["News Feed"])
api_router.include_router(faac.router, prefix="/faac", tags=["FAAC Spending Tracker"])
api_router.include_router(accountability.router, prefix="/accountability", tags=["Civic Accountability"])
api_router.include_router(officials.router, prefix="/officials", tags=["Official Profiles & Promises"])
api_router.include_router(admin_promises.router, prefix="/admin", tags=["Admin: Promise Management"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin: Moderation & Control"])
api_router.include_router(whatsapp.router, prefix="/whatsapp", tags=["WhatsApp Bot & Webhooks"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Intelligence & Reasoning"])




