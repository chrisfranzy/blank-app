"""
Linear integration: scans project management activity to identify
workflows that could be automated with Claude.
"""

import json
import requests
from typing import Optional


class LinearConnector:
    """Connects to Linear to detect project management patterns."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.linear.app/graphql"
        self.headers = {
            "Authorization": api_key,
            "Content-Type": "application/json",
        }

    def _query(self, query: str, variables: Optional[dict] = None) -> dict:
        """Execute a GraphQL query against Linear."""
        response = requests.post(
            self.api_url,
            json={"query": query, "variables": variables or {}},
            headers=self.headers,
        )
        return response.json()

    def test_connection(self) -> dict:
        """Verify Linear API key works."""
        try:
            result = self._query("{ viewer { id name email } }")
            viewer = result.get("data", {}).get("viewer", {})
            return {
                "ok": bool(viewer.get("id")),
                "name": viewer.get("name", ""),
                "email": viewer.get("email", ""),
            }
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def get_recent_issues(self, limit: int = 50) -> list[dict]:
        """Get recently updated issues."""
        query = """
        query RecentIssues($limit: Int!) {
            issues(first: $limit, orderBy: updatedAt) {
                nodes {
                    id
                    identifier
                    title
                    state { name }
                    priority
                    assignee { name }
                    labels { nodes { name } }
                    createdAt
                    updatedAt
                }
            }
        }
        """
        try:
            result = self._query(query, {"limit": limit})
            issues = result.get("data", {}).get("issues", {}).get("nodes", [])
            return [
                {
                    "id": i["id"],
                    "identifier": i["identifier"],
                    "title": i["title"],
                    "state": i.get("state", {}).get("name", ""),
                    "priority": i.get("priority", 0),
                    "assignee": (i.get("assignee") or {}).get("name", "Unassigned"),
                    "labels": [l["name"] for l in i.get("labels", {}).get("nodes", [])],
                    "created": i.get("createdAt", ""),
                    "updated": i.get("updatedAt", ""),
                }
                for i in issues
            ]
        except Exception:
            return []

    def get_team_workload(self) -> list[dict]:
        """Get issue counts per team member."""
        query = """
        query {
            issues(filter: { state: { type: { in: ["started", "unstarted"] } } }) {
                nodes {
                    assignee { name }
                    priority
                }
            }
        }
        """
        try:
            result = self._query(query)
            issues = result.get("data", {}).get("issues", {}).get("nodes", [])
            workload = {}
            for issue in issues:
                name = (issue.get("assignee") or {}).get("name", "Unassigned")
                if name not in workload:
                    workload[name] = {"total": 0, "high_priority": 0}
                workload[name]["total"] += 1
                if issue.get("priority", 0) >= 3:
                    workload[name]["high_priority"] += 1
            return [{"name": k, **v} for k, v in workload.items()]
        except Exception:
            return []

    def extract_activity_signals(self, issues: list[dict]) -> list[dict]:
        """Identify automation opportunities from Linear activity."""
        signals = []

        # Detect bug-heavy periods
        bug_issues = [i for i in issues if "bug" in [l.lower() for l in i.get("labels", [])]]
        if len(bug_issues) > 5:
            signals.append({
                "platform": "linear",
                "signal_type": "automation_opportunity",
                "content_summary": f"{len(bug_issues)} bug reports recently. Consider automating bug triage with Claude — it can classify priority and assign to the right team.",
                "detected_tools": ["linear", "claude-api"],
                "detected_topics": ["automation", "project-management"],
            })

        # Detect unassigned issues
        unassigned = [i for i in issues if i.get("assignee") == "Unassigned"]
        if len(unassigned) > 3:
            signals.append({
                "platform": "linear",
                "signal_type": "automation_opportunity",
                "content_summary": f"{len(unassigned)} unassigned issues. Claude can auto-triage and assign based on issue content and team expertise.",
                "detected_tools": ["linear", "claude-api"],
                "detected_topics": ["automation", "project-management"],
            })

        return signals


DEMO_SIGNALS = [
    {
        "platform": "linear",
        "signal_type": "automation_opportunity",
        "content_summary": "8 bug reports this week. Claude can auto-triage bugs by classifying priority, identifying affected components, and assigning to the right engineer.",
        "detected_tools": ["linear", "claude-api"],
        "detected_topics": ["automation", "project-management"],
    },
    {
        "platform": "linear",
        "signal_type": "automation_opportunity",
        "content_summary": "12 issues created from Slack conversations this month (manual copy-paste). Automate Slack → Linear with Claude.",
        "detected_tools": ["linear", "slack-automation"],
        "detected_topics": ["automation", "workflow"],
    },
]
