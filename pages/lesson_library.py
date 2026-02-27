"""Lesson Library: browse, search, and filter all available lessons."""

import streamlit as st
from datetime import datetime, timezone
from data.database import get_session, Lesson, Tag, LearningProgress


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")

    st.title("Lesson Library")
    st.caption("Browse all available Claude tools training materials")

    # ── Filters ─────────────────────────────────────────────
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        search_query = st.text_input("Search", placeholder="Search lessons...")

    with col2:
        tool_filter = st.selectbox(
            "Tool",
            ["All"] + sorted(set(
                l.tool_name for l in session.query(Lesson).all() if l.tool_name
            )),
        )

    with col3:
        category_filter = st.selectbox(
            "Category",
            ["All"] + sorted(set(
                l.category for l in session.query(Lesson).all() if l.category
            )),
        )

    with col4:
        difficulty_filter = st.selectbox(
            "Difficulty",
            ["All", "beginner", "intermediate", "advanced"],
        )

    # ── Query ───────────────────────────────────────────────
    query = session.query(Lesson).filter(Lesson.is_published == True)

    if search_query:
        query = query.filter(
            Lesson.title.ilike(f"%{search_query}%")
            | Lesson.summary.ilike(f"%{search_query}%")
            | Lesson.content_markdown.ilike(f"%{search_query}%")
        )

    if tool_filter != "All":
        query = query.filter(Lesson.tool_name == tool_filter)

    if category_filter != "All":
        query = query.filter(Lesson.category == category_filter)

    if difficulty_filter != "All":
        query = query.filter(Lesson.difficulty == difficulty_filter)

    lessons = query.order_by(Lesson.relevance_score.desc()).all()

    # ── User progress lookup ────────────────────────────────
    progress_map = {}
    if user_id:
        all_progress = session.query(LearningProgress).filter_by(user_id=user_id).all()
        progress_map = {p.lesson_id: p.status for p in all_progress}

    # ── Display ─────────────────────────────────────────────
    st.caption(f"Showing {len(lessons)} lessons")

    for lesson in lessons:
        status = progress_map.get(lesson.id, "not_started")
        status_icon = {"not_started": "📘", "in_progress": "📖", "completed": "✅"}.get(status, "📘")

        with st.expander(f"{status_icon} {lesson.title}"):
            meta_col, action_col = st.columns([4, 1])

            with meta_col:
                difficulty_colors = {"beginner": "green", "intermediate": "orange", "advanced": "red"}
                badge = difficulty_colors.get(lesson.difficulty, "gray")
                st.caption(
                    f":{badge}[{lesson.difficulty}] | **{lesson.tool_name}** | {lesson.category} | "
                    f"Source: {lesson.source}"
                )
                st.write(lesson.summary)

                # Show tags
                if lesson.tags:
                    tag_str = " ".join([f"`{t.name}`" for t in lesson.tags])
                    st.caption(f"Tags: {tag_str}")

            with action_col:
                if status == "not_started":
                    if st.button("Start Learning", key=f"lib_start_{lesson.id}"):
                        progress = LearningProgress(
                            user_id=user_id,
                            lesson_id=lesson.id,
                            status="in_progress",
                            started_at=datetime.now(timezone.utc),
                        )
                        session.add(progress)
                        session.commit()
                        st.rerun()
                elif status == "in_progress":
                    st.caption("📖 In Progress")
                    if st.button("Complete", key=f"lib_complete_{lesson.id}"):
                        p = session.query(LearningProgress).filter_by(
                            user_id=user_id, lesson_id=lesson.id
                        ).first()
                        if p:
                            p.status = "completed"
                            p.completed_at = datetime.now(timezone.utc)
                            session.commit()
                        st.rerun()
                else:
                    st.caption("✅ Completed")

            # Full content
            st.divider()
            st.markdown(lesson.content_markdown)

    session.close()
