"use client";

import { useState } from "react";
import { Route, CheckCircle2, Circle, PlayCircle, Trophy } from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { Card } from "@/components/ui/card";
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
      iconColor: "text-emerald-400",
      lessons: pathLessons.filter((p) => p.status === "completed"),
    },
    {
      title: "In Progress",
      icon: PlayCircle,
      iconColor: "text-amber-400",
      lessons: pathLessons.filter((p) => p.status === "in_progress"),
    },
    {
      title: "Up Next",
      icon: Circle,
      iconColor: "text-zinc-500",
      lessons: pathLessons.filter((p) => p.status === "not_started"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          My Learning Path
        </h1>
        <p className="text-zinc-400 mt-1">
          Your personalized journey through Claude tools
        </p>
      </div>

      {/* Progress overview */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-400/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="font-medium text-white">
              {completedCount} of {totalCount} completed
            </p>
            <p className="text-sm text-zinc-400">
              {Math.round((completedCount / totalCount) * 100)}% of your path
            </p>
          </div>
        </div>
        <ProgressBar value={completedCount} max={totalCount} />
      </Card>

      {/* Path sections */}
      {sections.map((section) => {
        if (section.lessons.length === 0) return null;
        return (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <section.icon className={`w-5 h-5 ${section.iconColor}`} />
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>
              <span className="text-sm text-zinc-500">
                ({section.lessons.length})
              </span>
            </div>
            <div className="space-y-3">
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
