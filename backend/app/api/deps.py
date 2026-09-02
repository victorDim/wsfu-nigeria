"""
Shared FastAPI dependencies for authentication and authorization.

Uses Supabase Auth JWT tokens. The frontend obtains these from
supabase.auth.signIn*(), passes them as Bearer tokens, and these
dependencies verify them server-side.
"""

import logging
from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.db.supabase_client import get_supabase

logger = logging.getLogger("wsfu.deps")

# auto_error=True means FastAPI returns 403 automatically if no
# Authorization header is present. We upgrade that to a clear 401
# in get_current_user when the token itself is invalid.
_bearer_scheme = HTTPBearer(auto_error=True)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> Any:
    """Verify the Supabase Auth JWT and return the authenticated user.

    Returns the gotrue User object, which has .id (UUID), .email,
    .app_metadata, .user_metadata, etc.
    """
    token = credentials.credentials
    try:
        supabase = get_supabase()
        res = supabase.auth.get_user(token)
        if not res or not res.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired session token",
            )
        return res.user
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning(
            "auth.token_verification_failed",
            extra={"source": "deps", "error": str(exc)},
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {exc}",
        ) from exc


def require_admin(user: Any = Depends(get_current_user)) -> Any:
    """Gate endpoint to admin users only.

    Checks for app_metadata.role == 'admin' on the Supabase Auth user.
    Admin role is set via the Supabase dashboard or a management API call
    (supabase.auth.admin.update_user_by_id(uid, { app_metadata: { role: 'admin' } })).

    This is NOT the same as the Postgres 'service_role' — it's a
    Supabase Auth concept stored in the JWT's app_metadata claim.
    """
    app_metadata = getattr(user, "app_metadata", None) or {}
    if app_metadata.get("role") != "admin":
        logger.info(
            "auth.admin_access_denied",
            extra={"source": "deps", "user_id": str(user.id)},
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return user
