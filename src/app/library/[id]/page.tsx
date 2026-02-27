"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Terminal,
  Monitor,
  Plug,
  Code,
  Link as LinkIcon,
  Bot,
} from "lucide-react";
import { getLessonById } from "@/data/lessons";
import { LessonContent } from "@/components/lessons/lesson-content";
import { Badge } from "@/components/ui/badge";
import { cn, getDifficultyColor, getCategoryColor } from "@/lib/utils";
import { useState } from "react";

const toolIcons: Record<string, React.ElementType> = {
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
  const [status, setStatus] = useState<"not_started" | "in_progress" | "completed">("not_started");

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-zinc-400 text-lg">Lesson not found</p>
        <button
          onClick={() => router.push("/library")}
          className="mt-4 text-brand-400 hover:text-brand-300"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const ToolIcon = toolIcons[lesson.toolName] || Code;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Lesson header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            <ToolIcon className="w-5 h-5 text-zinc-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-500">{lesson.toolName}</p>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {lesson.title}
        </h1>
        <p className="text-zinc-400 text-lg">{lesson.summary}</p>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <Badge className={cn(getDifficultyColor(lesson.difficulty))}>
            {lesson.difficulty}
          </Badge>
          <Badge className={cn(getCategoryColor(lesson.category))}>
            {lesson.category}
          </Badge>
          <span className="flex items-center gap-1 text-sm text-zinc-500">
            <Clock className="w-4 h-4" />
            {lesson.estimatedMinutes} min
          </span>
          {lesson.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          {status === "not_started" && (
            <button
              onClick={() => setStatus("in_progress")}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-400 text-zinc-900 rounded-lg font-medium text-sm hover:bg-brand-300 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Start Lesson
            </button>
          )}
          {status === "in_progress" && (
            <button
              onClick={() => setStatus("completed")}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-medium text-sm hover:bg-emerald-400 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark Complete
            </button>
          )}
          {status === "completed" && (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg font-medium text-sm border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </div>

      {/* Lesson content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-8">
        <LessonContent lesson={lesson} />
      </div>
    </div>
  );
}
