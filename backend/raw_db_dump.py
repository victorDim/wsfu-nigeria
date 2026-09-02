import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}",
    "Content-Type": "application/json",
    "Prefer": "count=exact"
}

with httpx.Client(timeout=10.0) as client:
    # 1. Query public.promises
    r_promises = client.get(f"{supabase_url}/rest/v1/promises?select=*", headers=headers)
    print("--- RAW QUERY: public.promises ---")
    print(f"Status Code: {r_promises.status_code}")
    print(f"Content-Range Header: {r_promises.headers.get('content-range')}")
    print(f"Response JSON:\n{json.dumps(r_promises.json(), indent=2)}\n")

    # 2. Query each of the 5 tables from Migration 007
    tables = ['official_profiles', 'tracked_promises', 'promise_sources', 'promise_status_history', 'citizen_ratings']
    print("--- RAW QUERY: Migration 007 Tables ---")
    for t in tables:
        r_tab = client.get(f"{supabase_url}/rest/v1/{t}?select=*&limit=1", headers=headers)
        print(f"Table '{t}': HTTP {r_tab.status_code} | Content-Range: {r_tab.headers.get('content-range')} | Body: {r_tab.text}")
