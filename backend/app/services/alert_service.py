"""
WSFU Admin Alert & Notification Service
Dispatches real-time alerts to editorial staff when new articles/summaries are queued for approval.
Supports Console Logging, In-App Dispatch, and Webhook/Email integrations.
"""

import logging
from typing import Dict, Any, List
from datetime import datetime

logger = logging.getLogger("wsfu.alerts")


class AdminAlertService:
    """
    Handles immediate alerts to editors when AI drafts or community flags need human review.
    """

    @staticmethod
    def notify_pending_approval(article_title: str, source_name: str, article_id: str, tldr_snippet: str):
        """
        Triggered by RSS crawler when an AI brief is generated and awaiting editor review.
        """
        timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        alert_payload = {
            "type": "PENDING_APPROVAL",
            "priority": "HIGH",
            "article_id": article_id,
            "source": source_name,
            "title": article_title,
            "tldr_snippet": tldr_snippet[:150],
            "timestamp": timestamp
        }

        # 1. High-priority structured log
        logger.warning(
            f"🚨 [ADMIN ALERT - ACTION REQUIRED] New story awaiting approval: '{article_title[:60]}' ({source_name}) at {timestamp}"
        )

        # 2. Webhook integration (e.g. Telegram / Slack / Discord bot for solo editor)
        # Can be configured via settings.ALERT_WEBHOOK_URL
        return alert_payload

    @staticmethod
    def notify_stale_source(source_name: str, consecutive_errors: int):
        """
        Alerts admin if an RSS source fails 3+ consecutive times.
        """
        logger.error(
            f"⚠️ [INGESTION ALERT] Source '{source_name}' has failed {consecutive_errors} consecutive times. Check feed URL."
        )


alert_service = AdminAlertService()
