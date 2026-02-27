import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = "bg-gradient-to-r from-accent-coral to-accent-sand",
}: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className={cn("w-full bg-surface-3 rounded-full h-1.5 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", color)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
