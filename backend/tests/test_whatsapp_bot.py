"""
Unit Tests for WhatsApp Civic Bot Engine & Webhook Endpoints
"""

import pytest
from fastapi.testclient import TestClient
from main import app
from app.services.whatsapp_bot import (
    process_whatsapp_query,
    handle_faac_query,
    handle_promise_query,
    handle_foi_query,
    handle_news_query,
    get_help_menu
)

client = TestClient(app)


def test_whatsapp_help_menu():
    for cmd in ["HELP", "MENU", "HI", "hello", "INFO"]:
        res = process_whatsapp_query(cmd)
        assert "WHO SWEAR FOR US" in res
        assert "FAAC" in res
        assert "PROMISE" in res


def test_whatsapp_faac_query():
    res = process_whatsapp_query("FAAC Lagos")
    assert "LAGOS STATE" in res
    assert "Gross Statutory" in res
    assert "Net Vault Revenue" in res
    assert "Per-Capita Allocation" in res


def test_whatsapp_promise_query():
    res = process_whatsapp_query("PROMISE Tinubu")
    assert "BOLA AHMED TINUBU" in res
    assert "PROMISE METER" in res
    assert "Citizen Approval Rating" in res


def test_whatsapp_foi_query():
    res = process_whatsapp_query("FOI Works")
    assert "FOI STATUS" in res
    assert "Federal Ministry of Works" in res
    assert "STATUTORY DEFAULT" in res


def test_whatsapp_news_query():
    res = process_whatsapp_query("NEWS")
    assert "CORROBORATED WIRE" in res
    assert "FAAC Disburses" in res


def test_whatsapp_simulate_endpoint():
    payload = {"message": "FAAC Rivers"}
    res = client.post("/api/v1/whatsapp/simulate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "reply" in data
    assert "RIVERS STATE" in data["reply"]
    assert "timestamp" in data


def test_meta_webhook_verification_challenge():
    from app.core.config import settings
    # 1. Valid Token returns challenge
    params = {
        "hub.mode": "subscribe",
        "hub.challenge": "1158201444",
        "hub.verify_token": settings.WHATSAPP_VERIFY_TOKEN
    }
    res = client.get("/api/v1/whatsapp/webhook", params=params)
    assert res.status_code == 200
    assert res.text == "1158201444"

    # 2. Invalid Token returns 403
    bad_params = {
        "hub.mode": "subscribe",
        "hub.challenge": "1158201444",
        "hub.verify_token": "wrong_unauthorized_token"
    }
    bad_res = client.get("/api/v1/whatsapp/webhook", params=bad_params)
    assert bad_res.status_code == 403

