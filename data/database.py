"""
Database layer using SQLAlchemy with SQLite for the learning tool.
Stores users, integrations, lessons, activity signals, and learning progress.
"""

import json
import os
from datetime import datetime, timezone
from sqlalchemy import (
    create_engine, Column, Integer, String, Text, Boolean,
    DateTime, ForeignKey, Float, Table
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

DB_PATH = os.environ.get("LEARNING_TOOL_DB", "data/learning_tool.db")

Base = declarative_base()

# Many-to-many: lessons <-> tags
lesson_tags = Table(
    "lesson_tags", Base.metadata,
    Column("lesson_id", Integer, ForeignKey("lessons.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)

# Many-to-many: users who bookmarked lessons
user_bookmarks = Table(
    "user_bookmarks", Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("lesson_id", Integer, ForeignKey("lessons.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(50), default="member")  # admin, member
    team = Column(String(255), default="")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    integrations = relationship("Integration", back_populates="user")
    progress = relationship("LearningProgress", back_populates="user")
    activity_signals = relationship("ActivitySignal", back_populates="user")
    bookmarked_lessons = relationship("Lesson", secondary=user_bookmarks, back_populates="bookmarked_by")


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String(50), nullable=False)  # slack, email, hubspot, linear, github
    credentials_json = Column(Text, default="{}")  # encrypted in production
    is_active = Column(Boolean, default=True)
    last_synced = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="integrations")

    def get_credentials(self):
        return json.loads(self.credentials_json) if self.credentials_json else {}

    def set_credentials(self, creds: dict):
        self.credentials_json = json.dumps(creds)


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    summary = Column(Text, default="")
    content_markdown = Column(Text, nullable=False)
    tool_name = Column(String(100), default="")  # claude-code, mcp, api, cowork, etc.
    category = Column(String(100), default="general")  # automation, workflow, coding, communication
    difficulty = Column(String(20), default="beginner")  # beginner, intermediate, advanced
    source = Column(String(50), default="system")  # system, community, ai-generated, user
    author_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    is_shared = Column(Boolean, default=True)
    is_published = Column(Boolean, default=True)
    relevance_score = Column(Float, default=0.5)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    tags = relationship("Tag", secondary=lesson_tags, back_populates="lessons")
    bookmarked_by = relationship("User", secondary=user_bookmarks, back_populates="bookmarked_lessons")
    progress_records = relationship("LearningProgress", back_populates="lesson")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)

    lessons = relationship("Lesson", secondary=lesson_tags, back_populates="tags")


class ActivitySignal(Base):
    """
    Captures what users are actually doing across connected platforms.
    Used to personalize which lessons to recommend.
    """
    __tablename__ = "activity_signals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String(50), nullable=False)
    signal_type = Column(String(100), nullable=False)  # e.g. "asked_about", "struggling_with", "using_tool", "mentioned_topic"
    content_summary = Column(Text, default="")
    raw_context = Column(Text, default="")
    detected_tools = Column(Text, default="[]")  # JSON list of tool names detected
    detected_topics = Column(Text, default="[]")  # JSON list of topics detected
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="activity_signals")

    def get_detected_tools(self):
        return json.loads(self.detected_tools) if self.detected_tools else []

    def get_detected_topics(self):
        return json.loads(self.detected_topics) if self.detected_topics else []


class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    status = Column(String(20), default="not_started")  # not_started, in_progress, completed
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    notes = Column(Text, default="")
    rating = Column(Integer, nullable=True)  # 1-5 user rating of the lesson

    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress_records")


class ToolUpdate(Base):
    """Tracks updates to Claude tools/features from official sources."""
    __tablename__ = "tool_updates"

    id = Column(Integer, primary_key=True, autoincrement=True)
    tool_name = Column(String(100), nullable=False)
    version = Column(String(50), default="")
    title = Column(String(500), nullable=False)
    description = Column(Text, default="")
    source_url = Column(String(1000), default="")
    detected_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    lesson_generated = Column(Boolean, default=False)


def get_engine():
    os.makedirs(os.path.dirname(DB_PATH) if os.path.dirname(DB_PATH) else ".", exist_ok=True)
    return create_engine(f"sqlite:///{DB_PATH}", echo=False)


def get_session():
    engine = get_engine()
    Session = sessionmaker(bind=engine)
    return Session()


def init_db():
    engine = get_engine()
    Base.metadata.create_all(engine)
    return engine
