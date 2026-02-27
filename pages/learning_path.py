"""My Learning Path: shows the user's in-progress and completed lessons with full content."""

import streamlit as st
from datetime import datetime, timezone
from data.database import get_session, User, Lesson, LearningProgress


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")

    st.title("My Learning Path")
    st.caption("Track your progress through Claude tools training")

    # ── In Progress ─────────────────────────────────────────
    in_progress = (
        session.query(LearningProgress)
        .filter_by(user_id=user_id, status="in_progress")
        .all()
    )

    if in_progress:
        st.subheader(f"In Progress ({len(in_progress)})")
        for progress in in_progress:
            lesson = progress.lesson
            if not lesson:
                continue
            with st.expander(f"📖 {lesson.title}", expanded=True):
                col1, col2 = st.columns([4, 1])
                with col1:
                    st.caption(f"{lesson.difficulty} | {lesson.tool_name} | {lesson.category}")
                    st.markdown(lesson.content_markdown)
                with col2:
                    if st.button("Mark Complete ✓", key=f"complete_{lesson.id}"):
                        progress.status = "completed"
                        progress.completed_at = datetime.now(timezone.utc)
                        session.commit()
                        st.rerun()

                    st.divider()
                    rating = st.slider(
                        "Rate this lesson",
                        min_value=1, max_value=5, value=progress.rating or 3,
                        key=f"rate_{lesson.id}",
                    )
                    if rating != progress.rating:
                        progress.rating = rating
                        session.commit()

                    st.divider()
                    notes = st.text_area(
                        "Your notes",
                        value=progress.notes or "",
                        key=f"notes_{lesson.id}",
                        height=100,
                    )
                    if notes != (progress.notes or ""):
                        progress.notes = notes
                        session.commit()
    else:
        st.info("No lessons in progress. Visit the Dashboard or Lesson Library to start learning!")

    st.divider()

    # ── Completed ───────────────────────────────────────────
    completed = (
        session.query(LearningProgress)
        .filter_by(user_id=user_id, status="completed")
        .all()
    )

    if completed:
        st.subheader(f"Completed ({len(completed)})")
        for progress in completed:
            lesson = progress.lesson
            if not lesson:
                continue
            with st.expander(f"✅ {lesson.title}"):
                st.caption(f"{lesson.difficulty} | {lesson.tool_name} | Completed: {progress.completed_at}")
                if progress.rating:
                    st.caption(f"Your rating: {'⭐' * progress.rating}")
                if progress.notes:
                    st.caption(f"Your notes: {progress.notes}")
                st.markdown(lesson.content_markdown)

                # Allow re-opening
                if st.button("Review Again", key=f"reopen_{lesson.id}"):
                    progress.status = "in_progress"
                    progress.completed_at = None
                    session.commit()
                    st.rerun()
    else:
        st.caption("No completed lessons yet. Keep going!")

    session.close()
