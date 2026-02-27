"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons, getAllTools } from "@/data/lessons";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
  const [activeTool, setActiveTool] = useState<string>("All");
  const tools = ["All", ...getAllTools()];

  const filtered =
    activeTool === "All"
      ? lessons
      : lessons.filter((l) => l.toolName === activeTool);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Lesson Library
        </h1>
        <p className="text-zinc-400 mt-1">
          Browse all {lessons.length} lessons by tool
        </p>
      </div>

      {/* Tool tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTool === tool
                ? "bg-brand-400/15 text-brand-300 border border-brand-400/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            )}
          >
            {tool}
          </button>
        ))}
      </div>

      {/* Lessons */}
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {filtered.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
