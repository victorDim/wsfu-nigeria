"""
Unit Tests for WSFU AI Intelligence Suite & Endpoints
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def mock_gemini_intelligence(monkeypatch):
    """Mocks AI intelligence service in endpoint module for deterministic, ultra-fast test execution."""
    from app.api.v1.endpoints import ai

    async def mock_ask(query, history=None):
        return {
            "answer": f"Verified AI analysis for: {query}",
            "sources": ["National Bureau of Statistics", "Supreme Court Records"],
            "model": "gemini-3.7-flash"
        }

    async def mock_cross_examine(title, content, source_name, category):
        return {
            "truth_score": 92,
            "bias_rating": "Objective Reporting",
            "verified_facts": ["Figure matches FAAC records."],
            "unverified_claims": ["Timeline is aspirational."],
            "missing_context": "Deductions applied at source.",
            "verdict": "Corroborated across 3 national dailies."
        }

    async def mock_polish(mda_name, subject, raw_notes):
        return {
            "formal_subject": f"Statutory Notice: {subject}",
            "polished_details": f"1. Detailed procurement breakdown regarding {raw_notes}",
            "cited_sections": ["Section 1", "Section 4", "Section 7"]
        }

    monkeypatch.setattr(ai, "ask_civic_assistant", mock_ask)
    monkeypatch.setattr(ai, "cross_examine_article", mock_cross_examine)
    monkeypatch.setattr(ai, "polish_foi_letter", mock_polish)


def test_ai_ask_civic_assistant_endpoint():
    payload = {"query": "How much did Rivers State receive in FAAC and what are the deductions?"}
    res = client.post("/api/v1/ai/ask", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "answer" in data
    assert "sources" in data
    assert len(data["sources"]) > 0


def test_ai_cross_examine_article_endpoint():
    payload = {
        "title": "Federal Govt Approves ₦45 Billion for Rural Primary Healthcare Centers",
        "content": "The Federal Executive Council on Wednesday approved the sum of ₦45B for upgrading primary healthcare centers across all 36 states with specialized solar power inverters.",
        "source_name": "Premium Times",
        "category": "Healthcare"
    }
    res = client.post("/api/v1/ai/cross-examine", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "truth_score" in data
    assert "bias_rating" in data
    assert "verified_facts" in data
    assert isinstance(data["verified_facts"], list)


def test_ai_polish_foi_endpoint():
    payload = {
        "mda_name": "Federal Ministry of Works",
        "subject": "Aba-Ikot Ekpene Road Project",
        "raw_notes": "The contractor abandoned the site since January and no equipment is on the road. We want the payment breakdown."
    }
    res = client.post("/api/v1/ai/polish-foi", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "formal_subject" in data or "mda_name" in data
    assert "polished_details" in data
    assert "cited_sections" in data
