"""
Admin Moderation, Kill Switches, Takedown Management & Audit Log Endpoints.
All endpoints require verified Supabase Auth admin privileges (app_metadata.role == 'admin').
"""

import logging
from typing import Any, Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.api.deps import require_admin
from app.db.supabase_client import get_supabase_admin

logger = logging.getLogger("wsfu.admin_moderation")
router = APIRouter()


class ResolveTakedownIn(BaseModel):
    action: str = Field(..., description="'approved_removed' or 'rejected'")
    notes: Optional[str] = Field(None, description="Resolution rationale")


# ---------------------------------------------------------------------------
# 1. Moderation Queue: Pending AI Summaries
# ---------------------------------------------------------------------------

@router.get("/pending-summaries")
def list_pending_summaries(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Fetch unapproved news briefs awaiting human editorial review."""
    try:
        supabase = get_supabase_admin()
        res = (
            supabase.table("article_summaries")
            .select(
                "id, article_id, tldr_bullets, civic_impact, actors_entities, "
                "figures_mentioned, confidence_score, status, created_at, "
                "articles(id, title, url, author, category, image_url, sources(name, slug))"
            )
            .eq("status", "pending_review")
            .order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
        items = res.data or []
        return {
            "items": items,
            "count": len(items),
            "offset": offset,
            "limit": limit
        }
    except Exception as exc:
        logger.error(f"Failed to fetch pending summaries: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch moderation queue: {exc}"
        ) from exc


@router.post("/summaries/{summary_id}/publish")
def publish_summary(
    summary_id: UUID,
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Approve and publish an AI summary, marking the article as verified."""
    try:
        supabase = get_supabase_admin()

        # Try RPC first, fallback to direct update
        try:
            rpc_res = supabase.rpc("publish_article_summary", {
                "p_summary_id": str(summary_id),
                "p_admin_id": str(admin.id)
            }).execute()
            if rpc_res.data:
                logger.info(f"Summary {summary_id} published via RPC by {admin.id}")
                return rpc_res.data
        except Exception:
            pass

        # Direct transactional fallback
        sum_res = supabase.table("article_summaries").select("article_id").eq("id", str(summary_id)).limit(1).execute()
        if not sum_res.data:
            raise HTTPException(status_code=404, detail=f"Summary not found: {summary_id}")

        article_id = sum_res.data[0]["article_id"]

        supabase.table("article_summaries").update({"status": "published"}).eq("id", str(summary_id)).execute()
        supabase.table("articles").update({"verification_status": "verified"}).eq("id", str(article_id)).execute()

        # Audit log
        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": "PUBLISH_SUMMARY",
            "target_entity": "article_summaries",
            "target_id": str(summary_id),
            "new_state": {"status": "published", "article_id": str(article_id)}
        }).execute()

        logger.info(f"Summary {summary_id} published by {admin.id}")
        return {"status": "published", "summary_id": str(summary_id), "article_id": str(article_id)}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to publish summary {summary_id}: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to publish summary: {exc}") from exc


@router.post("/summaries/{summary_id}/reject")
def reject_summary(
    summary_id: UUID,
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Reject and hide an unverified or disputed AI summary."""
    try:
        supabase = get_supabase_admin()
        res = supabase.table("article_summaries").update({"status": "hidden"}).eq("id", str(summary_id)).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail=f"Summary not found: {summary_id}")

        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": "REJECT_SUMMARY",
            "target_entity": "article_summaries",
            "target_id": str(summary_id),
            "new_state": {"status": "hidden"}
        }).execute()

        logger.info(f"Summary {summary_id} rejected by {admin.id}")
        return {"status": "hidden", "summary_id": str(summary_id)}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to reject summary {summary_id}: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to reject summary: {exc}") from exc


# ---------------------------------------------------------------------------
# 2. Source Kill Switches & Health Monitoring
# ---------------------------------------------------------------------------

@router.get("/sources")
def list_managed_sources(admin: Any = Depends(require_admin)) -> List[Dict[str, Any]]:
    """List all media sources with health status, consecutive errors, and kill-switch state."""
    try:
        supabase = get_supabase_admin()
        res = supabase.table("sources").select("*").order("name").execute()
        return res.data or []
    except Exception as exc:
        logger.error(f"Failed to list sources: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to list sources: {exc}") from exc


@router.post("/sources/{source_id}/toggle")
def toggle_source_kill_switch(
    source_id: UUID,
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Toggle a news source kill switch (instantly enable or disable ingestion & display)."""
    try:
        supabase = get_supabase_admin()
        src_res = supabase.table("sources").select("id, name, is_enabled").eq("id", str(source_id)).limit(1).execute()
        if not src_res.data:
            raise HTTPException(status_code=404, detail=f"Source not found: {source_id}")

        current_state = src_res.data[0]["is_enabled"]
        new_state = not current_state

        update_res = supabase.table("sources").update({"is_enabled": new_state}).eq("id", str(source_id)).execute()

        # Audit log
        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": "TOGGLE_SOURCE_KILL_SWITCH",
            "target_entity": "sources",
            "target_id": str(source_id),
            "previous_state": {"is_enabled": current_state},
            "new_state": {"is_enabled": new_state}
        }).execute()

        logger.info(f"Source {source_id} kill-switch set to {new_state} by {admin.id}")
        return update_res.data[0] if update_res.data else {"id": str(source_id), "is_enabled": new_state}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to toggle source {source_id}: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to toggle source: {exc}") from exc


# ---------------------------------------------------------------------------
# 3. Publisher Takedowns & Dispute Resolution
# ---------------------------------------------------------------------------

@router.get("/takedowns")
def list_takedown_requests(
    status_filter: Optional[str] = Query(None, alias="status"),
    admin: Any = Depends(require_admin)
) -> List[Dict[str, Any]]:
    """List publisher takedown requests."""
    try:
        supabase = get_supabase_admin()
        q = supabase.table("takedown_requests").select("*")
        if status_filter:
            q = q.eq("status", status_filter)
        res = q.order("created_at", desc=True).execute()
        return res.data or []
    except Exception as exc:
        logger.error(f"Failed to list takedowns: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to list takedowns: {exc}") from exc


@router.post("/takedowns/{takedown_id}/resolve")
def resolve_takedown(
    takedown_id: UUID,
    data: ResolveTakedownIn,
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Resolve a publisher takedown notice (approving removal or rejecting dispute)."""
    if data.action not in ("approved_removed", "rejected"):
        raise HTTPException(status_code=422, detail="action must be 'approved_removed' or 'rejected'")

    try:
        supabase = get_supabase_admin()

        # Try RPC first
        try:
            rpc_res = supabase.rpc("resolve_takedown_request", {
                "p_takedown_id": str(takedown_id),
                "p_action": data.action,
                "p_notes": data.notes or "",
                "p_admin_id": str(admin.id)
            }).execute()
            if rpc_res.data:
                return rpc_res.data
        except Exception:
            pass

        # Fallback direct update
        tk_res = supabase.table("takedown_requests").select("*").eq("id", str(takedown_id)).limit(1).execute()
        if not tk_res.data:
            raise HTTPException(status_code=404, detail=f"Takedown request not found: {takedown_id}")

        takedown = tk_res.data[0]
        url = takedown["article_url"]

        update_payload = {
            "status": data.action,
            "resolution_notes": data.notes,
            "resolved_at": "now()"
        }
        res = supabase.table("takedown_requests").update(update_payload).eq("id", str(takedown_id)).execute()

        if data.action == "approved_removed":
            # Hide summaries matching this article URL
            art_res = supabase.table("articles").select("id").eq("url", url).execute()
            if art_res.data:
                art_ids = [a["id"] for a in art_res.data]
                supabase.table("article_summaries").update({"status": "hidden"}).in_("article_id", art_ids).execute()

        # Audit log
        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": "RESOLVE_TAKEDOWN",
            "target_entity": "takedown_requests",
            "target_id": str(takedown_id),
            "new_state": {"action": data.action, "notes": data.notes, "url": url}
        }).execute()

        return res.data[0] if res.data else {"id": str(takedown_id), "status": data.action}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to resolve takedown {takedown_id}: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to resolve takedown: {exc}") from exc


# ---------------------------------------------------------------------------
# 4. Article Corrections & Retractions Management
# ---------------------------------------------------------------------------

class ArticleCorrectionIn(BaseModel):
    correction_note: str = Field(..., min_length=5, max_length=2000, description="Editor correction rationale or retraction reason")
    is_retracted: bool = Field(False, description="True if article is fully retracted, False for standard correction")


@router.post("/articles/{article_id}/correction")
def submit_article_correction(
    article_id: UUID,
    payload: ArticleCorrectionIn,
    admin: Any = Depends(require_admin)
) -> Dict[str, Any]:
    """Submit an official editorial correction or retraction notice with immutable audit log."""
    try:
        supabase = get_supabase_admin()

        # Try atomic RPC first
        try:
            rpc_res = supabase.rpc("submit_article_correction", {
                "p_article_id": str(article_id),
                "p_correction_note": payload.correction_note,
                "p_is_retracted": payload.is_retracted,
                "p_admin_id": str(admin.id)
            }).execute()
            if rpc_res.data:
                logger.info(f"Article {article_id} correction submitted via RPC by {admin.id}")
                return rpc_res.data
        except Exception:
            pass

        # Direct database fallback
        art_res = supabase.table("articles").select("id, title").eq("id", str(article_id)).limit(1).execute()
        if not art_res.data:
            raise HTTPException(status_code=404, detail=f"Article not found: {article_id}")

        article = art_res.data[0]

        update_payload = {
            "correction_note": payload.correction_note,
            "is_retracted": payload.is_retracted,
            "corrected_at": "now()",
            "updated_at": "now()"
        }
        res = supabase.table("articles").update(update_payload).eq("id", str(article_id)).execute()

        # If retracted, mark associated summary as retracted/hidden
        if payload.is_retracted:
            supabase.table("article_summaries").update({"status": "retracted"}).eq("article_id", str(article_id)).execute()

        # Audit log
        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": "RETRACT_ARTICLE" if payload.is_retracted else "CORRECT_ARTICLE",
            "target_entity": "articles",
            "target_id": str(article_id),
            "new_state": {
                "correction_note": payload.correction_note,
                "is_retracted": payload.is_retracted,
                "title": article["title"]
            }
        }).execute()

        logger.info(f"Article {article_id} corrected/retracted by {admin.id}")
        return res.data[0] if res.data else {"id": str(article_id), "is_retracted": payload.is_retracted, "correction_note": payload.correction_note}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to submit article correction for {article_id}: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to submit article correction: {exc}") from exc


# ---------------------------------------------------------------------------
# 5. Audit Log Querying
# ---------------------------------------------------------------------------

@router.get("/audit-logs")
def list_audit_logs(
    limit: int = Query(50, ge=1, le=100),
    admin: Any = Depends(require_admin)
) -> List[Dict[str, Any]]:
    """Retrieve immutable admin audit logs."""
    try:
        supabase = get_supabase_admin()
        res = supabase.table("admin_audit_logs").select("*").order("created_at", desc=True).limit(limit).execute()
        return res.data or []
    except Exception as exc:
        logger.error(f"Failed to list audit logs: {exc}")
        raise HTTPException(status_code=500, detail=f"Failed to list audit logs: {exc}") from exc

