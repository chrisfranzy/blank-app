"use client";

import { useState } from "react";
import { Zap, BookOpen, Trophy, Target, ArrowRight, Activity } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons } from "@/data/lessons";
import { demoSignals } from "@/data/demo-signals";
import Link from "next/link";

export default function DashboardPage() {
  // Demo state - in production this would come from a database
  const [completedLessons] = useState<string[]>(["claude-code-intro", "prompt-engineering"]);
  const [inProgressLessons] = useState<string[]>(["mcp-intro", "claude-api-tool-use"]);

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const inProgressCount = inProgressLessons.length;
  const completionPercent = Math.round((completedCount / totalLessons) * 100);

  // Get recommended lessons (ones not started yet)
  const recommended = lessons
    .filter(
      (l) =>
        !completedLessons.includes(l.id) && !inProgressLessons.includes(l.id)
    )
    .slice(0, 3);

  // Recent activity signals
  const recentSignals = demoSignals.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">
          Your personalized Claude tools learning overview
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          label="Completed"
          value={completedCount}
          trend="up"
          detail={`of ${totalLessons} lessons`}
        />
        <MetricCard
          label="In Progress"
          value={inProgressCount}
          trend="stable"
          detail="active lessons"
        />
        <MetricCard
          label="Streak"
          value="5d"
          trend="up"
          detail="learning streak"
        />
        <MetricCard
          label="Score"
          value={`${completionPercent}%`}
          trend="up"
          detail="completion rate"
        />
      </div>

      {/* Overall progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-400" />
            <span className="font-medium text-white">Overall Progress</span>
          </div>
          <span className="text-sm text-zinc-400">
            {completedCount}/{totalLessons} lessons
          </span>
        </div>
        <ProgressBar value={completedCount} max={totalLessons} />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Coding", count: 2, total: 5, color: "bg-sky-400" },
            { label: "Automation", count: 1, total: 6, color: "bg-violet-400" },
            { label: "Best Practices", count: 1, total: 3, color: "bg-amber-400" },
          ].map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
                <span>{cat.label}</span>
                <span>
                  {cat.count}/{cat.total}
                </span>
              </div>
              <ProgressBar value={cat.count} max={cat.total} color={cat.color} />
            </div>
          ))}
        </div>
      </Card>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recommended lessons */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">
                Recommended for You
              </h2>
            </div>
            <Link
              href="/discover"
              className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recommended.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            {recentSignals.map((signal) => (
              <Card key={signal.id} className="p-3">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      signal.platform === "slack"
                        ? "bg-purple-400"
                        : signal.platform === "email"
                        ? "bg-sky-400"
                        : signal.platform === "linear"
                        ? "bg-violet-400"
                        : signal.platform === "hubspot"
                        ? "bg-orange-400"
                        : "bg-zinc-400"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-300 line-clamp-2">
                      {signal.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-zinc-500 capitalize">
                        {signal.platform}
                      </span>
                      <span className="text-xs text-zinc-600">&middot;</span>
                      <span className="text-xs text-zinc-500">
                        {signal.detectedTools[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
