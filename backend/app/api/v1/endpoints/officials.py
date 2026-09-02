"""
Public read endpoints and citizen rating UPSERT for the Promise Tracker:
browsing states, officials, their tracked promises, and submitting
approval ratings.

Admin write endpoints (create/update official/promise/source) live in
admin_promises.py, gated by require_admin.
"""
import logging
from typing import Any, Dict, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator

from app.api.deps import get_current_user
from app.db.supabase_client import get_supabase, get_supabase_admin

logger = logging.getLogger("wsfu.officials")
router = APIRouter()

ALLOWED_ROLES = {"president", "governor", "fct_minister", "senator", "house_of_rep"}
ALLOWED_PROMISE_STATUSES = {"not_started", "in_progress", "fulfilled", "broken"}

# List response fields are deliberately lean -- education/past_offices/
# quality_of_life are heavy JSONB blobs only needed on the detail page.
# Keeping list payloads small matters for the low-data-mobile PWA goal
# locked in during Phase 1.
_LIST_FIELDS = (
    "id, name, office_title, role, party, term_period, "
    "district_constituency, state_id, photo_url, photo_attribution"
)

_DETAIL_FIELDS = (
    "id, name, office_title, role, party, term_period, "
    "district_constituency, state_id, photo_url, photo_attribution, "
    "photo_source_url, initials, bio_summary, education, past_offices, "
    "quality_of_life, created_at, updated_at"
)

_PROMISE_FIELDS = (
    "id, title, category, description, status, date_made, "
    "budget_allocated, progress_pct, milestones, created_at, "
    "promise_sources(id, title, url, published_date)"
)


class OfficialNotFoundError(Exception):
    """Raised internally when a requested official_id has no matching row."""


def _attach_rating_summaries(supabase, officials: List[Dict[str, Any]]) -> None:
    """Mutates `officials` in place, adding avg_rating_pct/rating_count.

    Done as a second query rather than a PostgREST embed because
    official_rating_summary is a plain view with no FK for PostgREST to
    traverse automatically.

    A failure here is treated as non-fatal: rating data is supplementary,
    not core to the response, so we log and degrade to "no rating data
    yet" rather than 500ing the whole officials list over it.
    """
    official_ids = [o["id"] for o in officials]
    if not official_ids:
        return

    rows: List[Dict[str, Any]] = []
    try:
        res = (
            supabase.table("official_rating_summary")
            .select("official_id, avg_rating_pct, rating_count")
            .in_("official_id", official_ids)
            .execute()
        )
        rows = res.data or []
    except Exception as exc:
        logger.warning(
            "officials.rating_summary_fetch_failed",
            extra={
                "source": "officials_endpoint",
                "operation": "attach_rating_summaries",
                "official_ids": official_ids,
                "error": str(exc),
            },
        )

    ratings_by_id = {row["official_id"]: row for row in rows}
    for official in officials:
        rating = ratings_by_id.get(official["id"])
        official["avg_rating_pct"] = rating["avg_rating_pct"] if rating else None
        official["rating_count"] = rating["rating_count"] if rating else 0


@router.get("/states")
def list_states() -> Dict[str, Any]:
    """Minimal states listing for the state picker/sidebar.

    NOTE: lives here for now since it's small and tightly coupled to
    browsing officials. Flag if this should move to its own states.py
    router to match the one-file-per-resource pattern in
    feed.py/faac.py/accountability.py.
    """
    try:
        supabase = get_supabase()
        res = (
            supabase.table("states")
            .select("id, code, name, geopolitical_zone")
            .order("name")
            .execute()
        )
        return {"items": res.data or []}
    except Exception as exc:
        logger.error(
            "officials.list_states_failed",
            extra={"source": "officials_endpoint", "operation": "list_states", "error": str(exc)},
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not load states right now. Please try again shortly.",
        ) from exc


@router.get("/")
def list_officials(
    state_code: Optional[str] = Query(
        None, description="2-letter state code, e.g. 'LA'. Ignored when role=president."
    ),
    role: Optional[str] = Query(None, description=f"One of: {', '.join(sorted(ALLOWED_ROLES))}"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
) -> Dict[str, Any]:
    if role is not None and role not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"role must be one of: {', '.join(sorted(ALLOWED_ROLES))}",
        )

    try:
        supabase = get_supabase()
        q = supabase.table("official_profiles").select(_LIST_FIELDS)

        if role == "president":
            # No state_id on President rows -- state_code is irrelevant here.
            q = q.eq("role", "president")
        else:
            if role is not None:
                q = q.eq("role", role)
            if state_code is not None:
                state_res = (
                    supabase.table("states")
                    .select("id")
                    .eq("code", state_code.upper())
                    .limit(1)
                    .execute()
                )
                if not state_res.data:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"No state with code '{state_code}'",
                    )
                q = q.eq("state_id", state_res.data[0]["id"])

        q = q.order("name").range(offset, offset + limit - 1)
        res = q.execute()
        officials = res.data or []
        _attach_rating_summaries(supabase, officials)

        return {"items": officials, "count": len(officials), "offset": offset, "limit": limit}

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "officials.list_officials_failed",
            extra={
                "source": "officials_endpoint",
                "operation": "list_officials",
                "state_code": state_code,
                "role": role,
                "error": str(exc),
            },
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not load officials right now. Please try again shortly.",
        ) from exc


@router.get("/{official_id}")
def get_official_detail(official_id: UUID) -> Dict[str, Any]:
    try:
        supabase = get_supabase()
        res = (
            supabase.table("official_profiles")
            .select(_DETAIL_FIELDS)
            .eq("id", str(official_id))
            .limit(1)
            .execute()
        )
        if not res.data:
            raise OfficialNotFoundError(str(official_id))

        official = res.data[0]
        _attach_rating_summaries(supabase, [official])

        promises_res = (
            supabase.table("tracked_promises")
            .select(_PROMISE_FIELDS + ", promise_status_history(id, previous_status, new_status, reason, created_at)")
            .eq("official_id", str(official_id))
            .order("date_made", desc=True)
            .execute()
        )
        official["tracked_promises"] = promises_res.data or []

        return official

    except OfficialNotFoundError as exc:
        logger.info(
            "officials.get_detail_not_found",
            extra={"source": "officials_endpoint", "operation": "get_official_detail", "official_id": str(official_id)},
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No official found with id '{official_id}'",
        ) from exc
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "officials.get_detail_failed",
            extra={
                "source": "officials_endpoint",
                "operation": "get_official_detail",
                "official_id": str(official_id),
                "error": str(exc),
            },
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not load this official right now. Please try again shortly.",
        ) from exc


@router.get("/{official_id}/promises")
def list_official_promises(
    official_id: UUID,
    status_filter: Optional[str] = Query(
        None, alias="status", description=f"One of: {', '.join(sorted(ALLOWED_PROMISE_STATUSES))}"
    ),
    category: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
) -> Dict[str, Any]:
    if status_filter is not None and status_filter not in ALLOWED_PROMISE_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"status must be one of: {', '.join(sorted(ALLOWED_PROMISE_STATUSES))}",
        )

    try:
        supabase = get_supabase()

        official_res = (
            supabase.table("official_profiles")
            .select("id")
            .eq("id", str(official_id))
            .limit(1)
            .execute()
        )
        if not official_res.data:
            raise OfficialNotFoundError(str(official_id))

        q = supabase.table("tracked_promises").select(_PROMISE_FIELDS).eq("official_id", str(official_id))
        if status_filter is not None:
            q = q.eq("status", status_filter)
        if category is not None:
            q = q.eq("category", category)

        q = q.order("date_made", desc=True).range(offset, offset + limit - 1)
        res = q.execute()
        promises = res.data or []

        return {"items": promises, "count": len(promises), "offset": offset, "limit": limit}

    except OfficialNotFoundError as exc:
        logger.info(
            "officials.list_promises_not_found",
            extra={"source": "officials_endpoint", "operation": "list_official_promises", "official_id": str(official_id)},
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No official found with id '{official_id}'",
        ) from exc
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "officials.list_promises_failed",
            extra={
                "source": "officials_endpoint",
                "operation": "list_official_promises",
                "official_id": str(official_id),
                "status_filter": status_filter,
                "category": category,
                "error": str(exc),
            },
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not load promises right now. Please try again shortly.",
        ) from exc


# ---------------------------------------------------------------------------
# POST /api/v1/officials/{official_id}/rate — citizen rating UPSERT
# ---------------------------------------------------------------------------

class RateOfficialIn(BaseModel):
    rating_pct: int = Field(..., ge=0, le=100, description="Approval percentage 0-100")


@router.post("/{official_id}/rate")
def rate_official(
    official_id: UUID,
    data: RateOfficialIn,
    user: Any = Depends(get_current_user),
) -> Dict[str, Any]:
    """Submit or update a citizen approval rating for an official.

    One rating per user per official, enforced by the uq_official_voter
    unique constraint. Repeat submissions update the existing rating
    in place (UPSERT).
    """
    try:
        supabase = get_supabase_admin()

        # Verify the official exists
        official_res = (
            supabase.table("official_profiles")
            .select("id")
            .eq("id", str(official_id))
            .limit(1)
            .execute()
        )
        if not official_res.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No official found with id '{official_id}'",
            )

        # UPSERT: insert or update on conflict (official_id, user_id)
        res = (
            supabase.table("citizen_ratings")
            .upsert(
                {
                    "official_id": str(official_id),
                    "user_id": str(user.id),
                    "rating_pct": data.rating_pct,
                },
                on_conflict="official_id,user_id",
            )
            .execute()
        )

        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Rating upsert returned no data",
            )

        logger.info(
            "officials.citizen_rating_submitted",
            extra={
                "user_id": str(user.id),
                "official_id": str(official_id),
                "rating_pct": data.rating_pct,
            },
        )
        return res.data[0]

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(
            "officials.rate_official_failed",
            extra={
                "user_id": str(user.id),
                "official_id": str(official_id),
                "error": str(exc),
            },
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not submit rating right now. Please try again shortly.",
        ) from exc

