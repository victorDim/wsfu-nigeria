"""
Unit & Integration Tests for Admin Moderation, Takedown Resolution, and SSRF Redirect Safety.
"""

import pytest
from fastapi.testclient import TestClient
from main import app
from app.core.security import is_safe_url, safe_fetch_http, SSRFException

client = TestClient(app)


def test_admin_endpoints_require_auth():
    """Verify that all new admin moderation endpoints strictly require authorization."""
    unauth_endpoints = [
        ("GET", "/api/v1/admin/pending-summaries"),
        ("POST", "/api/v1/admin/summaries/00000000-0000-0000-0000-000000000001/publish"),
        ("POST", "/api/v1/admin/summaries/00000000-0000-0000-0000-000000000001/reject"),
        ("GET", "/api/v1/admin/sources"),
        ("POST", "/api/v1/admin/sources/00000000-0000-0000-0000-000000000001/toggle"),
        ("GET", "/api/v1/admin/takedowns"),
        ("POST", "/api/v1/admin/takedowns/00000000-0000-0000-0000-000000000001/resolve"),
        ("POST", "/api/v1/admin/articles/00000000-0000-0000-0000-000000000001/correction"),
        ("GET", "/api/v1/admin/audit-logs"),
    ]


    for method, path in unauth_endpoints:
        if method == "GET":
            res = client.get(path)
        else:
            res = client.post(path, json={"action": "rejected", "notes": "test"})
        assert res.status_code in (401, 403), f"Expected 401/403 for {method} {path}, got {res.status_code}"


def test_foi_request_generation_and_validation():
    """Verify FOI statutory request generation and field validation."""
    # Test valid submission
    payload = {
        "mda_name": "Federal Ministry of Works",
        "subject": "Lagos-Ibadan Expressway Expansion Contract Records",
        "details": "Requesting certified true copies of contractor mobilization payments and completion milestones."
    }
    res = client.post("/api/v1/accountability/foi", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "tracking_code" in data
    assert data["tracking_code"].startswith("FOI-")
    assert data["status"] == "submitted"
    assert "due_date" in data
    assert "legal_notice" in data


def test_ssrf_safe_fetch_blocks_metadata():
    """Verify safe_fetch_http blocks metadata and private addresses."""
    import asyncio

    with pytest.raises(SSRFException):
        asyncio.run(safe_fetch_http("http://169.254.169.254/latest/meta-data/"))

    with pytest.raises(SSRFException):
        asyncio.run(safe_fetch_http("http://127.0.0.1:8000/"))

    with pytest.raises(SSRFException):
        asyncio.run(safe_fetch_http("http://10.0.0.1/admin"))
