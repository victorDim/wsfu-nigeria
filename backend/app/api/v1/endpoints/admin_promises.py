"""
Admin write endpoints for managing official profiles, tracked promises,
and promise status transitions.

All endpoints require admin authentication (app_metadata.role == 'admin').
Writes use the service-role Supabase client to bypass RLS.
"""

import logging
from typing import Any, Dict, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, field_validator, model_validator

from app.api.deps import require_admin
from app.db.supabase_client import get_supabase_admin

logger = logging.getLogger("wsfu.admin")
router = APIRouter()


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------

class PromiseSourceIn(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    url: str = Field(..., min_length=10)
    published_date: Optional[str] = Field(None, description="ISO date string, e.g. '2024-06-12'")

    @field_validator("url")
    @classmethod
    def url_must_be_http(cls, v: str) -> str:
        if not v.startswith(("http://", "https://")):
            raise ValueError("Source URL must start with http:// or https://")
        return v


class CreatePromiseIn(BaseModel):
    official_id: UUID
    title: str = Field(..., min_length=1, max_length=500)
    category: str = Field(..., description="One of: Economy, Infrastructure, Education, Healthcare, Security, Governance")
    description: Optional[str] = None
    date_made: str = Field(..., description="ISO date string, e.g. '2024-05-29'")
    budget_allocated: Optional[str] = None
    sources: List[PromiseSourceIn] = Field(..., min_length=1)

    @field_validator("category")
    @classmethod
    def category_must_be_valid(cls, v: str) -> str:
        allowed = {"Economy", "Infrastructure", "Education", "Healthcare", "Security", "Governance"}
        if v not in allowed:
            raise ValueError(f"category must be one of: {', '.join(sorted(allowed))}")
        return v


class UpdatePromiseStatusIn(BaseModel):
    new_status: str = Field(..., description="One of: not_started, in_progress, fulfilled, broken")
    reason: str = Field(..., min_length=1, max_length=2000, description="Public-facing explanation for the status change")

    @field_validator("new_status")
    @classmethod
    def status_must_be_valid(cls, v: str) -> str:
        allowed = {"not_started", "in_progress", "fulfilled", "broken"}
        if v not in allowed:
            raise ValueError(f"new_status must be one of: {', '.join(sorted(allowed))}")
        return v


class CreateOfficialIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    office_title: str = Field(..., min_length=1, max_length=200)
    role: str
    party: str = Field(..., min_length=1, max_length=100)
    term_period: str = Field(..., min_length=1, max_length=50)
    initials: str = Field(..., min_length=1, max_length=10)
    state_id: Optional[UUID] = None
    district_constituency: Optional[str] = None
    photo_url: Optional[str] = None
    photo_attribution: Optional[str] = None
    photo_source_url: Optional[str] = None
    bio_summary: Optional[str] = None
    education: list = Field(default_factory=list)
    past_offices: list = Field(default_factory=list)
    quality_of_life: dict = Field(default_factory=dict)

    @field_validator("role")
    @classmethod
    def role_must_be_valid(cls, v: str) -> str:
        allowed = {"president", "governor", "fct_minister", "senator", "house_of_rep"}
        if v not in allowed:
            raise ValueError(f"role must be one of: {', '.join(sorted(allowed))}")
        return v

    @model_validator(mode="after")
    def attribution_required_with_photo(self):
        if self.photo_url and not self.photo_attribution:
            raise ValueError("photo_attribution is required when photo_url is provided")
        return self


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/officials", status_code=status.HTTP_201_CREATED)
def create_official(
    data: CreateOfficialIn,
    admin: Any = Depends(require_admin),
) -> Dict[str, Any]:
    """Create a new official profile."""
    try:
        supabase = get_supabase_admin()

        payload = data.model_dump(mode="json")
        # Convert UUID fields to strings for PostgREST
        if payload.get("state_id"):
            payload["state_id"] = str(payload["state_id"])

        res = supabase.table("official_profiles").insert(payload).execute()

        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Insert returned no data",
            )

        official = res.data[0]

        # Audit log
        _log_admin_action(
            supabase, admin,
            action="CREATE_OFFICIAL",
            target_entity="official_profiles",
            target_id=official["id"],
            new_state=official,
        )

        logger.info(
            "admin.official_created",
            extra={"admin_id": str(admin.id), "official_id": official["id"], "name": official["name"]},
        )
        return official

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "admin.create_official_failed",
            extra={"admin_id": str(admin.id), "error": str(exc)},
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create official: {exc}",
        ) from exc


@router.post("/promises", status_code=status.HTTP_201_CREATED)
def create_promise(
    data: CreatePromiseIn,
    admin: Any = Depends(require_admin),
) -> Dict[str, Any]:
    """Create a tracked promise with at least one cited source (atomic).

    Uses the create_promise_with_sources RPC function so the promise and
    its source(s) are inserted in a single transaction, satisfying the
    deferred constraint trigger.
    """
    try:
        supabase = get_supabase_admin()

        # Verify the official exists before calling the RPC
        official_check = (
            supabase.table("official_profiles")
            .select("id")
            .eq("id", str(data.official_id))
            .limit(1)
            .execute()
        )
        if not official_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No official found with id '{data.official_id}'",
            )

        sources_json = [s.model_dump(mode="json") for s in data.sources]

        res = supabase.rpc("create_promise_with_sources", {
            "p_official_id": str(data.official_id),
            "p_title": data.title,
            "p_category": data.category,
            "p_description": data.description,
            "p_date_made": data.date_made,
            "p_budget_allocated": data.budget_allocated,
            "p_sources": sources_json,
        }).execute()

        promise = res.data

        # Audit log
        _log_admin_action(
            supabase, admin,
            action="CREATE_PROMISE",
            target_entity="tracked_promises",
            target_id=promise.get("id", "unknown") if isinstance(promise, dict) else "unknown",
            new_state={"promise": promise, "sources": sources_json},
        )

        logger.info(
            "admin.promise_created",
            extra={
                "admin_id": str(admin.id),
                "official_id": str(data.official_id),
                "title": data.title,
                "source_count": len(data.sources),
            },
        )
        return promise

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "admin.create_promise_failed",
            extra={"admin_id": str(admin.id), "error": str(exc)},
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create promise: {exc}",
        ) from exc


@router.post("/promises/{promise_id}/status", status_code=status.HTTP_200_OK)
def update_promise_status(
    promise_id: UUID,
    data: UpdatePromiseStatusIn,
    admin: Any = Depends(require_admin),
) -> Dict[str, Any]:
    """Update a promise's status and create a public changelog entry (atomic).

    Uses the update_promise_status RPC function so the status UPDATE and
    history INSERT happen in a single transaction.
    """
    try:
        supabase = get_supabase_admin()

        res = supabase.rpc("update_promise_status", {
            "p_promise_id": str(promise_id),
            "p_new_status": data.new_status,
            "p_reason": data.reason,
            "p_admin_id": str(admin.id),
        }).execute()

        history_entry = res.data

        # Audit log
        _log_admin_action(
            supabase, admin,
            action="UPDATE_PROMISE_STATUS",
            target_entity="tracked_promises",
            target_id=str(promise_id),
            new_state={"new_status": data.new_status, "reason": data.reason},
        )

        logger.info(
            "admin.promise_status_updated",
            extra={
                "admin_id": str(admin.id),
                "promise_id": str(promise_id),
                "new_status": data.new_status,
            },
        )
        return history_entry

    except HTTPException:
        raise
    except Exception as exc:
        error_msg = str(exc)
        # Surface specific RPC errors as user-friendly messages
        if "Promise not found" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No promise found with id '{promise_id}'",
            ) from exc
        if "already in status" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=error_msg,
            ) from exc

        logger.error(
            "admin.update_status_failed",
            extra={
                "admin_id": str(admin.id),
                "promise_id": str(promise_id),
                "error": error_msg,
            },
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update promise status: {exc}",
        ) from exc


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _log_admin_action(
    supabase,
    admin: Any,
    *,
    action: str,
    target_entity: str,
    target_id: str,
    previous_state: Optional[dict] = None,
    new_state: Optional[dict] = None,
) -> None:
    """Best-effort insert into admin_audit_logs. Non-fatal on failure."""
    try:
        supabase.table("admin_audit_logs").insert({
            "admin_user_id": str(admin.id),
            "action": action,
            "target_entity": target_entity,
            "target_id": str(target_id),
            "previous_state": previous_state,
            "new_state": new_state,
        }).execute()
    except Exception as exc:
        logger.warning(
            "admin.audit_log_failed",
            extra={"action": action, "target_id": str(target_id), "error": str(exc)},
        )
