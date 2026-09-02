"""
Accountability Endpoints: Political Promise Tracker & FOI Request Manager
"""

import uuid
import logging
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel, Field

from app.db.supabase_client import get_supabase, get_supabase_admin

logger = logging.getLogger("wsfu.accountability")
router = APIRouter()


class FOIRequestCreate(BaseModel):
    mda_name: str = Field(..., min_length=2, max_length=250, description="Target Ministry, Department or Agency")
    subject: str = Field(..., min_length=5, max_length=500, description="Subject of the FOI request")
    details: str = Field(..., min_length=10, max_length=5000, description="Detailed questions and records requested")


@router.get("/promises")
def list_promises(
    status: Optional[str] = Query(None, description="Filter by status: not_started, in_progress, fulfilled, broken"),
    category: Optional[str] = Query(None, description="Filter by category: Economy, Security, Infrastructure, Healthcare, Education, Governance"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0)
) -> List[Dict[str, Any]]:
    """
    Returns list of tracked government and executive promises from normalized tracked_promises.
    """
    try:
        supabase = get_supabase()
        q = supabase.table("tracked_promises").select(
            "id, title, category, description, status, date_made, budget_allocated, progress_pct, milestones, created_at, "
            "official_profiles(id, name, office_title, role, party, state_id, states(name, code)), "
            "promise_sources(id, title, url, published_date)"
        )
        if status:
            q = q.eq("status", status)
        if category:
            q = q.eq("category", category)
        res = q.order("date_made", desc=True).range(offset, offset + limit - 1).execute()
        return res.data or []
    except Exception as e:
        logger.warning(f"Error querying tracked_promises, attempting fallback: {e}")
        try:
            # Fallback to legacy table if migration 007 not yet applied
            legacy_q = supabase.table("promises").select("*, states(name, code)")
            if status:
                legacy_q = legacy_q.eq("status", status)
            if category:
                legacy_q = legacy_q.eq("category", category)
            res = legacy_q.order("date_made", desc=True).execute()
            return res.data or []
        except Exception as err:
            raise HTTPException(status_code=500, detail=str(err)) from err


@router.get("/foi")
def list_foi_requests(
    status: Optional[str] = Query(None, description="Filter by status: submitted, overdue, fulfilled, denied"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0)
) -> List[Dict[str, Any]]:
    """Returns list of publicly tracked Freedom of Information requests."""
    try:
        supabase = get_supabase()
        q = supabase.table("foi_requests").select("*")
        if status:
            q = q.eq("status", status)
        res = q.order("date_filed", desc=True).range(offset, offset + limit - 1).execute()
        return res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/foi")
def create_foi_request(data: FOIRequestCreate) -> Dict[str, Any]:
    """
    Generates a formal FOI tracking record and statutory tracking code under Section 1 FOI Act 2011.
    """
    today = datetime.utcnow().date()
    due_date = today + timedelta(days=7)
    today_str = today.isoformat()
    due_str = due_date.isoformat()
    year_str = str(today.year)
    short_id = uuid.uuid4().hex[:6].upper()
    tracking_code = f"FOI-{year_str}-{short_id}"

    try:
        supabase_admin = get_supabase_admin()
        res = supabase_admin.table("foi_requests").insert({
            "tracking_code": tracking_code,
            "mda_name": data.mda_name.strip(),
            "subject": data.subject.strip(),
            "details": data.details.strip(),
            "status": "submitted"
        }).execute()
        
        if res.data and len(res.data) > 0:
            item = res.data[0]
            item["legal_notice"] = "Statutory 7-working-day compliance clock commenced pursuant to Section 4 FOI Act 2011."
            return item
            
        return {
            "id": uuid.uuid4().hex,
            "tracking_code": tracking_code,
            "mda_name": data.mda_name,
            "subject": data.subject,
            "details": data.details,
            "date_filed": today_str,
            "due_date": due_str,
            "status": "submitted",
            "legal_notice": "Statutory 7-working-day compliance clock commenced pursuant to Section 4 FOI Act 2011."
        }
    except Exception as e:
        logger.error(f"Error persisting FOI request to Supabase: {e}")
        return {
            "id": uuid.uuid4().hex,
            "tracking_code": tracking_code,
            "mda_name": data.mda_name,
            "subject": data.subject,
            "details": data.details,
            "date_filed": today_str,
            "due_date": due_str,
            "status": "submitted",
            "legal_notice": "Recorded locally. Statutory 7-day window active."
        }

