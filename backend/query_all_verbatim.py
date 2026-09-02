import os
import time
import requests
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

tables = [
    'promises',
    'official_profiles',
    'tracked_promises',
    'promise_sources',
    'promise_status_history',
    'citizen_ratings'
]

print("=== VERBATIM RAW POSTGREST OUTPUT ===")
for t in tables:
    url = f"{supabase_url}/rest/v1/{t}?select=*"
    success = False
    for attempt in range(5):
        try:
            resp = requests.get(url, headers=headers, timeout=12)
            print(f"\n[QUERY] GET {url}")
            print(f"HTTP Status: {resp.status_code}")
            print(f"Content-Range Header: {resp.headers.get('content-range')}")
            print(f"Body: {resp.text}")
            success = True
            break
        except Exception as e:
            time.sleep(1.5)
    if not success:
        print(f"\n[FAILED] {url}")
