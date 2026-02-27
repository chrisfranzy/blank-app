"""
Discover page: external use cases from X/Twitter and the community,
retrofitted for Franzy employees. Plus AI-generated custom lessons.
"""

import streamlit as st
import json
from datetime import datetime, timezone
from data.database import get_session, User, Lesson, Tag, ActivitySignal, LearningProgress
from utils.usecase_discovery import UseCaseDiscoveryEngine, DISCOVERED_USECASES
from utils.lesson_generator import LessonGenerator


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")
    user = session.query(User).get(user_id) if user_id else None

    st.title("Discover")
    st.caption("Cool Claude use cases from the community, adapted for your specific workflow")

    tab1, tab2, tab3 = st.tabs([
        "Trending Use Cases",
        "Personalized For You",
        "Generate Custom Lesson",
    ])

    # ── Tab 1: Trending Use Cases ───────────────────────────
    with tab1:
        st.subheader("What people are building with Claude")
        st.caption("Real use cases from X, adapted for Franzy employees")

        # Filters
        col1, col2 = st.columns(2)
        with col1:
            tool_filter = st.selectbox(
                "Filter by tool",
                ["All", "claude-code", "cowork", "claude-api", "mcp"],
                key="discover_tool_filter",
            )
        with col2:
            cat_filter = st.selectbox(
                "Filter by category",
                ["All", "coding", "automation", "communication", "reporting", "workflow", "project-management"],
                key="discover_cat_filter",
            )

        engine = UseCaseDiscoveryEngine(
            api_key=st.session_state.get("anthropic_api_key", ""),
        )

        usecases = engine.get_curated_usecases(
            tool_filter="" if tool_filter == "All" else tool_filter,
            category_filter="" if cat_filter == "All" else cat_filter,
        )

        for uc in usecases:
            with st.container(border=True):
                col_main, col_side = st.columns([4, 1])

                with col_main:
                    st.markdown(f"### {uc['title']}")
                    st.caption(f"Source: {uc['source']} by {uc['author']} | {uc.get('engagement', '')}")
                    st.write(uc["description"])

                    tags = " ".join([f"`{t}`" for t in uc.get("tags", [])])
                    st.caption(f"Tags: {tags}")

                with col_side:
                    difficulty_colors = {"beginner": "green", "intermediate": "orange", "advanced": "red"}
                    st.caption(f":{difficulty_colors.get(uc.get('difficulty', ''), 'gray')}[{uc.get('difficulty', '')}]")
                    st.caption(f"Tool: **{uc['tool']}**")

                # Expandable code example
                with st.expander("See the implementation"):
                    st.markdown(uc.get("example_code", "No code example available."))

                # Adapt for me button
                if user:
                    if st.button(f"Adapt This For Me", key=f"adapt_{uc['id']}"):
                        with st.spinner("Building a personalized version for you..."):
                            signals = (
                                session.query(ActivitySignal)
                                .filter_by(user_id=user_id)
                                .order_by(ActivitySignal.timestamp.desc())
                                .limit(20)
                                .all()
                            )

                            signal_dicts = [
                                {
                                    "platform": s.platform,
                                    "signal_type": s.signal_type,
                                    "content_summary": s.content_summary,
                                    "detected_tools": s.get_detected_tools(),
                                    "detected_topics": s.get_detected_topics(),
                                }
                                for s in signals
                            ]

                            user_profile = {
                                "name": user.name,
                                "team": user.team,
                                "role": user.role,
                            }

                            generator = LessonGenerator(
                                api_key=st.session_state.get("anthropic_api_key", ""),
                            )

                            lesson_data = generator.retrofit_external_usecase(
                                original_usecase=uc,
                                user_profile=user_profile,
                                user_signals=signal_dicts,
                            )

                            # Save as a lesson
                            new_lesson = Lesson(
                                title=lesson_data["title"],
                                summary=lesson_data["summary"],
                                content_markdown=lesson_data["content_markdown"],
                                tool_name=lesson_data["tool_name"],
                                category=lesson_data["category"],
                                difficulty=lesson_data["difficulty"],
                                source="ai-generated",
                                author_id=user_id,
                                is_shared=lesson_data.get("is_shared", True),
                                is_published=True,
                                relevance_score=0.9,
                            )

                            for tag_name in uc.get("tags", []):
                                tag = session.query(Tag).filter_by(name=tag_name).first()
                                if not tag:
                                    tag = Tag(name=tag_name)
                                    session.add(tag)
                                new_lesson.tags.append(tag)

                            session.add(new_lesson)

                            # Auto-start learning
                            progress = LearningProgress(
                                user_id=user_id,
                                lesson_id=new_lesson.id,
                                status="in_progress",
                                started_at=datetime.now(timezone.utc),
                            )
                            session.add(progress)
                            session.commit()

                            st.success(f"Custom lesson created and added to your learning path!")
                            st.rerun()

    # ── Tab 2: Personalized Matches ─────────────────────────
    with tab2:
        st.subheader("Matched to Your Activity")
        st.caption("Use cases picked because they match what you're actually doing")

        if not user:
            st.warning("Sign in to see personalized recommendations.")
        else:
            signals = (
                session.query(ActivitySignal)
                .filter_by(user_id=user_id)
                .order_by(ActivitySignal.timestamp.desc())
                .limit(50)
                .all()
            )

            if not signals:
                st.info("Connect your tools and load activity data to get personalized matches. Use 'Load Demo Data' in the sidebar to try it out.")
            else:
                signal_dicts = [
                    {
                        "platform": s.platform,
                        "signal_type": s.signal_type,
                        "content_summary": s.content_summary,
                        "detected_tools": s.get_detected_tools(),
                        "detected_topics": s.get_detected_topics(),
                    }
                    for s in signals
                ]

                engine = UseCaseDiscoveryEngine()
                matches = engine.match_usecases_to_user(signal_dicts, limit=5)

                for match in matches:
                    uc = match["usecase"]
                    score = match["relevance_score"]

                    with st.container(border=True):
                        st.markdown(f"### {uc['title']}")
                        st.caption(f"Relevance score: **{score}** | {uc['source']} by {uc['author']}")
                        st.write(uc["description"])

                        with st.expander("Implementation"):
                            st.markdown(uc.get("example_code", ""))

                        if st.button("Adapt For Me", key=f"match_adapt_{uc['id']}"):
                            st.info("Click 'Adapt This For Me' in the Trending tab to generate a personalized lesson.")

    # ── Tab 3: Generate Custom Lesson ───────────────────────
    with tab3:
        st.subheader("Generate a Custom Lesson")
        st.caption("AI builds a lesson specifically for your workflow, based on what your connected tools reveal about your work")

        if not user:
            st.warning("Sign in to generate custom lessons.")
        else:
            # Get signals for analysis
            signals = (
                session.query(ActivitySignal)
                .filter_by(user_id=user_id)
                .order_by(ActivitySignal.timestamp.desc())
                .limit(30)
                .all()
            )

            signal_dicts = [
                {
                    "platform": s.platform,
                    "signal_type": s.signal_type,
                    "content_summary": s.content_summary,
                    "detected_tools": s.get_detected_tools(),
                    "detected_topics": s.get_detected_topics(),
                }
                for s in signals
            ]

            user_profile = {
                "name": user.name,
                "team": user.team,
                "role": user.role,
                "completed_lesson_titles": [],
            }

            # Get completed lessons
            completed = (
                session.query(LearningProgress)
                .filter_by(user_id=user_id, status="completed")
                .all()
            )
            user_profile["completed_lesson_titles"] = [
                p.lesson.title for p in completed if p.lesson
            ]

            generator = LessonGenerator(
                api_key=st.session_state.get("anthropic_api_key", ""),
            )

            # Analyze signals and suggest lessons
            if signals:
                st.markdown("#### Based on your activity, here's what we recommend:")

                suggestions = generator.analyze_user_signals(user_profile, signal_dicts)

                for i, suggestion in enumerate(suggestions):
                    with st.container(border=True):
                        col1, col2 = st.columns([4, 1])
                        with col1:
                            st.markdown(f"**{suggestion['lesson_title']}**")
                            st.write(f"You're currently: {suggestion['manual_task']}")
                            st.caption(f"Tool: **{suggestion['claude_tool']}** | Est. time saved: **{suggestion['time_saved']}** | Priority: **{suggestion['priority']}**")
                        with col2:
                            if st.button("Generate", key=f"gen_{i}"):
                                with st.spinner("Building your custom lesson..."):
                                    lesson_data = generator.generate_custom_lesson(
                                        user_profile=user_profile,
                                        lesson_title=suggestion["lesson_title"],
                                        claude_tool=suggestion["claude_tool"],
                                        manual_task=suggestion["manual_task"],
                                        relevant_signals=signal_dicts,
                                        category=suggestion.get("category", "automation"),
                                    )

                                    new_lesson = Lesson(
                                        title=lesson_data["title"],
                                        summary=lesson_data["summary"],
                                        content_markdown=lesson_data["content_markdown"],
                                        tool_name=lesson_data["tool_name"],
                                        category=lesson_data["category"],
                                        difficulty=lesson_data["difficulty"],
                                        source="ai-generated",
                                        author_id=user_id,
                                        is_shared=False,
                                        is_published=True,
                                        relevance_score=0.95,
                                    )
                                    session.add(new_lesson)

                                    progress = LearningProgress(
                                        user_id=user_id,
                                        lesson_id=new_lesson.id,
                                        status="in_progress",
                                        started_at=datetime.now(timezone.utc),
                                    )
                                    session.add(progress)
                                    session.commit()

                                    st.success("Custom lesson created! Check your Learning Path.")
                                    st.rerun()
            else:
                st.info("Load demo data or connect your tools to generate personalized lessons.")

            st.divider()

            # Manual lesson request
            st.markdown("#### Or tell us what you want to learn:")
            custom_request = st.text_area(
                "Describe what you want to automate or learn about:",
                placeholder="e.g., 'I spend 2 hours every Monday compiling sales numbers from HubSpot into a Slack message for my team. How can I automate this with Claude?'",
                height=100,
            )

            custom_tool = st.selectbox(
                "Related Claude tool (optional)",
                ["auto-detect", "claude-code", "cowork", "mcp", "claude-api", "connectors"],
                key="custom_gen_tool",
            )

            if st.button("Generate Custom Lesson", key="gen_custom"):
                if custom_request:
                    with st.spinner("Creating your personalized lesson..."):
                        tool = custom_tool if custom_tool != "auto-detect" else "cowork"

                        lesson_data = generator.generate_custom_lesson(
                            user_profile=user_profile,
                            lesson_title=f"Custom: {custom_request[:80]}",
                            claude_tool=tool,
                            manual_task=custom_request,
                            relevant_signals=signal_dicts,
                        )

                        new_lesson = Lesson(
                            title=lesson_data["title"],
                            summary=lesson_data["summary"],
                            content_markdown=lesson_data["content_markdown"],
                            tool_name=lesson_data["tool_name"],
                            category=lesson_data["category"],
                            difficulty=lesson_data["difficulty"],
                            source="ai-generated",
                            author_id=user_id,
                            is_shared=False,
                            is_published=True,
                            relevance_score=0.95,
                        )
                        session.add(new_lesson)

                        progress = LearningProgress(
                            user_id=user_id,
                            lesson_id=new_lesson.id,
                            status="in_progress",
                            started_at=datetime.now(timezone.utc),
                        )
                        session.add(progress)
                        session.commit()

                        st.success("Custom lesson created! Check your Learning Path.")
                        st.rerun()
                else:
                    st.error("Please describe what you want to learn about.")

    session.close()
