"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  PlayCircle,
  Terminal,
  Monitor,
  Plug,
  Code,
  Link as LinkIcon,
  Bot,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { getLessonById } from "@/data/lessons";
import { LessonContent } from "@/components/lessons/lesson-content";
import { Badge } from "@/components/ui/badge";
import { cn, getDifficultyColor, getCategoryColor } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getLessonProgress, setLessonProgress } from "@/lib/storage";
import { ProgressStatus } from "@/types";

const toolIcons: Record<string, React.ElementType> = {
  Claude: MessageCircle,
  "Claude Code": Terminal,
  "Claude Cowork": Monitor,
  MCP: Plug,
  "Claude API": Code,
  "AI Connectors": LinkIcon,
  "Agent SDK": Bot,
};

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lesson = getLessonById(params.id as string);
  const [status, setStatus] = useState<ProgressStatus>("not_started");

  // Load progress from localStorage on mount
  useEffect(() => {
    if (!lesson) return;
    const progress = getLessonProgress(lesson.id);
    if (progress) {
      setStatus(progress.status);
    }
  }, [lesson]);

  function handleStatusChange(newStatus: ProgressStatus) {
    if (!lesson) return;
    setStatus(newStatus);
    setLessonProgress(lesson.id, newStatus);
  }

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto text-center py-24">
        <p className="text-ink-muted text-lg font-display">Lesson not found</p>
        <button
          onClick={() => router.push("/library")}
          className="mt-4 text-accent-coral hover:text-accent-coral-light transition-colors"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const ToolIcon = toolIcons[lesson.toolName] || Code;

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      {/* Header */}
      <div className="mb-10 relative">
        <div className="absolute -top-8 -right-16 w-48 h-48 bg-accent-coral/[0.04] rounded-full blur-3xl" />

        <div className="flex items-center gap-3 mb-5 relative">
          <div className="w-11 h-11 rounded-xl bg-surface-3/50 flex items-center justify-center">
            <ToolIcon className="w-5 h-5 text-ink-muted" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-mono text-ink-faint uppercase tracking-[0.15em]">
            {lesson.toolName}
          </span>
          {lesson.skilljarCourse && (
            <span className="text-xs text-ink-faint">
              &middot; {lesson.skilljarCourse}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-4xl font-display font-bold text-ink tracking-tight mb-4 relative">
          {lesson.title}
        </h1>
        <p className="text-ink-muted text-lg leading-relaxed relative">
          {lesson.summary}
        </p>

        <div className="flex items-center gap-3 mt-5 flex-wrap relative">
          <Badge className={cn(getDifficultyColor(lesson.difficulty))}>
            {lesson.difficulty}
          </Badge>
          <Badge className={cn(getCategoryColor(lesson.category))}>
            {lesson.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-sm text-ink-faint font-mono">
            <Clock className="w-4 h-4" />
            {lesson.estimatedMinutes} min
          </span>
          {lesson.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action */}
        <div className="flex gap-3 mt-8 relative flex-wrap">
          {status === "not_started" && (
            <button
              onClick={() => handleStatusChange("in_progress")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-coral to-accent-sand text-surface-0 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity glow-coral"
            >
              <PlayCircle className="w-4 h-4" />
              Start Lesson
            </button>
          )}
          {status === "in_progress" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="flex items-center gap-2 px-6 py-3 bg-accent-sage text-surface-0 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark Complete
            </button>
          )}
          {status === "completed" && (
            <div className="flex items-center gap-2 px-6 py-3 bg-accent-sage/10 text-accent-sage rounded-xl font-medium text-sm border border-accent-sage/20">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
          )}

          {lesson.skilljarUrl && (
            <a
              href={lesson.skilljarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-surface-2 text-ink-muted hover:text-ink rounded-xl font-medium text-sm border border-surface-3 hover:border-surface-4 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Full Course on Anthropic Academy
            </a>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-surface-3 to-transparent mb-10" />

      {/* Content */}
      <div className="card-surface p-6 md:p-10">
        <LessonContent lesson={lesson} />
      </div>
    </div>
  );
}
