"""Tool Updates page: shows the latest Claude tools, features, and what's new."""

import streamlit as st
from utils.knowledge_updater import get_tool_registry, get_tools_by_category


def render():
    st.title("Claude Tools & Updates")
    st.caption("Stay up to date with the latest Claude tools, features, and capabilities")

    registry = get_tool_registry()

    # ── Overview Cards ──────────────────────────────────────
    st.subheader("Tool Ecosystem Overview")

    cols = st.columns(3)
    for i, (key, tool) in enumerate(registry.items()):
        with cols[i % 3]:
            with st.container(border=True):
                st.markdown(f"### {tool['name']}")
                st.write(tool["description"])
                st.caption(f"Category: {tool['category']}")
                if tool.get("docs_url"):
                    st.caption(f"Docs: `{tool['docs_url']}`")

    st.divider()

    # ── Detailed Feature Lists ──────────────────────────────
    st.subheader("Features by Tool")

    selected_tool = st.selectbox(
        "Select a tool to see its features",
        options=list(registry.keys()),
        format_func=lambda x: registry[x]["name"],
    )

    if selected_tool:
        tool = registry[selected_tool]
        st.markdown(f"## {tool['name']}")
        st.write(tool["description"])

        if tool.get("docs_url"):
            st.info(f"Documentation: {tool['docs_url']}")

        st.markdown("### Current Features")
        for feature in tool.get("current_features", []):
            st.markdown(f"- {feature}")

    st.divider()

    # ── Learning Path by Tool ───────────────────────────────
    st.subheader("Recommended Learning Paths")

    learning_paths = {
        "New to Claude": [
            ("claude-code", "Start here — get AI coding assistance in your terminal"),
            ("connectors", "Connect Claude to your existing tools (Gmail, Slack, etc.)"),
            ("cowork", "Automate tasks without writing code"),
        ],
        "Developers": [
            ("claude-code", "Master the CLI for autonomous coding tasks"),
            ("mcp", "Build custom integrations with Model Context Protocol"),
            ("claude-api", "Build automations with the API + tool use"),
            ("agent-sdk", "Create custom AI agents for your workflows"),
        ],
        "Business Users": [
            ("cowork", "Automate reports, emails, and recurring tasks"),
            ("connectors", "Connect all your business tools to Claude"),
        ],
        "Team Leads": [
            ("cowork", "Set up team-wide automations and scheduled tasks"),
            ("claude-code", "Automate code reviews and engineering workflows"),
            ("mcp", "Build custom tools for your team's specific needs"),
        ],
    }

    for path_name, steps in learning_paths.items():
        with st.expander(f"🗺 {path_name}"):
            for i, (tool_key, description) in enumerate(steps, 1):
                tool_name = registry.get(tool_key, {}).get("name", tool_key)
                st.markdown(f"**Step {i}: {tool_name}** — {description}")

    st.divider()

    # ── What's New / Changelog ──────────────────────────────
    st.subheader("Recent Updates")
    st.caption("Key developments in the Claude tools ecosystem")

    updates = [
        {
            "date": "Feb 2026",
            "title": "Cowork Enterprise Features",
            "description": "Private plugin marketplaces, department-specific plugins, 12 new MCP connectors, cross-app workflows (Excel + PowerPoint).",
            "tool": "cowork",
        },
        {
            "date": "Jan 2026",
            "title": "Claude Cowork Launch",
            "description": "GUI-based task automation with scheduled tasks, browser automation, and plugin marketplace.",
            "tool": "cowork",
        },
        {
            "date": "Jan 2026",
            "title": "Interactive Claude Apps",
            "description": "Live app interfaces rendered inside Claude conversations for Slack, Figma, Canva, Asana, Hex, and Box.",
            "tool": "connectors",
        },
        {
            "date": "Dec 2025",
            "title": "Agent Skills Standard",
            "description": "Open standard for packaging reusable agent skills across Claude.ai, Claude Code, and Agent SDK.",
            "tool": "agent-sdk",
        },
        {
            "date": "Dec 2025",
            "title": "MCP Donated to Linux Foundation",
            "description": "MCP is now governed by the Agentic AI Foundation under the Linux Foundation, co-founded with Block and OpenAI.",
            "tool": "mcp",
        },
        {
            "date": "Nov 2025",
            "title": "Advanced Tool Use",
            "description": "Tool Search Tool, Programmatic Tool Calling, and Tool Use Examples for more efficient API usage.",
            "tool": "claude-api",
        },
        {
            "date": "Jul 2025",
            "title": "Claude AI Connectors Launch",
            "description": "50+ one-click integrations for Claude.ai, including Gmail, Slack, Notion, Asana, Figma, and Canva.",
            "tool": "connectors",
        },
    ]

    for update in updates:
        with st.container(border=True):
            col1, col2 = st.columns([1, 5])
            with col1:
                st.caption(update["date"])
                tool_info = registry.get(update["tool"], {})
                st.caption(tool_info.get("name", update["tool"]))
            with col2:
                st.markdown(f"**{update['title']}**")
                st.write(update["description"])
