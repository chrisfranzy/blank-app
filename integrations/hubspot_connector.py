"""
HubSpot integration: scans CRM activity to identify manual workflows
that could be automated with Claude.
"""

import json
from typing import Optional


class HubSpotConnector:
    """Connects to HubSpot to detect manual CRM workflows."""

    def __init__(self, access_token: str):
        self.access_token = access_token
        self._client = None

    @property
    def client(self):
        if self._client is None:
            import hubspot
            self._client = hubspot.Client.create(access_token=self.access_token)
        return self._client

    def test_connection(self) -> dict:
        """Verify HubSpot token works."""
        try:
            account = self.client.crm.owners.get_all()
            return {"ok": True, "owners_count": len(account)}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def get_recent_activities(self, limit: int = 50) -> list[dict]:
        """Get recent CRM activities to identify patterns."""
        activities = []
        try:
            # Get recent deals
            deals = self.client.crm.deals.basic_api.get_page(
                limit=limit,
                properties=["dealname", "dealstage", "amount", "closedate", "notes_last_updated"],
            )
            for deal in deals.results:
                activities.append({
                    "type": "deal",
                    "name": deal.properties.get("dealname", ""),
                    "stage": deal.properties.get("dealstage", ""),
                    "amount": deal.properties.get("amount", ""),
                    "updated": str(deal.updated_at) if deal.updated_at else "",
                })
        except Exception:
            pass

        try:
            # Get recent contacts
            contacts = self.client.crm.contacts.basic_api.get_page(
                limit=min(limit, 20),
                properties=["firstname", "lastname", "email", "lifecyclestage"],
            )
            for contact in contacts.results:
                activities.append({
                    "type": "contact",
                    "name": f"{contact.properties.get('firstname', '')} {contact.properties.get('lastname', '')}",
                    "email": contact.properties.get("email", ""),
                    "stage": contact.properties.get("lifecyclestage", ""),
                })
        except Exception:
            pass

        return activities

    def extract_activity_signals(self, activities: list[dict]) -> list[dict]:
        """Identify automation opportunities from HubSpot activity."""
        signals = []

        deal_count = sum(1 for a in activities if a["type"] == "deal")
        contact_count = sum(1 for a in activities if a["type"] == "contact")

        if deal_count > 10:
            signals.append({
                "platform": "hubspot",
                "signal_type": "automation_opportunity",
                "content_summary": f"Active pipeline with {deal_count} recent deals. Consider automating deal stage updates and follow-up emails with Claude.",
                "detected_tools": ["hubspot", "claude-api"],
                "detected_topics": ["automation", "workflow"],
            })

        if contact_count > 10:
            signals.append({
                "platform": "hubspot",
                "signal_type": "automation_opportunity",
                "content_summary": f"Managing {contact_count} active contacts. Claude can auto-draft personalized outreach and enrich contact data.",
                "detected_tools": ["hubspot", "claude-api"],
                "detected_topics": ["automation", "communication"],
            })

        return signals


DEMO_SIGNALS = [
    {
        "platform": "hubspot",
        "signal_type": "automation_opportunity",
        "content_summary": "Active pipeline with 23 deals this month. Consider automating follow-up emails and pipeline reports with Claude.",
        "detected_tools": ["hubspot", "claude-api"],
        "detected_topics": ["automation", "workflow"],
    },
    {
        "platform": "hubspot",
        "signal_type": "automation_opportunity",
        "content_summary": "42 contacts without recent follow-up. Claude can auto-draft personalized outreach based on deal stage.",
        "detected_tools": ["hubspot"],
        "detected_topics": ["automation", "communication"],
    },
]
