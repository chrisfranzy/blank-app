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
  color = "bg-brand-400",
}: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className={cn("w-full bg-zinc-800 rounded-full h-2", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", color)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
