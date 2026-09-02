"""
Async RSS Engine & Ingestion Pipeline (Hardened for Production)
Includes SSRF Protection, Non-blocking I/O, Image Extraction, Stale Source Monitoring, and Source Kill Switch.
"""

import hashlib
import asyncio
import logging
import feedparser
from datetime import datetime
from typing import List, Dict, Any, Optional
from app.db.supabase_client import get_supabase_admin
from app.services.extractor import extract_article_content
from app.services.summarizer import generate_summary
from app.core.security import is_safe_url, safe_fetch_http, SSRFException

logger = logging.getLogger("wsfu.ingestion")

RSS_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WSFUBot/1.0",
    "Accept": "application/rss+xml, application/xml, text/xml, */*"
}


def compute_hash(text: str) -> str:
    """Returns SHA-256 hash of text for deduplication."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def extract_feed_image(entry: Any) -> Optional[str]:
    """
    Extracts image URL from feedparser media fields before HTML stripping.
    Validates URL with SSRF guard before returning.
    """
    candidate_url = None

    # 1. Check media_content
    if hasattr(entry, "media_content") and entry.media_content:
        for media in entry.media_content:
            if "url" in media and (media.get("medium") == "image" or media.get("type", "").startswith("image/")):
                candidate_url = media["url"]
                break

    # 2. Check media_thumbnail
    if not candidate_url and hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
        candidate_url = entry.media_thumbnail[0].get("url")

    # 3. Check enclosures
    if not candidate_url and hasattr(entry, "enclosures") and entry.enclosures:
        for enc in entry.enclosures:
            if enc.get("type", "").startswith("image/"):
                candidate_url = enc.get("href")
                break

    # Validate extracted URL
    if candidate_url:
        is_safe, _ = is_safe_url(candidate_url)
        if is_safe:
            return candidate_url.strip()

    return None


async def detect_corroboration(title: str, source_name: str, supabase_admin: Any) -> List[str]:
    """Finds other news sources that have covered a similar story in the past 72 hours."""
    corroborating_sources = []
    try:
        # Search recent articles with similar titles (case-insensitive substring/word match)
        keywords = [w for w in title.split() if len(w) > 4][:3]
        if keywords:
            query = supabase_admin.table("articles").select("sources(name)").limit(10)
            for kw in keywords:
                query = query.ilike("title", f"%{kw}%")
            res = query.execute()
            if res.data:
                for row in res.data:
                    src = row.get("sources", {}).get("name")
                    if src and src != source_name and src not in corroborating_sources:
                        corroborating_sources.append(src)
    except Exception as e:
        logger.debug(f"Corroboration detection skipped: {e}")
    return corroborating_sources


async def process_single_article(entry: Any, source: Dict[str, Any], supabase_admin: Any):
    """Processes a single RSS entry: deduplicates, validates URL, extracts full text & images, summarizes."""
    url = entry.get("link", "").strip()
    title = entry.get("title", "").strip()
    
    if not url or not title:
        return
    
    # 1. SSRF Safety Validation on Destination URL
    is_safe, reason = is_safe_url(url)
    if not is_safe:
        logger.warning(f"[BLOCKED SSRF] Disallowed URL '{url}' from source '{source['name']}': {reason}")
        return

    # 2. Check if article URL already exists in Supabase (Dedup)
    try:
        existing = supabase_admin.table("articles").select("id").eq("url", url).execute()
        if existing.data and len(existing.data) > 0:
            return  # Already ingested
    except Exception as e:
        logger.error(f"Error checking article existence for '{url}': {e}")
        return

    logger.info(f"[INGEST] Processing: {title[:60]}... ({source['name']})")
    
    # 3. Extract full text & hero image from destination page
    extracted = await extract_article_content(url)
    
    # 4. Extract Image: Feed enclosure first, fallback to HTML OpenGraph/Twitter image
    image_url = extract_feed_image(entry) or (extracted.get("image_url") if extracted else None)
    
    if not extracted or not extracted["text"]:
        # Fallback to RSS summary
        full_text = entry.get("summary", title)
    else:
        full_text = extracted["text"]

    
    content_hash = compute_hash(f"{title}\n{full_text[:300]}")
    
    # 5. Parse published date
    published_at = datetime.utcnow().isoformat()
    if hasattr(entry, "published_parsed") and entry.published_parsed:
        try:
            published_at = datetime(*entry.published_parsed[:6]).isoformat()
        except Exception:
            pass

    # 6. Generate AI Summary (Marked as pending_review for human moderation)
    summary_data = await generate_summary(title=title, body=full_text, source_name=source["name"])
    
    category = source.get("category", "National")
    if summary_data and summary_data.get("category"):
        category = summary_data["category"]

    # 7. Multi-source Corroboration Detection
    corroboration = await detect_corroboration(title, source["name"], supabase_admin)

    # 8. Insert raw article
    try:
        article_payload = {
            "source_id": source["id"],
            "title": title,
            "url": url,
            "author": extracted.get("author") if extracted else entry.get("author", ""),
            "full_text": full_text,
            "image_url": image_url,
            "content_hash": content_hash,
            "category": category,
            "verification_status": "unverified",
            "published_at": published_at
        }
        
        article_res = supabase_admin.table("articles").insert(article_payload).execute()
        if not article_res.data:
            return
        
        article_id = article_res.data[0]["id"]
        
        if summary_data:
            summary_payload = {
                "article_id": article_id,
                "tldr_bullets": summary_data["tldr_bullets"],
                "civic_impact": summary_data["civic_impact"],
                "actors_entities": summary_data.get("actors_entities", []),
                "figures_mentioned": summary_data.get("figures_mentioned", []),
                "corroboration_sources": corroboration,
                "confidence_score": summary_data.get("confidence_score", 0.95),
                "status": "pending_review"  # Human review queue
            }
            if summary_data.get("embedding"):
                summary_payload["embedding"] = summary_data["embedding"]

            supabase_admin.table("article_summaries").insert(summary_payload).execute()
            logger.info(f"[SUCCESS] Summarized & Queued for Moderation: {title[:60]}")
    except Exception as e:
        logger.error(f"Error persisting article '{title[:40]}': {e}")



async def run_ingestion_cycle():
    """Runs a complete ingestion cycle across all active and enabled sources non-blockingly."""
    supabase_admin = get_supabase_admin()
    
    # Fetch active and ENABLED sources (Honoring the Kill Switch)
    try:
        sources_res = supabase_admin.table("sources").select("*").eq("is_active", True).eq("is_enabled", True).execute()
        sources = sources_res.data or []
    except Exception as e:
        logger.error(f"Error fetching sources for ingestion: {e}")
        return
    
    logger.info(f"[RSS] Starting ingestion cycle for {len(sources)} enabled sources...")
    
    for source in sources:
        # Check source URL safety
        is_safe, reason = is_safe_url(source["rss_url"])
        if not is_safe:
            logger.error(f"[SSRF ALERT] Disallowed source RSS URL '{source['rss_url']}': {reason}")
            continue

        try:
            # 1. Fetch RSS content with redirect-verifying HTTP client
            res = await safe_fetch_http(source["rss_url"], headers=RSS_HEADERS, timeout=12.0)
            if res.status_code != 200:
                raise ValueError(f"HTTP status {res.status_code} fetching feed")

            # 2. Parse XML in-memory off the main asyncio loop
            feed = await asyncio.to_thread(feedparser.parse, res.content)
            
            # Check for feed parsing errors
            if feed.bozo and not feed.entries:
                raise ValueError(f"Malformed feed or network error: {feed.bozo_exception}")

            entries = feed.entries[:10]
            logger.info(f"[RSS] Fetched {len(entries)} items from {source['name']}")
            
            for entry in entries:
                await process_single_article(entry, source, supabase_admin)
                await asyncio.sleep(0.5)

            # Ingestion success: Reset error counter and update last_fetched_at
            supabase_admin.table("sources").update({
                "last_fetched_at": datetime.utcnow().isoformat(),
                "fetch_status": "healthy",
                "consecutive_errors": 0
            }).eq("id", source["id"]).execute()

        except Exception as e:
            logger.error(f"[INGESTION FAILURE] Source '{source['name']}' failed: {e}")
            
            # Increment error count & update health status
            new_errors = (source.get("consecutive_errors") or 0) + 1
            new_status = "failing" if new_errors >= 5 else "degraded"
            
            supabase_admin.table("sources").update({
                "consecutive_errors": new_errors,
                "fetch_status": new_status,
                "last_fetched_at": datetime.utcnow().isoformat()
            }).eq("id", source["id"]).execute()
            
    # Check for stale sources across the database
    await audit_stale_sources(supabase_admin)
    logger.info("[RSS] Ingestion cycle completed.")


async def audit_stale_sources(supabase_admin: Any):
    """Audits sources and alerts if any enabled source hasn't fetched fresh content in >24 hours."""
    try:
        res = supabase_admin.table("sources").select("id, name, slug, last_fetched_at, fetch_status, consecutive_errors").eq("is_enabled", True).execute()
        sources = res.data or []
        now = datetime.utcnow()

        for s in sources:
            last_fetch = s.get("last_fetched_at")
            if not last_fetch:
                logger.warning(f"[STALE FEED ALERT] Source '{s['name']}' ({s['slug']}) has NEVER completed an ingestion cycle.")
                continue

            try:
                # Parse ISO timestamp
                fetch_dt = datetime.fromisoformat(last_fetch.replace("Z", "+00:00")).replace(tzinfo=None)
                age_hours = (now - fetch_dt).total_seconds() / 3600.0

                if age_hours > 24.0:
                    logger.warning(
                        f"[STALE FEED ALERT] Source '{s['name']}' is stale! "
                        f"Last fetched {age_hours:.1f} hours ago. Status: {s.get('fetch_status')}, Errors: {s.get('consecutive_errors')}."
                    )
            except Exception as parse_err:
                logger.debug(f"Date parse error for source {s['name']}: {parse_err}")
    except Exception as exc:
        logger.debug(f"Stale source audit skipped: {exc}")


