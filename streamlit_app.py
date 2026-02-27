"""
Claude Learning Hub — Personalized AI tool training for your team.

Replaces repetitive weekly training sessions with a living, personalized
learning platform that watches what your team actually does and teaches
them how to use Claude tools to automate and improve their work.
"""

import streamlit as st
import json
import os
import sys
from datetime import datetime, timezone

# ── Page Config ─────────────────────────────────────────────
st.set_page_config(
    page_title="Claude Learning Hub",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Initialize DB ───────────────────────────────────────────
from data.database import init_db, get_session, User, Lesson, Tag, ActivitySignal, LearningProgress
from data.seed_lessons import SEED_LESSONS
from utils.knowledge_updater import get_tool_registry

def initialize_app():
    """First-run setup: create tables and seed data."""
    if "db_initialized" not in st.session_state:
        init_db()
        session = get_session()

        # Seed lessons if empty
        if session.query(Lesson).count() == 0:
            for lesson_data in SEED_LESSONS:
                ld = {k: v for k, v in lesson_data.items() if k != "tags"}
                tags_list = lesson_data.get("tags", [])
                lesson = Lesson(**ld, source="system")
                lesson.relevance_score = 0.7

                for tag_name in tags_list:
                    tag = session.query(Tag).filter_by(name=tag_name).first()
                    if not tag:
                        tag = Tag(name=tag_name)
                        session.add(tag)
                    lesson.tags.append(tag)

                session.add(lesson)
            session.commit()

        # Create demo user if none exist
        if session.query(User).count() == 0:
            demo_user = User(
                email="demo@yourcompany.com",
                name="Demo User",
                role="admin",
                team="Engineering",
            )
            session.add(demo_user)
            session.commit()

        session.close()
        st.session_state.db_initialized = True

initialize_app()

# ── Session State Defaults ──────────────────────────────────
if "current_user_id" not in st.session_state:
    session = get_session()
    user = session.query(User).first()
    st.session_state.current_user_id = user.id if user else None
    session.close()

if "demo_signals_loaded" not in st.session_state:
    st.session_state.demo_signals_loaded = False

# ── Load Demo Signals ──────────────────────────────────────
def load_demo_signals():
    """Load demo activity signals so users can see the platform in action."""
    if st.session_state.demo_signals_loaded:
        return

    from integrations.slack_connector import DEMO_SIGNALS as SLACK_SIGNALS
    from integrations.email_connector import DEMO_SIGNALS as EMAIL_SIGNALS
    from integrations.hubspot_connector import DEMO_SIGNALS as HUBSPOT_SIGNALS
    from integrations.linear_connector import DEMO_SIGNALS as LINEAR_SIGNALS

    session = get_session()
    user_id = st.session_state.current_user_id

    all_signals = SLACK_SIGNALS + EMAIL_SIGNALS + HUBSPOT_SIGNALS + LINEAR_SIGNALS
    for sig in all_signals:
        activity = ActivitySignal(
            user_id=user_id,
            platform=sig["platform"],
            signal_type=sig["signal_type"],
            content_summary=sig["content_summary"],
            detected_tools=json.dumps(sig.get("detected_tools", [])),
            detected_topics=json.dumps(sig.get("detected_topics", [])),
        )
        session.add(activity)

    session.commit()
    session.close()
    st.session_state.demo_signals_loaded = True


# ── Sidebar Navigation ─────────────────────────────────────
st.sidebar.title("Claude Learning Hub")
st.sidebar.caption("Personalized AI training for your team")

page = st.sidebar.radio(
    "Navigate",
    [
        "Dashboard",
        "My Learning Path",
        "Discover",
        "Lesson Library",
        "Claude Reference",
        "Team Insights",
        "Integrations",
        "Tool Updates",
        "Settings",
    ],
    index=0,
)

st.sidebar.divider()

# User switcher
session = get_session()
users = session.query(User).all()
user_names = {u.id: f"{u.name} ({u.email})" for u in users}
session.close()

if user_names:
    selected_user = st.sidebar.selectbox(
        "Current User",
        options=list(user_names.keys()),
        format_func=lambda x: user_names[x],
        index=0,
    )
    st.session_state.current_user_id = selected_user

# Demo data loader
st.sidebar.divider()
if st.sidebar.button("Load Demo Data", help="Load sample activity signals to see the platform in action"):
    load_demo_signals()
    st.sidebar.success("Demo data loaded!")
    st.rerun()

# ── Pages ───────────────────────────────────────────────────

if page == "Dashboard":
    from pages import dashboard
    dashboard.render()

elif page == "My Learning Path":
    from pages import learning_path
    learning_path.render()

elif page == "Discover":
    from pages import discover
    discover.render()

elif page == "Lesson Library":
    from pages import lesson_library
    lesson_library.render()

elif page == "Claude Reference":
    from pages import claude_reference
    claude_reference.render()

elif page == "Team Insights":
    from pages import team_insights
    team_insights.render()

elif page == "Integrations":
    from pages import integrations_page
    integrations_page.render()

elif page == "Tool Updates":
    from pages import tool_updates
    tool_updates.render()

elif page == "Settings":
    from pages import settings
    settings.render()
