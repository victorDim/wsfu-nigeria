import os
import sys
from dotenv import load_dotenv
from supabase import create_client

# Ensure UTF-8 output on Windows console
sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

print(f"Connecting to live Supabase project: {supabase_url}")
client = create_client(supabase_url, service_key)

tables_to_check = [
    "states",
    "lgas",
    "sources",
    "articles",
    "article_summaries",
    "faac_allocations",
    "foi_requests",
    "admin_audit_logs",
    "takedown_requests",
    "promises",
    "official_profiles",
    "tracked_promises",
    "promise_sources",
    "promise_status_history",
    "citizen_ratings"
]

print("\n=== LIVE TABLE STATUS & ROW COUNTS ===")
for t in tables_to_check:
    try:
        res = client.table(t).select("*", count="exact").limit(1).execute()
        count = res.count if hasattr(res, 'count') and res.count is not None else len(res.data)
        print(f"[EXISTS] Table '{t}': {count} total rows")
    except Exception as e:
        err_msg = str(e)
        if "Could not find the table" in err_msg or "PGRST204" in err_msg:
            print(f"[MISSING] Table '{t}': Not in schema cache (Migration not applied yet)")
        else:
            print(f"[ERROR] Table '{t}': {err_msg}")
