"""
Tests for the public read endpoints in app.api.v1.endpoints.officials.

These tests use FastAPI's TestClient against the real app instance, hitting
the live Supabase database. They verify:
  1. Response shapes and status codes for all 4 read routes.
  2. Input validation (bad role, bad status, bad UUID, nonexistent state code).
  3. Pagination parameters are respected.
  4. Graceful degradation when tables are empty (no 500s).

NOTE: These are integration tests against a live (but empty) database.
They do NOT insert test fixtures -- that's the admin write endpoint's job,
tested separately. The current database has 0 rows in official_profiles /
tracked_promises, so "success" here means correct empty-set responses,
not populated data.
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

API = "/api/v1/officials"


# ---------------------------------------------------------------------------
# GET /api/v1/officials/states
# ---------------------------------------------------------------------------
class TestListStates:
    def test_returns_200_with_items_key(self):
        r = client.get(f"{API}/states")
        assert r.status_code == 200
        body = r.json()
        assert "items" in body
        assert isinstance(body["items"], list)

    def test_states_have_expected_fields(self):
        r = client.get(f"{API}/states")
        body = r.json()
        # The states table was seeded by migration 004 -- should have 37 rows
        # (36 states + FCT).
        if body["items"]:
            state = body["items"][0]
            assert "id" in state
            assert "code" in state
            assert "name" in state
            assert "geopolitical_zone" in state

    def test_states_are_ordered_by_name(self):
        r = client.get(f"{API}/states")
        items = r.json()["items"]
        if len(items) >= 2:
            names = [s["name"] for s in items]
            assert names == sorted(names), "States should be alphabetically ordered"


# ---------------------------------------------------------------------------
# GET /api/v1/officials/
# ---------------------------------------------------------------------------
class TestListOfficials:
    def test_returns_200_with_pagination_envelope(self):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        body = r.json()
        assert "items" in body
        assert "count" in body
        assert "offset" in body
        assert "limit" in body

    def test_default_pagination_values(self):
        r = client.get(f"{API}/")
        body = r.json()
        assert body["offset"] == 0
        assert body["limit"] == 20

    def test_custom_pagination(self):
        r = client.get(f"{API}/", params={"limit": 5, "offset": 10})
        assert r.status_code == 200
        body = r.json()
        assert body["limit"] == 5
        assert body["offset"] == 10

    def test_limit_bounds_enforced(self):
        # limit < 1
        r = client.get(f"{API}/", params={"limit": 0})
        assert r.status_code == 422

        # limit > 100
        r = client.get(f"{API}/", params={"limit": 200})
        assert r.status_code == 422

    def test_invalid_role_returns_422(self):
        r = client.get(f"{API}/", params={"role": "king"})
        assert r.status_code == 422
        assert "role must be one of" in r.json()["detail"]

    def test_valid_roles_accepted(self):
        for role in ["president", "governor", "fct_minister", "senator", "house_of_rep"]:
            r = client.get(f"{API}/", params={"role": role})
            assert r.status_code == 200, f"role={role} should be accepted"

    def test_nonexistent_state_code_returns_404(self):
        r = client.get(f"{API}/", params={"state_code": "ZZ"})
        assert r.status_code == 404
        assert "No state with code" in r.json()["detail"]

    def test_valid_state_code_accepted(self):
        # Lagos should exist from seed migration 004
        r = client.get(f"{API}/", params={"state_code": "LA"})
        assert r.status_code == 200

    def test_officials_have_rating_fields(self):
        """Even with 0 officials, the shape contract should hold when data exists."""
        r = client.get(f"{API}/")
        body = r.json()
        for official in body["items"]:
            assert "avg_rating_pct" in official
            assert "rating_count" in official


# ---------------------------------------------------------------------------
# GET /api/v1/officials/{official_id}
# ---------------------------------------------------------------------------
class TestGetOfficialDetail:
    def test_nonexistent_uuid_returns_404(self):
        fake_id = "00000000-0000-0000-0000-000000000000"
        r = client.get(f"{API}/{fake_id}")
        assert r.status_code == 404
        assert "No official found" in r.json()["detail"]

    def test_malformed_uuid_returns_422(self):
        r = client.get(f"{API}/not-a-uuid")
        assert r.status_code == 422


# ---------------------------------------------------------------------------
# GET /api/v1/officials/{official_id}/promises
# ---------------------------------------------------------------------------
class TestListOfficialPromises:
    FAKE_ID = "00000000-0000-0000-0000-000000000000"

    def test_nonexistent_official_returns_404(self):
        r = client.get(f"{API}/{self.FAKE_ID}/promises")
        assert r.status_code == 404

    def test_malformed_uuid_returns_422(self):
        r = client.get(f"{API}/not-a-uuid/promises")
        assert r.status_code == 422

    def test_invalid_status_filter_returns_422(self):
        r = client.get(f"{API}/{self.FAKE_ID}/promises", params={"status": "magic"})
        assert r.status_code == 422
        assert "status must be one of" in r.json()["detail"]

    def test_valid_status_filters_accepted_shape(self):
        """Even though the official doesn't exist (404), the status validation
        runs first, so valid statuses should NOT produce a 422."""
        for s in ["not_started", "in_progress", "fulfilled", "broken"]:
            r = client.get(f"{API}/{self.FAKE_ID}/promises", params={"status": s})
            # 404 because the official doesn't exist, but NOT 422
            assert r.status_code == 404, f"status={s} should pass validation"

    def test_pagination_params_on_promises(self):
        # Limit out of bounds
        r = client.get(f"{API}/{self.FAKE_ID}/promises", params={"limit": 0})
        assert r.status_code == 422

        r = client.get(f"{API}/{self.FAKE_ID}/promises", params={"limit": 200})
        assert r.status_code == 422
