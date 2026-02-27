"use client";

import { useState } from "react";
import { CheckCircle2, Circle, PlayCircle, Trophy } from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { lessons } from "@/data/lessons";
import { ProgressStatus } from "@/types";

interface PathLesson {
  id: string;
  status: ProgressStatus;
}

export default function PathPage() {
  const [pathLessons] = useState<PathLesson[]>([
    { id: "claude-code-intro", status: "completed" },
    { id: "prompt-engineering", status: "completed" },
    { id: "claude-md-config", status: "completed" },
    { id: "mcp-intro", status: "in_progress" },
    { id: "claude-api-tool-use", status: "in_progress" },
    { id: "slack-bot-automation", status: "not_started" },
    { id: "security-best-practices", status: "not_started" },
    { id: "agent-sdk-intro", status: "not_started" },
  ]);

  const completedCount = pathLessons.filter((p) => p.status === "completed").length;
  const totalCount = pathLessons.length;

  const sections = [
    {
      title: "Completed",
      icon: CheckCircle2,
      iconColor: "text-accent-sage",
      lessons: pathLessons.filter((p) => p.status === "completed"),
    },
    {
      title: "In Progress",
      icon: PlayCircle,
      iconColor: "text-accent-sand",
      lessons: pathLessons.filter((p) => p.status === "in_progress"),
    },
    {
      title: "Up Next",
      icon: Circle,
      iconColor: "text-ink-faint",
      lessons: pathLessons.filter((p) => p.status === "not_started"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          My Path
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Learning journey
        </h1>
        <p className="text-ink-muted mt-2">
          Your personalized path through Claude tools
        </p>
      </div>

      {/* Progress overview */}
      <Card>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-coral/20 to-accent-sand/10 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-accent-coral" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display font-semibold text-ink text-lg">
              {completedCount} of {totalCount} completed
            </p>
            <p className="text-sm text-ink-muted">
              {Math.round((completedCount / totalCount) * 100)}% of your path
            </p>
          </div>
        </div>
        <ProgressBar value={completedCount} max={totalCount} />
      </Card>

      {/* Sections */}
      {sections.map((section) => {
        if (section.lessons.length === 0) return null;
        return (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <section.icon
                className={`w-5 h-5 ${section.iconColor}`}
                strokeWidth={1.5}
              />
              <h2 className="text-lg font-display font-semibold text-ink">
                {section.title}
              </h2>
              <span className="text-sm text-ink-faint font-mono">
                ({section.lessons.length})
              </span>
            </div>
            <div className="space-y-3 stagger">
              {section.lessons.map((pathLesson) => {
                const lesson = lessons.find((l) => l.id === pathLesson.id);
                if (!lesson) return null;
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    progress={pathLesson.status}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
