#!/usr/bin/env python3
"""
WSFU (Who Swear For Us) - RSS Ingestion & AI Summarizer CLI Tool
Supports dry-run testing, single-source extraction, and full ingestion pipeline execution.
"""

import sys
import os
import argparse
import asyncio
import logging
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import feedparser

from app.core.config import settings
from app.core.security import is_safe_url, safe_fetch_http
from app.services.extractor import extract_article_content
from app.services.summarizer import generate_summary
from app.services.rss_engine import extract_feed_image, compute_hash, run_ingestion_cycle
from app.db.supabase_client import get_supabase_admin

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("wsfu.cli_pipeline")

SAMPLE_FEEDS = [
    {"name": "Punch Newspapers", "url": "https://punchng.com/feed", "category": "National"},
    {"name": "Premium Times", "url": "https://www.premiumtimesng.com/feed", "category": "Investigative"},
    {"name": "The Cable", "url": "https://www.thecable.ng/feed", "category": "Politics"},
    {"name": "Daily Trust", "url": "https://dailytrust.com/feed", "category": "Northern News"},
    {"name": "BusinessDay", "url": "https://businessday.ng/feed", "category": "Economy"}
]


async def test_single_feed(feed_url: str, source_name: str, limit: int = 3, dry_run: bool = True):
    """Fetches, extracts, and summarizes articles from a single RSS feed."""
    print("=" * 80)
    print(f"🛰️  TESTING FEED: {source_name} ({feed_url})")
    print(f"⚙️  Mode: {'DRY RUN (No DB Writes)' if dry_run else 'LIVE INGESTION'}")
    print("=" * 80)

    # 1. SSRF Check
    is_safe, reason = is_safe_url(feed_url)
    if not is_safe:
        print(f"❌ [BLOCKED SSRF] URL {feed_url} failed security check: {reason}")
        return

    # 2. Fetch Feed
    try:
        print(f"📡 Fetching RSS XML with Safe HTTP Client...")
        res = await safe_fetch_http(feed_url, headers={"User-Agent": "WSFUBot/1.0"}, timeout=15.0)
        if res.status_code != 200:
            print(f"❌ HTTP Error {res.status_code} fetching feed.")
            return

        feed = feedparser.parse(res.content)
        print(f"✅ Feed parsed successfully: {len(feed.entries)} total entries available.")
    except Exception as e:
        print(f"❌ Error parsing feed: {e}")
        return

    entries = feed.entries[:limit]
    for idx, entry in enumerate(entries, 1):
        title = entry.get("title", "Untitled").strip()
        link = entry.get("link", "").strip()
        print(f"\n[{idx}/{len(entries)}] 📰 {title}")
        print(f"    🔗 Link: {link}")

        # Extract Image
        img = extract_feed_image(entry)
        if img:
            print(f"    🖼️  Image: {img}")

        # Extract Article Content
        print(f"    ⏳ Extracting full article body...")
        extracted = await extract_article_content(link)
        if extracted and extracted.get("text"):
            body = extracted["text"]
            print(f"    📄 Extracted {len(body)} characters. Author: {extracted.get('author') or 'Unknown'}")
        else:
            body = entry.get("summary", title)
            print(f"    ⚠️  Fallback to RSS summary snippet ({len(body)} characters).")

        # Generate AI Summary
        print(f"    🤖 Generating Civic AI Summary (Gemini 2.0 Flash)...")
        summary = await generate_summary(title=title, body=body, source_name=source_name)

        if summary:
            print(f"\n    ✨ [AI TLDR 3-BULLETS]:")
            for b in summary.get("tldr_bullets", []):
                print(f"       • {b}")
            print(f"    🌍 [CIVIC IMPACT]: {summary.get('civic_impact')}")
            print(f"    🏛️  [ENTITIES]: {', '.join(summary.get('actors_entities', []))}")
            print(f"    💰 [FIGURES]: {summary.get('figures_mentioned', [])}")
            print(f"    🎯 [CONFIDENCE]: {summary.get('confidence_score')}")
            print(f"    📂 [CATEGORY]: {summary.get('category', 'National')}")
            if summary.get("embedding"):
                print(f"    📐 [EMBEDDING]: 768-dim vector generated")
        else:
            print(f"    ⚠️  Could not generate summary.")

        print("-" * 80)


def main():
    parser = argparse.ArgumentParser(description="WSFU RSS Ingestion & AI Summarizer CLI")
    parser.add_argument("--test-feed", type=str, help="Direct RSS Feed URL to test")
    parser.add_argument("--source-name", type=str, default="Test Media", help="Source display name")
    parser.add_argument("--limit", type=int, default=2, help="Number of articles to process")
    parser.add_argument("--live", action="store_true", help="Run full live ingestion cycle against database")
    parser.add_argument("--test-all-samples", action="store_true", help="Test extraction across all 5 sample Nigerian feeds")

    args = parser.parse_args()

    if args.live:
        print("🚀 Launching Full Live Ingestion Pipeline Cycle...")
        asyncio.run(run_ingestion_cycle())
    elif args.test_all_samples:
        for feed in SAMPLE_FEEDS:
            asyncio.run(test_single_feed(feed["url"], feed["name"], limit=1, dry_run=True))
    elif args.test_feed:
        asyncio.run(test_single_feed(args.test_feed, args.source_name, limit=args.limit, dry_run=True))
    else:
        # Default: test first sample feed
        feed = SAMPLE_FEEDS[0]
        asyncio.run(test_single_feed(feed["url"], feed["name"], limit=args.limit, dry_run=True))


if __name__ == "__main__":
    main()
