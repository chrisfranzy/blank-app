"""
Claude Capabilities Reference page: comprehensive, searchable guide to
EVERYTHING Claude can do today, with training docs for each feature.
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
    st.title("Claude Reference")
    st.caption(f"{get_total_feature_count()} features across {len(get_capability_list())} products | Updated: {LAST_UPDATED}")

    # ── Search ──────────────────────────────────────────────
    search = st.text_input(
        "Search capabilities",
        placeholder="e.g., 'tool use', 'streaming', 'scheduled'",
    )

    if search:
        results = search_capabilities(search)
        if results:
            st.caption(f"{len(results)} matches for '{search}'")
            for r in results:
                icon = "📦" if r["type"] == "section" else "⚡"
                with st.container(border=True):
                    st.markdown(f"{icon} **{r['name']}** — _{r['section']}_")
                    st.write(r["description"])

                    cap = get_capability(r["key"])
                    if cap.get("training_content"):
                        with st.expander("Training docs"):
                            st.markdown(cap["training_content"])
        else:
            st.info(f"No results for '{search}'. Try different keywords.")
        return

    # ── Overview Grid: 2-col for mobile ─────────────────────
    st.subheader("Product Overview")

    capabilities = get_all_capabilities()
    cap_keys = list(capabilities.keys())

    for row_start in range(0, len(cap_keys), 2):
        cols = st.columns(2)
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
                    st.caption(f"{cap['description'][:80]}...")
                    st.caption(f"{feature_count} features")

    st.divider()

    # ── Detailed View ───────────────────────────────────────
    st.subheader("Detailed Reference")

    selected = st.selectbox(
        "Select a product",
        options=cap_keys,
        format_func=lambda x: capabilities[x]["title"],
    )

    if selected:
        cap = capabilities[selected]

        st.markdown(f"## {cap['title']}")
        st.write(cap["description"])

        st.markdown("### Features")
        for item in cap.get("items", []):
            with st.container(border=True):
                st.markdown(f"**{item['name']}**")
                st.write(item.get("description", ""))

        if cap.get("training_content"):
            st.divider()
            st.markdown("### Training Guide")
            st.markdown(cap["training_content"])

    # ── Quick Reference ─────────────────────────────────────
    st.divider()
    st.subheader("Quick Decision Guide")

    # Render as stacked cards instead of table for mobile
    decisions = [
        ("Chat with Claude, upload files", "**Claude.ai**"),
        ("AI coding in your terminal", "**Claude Code**"),
        ("Automate tasks without code", "**Cowork**"),
        ("Connect Claude to your tools", "**MCP** or **Connectors**"),
        ("Build a custom AI app", "**Claude API**"),
        ("Build an autonomous agent", "**Agent SDK**"),
        ("Automate code reviews", "**Claude Code** (@claude on GitHub)"),
        ("Schedule recurring AI tasks", "**Cowork**"),
    ]

    for want, use in decisions:
        st.markdown(f"- {want} → {use}")

    st.divider()
    st.caption(f"Last updated: {LAST_UPDATED}")
