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
      return "text-accent-sage bg-accent-sage/10 border-accent-sage/20";
    case "intermediate":
      return "text-accent-sand bg-accent-sand/10 border-accent-sand/20";
    case "advanced":
      return "text-accent-coral bg-accent-coral/10 border-accent-coral/20";
    default:
      return "text-ink-muted bg-surface-3 border-surface-4";
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "automation":
      return "text-accent-lavender bg-accent-lavender/10";
    case "coding":
      return "text-accent-sage bg-accent-sage/10";
    case "communication":
      return "text-accent-sand bg-accent-sand/10";
    case "best-practices":
      return "text-accent-coral bg-accent-coral/10";
    case "workflow":
      return "text-accent-coral-light bg-accent-coral-light/10";
    default:
      return "text-ink-muted bg-surface-3";
  }
}
