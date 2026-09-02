import pytest
from unittest.mock import MagicMock
from app.db import supabase_client

class MockQueryResult:
    def __init__(self, data=None):
        self.data = data or []

class MockQueryBuilder:
    def __init__(self, table_name=""):
        self.table_name = table_name
        self._data = []
        if table_name == "states":
            self._data = [
                {"id": "00000000-0000-0000-0000-000000000001", "code": "AB", "name": "Abia", "geopolitical_zone": "South East"},
                {"id": "00000000-0000-0000-0000-000000000002", "code": "LA", "name": "Lagos", "geopolitical_zone": "South West"},
            ]
        elif table_name == "official_profiles":
            self._data = [
                {
                    "id": "00000000-0000-0000-0000-000000000001",
                    "name": "Bola Ahmed Tinubu",
                    "office_title": "President of the Federal Republic of Nigeria",
                    "role": "president",
                    "party": "APC",
                    "term_period": "May 2023 - Present",
                    "initials": "BAT",
                    "state_id": None,
                    "bio": "President",
                    "photo_url": "https://example.com/president.jpg",
                    "photo_attribution": "Official Public Domain",
                    "states": None
                }
            ]
        elif table_name == "official_rating_summary":
            self._data = [{"official_id": "00000000-0000-0000-0000-000000000001", "avg_rating_pct": 65, "rating_count": 120}]
        elif table_name == "tracked_promises":
            self._data = []
        elif table_name == "articles":
            self._data = [{"id": "00000000-0000-0000-0000-000000000001", "title": "Test Wire", "url": "https://example.com/test", "sources": {"name": "Test Source"}}]
        elif table_name == "article_summaries":
            self._data = []
        elif table_name == "sources":
            self._data = [{"id": "00000000-0000-0000-0000-000000000001", "name": "Test Source", "slug": "test", "is_enabled": True, "rss_url": "https://example.com/rss"}]
        elif table_name == "admin_audit_logs":
            self._data = []
        elif table_name == "takedown_requests":
            self._data = []

    def select(self, *args, **kwargs):
        return self

    def insert(self, *args, **kwargs):
        return self

    def update(self, *args, **kwargs):
        return self

    def delete(self, *args, **kwargs):
        return self

    def eq(self, *args, **kwargs):
        return self

    def in_(self, *args, **kwargs):
        return self

    def order(self, *args, **kwargs):
        return self

    def limit(self, *args, **kwargs):
        return self

    def range(self, *args, **kwargs):
        return self

    def ilike(self, *args, **kwargs):
        return self

    def execute(self):
        return MockQueryResult(self._data)


class MockSupabaseClient:
    def table(self, name):
        return MockQueryBuilder(name)

    def rpc(self, name, params=None):
        return MockQueryBuilder(name)


@pytest.fixture(autouse=True)
def mock_supabase_for_tests(monkeypatch):
    mock_client = MockSupabaseClient()
    monkeypatch.setattr(supabase_client, "get_supabase", lambda: mock_client)
    monkeypatch.setattr(supabase_client, "get_supabase_admin", lambda: mock_client)
