import os
import json
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

# Create a session with retry adapter
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(max_retries=5)
session.mount('https://', adapter)

print("=== RAW UNEDITED QUERIES AGAINST SUPABASE ===")

# 1. Query public.promises
url_promises = f"{supabase_url}/rest/v1/promises?select=*"
for attempt in range(3):
    try:
        resp = session.get(url_promises, headers=headers, timeout=10)
        print(f"\n1. GET {url_promises}")
        print(f"HTTP Status: {resp.status_code}")
        print(f"Content-Range: {resp.headers.get('content-range')}")
        print(f"Body: {resp.text}")
        break
    except Exception as e:
        print(f"Attempt {attempt+1} failed: {e}")
        time.sleep(2)

# 2. Query the 5 tables from Migration 007
tables = ['official_profiles', 'tracked_promises', 'promise_sources', 'promise_status_history', 'citizen_ratings']
for t in tables:
    url_t = f"{supabase_url}/rest/v1/{t}?select=*&limit=1"
    for attempt in range(3):
        try:
            resp = session.get(url_t, headers=headers, timeout=10)
            print(f"\nGET {url_t}")
            print(f"HTTP Status: {resp.status_code}")
            print(f"Content-Range: {resp.headers.get('content-range')}")
            print(f"Body: {resp.text}")
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {t}: {e}")
            time.sleep(2)
