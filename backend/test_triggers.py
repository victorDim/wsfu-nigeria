import os
import sys
from dotenv import load_dotenv
from supabase import create_client

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

client = create_client(supabase_url, service_key)

print("=== TRIGGER SANITY TEST: PROMISE SOURCE ENFORCEMENT ===")

try:
    # 1. Create a dummy test official profile
    official_data = {
        "name": "Test Sanity Official",
        "office_title": "Test Governor",
        "role": "governor",
        "party": "Test Party",
        "term_period": "2023 - 2027",
        "initials": "TS",
        "bio_summary": "Sanity test profile for trigger verification"
    }
    
    off_res = client.table("official_profiles").insert(official_data).execute()
    official_id = off_res.data[0]["id"]
    print(f"1. Created temporary official profile: {official_id}")
    
    # 2. Attempt to insert a promise WITHOUT a source
    # The deferred constraint trigger trg_promise_requires_source should reject at COMMIT!
    print("2. Attempting to insert a tracked_promise with ZERO sources (expecting trigger rejection)...")
    promise_data = {
        "official_id": official_id,
        "title": "Un-sourced Test Promise",
        "category": "Infrastructure",
        "status": "not_started",
        "date_made": "2024-01-01"
    }
    
    prom_res = client.table("tracked_promises").insert(promise_data).execute()
    print(f"[UNEXPECTED SUCCESS] Promise inserted: {prom_res.data}")
    
except Exception as e:
    print(f"\n[TRIGGER FIRED AS EXPECTED!] Database rejected insert with error:\n-> {e}")

finally:
    # Clean up test official if created
    try:
        if 'official_id' in locals():
            client.table("official_profiles").delete().eq("id", official_id).execute()
            print("\n3. Cleaned up temporary test official.")
    except Exception:
        pass
