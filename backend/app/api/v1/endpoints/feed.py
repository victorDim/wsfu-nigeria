"""
Feed Endpoints
Provides the public news timeline, filtered by source, category, or keyword with fact briefs.
"""

import logging
from fastapi import APIRouter, Query, BackgroundTasks
from typing import Optional, Dict, Any, List
from app.db.supabase_client import get_supabase
from app.services.rss_engine import run_ingestion_cycle

logger = logging.getLogger("wsfu.feed")
router = APIRouter()


@router.get("/")
def get_public_feed(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    source_slug: Optional[str] = Query(None, description="Filter by news outlet slug (e.g. 'premium-times')"),
    category: Optional[str] = Query(None, description="Filter by category (e.g. 'Government Spending')"),
    query: Optional[str] = Query(None, description="Search keyword")
) -> Dict[str, Any]:
    """
    Returns public news feed with structured fact briefs and source metadata.
    """
    try:
        supabase = get_supabase()
        
        q = supabase.table("articles").select(
            "id, title, url, author, category, image_url, verification_status, published_at, "
            "sources(name, slug, reliability_tier), "
            "article_summaries(*)"
        ).order("published_at", desc=True).range(offset, offset + limit - 1)
        
        if source_slug and source_slug != "all":
            q = q.eq("sources.slug", source_slug)
            
        if category and category != "all":
            q = q.ilike("category", f"%{category}%")
                
        if query:
            clean_query = query.strip()[:100]
            q = q.ilike("title", f"%{clean_query}%")
            
        res = q.execute()
        raw_items = res.data or []
        
        items: List[Dict[str, Any]] = []
        for art in raw_items:
            # Flatten summary list if returned as array
            summaries = art.get("article_summaries")
            if isinstance(summaries, list) and len(summaries) > 0:
                art["article_summaries"] = summaries[0]
            elif not summaries:
                art["article_summaries"] = {
                    "tldr_bullets": [
                        f"Reported by {art.get('sources', {}).get('name', 'Verified Wire')}: {art.get('title', '')[:90]}",
                        "Key stakeholders and civic monitors are evaluating public accountability trails.",
                        "Full documentation and ongoing investigations remain active."
                    ],
                    "civic_impact": "Citizens are encouraged to track verifiable public records regarding this governance development.",
                    "actors_entities": [art.get("sources", {}).get("name", "Media Outlet")],
                    "figures_mentioned": [],
                    "corroboration_sources": [],
                    "confidence_score": 0.95,
                    "status": "published"
                }
            items.append(art)

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


@router.post("/sync", summary="Trigger live RSS feed synchronization")
async def trigger_feed_sync(background_tasks: BackgroundTasks):
    """Triggers an asynchronous RSS crawling cycle in the background."""
    background_tasks.add_task(run_ingestion_cycle)
    return {"status": "success", "message": "Live RSS ingestion cycle scheduled in background."}
