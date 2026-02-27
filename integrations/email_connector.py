"""
Email (Gmail) integration: scans emails to understand what workflows people
are doing manually that could be automated with Claude tools.
"""

import json
from typing import Optional


class EmailConnector:
    """Connects to Gmail to scan for activity signals."""

    def __init__(self, credentials_json: dict):
        self.credentials = credentials_json
        self._service = None

    @property
    def service(self):
        if self._service is None:
            from google.oauth2.credentials import Credentials
            from googleapiclient.discovery import build

            creds = Credentials.from_authorized_user_info(self.credentials)
            self._service = build("gmail", "v1", credentials=creds)
        return self._service

    def test_connection(self) -> dict:
        """Verify Gmail credentials work."""
        try:
            profile = self.service.users().getProfile(userId="me").execute()
            return {
                "ok": True,
                "email": profile.get("emailAddress", ""),
                "messages_total": profile.get("messagesTotal", 0),
            }
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def get_recent_emails(self, max_results: int = 20, query: str = "") -> list[dict]:
        """Fetch recent emails with optional search query."""
        try:
            results = self.service.users().messages().list(
                userId="me", maxResults=max_results, q=query
            ).execute()
            messages = results.get("messages", [])

            emails = []
            for msg_ref in messages:
                msg = self.service.users().messages().get(
                    userId="me", id=msg_ref["id"], format="metadata",
                    metadataHeaders=["Subject", "From", "Date"],
                ).execute()

                headers = {h["name"]: h["value"] for h in msg.get("payload", {}).get("headers", [])}
                emails.append({
                    "id": msg["id"],
                    "subject": headers.get("Subject", ""),
                    "from": headers.get("From", ""),
                    "date": headers.get("Date", ""),
                    "snippet": msg.get("snippet", ""),
                    "labels": msg.get("labelIds", []),
                })
            return emails
        except Exception as e:
            return []

    def extract_activity_signals(self, emails: list[dict]) -> list[dict]:
        """Analyze emails to find automation opportunities."""
        signals = []
        repetitive_patterns = {}

        for email in emails:
            subject = email.get("subject", "").lower()
            snippet = email.get("snippet", "").lower()
            combined = f"{subject} {snippet}"

            # Detect repetitive email patterns (same subject prefix = likely manual workflow)
            subject_prefix = " ".join(subject.split()[:3])
            if subject_prefix and len(subject_prefix) > 5:
                repetitive_patterns[subject_prefix] = repetitive_patterns.get(subject_prefix, 0) + 1

            # Detect tool-related discussions
            tool_keywords = {
                "claude-code": ["claude code", "code review", "pr review"],
                "hubspot": ["hubspot", "crm", "deal", "pipeline"],
                "linear": ["linear", "ticket", "sprint", "backlog"],
                "automation": ["automate", "automation", "workflow", "manual process"],
                "reporting": ["report", "weekly update", "metrics", "dashboard"],
            }

            detected_tools = []
            detected_topics = []
            for tool, keywords in tool_keywords.items():
                if any(kw in combined for kw in keywords):
                    if tool in ("automation", "reporting"):
                        detected_topics.append(tool)
                    else:
                        detected_tools.append(tool)

            if detected_tools or detected_topics:
                signals.append({
                    "platform": "email",
                    "signal_type": "using_tool" if detected_tools else "mentioned_topic",
                    "content_summary": f"Email: {email.get('subject', '')[:200]}",
                    "detected_tools": detected_tools,
                    "detected_topics": detected_topics,
                })

        # Flag repetitive email patterns as automation opportunities
        for prefix, count in repetitive_patterns.items():
            if count >= 3:
                signals.append({
                    "platform": "email",
                    "signal_type": "repetitive_pattern",
                    "content_summary": f"Repetitive email pattern detected: '{prefix}...' ({count} instances). This could be automated.",
                    "detected_tools": [],
                    "detected_topics": ["automation", "workflow"],
                })

        return signals


DEMO_SIGNALS = [
    {
        "platform": "email",
        "signal_type": "repetitive_pattern",
        "content_summary": "Repetitive email pattern: 'Weekly status update...' (5 instances). This could be automated with Claude + Gmail.",
        "detected_tools": [],
        "detected_topics": ["automation", "reporting"],
    },
    {
        "platform": "email",
        "signal_type": "mentioned_topic",
        "content_summary": "Email: Re: Quarterly pipeline report - manual data pulling from HubSpot",
        "detected_tools": ["hubspot"],
        "detected_topics": ["reporting"],
    },
    {
        "platform": "email",
        "signal_type": "using_tool",
        "content_summary": "Email: Claude Code setup for our new microservice repo",
        "detected_tools": ["claude-code"],
        "detected_topics": [],
    },
]
