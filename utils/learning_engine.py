"""
Personalized learning engine: recommends lessons based on user activity signals,
current skill level, team patterns, and tool updates.
"""

import json
from collections import Counter
from datetime import datetime, timezone, timedelta
from typing import Optional


class LearningEngine:
    """
    Recommends personalized lessons by analyzing:
    1. Activity signals from connected platforms (what the user is actually doing)
    2. Learning progress (what they've already learned)
    3. Team-wide patterns (what the team needs)
    4. New tool updates (what's new to learn)
    """

    def __init__(self, db_session):
        self.session = db_session

    def get_user_profile(self, user_id: int) -> dict:
        """Build a learning profile for a user based on their activity and progress."""
        from data.database import User, ActivitySignal, LearningProgress, Lesson

        user = self.session.query(User).get(user_id)
        if not user:
            return {}

        # Gather activity signals
        signals = (
            self.session.query(ActivitySignal)
            .filter(ActivitySignal.user_id == user_id)
            .order_by(ActivitySignal.timestamp.desc())
            .limit(100)
            .all()
        )

        # Gather learning progress
        progress = (
            self.session.query(LearningProgress)
            .filter(LearningProgress.user_id == user_id)
            .all()
        )

        # Analyze what tools/topics the user interacts with most
        tool_mentions = Counter()
        topic_mentions = Counter()
        for signal in signals:
            for tool in signal.get_detected_tools():
                tool_mentions[tool] += 1
            for topic in signal.get_detected_topics():
                topic_mentions[topic] += 1

        # Track completed vs. available lessons
        completed_ids = {p.lesson_id for p in progress if p.status == "completed"}
        in_progress_ids = {p.lesson_id for p in progress if p.status == "in_progress"}

        return {
            "user_id": user_id,
            "name": user.name,
            "team": user.team,
            "top_tools": tool_mentions.most_common(5),
            "top_topics": topic_mentions.most_common(5),
            "completed_lesson_count": len(completed_ids),
            "in_progress_lesson_count": len(in_progress_ids),
            "completed_ids": completed_ids,
            "in_progress_ids": in_progress_ids,
            "signal_count": len(signals),
            "help_seeking_count": sum(1 for s in signals if s.signal_type == "asked_about"),
        }

    def recommend_lessons(self, user_id: int, limit: int = 5) -> list[dict]:
        """
        Get personalized lesson recommendations for a user.
        Scoring:
          - Higher score if lesson matches user's active tools/topics
          - Higher score if user has been asking questions about related topics
          - Lower score if already completed
          - Boost for new/updated content
        """
        from data.database import Lesson, LearningProgress, ActivitySignal

        profile = self.get_user_profile(user_id)
        if not profile:
            return self._get_default_recommendations(limit)

        all_lessons = self.session.query(Lesson).filter(Lesson.is_published == True).all()

        scored_lessons = []
        for lesson in all_lessons:
            if lesson.id in profile["completed_ids"]:
                continue  # Skip completed lessons

            score = lesson.relevance_score or 0.5

            # Boost if lesson matches user's active tools
            for tool, count in profile["top_tools"]:
                if tool == lesson.tool_name or tool in (lesson.category or ""):
                    score += min(count * 0.15, 1.0)

            # Boost if lesson matches user's active topics
            for topic, count in profile["top_topics"]:
                if topic in (lesson.category or "") or topic in (lesson.title or "").lower():
                    score += min(count * 0.1, 0.7)

            # Boost in-progress lessons (user started but didn't finish)
            if lesson.id in profile["in_progress_ids"]:
                score += 0.5

            # Boost beginner content for users with few completions
            if profile["completed_lesson_count"] < 3 and lesson.difficulty == "beginner":
                score += 0.3

            # Boost advanced content for experienced users
            if profile["completed_lesson_count"] > 10 and lesson.difficulty == "advanced":
                score += 0.2

            # Boost newer lessons
            if lesson.created_at and lesson.created_at > datetime.now(timezone.utc) - timedelta(days=7):
                score += 0.3

            scored_lessons.append({
                "lesson": lesson,
                "score": round(score, 2),
                "reason": self._explain_recommendation(lesson, profile),
            })

        scored_lessons.sort(key=lambda x: x["score"], reverse=True)
        return scored_lessons[:limit]

    def _explain_recommendation(self, lesson, profile: dict) -> str:
        """Generate a human-readable explanation for why a lesson is recommended."""
        reasons = []

        for tool, count in profile["top_tools"]:
            if tool == lesson.tool_name:
                reasons.append(f"You've been using {tool} frequently")
                break

        for topic, count in profile["top_topics"]:
            if topic in (lesson.category or ""):
                reasons.append(f"Matches your interest in {topic}")
                break

        if lesson.id in profile["in_progress_ids"]:
            reasons.append("You started this lesson — pick up where you left off")

        if profile["help_seeking_count"] > 3 and lesson.difficulty == "beginner":
            reasons.append("Covers fundamentals you've been asking about")

        if not reasons:
            reasons.append("Recommended for your team")

        return " | ".join(reasons)

    def _get_default_recommendations(self, limit: int) -> list[dict]:
        """Get default recommendations for new users."""
        from data.database import Lesson

        lessons = (
            self.session.query(Lesson)
            .filter(Lesson.is_published == True, Lesson.difficulty == "beginner")
            .order_by(Lesson.relevance_score.desc())
            .limit(limit)
            .all()
        )
        return [
            {"lesson": l, "score": l.relevance_score or 0.5, "reason": "Great starting point"}
            for l in lessons
        ]

    def get_team_insights(self, team: str = "") -> dict:
        """
        Analyze team-wide patterns to identify common learning needs.
        This powers the shared lessons / team dashboard.
        """
        from data.database import ActivitySignal, LearningProgress, User

        query = self.session.query(ActivitySignal)
        if team:
            user_ids = [u.id for u in self.session.query(User).filter(User.team == team).all()]
            query = query.filter(ActivitySignal.user_id.in_(user_ids))

        signals = query.all()

        # Aggregate across team
        tool_mentions = Counter()
        topic_mentions = Counter()
        help_requests = Counter()

        for signal in signals:
            for tool in signal.get_detected_tools():
                tool_mentions[tool] += 1
            for topic in signal.get_detected_topics():
                topic_mentions[topic] += 1
            if signal.signal_type == "asked_about":
                help_requests[signal.content_summary[:50]] += 1

        return {
            "team": team or "All",
            "total_signals": len(signals),
            "top_tools": tool_mentions.most_common(10),
            "top_topics": topic_mentions.most_common(10),
            "common_questions": help_requests.most_common(10),
            "automation_opportunities": sum(
                1 for s in signals if s.signal_type == "automation_opportunity"
            ),
        }

    def calculate_user_score(self, user_id: int) -> dict:
        """Calculate a learning score / progress summary for a user."""
        from data.database import LearningProgress, Lesson

        progress = (
            self.session.query(LearningProgress)
            .filter(LearningProgress.user_id == user_id)
            .all()
        )

        total_lessons = self.session.query(Lesson).filter(Lesson.is_published == True).count()
        completed = sum(1 for p in progress if p.status == "completed")
        in_progress = sum(1 for p in progress if p.status == "in_progress")

        # Calculate category breakdown
        category_progress = {}
        for p in progress:
            if p.status == "completed" and p.lesson:
                cat = p.lesson.category or "general"
                category_progress[cat] = category_progress.get(cat, 0) + 1

        return {
            "total_available": total_lessons,
            "completed": completed,
            "in_progress": in_progress,
            "completion_pct": round(completed / max(total_lessons, 1) * 100, 1),
            "category_breakdown": category_progress,
        }
