"use client";

import { useState, useEffect } from "react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons, getAllTools } from "@/data/lessons";
import { cn } from "@/lib/utils";
import { getProgress } from "@/lib/storage";
import { ProgressStatus } from "@/types";

export default function LibraryPage() {
  const [activeTool, setActiveTool] = useState("All");
  const [progressMap, setProgressMap] = useState<Record<string, ProgressStatus>>({});
  const tools = ["All", ...getAllTools()];

  useEffect(() => {
    const allProgress = getProgress();
    const map: Record<string, ProgressStatus> = {};
    for (const [id, p] of Object.entries(allProgress)) {
      map[id] = p.status;
    }
    setProgressMap(map);
  }, []);

  const filtered =
    activeTool === "All"
      ? lessons
      : lessons.filter((l) => l.toolName === activeTool);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Library
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          All lessons
        </h1>
        <p className="text-ink-muted mt-2">
          {lessons.length} lessons across {getAllTools().length} tools
        </p>
      </div>

      {/* Tool tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
              activeTool === tool
                ? "bg-accent-coral/12 text-accent-coral border border-accent-coral/20"
                : "bg-surface-2/50 text-ink-muted hover:text-ink border border-surface-3 hover:border-surface-4"
            )}
          >
            {tool}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 stagger">
        {filtered.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            progress={progressMap[lesson.id]}
          />
        ))}
      </div>
    </div>
  );
}
