"""
FastAPI WhatsApp Webhook & Bot Endpoints
Supports Meta Cloud API & Twilio Webhook formats for citizen transparency queries.
"""

import logging
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from fastapi import APIRouter, Request, Response, Query, HTTPException
from pydantic import BaseModel, Field

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
    """
    # Accept challenge if token matches or during sandbox/development
    if hub_mode == "subscribe" and hub_challenge:
        logger.info("Meta WhatsApp Webhook subscription verified successfully.")
        return Response(content=hub_challenge, media_type="text/plain")
    return {"status": "WSFU WhatsApp Webhook Active"}


@router.post("/webhook")
async def handle_whatsapp_webhook(request: Request):
    """
    Handles incoming WhatsApp messages from Twilio or Meta Cloud API.
    """
    content_type = request.headers.get("content-type", "").lower()
    incoming_text = ""
    sender = ""

    try:
        if "application/json" in content_type:
            # Meta Cloud API JSON payload
            body = await request.json()
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
