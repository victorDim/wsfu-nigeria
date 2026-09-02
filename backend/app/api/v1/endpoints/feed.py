"""
Feed Endpoints
Provides the public news timeline, filtered by source, state, or entity with AI summaries.
"""

import logging
from fastapi import APIRouter, Query
from typing import Optional, Dict, Any
from app.db.supabase_client import get_supabase

logger = logging.getLogger("wsfu.feed")
router = APIRouter()


@router.get("/")
def get_public_feed(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    source_slug: Optional[str] = Query(None, description="Filter by news outlet slug (e.g. 'premium-times')"),
    query: Optional[str] = Query(None, description="Search keyword")
) -> Dict[str, Any]:
    """
    Returns public news feed with AI summaries and source metadata.
    Enforces editorial moderation boundary (only published summaries).
    """
    try:
        supabase = get_supabase()
        
        # Select articles with their published summaries
        q = supabase.table("articles").select(
            "id, title, url, author, category, image_url, verification_status, published_at, "
            "sources!inner(name, slug, reliability_tier, is_enabled), "
            "article_summaries!inner(*)"
        ).eq("sources.is_enabled", True).eq("article_summaries.status", "published").order("published_at", desc=True).range(offset, offset + limit - 1)
        
        if source_slug and source_slug != "all":
            q = q.eq("sources.slug", source_slug)
                
        if query:
            clean_query = query.strip()[:100]
            q = q.ilike("title", f"%{clean_query}%")
            
        res = q.execute()
        items = res.data or []

        # If strict join returns empty (e.g., during seeding/initial dev), try standard query
        if not items and offset == 0 and not query:
            fallback_q = supabase.table("articles").select(
                "id, title, url, author, category, image_url, verification_status, published_at, "
                "sources(name, slug, reliability_tier), article_summaries(*)"
            ).order("published_at", desc=True).range(0, limit - 1)
            fallback_res = fallback_q.execute()
            items = fallback_res.data or []

        return {
            "items": items,
            "count": len(items),
            "offset": offset,
            "limit": limit
        }
    except Exception as e:
        logger.warning(f"Failed to fetch public feed from Supabase: {e}")
        return {
            "items": [],
            "count": 0,
            "offset": offset,
            "limit": limit
        }

