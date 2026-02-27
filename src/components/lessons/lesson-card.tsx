"use client";

import Link from "next/link";
import {
  Clock,
  Terminal,
  Monitor,
  Plug,
  Code,
  Link as LinkIcon,
  Bot,
  Bookmark,
} from "lucide-react";
import { Lesson } from "@/types";
import { cn, getDifficultyColor, getCategoryColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const toolIcons: Record<string, React.ElementType> = {
  "Claude Code": Terminal,
  "Claude Cowork": Monitor,
  MCP: Plug,
  "Claude API": Code,
  "AI Connectors": LinkIcon,
  "Agent SDK": Bot,
};

interface LessonCardProps {
  lesson: Lesson;
  progress?: "not_started" | "in_progress" | "completed";
  compact?: boolean;
}

export function LessonCard({ lesson, progress, compact }: LessonCardProps) {
  const ToolIcon = toolIcons[lesson.toolName] || Code;

  return (
    <Link
      href={`/library/${lesson.id}`}
      className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/80 transition-colors">
            <ToolIcon className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-white text-sm md:text-base leading-tight group-hover:text-brand-300 transition-colors line-clamp-2">
              {lesson.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">{lesson.toolName}</p>
          </div>
        </div>
        {progress === "completed" && (
          <span className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
            Done
          </span>
        )}
        {progress === "in_progress" && (
          <span className="text-amber-400 text-xs font-medium bg-amber-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
            In progress
          </span>
        )}
      </div>

      {!compact && (
        <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
          {lesson.summary}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={cn("text-[11px]", getDifficultyColor(lesson.difficulty))}>
          {lesson.difficulty}
        </Badge>
        <Badge className={cn("text-[11px]", getCategoryColor(lesson.category))}>
          {lesson.category}
        </Badge>
        <span className="flex items-center gap-1 text-xs text-zinc-500 ml-auto">
          <Clock className="w-3.5 h-3.5" />
          {lesson.estimatedMinutes}m
        </span>
      </div>
    </Link>
  );
}
