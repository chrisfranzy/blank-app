import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "intermediate":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "advanced":
      return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    default:
      return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "automation":
      return "text-violet-400 bg-violet-400/10";
    case "coding":
      return "text-sky-400 bg-sky-400/10";
    case "communication":
      return "text-emerald-400 bg-emerald-400/10";
    case "best-practices":
      return "text-amber-400 bg-amber-400/10";
    case "workflow":
      return "text-rose-400 bg-rose-400/10";
    default:
      return "text-zinc-400 bg-zinc-400/10";
  }
}

export function getToolIcon(tool: string): string {
  const icons: Record<string, string> = {
    "Claude Code": "terminal",
    "Claude Cowork": "monitor",
    MCP: "plug",
    "Claude API": "code",
    "AI Connectors": "link",
    "Agent SDK": "bot",
  };
  return icons[tool] || "sparkles";
}
