"""Dashboard page: overview of learning progress, recommendations, and activity."""

import streamlit as st
import json
from data.database import get_session, User, Lesson, ActivitySignal, LearningProgress
from utils.learning_engine import LearningEngine


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")
    user = session.query(User).get(user_id) if user_id else None

    if not user:
        st.warning("No user found. Go to Settings to create a profile.")
        session.close()
        return

    st.title(f"Welcome back, {user.name.split()[0]}")
    st.caption("Your personalized Claude tools learning dashboard")

    engine = LearningEngine(session)

    # ── Metrics Row ─────────────────────────────────────────
    score = engine.calculate_user_score(user_id)
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Lessons Completed", score["completed"])
    with col2:
        st.metric("In Progress", score["in_progress"])
    with col3:
        st.metric("Completion %", f"{score['completion_pct']}%")
    with col4:
        signal_count = session.query(ActivitySignal).filter_by(user_id=user_id).count()
        st.metric("Activity Signals", signal_count)

    st.divider()

    # ── Personalized Recommendations ────────────────────────
    col_left, col_right = st.columns([2, 1])

    with col_left:
        st.subheader("Recommended For You")

        recommendations = engine.recommend_lessons(user_id, limit=5)
        if recommendations:
            for i, rec in enumerate(recommendations):
                lesson = rec["lesson"]
                with st.container(border=True):
                    rcol1, rcol2 = st.columns([5, 1])
                    with rcol1:
                        difficulty_colors = {"beginner": "green", "intermediate": "orange", "advanced": "red"}
                        badge_color = difficulty_colors.get(lesson.difficulty, "gray")
                        st.markdown(f"**{lesson.title}**")
                        st.caption(f":{badge_color}[{lesson.difficulty}] | {lesson.tool_name} | Score: {rec['score']}")
                        st.write(lesson.summary)
                        st.caption(f"💡 {rec['reason']}")
                    with rcol2:
                        if st.button("Start", key=f"start_{lesson.id}"):
                            # Mark as in progress
                            progress = session.query(LearningProgress).filter_by(
                                user_id=user_id, lesson_id=lesson.id
                            ).first()
                            if not progress:
                                from datetime import datetime, timezone
                                progress = LearningProgress(
                                    user_id=user_id,
                                    lesson_id=lesson.id,
                                    status="in_progress",
                                    started_at=datetime.now(timezone.utc),
                                )
                                session.add(progress)
                                session.commit()
                            st.rerun()
        else:
            st.info("Connect your tools in the Integrations page to get personalized recommendations, or load demo data from the sidebar.")

    with col_right:
        st.subheader("Recent Activity")

        signals = (
            session.query(ActivitySignal)
            .filter_by(user_id=user_id)
            .order_by(ActivitySignal.timestamp.desc())
            .limit(8)
            .all()
        )

        if signals:
            for signal in signals:
                platform_icons = {
                    "slack": "💬", "email": "📧",
                    "hubspot": "📊", "linear": "📋",
                }
                icon = platform_icons.get(signal.platform, "📌")
                with st.container(border=True):
                    st.caption(f"{icon} **{signal.platform}** — {signal.signal_type}")
                    st.write(signal.content_summary[:120] + ("..." if len(signal.content_summary) > 120 else ""))
        else:
            st.caption("No activity signals yet. Connect your tools or load demo data.")

    # ── Category Progress ───────────────────────────────────
    if score["category_breakdown"]:
        st.divider()
        st.subheader("Progress by Category")
        cols = st.columns(len(score["category_breakdown"]))
        for i, (cat, count) in enumerate(score["category_breakdown"].items()):
            with cols[i]:
                st.metric(cat.replace("-", " ").title(), f"{count} lessons")

    session.close()
