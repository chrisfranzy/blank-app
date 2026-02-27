import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body",
        variant === "outline"
          ? "border border-surface-4 text-ink-muted"
          : "bg-surface-3 text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
