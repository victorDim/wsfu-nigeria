import os
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

url = f"{supabase_url}/rest/v1/promises?select=*"
for attempt in range(5):
    try:
        r = requests.get(url, headers=headers, timeout=10)
        print(f"QUERY: {url}")
        print(f"HTTP Status: {r.status_code}")
        print(f"Content-Range Header: {r.headers.get('content-range')}")
        print(f"Body: {r.text}")
        break
    except Exception as e:
        print(f"Attempt {attempt+1} error: {e}")
