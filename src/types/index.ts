export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category = "automation" | "coding" | "communication" | "best-practices" | "workflow";
export type ProgressStatus = "not_started" | "in_progress" | "completed";

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
  toolName: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  estimatedMinutes: number;
  createdAt: string;
  skilljarUrl?: string;
  skilljarCourse?: string;
}

export interface UserProgress {
  lessonId: string;
  status: ProgressStatus;
  completedAt?: string;
  rating?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  team: string;
  avatar?: string;
}

export interface ActivitySignal {
  id: string;
  platform: "slack" | "email" | "hubspot" | "linear" | "github";
  signalType: string;
  content: string;
  detectedTools: string[];
  detectedTopics: string[];
  timestamp: string;
}

export interface Integration {
  platform: string;
  connected: boolean;
  icon: string;
  description: string;
  lastSync?: string;
}

export interface ToolInfo {
  name: string;
  description: string;
  features: string[];
  icon: string;
  category: string;
}

export interface TeamInsight {
  metric: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  detail: string;
}

export interface Recommendation {
  lesson: Lesson;
  score: number;
  reason: string;
}
