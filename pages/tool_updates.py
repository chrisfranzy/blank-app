"""Tool Updates page: shows the latest Claude tools, features, and what's new."""

import streamlit as st
from utils.knowledge_updater import get_tool_registry, get_tools_by_category


def render():
    st.title("Claude Tools & Updates")
    st.caption("Stay up to date with the latest Claude tools and capabilities")

    registry = get_tool_registry()

    # ── Overview Cards: 2-col grid (works on mobile) ────────
    st.subheader("Tool Ecosystem")

    items = list(registry.items())
    for row_start in range(0, len(items), 2):
        cols = st.columns(2)
        for j, col in enumerate(cols):
            idx = row_start + j
            if idx < len(items):
                key, tool = items[idx]
                with col:
                    with st.container(border=True):
                        st.markdown(f"### {tool['name']}")
                        st.write(tool["description"])
                        st.caption(f"Category: {tool['category']}")

    st.divider()

    # ── Detailed Feature Lists ──────────────────────────────
    st.subheader("Features by Tool")

    selected_tool = st.selectbox(
        "Select a tool",
        options=list(registry.keys()),
        format_func=lambda x: registry[x]["name"],
    )

    if selected_tool:
        tool = registry[selected_tool]
        st.markdown(f"## {tool['name']}")
        st.write(tool["description"])

        if tool.get("docs_url"):
            st.info(f"Docs: {tool['docs_url']}")

        st.markdown("### Current Features")
        for feature in tool.get("current_features", []):
            st.markdown(f"- {feature}")

    st.divider()

    # ── Learning Paths ──────────────────────────────────────
    st.subheader("Learning Paths")

    learning_paths = {
        "New to Claude": [
            ("claude-code", "Start here — AI coding in your terminal"),
            ("connectors", "Connect Claude to your existing tools"),
            ("cowork", "Automate tasks without writing code"),
        ],
        "Developers": [
            ("claude-code", "Master the CLI"),
            ("mcp", "Build custom integrations"),
            ("claude-api", "Build automations with the API"),
            ("agent-sdk", "Create custom AI agents"),
        ],
        "Business Users": [
            ("cowork", "Automate reports, emails, and tasks"),
            ("connectors", "Connect all your business tools"),
        ],
        "Team Leads": [
            ("cowork", "Set up team-wide automations"),
            ("claude-code", "Automate code reviews"),
            ("mcp", "Build custom tools for your team"),
        ],
    }

    for path_name, steps in learning_paths.items():
        with st.expander(f"🗺 {path_name}"):
            for i, (tool_key, description) in enumerate(steps, 1):
                tool_name = registry.get(tool_key, {}).get("name", tool_key)
                st.markdown(f"**{i}. {tool_name}** — {description}")

    st.divider()

    # ── Recent Updates ──────────────────────────────────────
    st.subheader("Recent Updates")

    updates = [
        {"date": "Feb 2026", "title": "Cowork Enterprise Features", "description": "Private plugin marketplaces, department-specific plugins, 12 new MCP connectors.", "tool": "cowork"},
        {"date": "Jan 2026", "title": "Claude Cowork Launch", "description": "GUI-based task automation with scheduled tasks, browser automation, and plugin marketplace.", "tool": "cowork"},
        {"date": "Jan 2026", "title": "Interactive Claude Apps", "description": "Live app interfaces inside Claude conversations for Slack, Figma, Canva, Asana, and more.", "tool": "connectors"},
        {"date": "Dec 2025", "title": "Agent Skills Standard", "description": "Open standard for packaging reusable agent skills across Claude.ai, Claude Code, and Agent SDK.", "tool": "agent-sdk"},
        {"date": "Dec 2025", "title": "MCP to Linux Foundation", "description": "MCP is now governed by the Agentic AI Foundation under the Linux Foundation.", "tool": "mcp"},
        {"date": "Nov 2025", "title": "Advanced Tool Use", "description": "Tool Search, Programmatic Tool Calling, and Tool Use Examples for API.", "tool": "claude-api"},
        {"date": "Jul 2025", "title": "AI Connectors Launch", "description": "50+ one-click integrations for Claude.ai, including Gmail, Slack, Notion, Figma.", "tool": "connectors"},
    ]

    for update in updates:
        with st.container(border=True):
            tool_info = registry.get(update["tool"], {})
            st.caption(f"{update['date']} — {tool_info.get('name', update['tool'])}")
            st.markdown(f"**{update['title']}**")
            st.write(update["description"])
