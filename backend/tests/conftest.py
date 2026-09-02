import pytest
from unittest.mock import MagicMock
from app.db import supabase_client

class MockQueryResult:
    def __init__(self, data=None):
        self.data = data if data is not None else []

class MockQueryBuilder:
    def __init__(self, table_name=""):
        self.table_name = table_name
        self._filters = {}
        self._initial_data = []

        if table_name == "states":
            self._initial_data = [
                {"id": "00000000-0000-0000-0000-000000000001", "code": "AB", "name": "Abia", "geopolitical_zone": "South East"},
                {"id": "00000000-0000-0000-0000-000000000002", "code": "LA", "name": "Lagos", "geopolitical_zone": "South West"},
            ]
        elif table_name == "official_profiles":
            self._initial_data = [
                {
                    "id": "11111111-1111-1111-1111-111111111111",
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
            self._initial_data = [{"official_id": "11111111-1111-1111-1111-111111111111", "avg_rating_pct": 65, "rating_count": 120}]
        elif table_name == "tracked_promises":
            self._initial_data = []
        elif table_name == "articles":
            self._initial_data = [{"id": "00000000-0000-0000-0000-000000000001", "title": "Test Wire", "url": "https://example.com/test", "sources": {"name": "Test Source"}}]
        elif table_name == "article_summaries":
            self._initial_data = []
        elif table_name == "sources":
            self._initial_data = [{"id": "00000000-0000-0000-0000-000000000001", "name": "Test Source", "slug": "test", "is_enabled": True, "rss_url": "https://example.com/rss"}]
        elif table_name == "admin_audit_logs":
            self._initial_data = []
        elif table_name == "takedown_requests":
            self._initial_data = []

    def select(self, *args, **kwargs):
        return self

    def insert(self, *args, **kwargs):
        return self

    def update(self, *args, **kwargs):
        return self

    def delete(self, *args, **kwargs):
        return self

    def eq(self, column, value):
        self._filters[column] = value
        return self

    def in_(self, column, values):
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
        filtered = list(self._initial_data)
        for col, val in self._filters.items():
            filtered = [row for row in filtered if str(row.get(col, "")) == str(val)]
        return MockQueryResult(filtered)


class MockSupabaseClient:
    def table(self, name):
        return MockQueryBuilder(name)

    def rpc(self, name, params=None):
        return MockQueryBuilder(name)


@pytest.fixture(autouse=True)
def mock_supabase_for_tests(monkeypatch):
    mock_client = MockSupabaseClient()
    monkeypatch.setattr(supabase_client, "_client", mock_client)
    monkeypatch.setattr(supabase_client, "_admin_client", mock_client)
    monkeypatch.setattr(supabase_client, "get_supabase", lambda: mock_client)
    monkeypatch.setattr(supabase_client, "get_supabase_admin", lambda: mock_client)

    try:
        from app.api.v1.endpoints import officials, admin, feed, faac, accountability
        monkeypatch.setattr(officials, "get_supabase", lambda: mock_client)
        monkeypatch.setattr(officials, "get_supabase_admin", lambda: mock_client)
        monkeypatch.setattr(admin, "get_supabase", lambda: mock_client)
        monkeypatch.setattr(admin, "get_supabase_admin", lambda: mock_client)
    except Exception:
        pass
