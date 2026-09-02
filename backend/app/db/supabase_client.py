from supabase import create_client, Client
from app.core.config import settings

_client: Client | None = None
_admin_client: Client | None = None


def get_supabase() -> Client:
    """Returns standard Supabase client (respects RLS)."""
    global _client
    if _client is None:
        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables.")
        _client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _client


def get_supabase_admin() -> Client:
    """Returns Admin Supabase client (service_role key, for background ingestion workers)."""
    global _admin_client
    if _admin_client is None:
        key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY
        if not settings.SUPABASE_URL or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.")
        _admin_client = create_client(settings.SUPABASE_URL, key)
    return _admin_client
