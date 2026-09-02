import os
import urllib.request
import urllib.error
import ssl
from dotenv import load_dotenv

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

tables = ['promises', 'official_profiles', 'tracked_promises', 'promise_sources', 'promise_status_history', 'citizen_ratings']

for t in tables:
    url = f"{supabase_url}/rest/v1/{t}?select=*&limit=1"
    req = urllib.request.Request(url, headers={
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Prefer": "count=exact"
    })
    
    print(f"==================================================")
    print(f"QUERY: {url}")
    print(f"==================================================")
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            print(f"HTTP Status: {response.status} {response.reason}")
            print(f"Content-Range: {response.getheader('Content-Range')}")
            body = response.read().decode('utf-8')
            print(f"Body: {body}\n")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} {e.reason}")
        print(f"Body: {e.read().decode('utf-8')}\n")
    except Exception as e:
        print(f"Network Error: {e}\n")
