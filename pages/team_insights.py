"""Team Insights: shared learning patterns, common questions, and team-wide progress."""

import streamlit as st
import json
from data.database import get_session, User, Lesson, ActivitySignal, LearningProgress
from utils.learning_engine import LearningEngine


def render():
    session = get_session()

    st.title("Team Insights")
    st.caption("What your team is learning, where they need help, and shared knowledge")

    engine = LearningEngine(session)

    # ── Team Filter ─────────────────────────────────────────
    teams = sorted(set(u.team for u in session.query(User).all() if u.team))
    selected_team = st.selectbox("Team", ["All"] + teams)
    team_filter = "" if selected_team == "All" else selected_team

    insights = engine.get_team_insights(team_filter)

    # ── Team Metrics (stacks 2-up on mobile via CSS) ────────
    m1, m2, m3 = st.columns(3)
    with m1:
        st.metric("Signals", insights["total_signals"])
    with m2:
        st.metric("Opportunities", insights["automation_opportunities"])
    with m3:
        member_count = session.query(User).count() if not team_filter else session.query(User).filter_by(team=team_filter).count()
        st.metric("Members", member_count)

    st.divider()

    # ── Top Tools & Topics (stacks on mobile) ───────────────
    st.subheader("Most Used Tools")
    if insights["top_tools"]:
        for tool, count in insights["top_tools"]:
            st.progress(min(count / max(insights["top_tools"][0][1], 1), 1.0), text=f"{tool}: {count} mentions")
    else:
        st.caption("No tool activity yet. Connect integrations and load data.")

    st.subheader("Hot Topics")
    if insights["top_topics"]:
        for topic, count in insights["top_topics"]:
            st.progress(min(count / max(insights["top_topics"][0][1], 1), 1.0), text=f"{topic}: {count} mentions")
    else:
        st.caption("No topic activity yet.")

    st.divider()

    # ── Common Questions ────────────────────────────────────
    st.subheader("What People Are Asking")
    st.caption("Questions detected across connected platforms")

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
        st.info("No questions detected yet. Connect Slack or other platforms.")

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
            "Done": score["completed"],
            "Active": score["in_progress"],
            "%": score["completion_pct"],
        })

    leaderboard.sort(key=lambda x: x["Done"], reverse=True)

    if leaderboard:
        st.dataframe(leaderboard, use_container_width=True, hide_index=True)
    else:
        st.caption("No team members found.")

    # ── Shared Lessons ──────────────────────────────────────
    st.divider()
    st.subheader("Shared Team Lessons")

    shared = session.query(Lesson).filter(
        Lesson.is_shared == True,
        Lesson.source == "user",
    ).all()

    if shared:
        for lesson in shared:
            with st.expander(f"📝 {lesson.title}"):
                st.write(lesson.summary)
                st.markdown(lesson.content_markdown)
    else:
        st.info("No shared lessons yet. Create one from Settings.")

    session.close()
