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
  ArrowUpRight,
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
      className="group block card-surface-hover hover-lift p-5 md:p-6 relative overflow-hidden"
    >
      {/* Subtle gradient hover glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/[0.03] rounded-full blur-2xl translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-start justify-between gap-3 mb-3 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-3/60 flex items-center justify-center flex-shrink-0 group-hover:bg-surface-4/60 transition-colors">
            <ToolIcon className="w-5 h-5 text-ink-muted" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-medium text-ink text-[15px] leading-tight group-hover:text-accent-coral-light transition-colors line-clamp-2">
              {lesson.title}
            </h3>
            <p className="text-xs text-ink-faint mt-0.5 font-mono">
              {lesson.toolName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {progress === "completed" && (
            <span className="text-accent-sage text-[11px] font-medium bg-accent-sage/10 px-2.5 py-1 rounded-full">
              Done
            </span>
          )}
          {progress === "in_progress" && (
            <span className="text-accent-sand text-[11px] font-medium bg-accent-sand/10 px-2.5 py-1 rounded-full">
              In progress
            </span>
          )}
          <ArrowUpRight className="w-4 h-4 text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {!compact && (
        <p className="text-sm text-ink-muted mb-4 line-clamp-2 leading-relaxed relative">
          {lesson.summary}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap relative">
        <Badge className={cn("text-[11px]", getDifficultyColor(lesson.difficulty))}>
          {lesson.difficulty}
        </Badge>
        <Badge className={cn("text-[11px]", getCategoryColor(lesson.category))}>
          {lesson.category}
        </Badge>
        <span className="flex items-center gap-1 text-[11px] text-ink-faint ml-auto font-mono">
          <Clock className="w-3 h-3" />
          {lesson.estimatedMinutes}m
        </span>
      </div>
    </Link>
  );
}
