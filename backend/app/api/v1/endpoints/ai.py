"""
FastAPI Endpoints for WSFU AI Intelligence Suite
"""

import logging
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.services.ai_intelligence import (
    ask_civic_assistant,
    cross_examine_article,
    polish_foi_letter
)

logger = logging.getLogger("wsfu.endpoints.ai")
router = APIRouter()


class AskAIRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=2000, description="User question on budgets, promises, or laws")
    chat_history: Optional[List[Dict[str, str]]] = Field(None, description="Optional conversation history")


class CrossExamineRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=500)
    content: str = Field(..., min_length=10, max_length=15000)
    source_name: Optional[str] = "Verified Wire"
    category: Optional[str] = "National"


class PolishFOIRequest(BaseModel):
    mda_name: str = Field(..., min_length=2, max_length=250)
    subject: str = Field(..., min_length=2, max_length=300)
    raw_notes: str = Field(..., min_length=5, max_length=5000)


@router.post("/ask", summary="Ask the WSFU AI Civic Assistant")
async def handle_ask_civic_assistant(payload: AskAIRequest):
    """
    RAG-grounded conversational AI for budgets, FAAC revenues, government promises, and legal provisions.
    """
    try:
        result = await ask_civic_assistant(payload.query, payload.chat_history)
        return result
    except Exception as e:
        logger.error(f"Error in /api/v1/ai/ask: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process AI civic query."
        )


@router.post("/cross-examine", summary="Forensic AI Cross-Examination of News Article")
async def handle_cross_examine_article(payload: CrossExamineRequest):
    """
    Analyzes an article for verified facts vs unverified claims, missing context, and bias score.
    """
    try:
        result = await cross_examine_article(
            title=payload.title,
            content=payload.content,
            source_name=payload.source_name or "Verified Wire",
            category=payload.category or "National"
        )
        return result
    except Exception as e:
        logger.error(f"Error in /api/v1/ai/cross-examine: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to cross-examine article."
        )


@router.post("/polish-foi", summary="AI Polish for Statutory Freedom of Information Notice")
async def handle_polish_foi_letter(payload: PolishFOIRequest):
    """
    Translates rough citizen observations into formal statutory legal notice text.
    """
    try:
        result = await polish_foi_letter(
            mda_name=payload.mda_name,
            subject=payload.subject,
            raw_notes=payload.raw_notes
        )
        return result
    except Exception as e:
        logger.error(f"Error in /api/v1/ai/polish-foi: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to polish FOI letter."
        )
