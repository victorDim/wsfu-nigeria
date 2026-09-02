"""
Unit Tests for Security, SSRF Guards, Deduplication, and Ingestion Validation
"""

import pytest
from app.core.security import is_safe_url
from app.services.rss_engine import compute_hash, extract_feed_image


def test_ssrf_blocks_private_and_loopback_ips():
    """Verify that private IPs, localhost, and cloud metadata are strictly blocked."""
    unsafe_urls = [
        "http://127.0.0.1:8000/feed",
        "http://localhost:5173",
        "http://169.254.169.254/latest/meta-data/",
        "http://10.0.0.1/admin",
        "http://192.168.1.1/router",
        "ftp://punchng.com/feed",
        "file:///etc/passwd",
        "javascript:alert(1)"
    ]
    for url in unsafe_urls:
        is_safe, reason = is_safe_url(url)
        assert not is_safe, f"Expected {url} to be blocked, but passed: {reason}"


def test_ssrf_allows_public_https_urls():
    """Verify that legitimate public news domains pass SSRF checks."""
    safe_urls = [
        "https://punchng.com/feed",
        "https://www.premiumtimesng.com/feed",
        "https://thecable.ng/feed",
        "https://dailytrust.com/feed"
    ]
    for url in safe_urls:
        is_safe, reason = is_safe_url(url)
        assert is_safe, f"Expected {url} to be allowed, but was blocked: {reason}"


def test_deduplication_hash_consistency():
    """Verify that identical article content generates deterministic SHA-256 hashes."""
    title = "FAAC Disburses ₦1.4 Trillion Revenue"
    text = "The Federation Account Allocation Committee disbursed funds."
    
    hash1 = compute_hash(f"{title}\n{text}")
    hash2 = compute_hash(f"{title}\n{text}")
    hash3 = compute_hash(f"{title}\nDifferent text")

    assert hash1 == hash2, "Identical content must produce identical hash"
    assert hash1 != hash3, "Different content must produce different hash"
    assert len(hash1) == 64, "SHA-256 hex string must be 64 chars"


def test_image_extraction_from_feed_entry():
    """Verify extraction of image URLs from feedparser media fields."""
    class DummyEntry:
        def __init__(self, media_content=None, media_thumbnail=None, enclosures=None):
            self.media_content = media_content
            self.media_thumbnail = media_thumbnail
            self.enclosures = enclosures

    # Test media_content extraction
    entry1 = DummyEntry(media_content=[{"url": "https://punchng.com/wp-content/uploads/image.jpg", "medium": "image"}])
    assert extract_feed_image(entry1) == "https://punchng.com/wp-content/uploads/image.jpg"

    # Test media_thumbnail extraction
    entry2 = DummyEntry(media_thumbnail=[{"url": "https://thecable.ng/thumb.jpg"}])
    assert extract_feed_image(entry2) == "https://thecable.ng/thumb.jpg"

    # Test SSRF block on malicious feed image
    entry3 = DummyEntry(media_content=[{"url": "http://169.254.169.254/secret.png", "medium": "image"}])
    assert extract_feed_image(entry3) is None, "Malicious internal image URL must be blocked by SSRF guard"


def test_admin_trigger_ingestion_requires_auth():
    """Verify that the manual ingestion endpoint strictly requires admin authorization."""
    from fastapi.testclient import TestClient
    from main import app

    test_client = TestClient(app)
    # No auth header -> 401 or 403
    res = test_client.post("/api/v1/admin/trigger-ingestion")
    assert res.status_code in (401, 403), f"Expected 401/403 Unauthorized without credentials, got {res.status_code}"



def test_extractor_ssrf_blocks_private_url():
    """Verify that extract_article_content rejects SSRF attempts directly."""
    import asyncio
    from app.services.extractor import extract_article_content

    result = asyncio.run(extract_article_content("http://169.254.169.254/latest/meta-data/"))
    assert result is None, "Extractor should block private / metadata URLs"

