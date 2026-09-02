import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

print(f"Connecting to: {supabase_url}")
client = create_client(supabase_url, service_key)

try:
    res = client.table("promises").select("*").execute()
    print(f"Total rows in public.promises: {len(res.data)}")
    
    # Status breakdown
    status_counts = {}
    category_counts = {}
    officials = set()
    for row in res.data:
        st = row.get("status")
        cat = row.get("category")
        off_name = row.get("official_name")
        off_title = row.get("office_title")
        
        status_counts[st] = status_counts.get(st, 0) + 1
        category_counts[cat] = category_counts.get(cat, 0) + 1
        officials.add((off_name, off_title))
        
    print("\n--- Status Counts ---")
    for k, v in status_counts.items():
        print(f"{k}: {v}")
        
    print("\n--- Category Counts ---")
    for k, v in category_counts.items():
        print(f"{k}: {v}")
        
    print("\n--- Distinct Officials ---")
    for off_name, off_title in sorted(officials):
        print(f"Official: {off_name} | Title: {off_title}")

except Exception as e:
    print(f"Error querying promises table: {e}")
