"""
Slack integration: reads channels/messages to detect what people are doing,
what they're asking about, and where they need help with Claude tools.
"""

import json
from datetime import datetime, timezone
from typing import Optional


class SlackConnector:
    """Connects to a Slack workspace to scan for activity signals."""

    def __init__(self, bot_token: str):
        self.bot_token = bot_token
        self._client = None

    @property
    def client(self):
        if self._client is None:
            from slack_sdk import WebClient
            self._client = WebClient(token=self.bot_token)
        return self._client

    def test_connection(self) -> dict:
        """Verify the Slack token works."""
        try:
            result = self.client.auth_test()
            return {
                "ok": True,
                "team": result.get("team", ""),
                "user": result.get("user", ""),
                "url": result.get("url", ""),
            }
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def list_channels(self, limit: int = 100) -> list[dict]:
        """Get public channels the bot has access to."""
        try:
            result = self.client.conversations_list(
                types="public_channel,private_channel",
                limit=limit,
            )
            return [
                {"id": c["id"], "name": c["name"], "topic": c.get("topic", {}).get("value", "")}
                for c in result.get("channels", [])
            ]
        except Exception as e:
            return []

    def get_recent_messages(self, channel_id: str, limit: int = 50) -> list[dict]:
        """Fetch recent messages from a channel."""
        try:
            result = self.client.conversations_history(
                channel=channel_id,
                limit=limit,
            )
            messages = []
            for msg in result.get("messages", []):
                if msg.get("subtype") in ("channel_join", "channel_leave", "bot_message"):
                    continue
                messages.append({
                    "user": msg.get("user", "unknown"),
                    "text": msg.get("text", ""),
                    "ts": msg.get("ts", ""),
                    "thread_ts": msg.get("thread_ts"),
                    "reactions": [r["name"] for r in msg.get("reactions", [])],
                })
            return messages
        except Exception as e:
            return []

    def search_messages(self, query: str, count: int = 20) -> list[dict]:
        """Search Slack messages for specific topics."""
        try:
            result = self.client.search_messages(query=query, count=count)
            matches = result.get("messages", {}).get("matches", [])
            return [
                {
                    "text": m.get("text", ""),
                    "user": m.get("username", "unknown"),
                    "channel": m.get("channel", {}).get("name", "unknown"),
                    "ts": m.get("ts", ""),
                    "permalink": m.get("permalink", ""),
                }
                for m in matches
            ]
        except Exception as e:
            return []

    def extract_activity_signals(self, messages: list[dict]) -> list[dict]:
        """
        Analyze messages to find signals about what people need help with.
        Returns structured signals that feed the recommendation engine.
        """
        # Keywords that indicate someone needs help or is asking about tools
        help_indicators = [
            "how do i", "how to", "anyone know", "help with", "struggling",
            "doesn't work", "broken", "stuck on", "can someone", "is there a way",
            "what's the best", "recommendation for", "how does", "tutorial",
        ]
        tool_keywords = {
            "claude-code": ["claude code", "claude cli", "claude terminal", "claude.md", "claude-code"],
            "mcp": ["mcp", "model context protocol", "mcp server"],
            "claude-api": ["claude api", "anthropic api", "tool use", "function calling"],
            "cowork": ["cowork", "claude cowork", "scheduled task", "claude automation"],
            "slack-automation": ["slack bot", "slack automation", "slack workflow"],
            "hubspot": ["hubspot", "crm", "deals", "contacts"],
            "linear": ["linear", "linear issue", "linear ticket", "sprint"],
            "github": ["github", "pull request", "pr review", "github actions"],
            "prompt-engineering": ["prompt", "system prompt", "prompt engineering"],
        }

        signals = []
        for msg in messages:
            text_lower = msg.get("text", "").lower()

            # Check for help-seeking behavior
            is_help_seeking = any(indicator in text_lower for indicator in help_indicators)

            # Detect mentioned tools
            detected_tools = []
            for tool_name, keywords in tool_keywords.items():
                if any(kw in text_lower for kw in keywords):
                    detected_tools.append(tool_name)

            # Detect topics
            detected_topics = []
            topic_keywords = {
                "automation": ["automate", "automation", "automated", "auto-"],
                "workflow": ["workflow", "process", "pipeline"],
                "productivity": ["productivity", "efficient", "faster", "time-saving"],
                "coding": ["code", "coding", "programming", "debug", "deploy"],
                "communication": ["email", "slack", "message", "notification"],
                "reporting": ["report", "dashboard", "metrics", "analytics"],
                "project-management": ["project", "task", "sprint", "backlog", "ticket"],
            }
            for topic, keywords in topic_keywords.items():
                if any(kw in text_lower for kw in keywords):
                    detected_topics.append(topic)

            if is_help_seeking or detected_tools or detected_topics:
                signal_type = "asked_about" if is_help_seeking else "mentioned_topic"
                signals.append({
                    "platform": "slack",
                    "signal_type": signal_type,
                    "content_summary": msg.get("text", "")[:300],
                    "detected_tools": detected_tools,
                    "detected_topics": detected_topics,
                    "timestamp": msg.get("ts", ""),
                })

        return signals


def create_demo_connector() -> SlackConnector:
    """Create a connector for demo/testing with mock data."""
    return SlackConnector(bot_token="demo-token")


DEMO_SIGNALS = [
    {
        "platform": "slack",
        "signal_type": "asked_about",
        "content_summary": "How do I set up Claude Code to auto-review our PRs? We're spending too much time on code reviews.",
        "detected_tools": ["claude-code"],
        "detected_topics": ["automation", "coding"],
    },
    {
        "platform": "slack",
        "signal_type": "asked_about",
        "content_summary": "Is there a way to connect HubSpot to Claude so it can draft follow-up emails?",
        "detected_tools": ["hubspot", "claude-api"],
        "detected_topics": ["automation", "communication"],
    },
    {
        "platform": "slack",
        "signal_type": "mentioned_topic",
        "content_summary": "Just tried MCP servers for the first time - connected our Postgres database. Game changer!",
        "detected_tools": ["mcp"],
        "detected_topics": ["automation"],
    },
    {
        "platform": "slack",
        "signal_type": "asked_about",
        "content_summary": "Anyone know how to set up Cowork for recurring weekly reports? Want to automate our Monday metrics.",
        "detected_tools": ["cowork"],
        "detected_topics": ["automation", "reporting"],
    },
    {
        "platform": "slack",
        "signal_type": "asked_about",
        "content_summary": "Struggling with prompt engineering for our support ticket classifier. Getting inconsistent results.",
        "detected_tools": ["prompt-engineering", "claude-api"],
        "detected_topics": ["automation"],
    },
]
