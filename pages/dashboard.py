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

    # ── Metrics Row (2x2 grid on mobile via CSS) ────────────
    score = engine.calculate_user_score(user_id)
    signal_count = session.query(ActivitySignal).filter_by(user_id=user_id).count()

    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.metric("Completed", score["completed"])
    with m2:
        st.metric("In Progress", score["in_progress"])
    with m3:
        st.metric("Completion", f"{score['completion_pct']}%")
    with m4:
        st.metric("Signals", signal_count)

    st.divider()

    # ── Personalized Recommendations (stacks on mobile) ─────
    st.subheader("Recommended For You")

    recommendations = engine.recommend_lessons(user_id, limit=5)
    if recommendations:
        for i, rec in enumerate(recommendations):
            lesson = rec["lesson"]
            with st.container(border=True):
                difficulty_colors = {"beginner": "green", "intermediate": "orange", "advanced": "red"}
                badge_color = difficulty_colors.get(lesson.difficulty, "gray")
                st.markdown(f"**{lesson.title}**")
                st.caption(f":{badge_color}[{lesson.difficulty}] | {lesson.tool_name} | Score: {rec['score']}")
                st.write(lesson.summary)
                st.caption(f"💡 {rec['reason']}")
                if st.button("Start Learning", key=f"start_{lesson.id}", use_container_width=True):
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

    st.divider()

    # ── Recent Activity (full-width, stacks naturally) ──────
    st.subheader("Recent Activity")

    signals = (
        session.query(ActivitySignal)
        .filter_by(user_id=user_id)
        .order_by(ActivitySignal.timestamp.desc())
        .limit(6)
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
                st.write(signal.content_summary[:150] + ("..." if len(signal.content_summary) > 150 else ""))
    else:
        st.caption("No activity signals yet. Connect your tools or load demo data.")

    # ── Category Progress ───────────────────────────────────
    if score["category_breakdown"]:
        st.divider()
        st.subheader("Progress by Category")
        # Use 2 columns max to work on mobile
        items = list(score["category_breakdown"].items())
        for row_start in range(0, len(items), 2):
            cols = st.columns(2)
            for j, col in enumerate(cols):
                idx = row_start + j
                if idx < len(items):
                    cat, count = items[idx]
                    with col:
                        st.metric(cat.replace("-", " ").title(), f"{count} lessons")

    session.close()
