"""
Tests for the write endpoints: admin promise management and citizen ratings.

These test:
  1. Auth gating: all write endpoints reject unauthenticated requests (no token → 403).
  2. Auth gating: all write endpoints reject invalid tokens (fake token → 401).
  3. Input validation via Pydantic schema unit tests (bypassing FastAPI's
     dependency injection, since auth runs before body parsing in FastAPI).

NOTE on test design:
  FastAPI evaluates Depends() (auth) BEFORE parsing the request body.
  This means sending a fake token + invalid body produces 401, not 422.
  To test Pydantic validation independently, we test the schemas directly
  as unit tests rather than through the HTTP layer.
"""

import pytest
from pydantic import ValidationError
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

API = "/api/v1"
FAKE_UUID = "00000000-0000-0000-0000-000000000000"


# ---------------------------------------------------------------------------
# Auth gating: no token → 403 (HTTPBearer auto_error)
# ---------------------------------------------------------------------------
class TestAuthGatingNoToken:
    """Endpoints with no Authorization header should return 401."""

    def test_create_official_no_token(self):
        r = client.post(f"{API}/admin/officials", json={"name": "Test"})
        assert r.status_code in (401, 403)

    def test_create_promise_no_token(self):
        r = client.post(f"{API}/admin/promises", json={"title": "Test"})
        assert r.status_code in (401, 403)

    def test_update_status_no_token(self):
        r = client.post(
            f"{API}/admin/promises/{FAKE_UUID}/status",
            json={"new_status": "fulfilled", "reason": "Done"},
        )
        assert r.status_code in (401, 403)

    def test_rate_official_no_token(self):
        r = client.post(
            f"{API}/officials/{FAKE_UUID}/rate",
            json={"rating_pct": 75},
        )
        assert r.status_code in (401, 403)



# ---------------------------------------------------------------------------
# Auth gating: fake token → 401 (Supabase rejects it)
# ---------------------------------------------------------------------------
class TestAuthGatingFakeToken:
    """Endpoints with an invalid Bearer token should return 401."""

    HEADERS = {"Authorization": "Bearer fake-invalid-jwt-token"}

    def test_create_official_fake_token(self):
        r = client.post(
            f"{API}/admin/officials",
            json={
                "name": "Test", "office_title": "Gov", "role": "governor",
                "party": "APC", "term_period": "2023-2027", "initials": "TP",
            },
            headers=self.HEADERS,
        )
        assert r.status_code == 401

    def test_create_promise_fake_token(self):
        r = client.post(
            f"{API}/admin/promises",
            json={
                "official_id": FAKE_UUID, "title": "Build", "category": "Economy",
                "date_made": "2024-01-01",
                "sources": [{"title": "S", "url": "https://example.com/x"}],
            },
            headers=self.HEADERS,
        )
        assert r.status_code == 401

    def test_update_status_fake_token(self):
        r = client.post(
            f"{API}/admin/promises/{FAKE_UUID}/status",
            json={"new_status": "fulfilled", "reason": "Completed the project"},
            headers=self.HEADERS,
        )
        assert r.status_code == 401

    def test_rate_official_fake_token(self):
        r = client.post(
            f"{API}/officials/{FAKE_UUID}/rate",
            json={"rating_pct": 75},
            headers=self.HEADERS,
        )
        assert r.status_code == 401


# ---------------------------------------------------------------------------
# Pydantic schema unit tests: CreateOfficialIn
# ---------------------------------------------------------------------------
class TestCreateOfficialSchema:
    """Direct Pydantic validation, independent of HTTP/auth layer."""

    def test_valid_official_accepted(self):
        from app.api.v1.endpoints.admin_promises import CreateOfficialIn
        obj = CreateOfficialIn(
            name="Babajide Sanwo-Olu",
            office_title="Governor of Lagos State",
            role="governor",
            party="APC",
            term_period="May 2023 - Present",
            initials="BSO",
        )
        assert obj.name == "Babajide Sanwo-Olu"
        assert obj.role == "governor"

    def test_invalid_role_rejected(self):
        from app.api.v1.endpoints.admin_promises import CreateOfficialIn
        with pytest.raises(ValidationError, match="role must be one of"):
            CreateOfficialIn(
                name="Test", office_title="King", role="king",
                party="APC", term_period="2023", initials="T",
            )

    def test_photo_without_attribution_rejected(self):
        from app.api.v1.endpoints.admin_promises import CreateOfficialIn
        with pytest.raises(ValidationError, match="photo_attribution is required"):
            CreateOfficialIn(
                name="Test", office_title="Gov", role="governor",
                party="APC", term_period="2023", initials="T",
                photo_url="https://example.com/photo.jpg",
                # photo_attribution deliberately omitted
            )

    def test_photo_with_attribution_accepted(self):
        from app.api.v1.endpoints.admin_promises import CreateOfficialIn
        obj = CreateOfficialIn(
            name="Test", office_title="Gov", role="governor",
            party="APC", term_period="2023", initials="T",
            photo_url="https://example.com/photo.jpg",
            photo_attribution="CC BY-SA 4.0, Wikimedia Commons",
        )
        assert obj.photo_attribution == "CC BY-SA 4.0, Wikimedia Commons"


# ---------------------------------------------------------------------------
# Pydantic schema unit tests: CreatePromiseIn
# ---------------------------------------------------------------------------
class TestCreatePromiseSchema:
    def test_valid_promise_accepted(self):
        from app.api.v1.endpoints.admin_promises import CreatePromiseIn
        obj = CreatePromiseIn(
            official_id=FAKE_UUID,
            title="Build Lagos-Calabar Coastal Highway",
            category="Infrastructure",
            date_made="2024-05-29",
            sources=[{"title": "Punch report", "url": "https://punchng.com/article"}],
        )
        assert obj.category == "Infrastructure"
        assert len(obj.sources) == 1

    def test_invalid_category_rejected(self):
        from app.api.v1.endpoints.admin_promises import CreatePromiseIn
        with pytest.raises(ValidationError, match="category must be one of"):
            CreatePromiseIn(
                official_id=FAKE_UUID, title="Test", category="Magic",
                date_made="2024-01-01",
                sources=[{"title": "S", "url": "https://example.com/x"}],
            )

    def test_empty_sources_rejected(self):
        from app.api.v1.endpoints.admin_promises import CreatePromiseIn
        with pytest.raises(ValidationError):
            CreatePromiseIn(
                official_id=FAKE_UUID, title="Test", category="Economy",
                date_made="2024-01-01", sources=[],
            )

    def test_source_bad_url_rejected(self):
        from app.api.v1.endpoints.admin_promises import PromiseSourceIn
        with pytest.raises(ValidationError, match="http"):
            PromiseSourceIn(title="S", url="ftp://bad.com/x")

    def test_multiple_sources_accepted(self):
        from app.api.v1.endpoints.admin_promises import CreatePromiseIn
        obj = CreatePromiseIn(
            official_id=FAKE_UUID, title="Test", category="Economy",
            date_made="2024-01-01",
            sources=[
                {"title": "Source 1", "url": "https://example.com/a"},
                {"title": "Source 2", "url": "https://example.com/b", "published_date": "2024-06-01"},
            ],
        )
        assert len(obj.sources) == 2
        assert obj.sources[1].published_date == "2024-06-01"


# ---------------------------------------------------------------------------
# Pydantic schema unit tests: UpdatePromiseStatusIn
# ---------------------------------------------------------------------------
class TestUpdateStatusSchema:
    def test_valid_status_accepted(self):
        from app.api.v1.endpoints.admin_promises import UpdatePromiseStatusIn
        for s in ["not_started", "in_progress", "fulfilled", "broken"]:
            obj = UpdatePromiseStatusIn(new_status=s, reason="Testing")
            assert obj.new_status == s

    def test_invalid_status_rejected(self):
        from app.api.v1.endpoints.admin_promises import UpdatePromiseStatusIn
        with pytest.raises(ValidationError, match="new_status must be one of"):
            UpdatePromiseStatusIn(new_status="magic", reason="Because")

    def test_empty_reason_rejected(self):
        from app.api.v1.endpoints.admin_promises import UpdatePromiseStatusIn
        with pytest.raises(ValidationError):
            UpdatePromiseStatusIn(new_status="fulfilled", reason="")


# ---------------------------------------------------------------------------
# Pydantic schema unit tests: RateOfficialIn
# ---------------------------------------------------------------------------
class TestRateOfficialSchema:
    def test_valid_ratings_accepted(self):
        from app.api.v1.endpoints.officials import RateOfficialIn
        for pct in [0, 50, 100]:
            obj = RateOfficialIn(rating_pct=pct)
            assert obj.rating_pct == pct

    def test_below_zero_rejected(self):
        from app.api.v1.endpoints.officials import RateOfficialIn
        with pytest.raises(ValidationError):
            RateOfficialIn(rating_pct=-1)

    def test_above_100_rejected(self):
        from app.api.v1.endpoints.officials import RateOfficialIn
        with pytest.raises(ValidationError):
            RateOfficialIn(rating_pct=101)
