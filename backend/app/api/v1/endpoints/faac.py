"""
FAAC (Federation Account Allocation Committee) Spending Explorer Endpoints
"""

from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List, Dict, Any
from app.db.supabase_client import get_supabase

router = APIRouter()


@router.get("/states")
def list_states() -> List[Dict[str, Any]]:
    """Returns list of all 36 Nigerian States + FCT."""
    try:
        supabase = get_supabase()
        res = supabase.table("states").select("id, name, code, geopolitical_zone").order("name").execute()
        return res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/state/{state_code}")
def get_state_allocations(
    state_code: str,
    year: Optional[int] = Query(None, description="Filter by year (e.g. 2024)")
) -> Dict[str, Any]:
    """
    Returns monthly FAAC allocations and LGA breakdown for a specific state.
    """
    try:
        supabase = get_supabase()
        
        # 1. Fetch state safely
        state_res = supabase.table("states").select("id, name, code, geopolitical_zone").eq("code", state_code.upper()).limit(1).execute()
        if not state_res.data:
            raise HTTPException(status_code=404, detail=f"State with code '{state_code}' not found")
        
        state = state_res.data[0]
        
        # 2. Fetch State-level allocations
        q_state = supabase.table("faac_allocations").select("*").eq("state_id", state["id"]).eq("tier", "state")
        if year:
            q_state = q_state.eq("year", year)
            
        allocations_res = q_state.order("year", desc=True).order("month", desc=True).execute()
        
        # 3. Fetch LGAs for this state
        lgas_res = supabase.table("lgas").select("id, name, slug").eq("state_id", state["id"]).order("name").execute()
        
        return {
            "state": state,
            "allocations": allocations_res.data or [],
            "lgas": lgas_res.data or []
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
