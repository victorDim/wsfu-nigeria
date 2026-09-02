import os
import sys
import time
import httpx
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}",
    "Content-Type": "application/json"
}

tables_to_verify = [
    "official_profiles",
    "tracked_promises",
    "promise_sources",
    "promise_status_history",
    "citizen_ratings",
    "states",
    "lgas",
    "sources"
]

print(f"Connecting to: {supabase_url}/rest/v1/")

# Use httpx with retries for robust DNS on Windows
with httpx.Client(timeout=10.0, transport=httpx.HTTPTransport(retries=3)) as client:
    print("\n=== STEP 1 VERIFICATION: TABLE EXISTENCE CHECK ===")
    for table in tables_to_verify:
        url = f"{supabase_url}/rest/v1/{table}?select=*&limit=1"
        try:
            r = client.get(url, headers=headers)
            if r.status_code == 200:
                print(f"[SUCCESS] Table 'public.{table}' EXISTS in live schema. (HTTP 200 OK)")
            elif r.status_code == 404 or "PGRST204" in r.text or "PGRST200" in r.text or "not found" in r.text.lower():
                print(f"[PENDING] Table 'public.{table}' NOT FOUND. Migration 007 still pending run in SQL Editor.")
            else:
                print(f"[STATUS {r.status_code}] Table 'public.{table}': {r.text[:100]}")
        except Exception as e:
            print(f"[DNS/NET RETRY] Table '{table}': {e}")
            time.sleep(1)
