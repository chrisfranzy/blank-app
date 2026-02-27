"""Team Insights: shared learning patterns, common questions, and team-wide progress."""

import streamlit as st
import json
from data.database import get_session, User, Lesson, ActivitySignal, LearningProgress
from utils.learning_engine import LearningEngine


def render():
    session = get_session()

    st.title("Team Insights")
    st.caption("See what your team is learning, where they need help, and share knowledge")

    engine = LearningEngine(session)

    # ── Team Filter ─────────────────────────────────────────
    teams = sorted(set(u.team for u in session.query(User).all() if u.team))
    selected_team = st.selectbox("Team", ["All"] + teams)
    team_filter = "" if selected_team == "All" else selected_team

    insights = engine.get_team_insights(team_filter)

    # ── Team Metrics ────────────────────────────────────────
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Activity Signals", insights["total_signals"])
    with col2:
        st.metric("Automation Opportunities", insights["automation_opportunities"])
    with col3:
        member_count = session.query(User).count() if not team_filter else session.query(User).filter_by(team=team_filter).count()
        st.metric("Team Members", member_count)

    st.divider()

    # ── Top Tools & Topics ──────────────────────────────────
    col_left, col_right = st.columns(2)

    with col_left:
        st.subheader("Most Used Tools")
        if insights["top_tools"]:
            for tool, count in insights["top_tools"]:
                st.progress(min(count / max(insights["top_tools"][0][1], 1), 1.0), text=f"{tool}: {count} mentions")
        else:
            st.caption("No tool activity detected yet. Connect integrations and load data.")

    with col_right:
        st.subheader("Hot Topics")
        if insights["top_topics"]:
            for topic, count in insights["top_topics"]:
                st.progress(min(count / max(insights["top_topics"][0][1], 1), 1.0), text=f"{topic}: {count} mentions")
        else:
            st.caption("No topic activity detected yet.")

    st.divider()

    # ── Common Questions (from Slack/Email) ─────────────────
    st.subheader("What People Are Asking About")
    st.caption("Questions and struggles detected across your connected platforms")

    help_signals = (
        session.query(ActivitySignal)
        .filter(ActivitySignal.signal_type.in_(["asked_about", "struggling_with"]))
        .order_by(ActivitySignal.timestamp.desc())
        .limit(10)
        .all()
    )

    if help_signals:
        for signal in help_signals:
            platform_icons = {"slack": "💬", "email": "📧", "hubspot": "📊", "linear": "📋"}
            icon = platform_icons.get(signal.platform, "📌")
            with st.container(border=True):
                st.markdown(f"{icon} **{signal.platform}**")
                st.write(signal.content_summary)
                tools = signal.get_detected_tools()
                topics = signal.get_detected_topics()
                if tools or topics:
                    tags = " ".join([f"`{t}`" for t in tools + topics])
                    st.caption(f"Related: {tags}")
    else:
        st.info("No questions detected yet. Connect Slack or other platforms to see what your team is asking about.")

    st.divider()

    # ── Team Leaderboard ────────────────────────────────────
    st.subheader("Learning Leaderboard")

    users = session.query(User).all()
    if team_filter:
        users = [u for u in users if u.team == team_filter]

    leaderboard = []
    for user in users:
        score = engine.calculate_user_score(user.id)
        leaderboard.append({
            "Name": user.name,
            "Team": user.team,
            "Completed": score["completed"],
            "In Progress": score["in_progress"],
            "Completion %": score["completion_pct"],
        })

    leaderboard.sort(key=lambda x: x["Completed"], reverse=True)

    if leaderboard:
        st.dataframe(leaderboard, use_container_width=True, hide_index=True)
    else:
        st.caption("No team members found.")

    # ── Shared Lessons ──────────────────────────────────────
    st.divider()
    st.subheader("Shared Team Lessons")
    st.caption("Lessons created by team members for the team")

    shared = session.query(Lesson).filter(
        Lesson.is_shared == True,
        Lesson.source == "user",
    ).all()

    if shared:
        for lesson in shared:
            with st.expander(f"📝 {lesson.title} (by user #{lesson.author_id})"):
                st.write(lesson.summary)
                st.markdown(lesson.content_markdown)
    else:
        st.info("No shared lessons yet. Team members can create lessons from the Settings page.")

    session.close()
