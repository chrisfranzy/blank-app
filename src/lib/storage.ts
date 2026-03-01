"use client";

import { ProgressStatus, UserProgress } from "@/types";

// ── Keys ──
const KEYS = {
  progress: "claude-hub:progress",
  settings: "claude-hub:settings",
  streak: "claude-hub:streak",
} as const;

// ── Progress ──

export function getProgress(): Record<string, UserProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEYS.progress);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getLessonProgress(lessonId: string): UserProgress | null {
  const all = getProgress();
  return all[lessonId] ?? null;
}

export function setLessonProgress(lessonId: string, status: ProgressStatus): void {
  const all = getProgress();
  all[lessonId] = {
    lessonId,
    status,
    completedAt: status === "completed" ? new Date().toISOString() : all[lessonId]?.completedAt,
  };
  localStorage.setItem(KEYS.progress, JSON.stringify(all));

  // Update streak on completion
  if (status === "completed") {
    updateStreak();
  }
}

export function resetAllProgress(): void {
  localStorage.removeItem(KEYS.progress);
  localStorage.removeItem(KEYS.streak);
}

export function getCompletedLessonIds(): string[] {
  const all = getProgress();
  return Object.values(all)
    .filter((p) => p.status === "completed")
    .map((p) => p.lessonId);
}

export function getInProgressLessonIds(): string[] {
  const all = getProgress();
  return Object.values(all)
    .filter((p) => p.status === "in_progress")
    .map((p) => p.lessonId);
}

// ── Streak ──

interface StreakData {
  currentStreak: number;
  lastActivityDate: string; // YYYY-MM-DD
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(KEYS.streak);
    if (!raw) return 0;
    const data: StreakData = JSON.parse(raw);
    const today = todayStr();
    const yesterday = yesterdayStr();

    if (data.lastActivityDate === today) return data.currentStreak;
    if (data.lastActivityDate === yesterday) return data.currentStreak; // still valid until end of today
    return 0; // streak broken
  } catch {
    return 0;
  }
}

function updateStreak(): void {
  try {
    const raw = localStorage.getItem(KEYS.streak);
    const today = todayStr();
    const yesterday = yesterdayStr();

    if (!raw) {
      localStorage.setItem(KEYS.streak, JSON.stringify({ currentStreak: 1, lastActivityDate: today }));
      return;
    }

    const data: StreakData = JSON.parse(raw);

    if (data.lastActivityDate === today) {
      // Already counted today
      return;
    }

    if (data.lastActivityDate === yesterday) {
      // Consecutive day
      data.currentStreak += 1;
    } else {
      // Streak broken, start fresh
      data.currentStreak = 1;
    }

    data.lastActivityDate = today;
    localStorage.setItem(KEYS.streak, JSON.stringify(data));
  } catch {
    localStorage.setItem(KEYS.streak, JSON.stringify({ currentStreak: 1, lastActivityDate: todayStr() }));
  }
}

// ── Settings ──

export interface UserSettings {
  name: string;
  email: string;
  team: string;
  role: "admin" | "member";
  notifications: {
    newLessons: boolean;
    toolUpdates: boolean;
    teamActivity: boolean;
    weeklyDigest: boolean;
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  name: "",
  email: "",
  team: "Engineering",
  role: "member",
  notifications: {
    newLessons: true,
    toolUpdates: true,
    teamActivity: false,
    weeklyDigest: true,
  },
};

export function getSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(KEYS.settings);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}
