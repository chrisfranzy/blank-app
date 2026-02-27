"use client";

import { useState } from "react";
import { Target, ArrowRight, Activity } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons } from "@/data/lessons";
import { demoSignals } from "@/data/demo-signals";
import Link from "next/link";

const platformColors: Record<string, string> = {
  slack: "bg-accent-lavender",
  email: "bg-accent-sage",
  linear: "bg-accent-coral",
  hubspot: "bg-accent-sand",
  github: "bg-ink-faint",
};

export default function DashboardPage() {
  const [completedLessons] = useState(["claude-code-intro", "prompt-engineering"]);
  const [inProgressLessons] = useState(["mcp-intro", "claude-api-tool-use"]);

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const inProgressCount = inProgressLessons.length;
  const completionPercent = Math.round((completedCount / totalLessons) * 100);

  const recommended = lessons
    .filter(
      (l) =>
        !completedLessons.includes(l.id) && !inProgressLessons.includes(l.id)
    )
    .slice(0, 3);

  const recentSignals = demoSignals.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero header */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent-coral/[0.04] rounded-full blur-3xl" />
        <div className="absolute -top-5 right-20 w-40 h-40 bg-accent-sage/[0.03] rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
            Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
            Welcome back,{" "}
            <span className="text-gradient-coral">Chris</span>
          </h1>
          <p className="text-ink-muted mt-2 text-[15px] max-w-lg">
            You&apos;re making great progress. Here&apos;s where you left off.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 stagger">
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

      {/* Progress section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Overall Progress</CardTitle>
          <span className="text-sm text-ink-muted font-mono">
            {completedCount}/{totalLessons}
          </span>
        </div>
        <ProgressBar value={completedCount} max={totalLessons} />
        <div className="grid grid-cols-3 gap-5 mt-5">
          {[
            { label: "Coding", count: 2, total: 5, color: "bg-accent-sage" },
            { label: "Automation", count: 1, total: 6, color: "bg-accent-lavender" },
            { label: "Practices", count: 1, total: 3, color: "bg-accent-sand" },
          ].map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-xs text-ink-muted mb-2">
                <span className="font-mono uppercase tracking-wider text-[10px]">
                  {cat.label}
                </span>
                <span>{cat.count}/{cat.total}</span>
              </div>
              <ProgressBar value={cat.count} max={cat.total} color={cat.color} />
            </div>
          ))}
        </div>
      </Card>

      {/* Two-column: recommendations + activity */}
      <div className="grid lg:grid-cols-5 gap-5 md:gap-8">
        {/* Recommended */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Target className="w-5 h-5 text-accent-coral" strokeWidth={1.5} />
              <h2 className="text-lg font-display font-semibold text-ink">
                Recommended
              </h2>
            </div>
            <Link
              href="/discover"
              className="text-sm text-accent-coral hover:text-accent-coral-light flex items-center gap-1 transition-colors"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3 stagger">
            {recommended.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-accent-sage" strokeWidth={1.5} />
            <h2 className="text-lg font-display font-semibold text-ink">
              Activity
            </h2>
          </div>
          <div className="space-y-2.5 stagger">
            {recentSignals.map((signal) => (
              <Card key={signal.id} className="p-3.5">
                <div className="flex items-start gap-3">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      platformColors[signal.platform] || "bg-ink-faint"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-ink/80 line-clamp-2 leading-relaxed">
                      {signal.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-ink-faint font-mono uppercase tracking-wider">
                        {signal.platform}
                      </span>
                      <span className="text-ink-faint">&middot;</span>
                      <span className="text-[10px] text-ink-faint">
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
