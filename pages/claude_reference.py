"""
Claude Capabilities Reference page: comprehensive, searchable guide to
EVERYTHING Claude can do today, with training docs for each feature.
Auto-updates with new releases.
"""

import streamlit as st
from utils.claude_capabilities import (
    get_all_capabilities,
    get_capability,
    get_capability_list,
    get_total_feature_count,
    search_capabilities,
    LAST_UPDATED,
)


def render():
    st.title("Claude Capabilities Reference")
    st.caption(f"Everything Claude can do today — {get_total_feature_count()} features across {len(get_capability_list())} products | Last updated: {LAST_UPDATED}")

    # ── Search ──────────────────────────────────────────────
    search = st.text_input(
        "Search capabilities",
        placeholder="Search for any feature... (e.g., 'tool use', 'streaming', 'scheduled')",
    )

    if search:
        results = search_capabilities(search)
        if results:
            st.caption(f"Found {len(results)} matches for '{search}'")
            for r in results:
                icon = "📦" if r["type"] == "section" else "⚡"
                with st.container(border=True):
                    st.markdown(f"{icon} **{r['name']}** — _{r['section']}_")
                    st.write(r["description"])

                    # Link to full docs
                    cap = get_capability(r["key"])
                    if cap.get("training_content"):
                        with st.expander("View training docs"):
                            st.markdown(cap["training_content"])
        else:
            st.info(f"No results for '{search}'. Try different keywords.")
        return

    # ── Overview Grid ───────────────────────────────────────
    st.subheader("Product Overview")

    capabilities = get_all_capabilities()
    cap_keys = list(capabilities.keys())

    # 3-column grid
    for row_start in range(0, len(cap_keys), 3):
        cols = st.columns(3)
        for i, col in enumerate(cols):
            idx = row_start + i
            if idx >= len(cap_keys):
                break
            key = cap_keys[idx]
            cap = capabilities[key]
            with col:
                with st.container(border=True):
                    feature_count = len(cap.get("items", []))
                    st.markdown(f"### {cap['title']}")
                    st.write(cap["description"])
                    st.caption(f"{feature_count} features")

    st.divider()

    # ── Detailed View ───────────────────────────────────────
    st.subheader("Detailed Reference")

    selected = st.selectbox(
        "Select a product to explore",
        options=cap_keys,
        format_func=lambda x: capabilities[x]["title"],
    )

    if selected:
        cap = capabilities[selected]

        st.markdown(f"## {cap['title']}")
        st.write(cap["description"])

        # Feature list
        st.markdown("### Features")
        for item in cap.get("items", []):
            with st.container(border=True):
                st.markdown(f"**{item['name']}**")
                st.write(item.get("description", ""))

        # Training content
        if cap.get("training_content"):
            st.divider()
            st.markdown("### Training Guide")
            st.markdown(cap["training_content"])

    # ── Quick Reference Card ────────────────────────────────
    st.divider()
    st.subheader("Quick Decision Guide")

    st.markdown("""
| I want to... | Use this |
|---|---|
| Chat with Claude, upload files, use connectors | **Claude.ai** |
| Get AI coding help in my terminal | **Claude Code** |
| Automate tasks without coding | **Cowork** |
| Connect Claude to my company's tools | **MCP** or **Connectors** |
| Build a custom AI-powered app | **Claude API** |
| Build an autonomous AI agent | **Agent SDK** |
| Search the web with Claude | **Claude.ai** (web search) or **API** (web search tool) |
| Automate code reviews | **Claude Code** (@claude on GitHub) |
| Schedule recurring AI tasks | **Cowork** (scheduled tasks) |
| Get Claude to use my internal tools | **MCP** (custom server) |
""")

    st.divider()
    st.caption(f"This reference is maintained by the Claude Learning Hub. Last updated: {LAST_UPDATED}. New features are added as Claude releases updates.")
