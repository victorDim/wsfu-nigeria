import hmac
import hashlib
import logging
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from fastapi import APIRouter, Request, Response, Query, HTTPException, status
from pydantic import BaseModel, Field

from app.core.config import settings
from app.services.whatsapp_bot import process_whatsapp_query

logger = logging.getLogger("wsfu.whatsapp")
router = APIRouter()


class WhatsAppSimulateRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="Citizen text query")
    sender_phone: Optional[str] = Field(None, description="Optional phone number for simulated logging")


class WhatsAppSimulateResponse(BaseModel):
    query: str
    reply: str
    timestamp: str


@router.get("/webhook")
async def verify_meta_webhook(
    hub_mode: Optional[str] = Query(None, alias="hub.mode"),
    hub_challenge: Optional[str] = Query(None, alias="hub.challenge"),
    hub_verify_token: Optional[str] = Query(None, alias="hub.verify_token")
):
    """
    Handles Meta WhatsApp Cloud API webhook handshake & verification challenge.
    Validates token against configured WHATSAPP_VERIFY_TOKEN.
    """
    if hub_mode == "subscribe" and hub_challenge:
        expected_token = settings.WHATSAPP_VERIFY_TOKEN
        if expected_token and hub_verify_token != expected_token:
            logger.warning("Rejected Meta webhook verification with invalid token.")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid verification token"
            )
        logger.info("Meta WhatsApp Webhook subscription verified successfully.")
        return Response(content=hub_challenge, media_type="text/plain")
    return {"status": "WSFU WhatsApp Webhook Active"}


@router.post("/webhook")
async def handle_whatsapp_webhook(request: Request):
    """
    Handles incoming WhatsApp messages from Twilio or Meta Cloud API with HMAC signature verification.
    """
    content_type = request.headers.get("content-type", "").lower()
    raw_body = await request.body()

    # Verify Meta HMAC Signature if APP_SECRET is configured
    meta_sig = request.headers.get("X-Hub-Signature-256")
    if settings.WHATSAPP_APP_SECRET and meta_sig:
        expected_sig = "sha256=" + hmac.new(settings.WHATSAPP_APP_SECRET.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
        if not hmac.compare_digest(meta_sig, expected_sig):
            logger.warning("Invalid X-Hub-Signature-256 on WhatsApp webhook.")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook signature")

    incoming_text = ""
    sender = ""

    try:
        if "application/json" in content_type:
            # Meta Cloud API JSON payload
            import json
            body = json.loads(raw_body.decode("utf-8")) if raw_body else {}

            entry = body.get("entry", [{}])[0]
            changes = entry.get("changes", [{}])[0]
            value = changes.get("value", {})
            messages = value.get("messages", [])
            if messages:
                incoming_text = messages[0].get("text", {}).get("body", "")
                sender = messages[0].get("from", "")
        else:
            # Twilio Form Data payload
            form = await request.form()
            incoming_text = form.get("Body", "")
            sender = form.get("From", "")

        logger.info(f"Incoming WhatsApp message from {sender}: {incoming_text}")
        reply_text = process_whatsapp_query(incoming_text)

        if "application/json" in content_type:
            return {"status": "success", "reply": reply_text, "recipient": sender}
        else:
            # Return Twilio TwiML XML
            twiml_xml = f'<?xml version="1.0" encoding="UTF-8"?><Response><Message>{reply_text}</Message></Response>'
            return Response(content=twiml_xml, media_type="application/xml")

    except Exception as e:
        logger.error(f"Error handling WhatsApp webhook: {e}", exc_info=True)
        fallback = process_whatsapp_query("HELP")
        return Response(
            content=f'<?xml version="1.0" encoding="UTF-8"?><Response><Message>{fallback}</Message></Response>',
            media_type="application/xml"
        )


@router.post("/simulate", response_model=WhatsAppSimulateResponse)
async def simulate_whatsapp_query(data: WhatsAppSimulateRequest):
    """
    Direct simulation endpoint for frontend civic chat widgets and automated QA tests.
    """
    reply = process_whatsapp_query(data.message)
    return WhatsAppSimulateResponse(
        query=data.message,
        reply=reply,
        timestamp=datetime.now(timezone.utc).isoformat()
    )
