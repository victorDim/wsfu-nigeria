"""
WSFU Connection & Verification Script
Checks Supabase Database tables and Google Gemini AI connectivity.
"""

import os
from dotenv import load_dotenv

# Load environment
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"), override=True)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
gemini_key = os.getenv("GEMINI_API_KEY")

print(f"DEBUG: Loaded Supabase URL = '{supabase_url}'")

print("=" * 60)
print("WSFU ENVIRONMENT & CONNECTION TEST")
print("=" * 60)

# 1. Test Gemini API
print("\n[1/2] Testing Google Gemini API Connection...")
if gemini_key:
    try:
        from google import genai
        client = genai.Client(api_key=gemini_key)
        print("Listing available models...")
        for m in client.models.list():
            if "flash" in m.name:
                print(f" - Available: {m.name}")
        
        # Test generation with gemini-2.0-flash or fallback
        res = client.models.generate_content(
            model="gemini-2.0-flash",
            contents="Say 'Gemini Connected for WSFU!' in 5 words."
        )
        print(f"[SUCCESS] Gemini Response: {res.text.strip()}")
    except Exception as e:
        print(f"[ERROR] Gemini API Error: {e}")
else:
    print("[WARNING] GEMINI_API_KEY is not set.")

# 2. Test Supabase
print("\n[2/2] Testing Supabase Connection...")
if supabase_url and supabase_key:
    try:
        from supabase import create_client
        supabase = create_client(supabase_url, supabase_key)
        
        # Check states table
        states_res = supabase.table("states").select("count", count="exact").execute()
        sources_res = supabase.table("sources").select("count", count="exact").execute()
        
        print(f"[SUCCESS] Connected to Supabase!")
        print(f" - States count: {states_res.count if states_res.count is not None else len(states_res.data or [])}")
        print(f" - Sources count: {sources_res.count if sources_res.count is not None else len(sources_res.data or [])}")
    except Exception as e:
        print(f"[INFO] Supabase Connection Note: {e}")
        print(" If tables are not created yet, please run the 4 SQL migration files in Supabase SQL Editor.")
else:
    print("[WARNING] Supabase credentials not set.")

print("\n" + "=" * 60)
