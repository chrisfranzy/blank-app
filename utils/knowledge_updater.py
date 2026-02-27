"""
Knowledge updater: checks for new Claude tools, features, and best practices.
Generates new lessons automatically when updates are detected.
"""

import json
from datetime import datetime, timezone
from typing import Optional

# Official sources to monitor for Claude tool updates
CLAUDE_TOOL_REGISTRY = {
    "claude-code": {
        "name": "Claude Code",
        "description": "Anthropic's CLI tool for AI-assisted coding in the terminal",
        "docs_url": "https://docs.anthropic.com/en/docs/claude-code",
        "changelog_url": "https://docs.anthropic.com/en/docs/claude-code/changelog",
        "category": "coding",
        "current_features": [
            "Codebase reading and editing",
            "Command execution",
            "Git operations (commit, branch, PR)",
            "Multi-step autonomous tasks",
            "CLAUDE.md project configuration",
            "Custom skills and commands",
            "Hooks for deterministic automation",
            "MCP server integration",
            "Multi-agent / subagent workflows",
            "GitHub @claude mentions for PR review",
            "Headless/CI mode for automation",
            "Model switching (Haiku/Sonnet/Opus)",
        ],
    },
    "cowork": {
        "name": "Claude Cowork",
        "description": "GUI-based task automation for non-technical users",
        "docs_url": "https://support.anthropic.com/en/articles/cowork",
        "category": "automation",
        "current_features": [
            "Task planning and execution in VM",
            "Scheduled/recurring tasks",
            "Browser automation via Claude in Chrome",
            "Plugin marketplace (11+ launch plugins)",
            "Enterprise plugin management",
            "Cross-app workflows",
            "MCP server connections",
        ],
    },
    "mcp": {
        "name": "Model Context Protocol (MCP)",
        "description": "Open standard for connecting Claude to external tools and data",
        "docs_url": "https://modelcontextprotocol.io",
        "category": "integration",
        "current_features": [
            "JSON-RPC 2.0 based protocol",
            "stdio and HTTP Streamable transports",
            "3000+ community servers",
            "Tools, Resources, and Prompts primitives",
            "OAuth2 authorization spec",
            "Official servers: GitHub, Slack, Google Drive, Postgres, Puppeteer",
        ],
    },
    "claude-api": {
        "name": "Claude API",
        "description": "Anthropic's API for building custom AI applications",
        "docs_url": "https://docs.anthropic.com/en/docs",
        "category": "development",
        "current_features": [
            "Tool use / function calling",
            "Advanced tool use (tool search, programmatic calling)",
            "Computer use (beta)",
            "Structured outputs",
            "Web search and web fetch",
            "Streaming responses",
            "Batch processing",
            "Agent SDK (Python & TypeScript)",
        ],
    },
    "connectors": {
        "name": "Claude AI Connectors",
        "description": "One-click integrations for Claude.ai",
        "docs_url": "https://claude.ai/settings/connectors",
        "category": "integration",
        "current_features": [
            "50+ one-click integrations",
            "Gmail, Slack, Notion, Asana, Figma, Canva",
            "Interactive apps in conversations",
            "Available on all plans including Free",
        ],
    },
    "agent-sdk": {
        "name": "Claude Agent SDK",
        "description": "Build custom AI agents with Claude's infrastructure",
        "docs_url": "https://docs.anthropic.com/en/docs/agent-sdk",
        "category": "development",
        "current_features": [
            "Python and TypeScript SDKs",
            "File system and terminal access",
            "Web access capabilities",
            "Full agent loop implementation",
            "Custom tool definitions",
            "Multi-agent orchestration",
        ],
    },
}


def get_tool_registry() -> dict:
    """Get the full tool registry."""
    return CLAUDE_TOOL_REGISTRY


def get_tool_info(tool_name: str) -> Optional[dict]:
    """Get info about a specific tool."""
    return CLAUDE_TOOL_REGISTRY.get(tool_name)


def get_tools_by_category(category: str) -> list[dict]:
    """Get all tools in a category."""
    return [
        {"key": k, **v}
        for k, v in CLAUDE_TOOL_REGISTRY.items()
        if v["category"] == category
    ]


def check_for_updates(db_session) -> list[dict]:
    """
    Check for new tool updates by comparing registry against DB.
    In production, this would scrape changelogs and RSS feeds.
    Returns list of new updates detected.
    """
    from data.database import ToolUpdate

    new_updates = []
    existing = {u.tool_name: u for u in db_session.query(ToolUpdate).all()}

    for tool_key, tool_info in CLAUDE_TOOL_REGISTRY.items():
        for feature in tool_info["current_features"]:
            # Check if we've already logged this feature
            feature_key = f"{tool_key}:{feature}"
            if feature_key not in [f"{u.tool_name}:{u.title}" for u in existing.values()]:
                update = ToolUpdate(
                    tool_name=tool_key,
                    title=feature,
                    description=f"Feature of {tool_info['name']}: {feature}",
                    source_url=tool_info.get("docs_url", ""),
                    detected_at=datetime.now(timezone.utc),
                    lesson_generated=False,
                )
                new_updates.append(update)

    return new_updates


def generate_lesson_suggestion(tool_name: str, feature: str, user_context: str = "") -> dict:
    """
    Generate a lesson suggestion based on a tool update and user context.
    In production, this would use the Claude API to generate personalized content.
    """
    tool_info = CLAUDE_TOOL_REGISTRY.get(tool_name, {})
    tool_display = tool_info.get("name", tool_name)

    return {
        "title": f"New: {feature} in {tool_display}",
        "summary": f"Learn about the {feature.lower()} capability in {tool_display} and how to use it in your workflows.",
        "tool_name": tool_name,
        "category": tool_info.get("category", "general"),
        "difficulty": "intermediate",
        "tags": [tool_name, "new-feature", "update"],
    }
