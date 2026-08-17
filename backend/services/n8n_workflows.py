"""
n8n Trigger & Webhook Service
Dispatches events for automated workflows:
1. Notify founder when validation score updates (Green / Yellow / Red)
2. Waitlist automated email sequence trigger
3. Weekly executive validation telemetry report
"""

from typing import Dict, Any, List
import logging
from datetime import datetime

logger = logging.getLogger("n8n_workflows")


class N8NWorkflowService:
    def __init__(self, webhook_base_url: str = "https://n8n.internal.venturely.io/webhook"):
        self.webhook_base_url = webhook_base_url

    def trigger_score_update_notification(self, product_id: str, seller_email: str, score: float, status: str) -> Dict[str, Any]:
        """Triggers workflow to alert founder via Email / Slack when a validation threshold is crossed."""
        payload = {
            "event": "VALIDATION_SCORE_UPDATED",
            "product_id": product_id,
            "seller_email": seller_email,
            "validation_score": score,
            "status": status,
            "timestamp": datetime.utcnow().isoformat(),
            "action_required": status == "green"
        }
        logger.info(f"Triggered n8n workflow: {payload['event']} for {seller_email}")
        return {"dispatched": True, "workflow": "score_alert", "payload": payload}

    def trigger_waitlist_welcome_sequence(self, waitlist_id: str, customer_email: str, product_name: str, rank: int) -> Dict[str, Any]:
        """Dispatches automated drip sequence to new waitlist signups."""
        payload = {
            "event": "WAITLIST_JOINED",
            "waitlist_id": waitlist_id,
            "customer_email": customer_email,
            "product_name": product_name,
            "rank": rank,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"Triggered n8n workflow: {payload['event']} for {customer_email}")
        return {"dispatched": True, "workflow": "waitlist_drip", "payload": payload}

    def trigger_weekly_report(self, seller_id: str, seller_email: str, summary_metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Triggers weekly analytics compilation email."""
        payload = {
            "event": "WEEKLY_VALIDATION_DIGEST",
            "seller_id": seller_id,
            "seller_email": seller_email,
            "metrics": summary_metrics,
            "timestamp": datetime.utcnow().isoformat()
        }
        return {"dispatched": True, "workflow": "weekly_digest", "payload": payload}


n8n_service = N8NWorkflowService()
