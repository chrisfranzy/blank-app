"""Settings page: user profile, team management, and lesson creation."""

import streamlit as st
from datetime import datetime, timezone
from data.database import get_session, User, Lesson, Tag


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")
    user = session.query(User).get(user_id) if user_id else None

    st.title("Settings")

    # ── User Profile ────────────────────────────────────────
    st.subheader("Your Profile")

    if user:
        new_name = st.text_input("Name", value=user.name)
        new_email = st.text_input("Email", value=user.email)
        new_team = st.text_input("Team", value=user.team or "")
        st.text_input("Role", value=user.role, disabled=True)

        if st.button("Update Profile", use_container_width=True):
            user.name = new_name
            user.email = new_email
            user.team = new_team
            session.commit()
            st.success("Profile updated!")
    else:
        st.warning("No user profile found.")

    st.divider()

    # ── Add Team Members ────────────────────────────────────
    st.subheader("Team Management")
    st.caption("Add team members for personalized learning paths")

    with st.expander("Add New Team Member"):
        member_name = st.text_input("Name", key="new_member_name")
        member_email = st.text_input("Email", key="new_member_email")
        member_team = st.text_input("Team", value=user.team if user else "", key="new_member_team")
        member_role = st.selectbox("Role", ["member", "admin"], key="new_member_role")

        if st.button("Add Member", use_container_width=True):
            if member_name and member_email:
                existing = session.query(User).filter_by(email=member_email).first()
                if existing:
                    st.error("A user with that email already exists.")
                else:
                    new_user = User(
                        name=member_name,
                        email=member_email,
                        team=member_team,
                        role=member_role,
                    )
                    session.add(new_user)
                    session.commit()
                    st.success(f"Added {member_name}!")
                    st.rerun()
            else:
                st.error("Name and email are required.")

    all_users = session.query(User).all()
    if len(all_users) > 1:
        st.caption(f"{len(all_users)} team members")
        for u in all_users:
            st.text(f"  {u.name} ({u.email}) — {u.team} — {u.role}")

    st.divider()

    # ── Create Shared Lesson ────────────────────────────────
    st.subheader("Create a Shared Lesson")
    st.caption("Share what you've learned with your team")

    with st.expander("New Lesson"):
        lesson_title = st.text_input("Title", key="new_lesson_title")
        lesson_summary = st.text_area("Summary", key="new_lesson_summary", height=68)
        lesson_content = st.text_area(
            "Content (Markdown)",
            key="new_lesson_content",
            height=250,
            placeholder="# My Lesson\n\nWrite your lesson here...\n\n## Steps\n1. First...\n2. Then...",
        )

        lesson_tool = st.selectbox(
            "Related Tool",
            ["general", "claude-code", "cowork", "mcp", "claude-api", "hubspot", "linear", "gmail", "slack", "workflow"],
            key="new_lesson_tool",
        )
        lesson_category = st.selectbox(
            "Category",
            ["automation", "workflow", "coding", "communication", "best-practices", "project-management", "general"],
            key="new_lesson_category",
        )
        lesson_difficulty = st.selectbox(
            "Difficulty",
            ["beginner", "intermediate", "advanced"],
            key="new_lesson_difficulty",
        )

        lesson_tags = st.text_input("Tags (comma-separated)", key="new_lesson_tags", placeholder="automation, slack, workflow")

        if st.button("Publish Lesson", use_container_width=True):
            if lesson_title and lesson_content:
                lesson = Lesson(
                    title=lesson_title,
                    summary=lesson_summary,
                    content_markdown=lesson_content,
                    tool_name=lesson_tool,
                    category=lesson_category,
                    difficulty=lesson_difficulty,
                    source="user",
                    author_id=user_id,
                    is_shared=True,
                    is_published=True,
                    relevance_score=0.6,
                )

                if lesson_tags:
                    for tag_name in [t.strip() for t in lesson_tags.split(",") if t.strip()]:
                        tag = session.query(Tag).filter_by(name=tag_name).first()
                        if not tag:
                            tag = Tag(name=tag_name)
                            session.add(tag)
                        lesson.tags.append(tag)

                session.add(lesson)
                session.commit()
                st.success(f"Lesson '{lesson_title}' published!")
                st.rerun()
            else:
                st.error("Title and content are required.")

    st.divider()

    # ── API Key ─────────────────────────────────────────────
    st.subheader("API Configuration")
    st.caption("Required for AI-powered lesson generation")

    anthropic_key = st.text_input(
        "Anthropic API Key",
        type="password",
        value=st.session_state.get("anthropic_api_key", ""),
    )
    if anthropic_key:
        st.session_state.anthropic_api_key = anthropic_key
        st.success("API key saved for this session.")

    st.divider()

    # ── Data Management ─────────────────────────────────────
    st.subheader("Data Management")

    if st.button("Reset Demo Data", use_container_width=True):
        from data.database import ActivitySignal
        session.query(ActivitySignal).filter_by(user_id=user_id).delete()
        session.commit()
        st.session_state.demo_signals_loaded = False
        st.success("Demo data cleared.")
        st.rerun()

    lesson_count = session.query(Lesson).count()
    user_count = session.query(User).count()
    st.caption(f"Database: {lesson_count} lessons, {user_count} users")

    session.close()
