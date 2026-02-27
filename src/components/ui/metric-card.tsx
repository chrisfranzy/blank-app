import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  detail?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  trend,
  detail,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "card-surface p-4 md:p-5 relative overflow-hidden group",
        className
      )}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-coral/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <p className="text-xs text-ink-muted font-mono uppercase tracking-wider mb-2 relative">
        {label}
      </p>
      <div className="flex items-end gap-2 relative">
        <p className="text-2xl md:text-3xl font-display font-bold text-ink tracking-tight">
          {value}
        </p>
        {trend && (
          <span
            className={cn(
              "p-1 rounded-lg mb-1",
              trend === "up" && "text-accent-sage bg-accent-sage/10",
              trend === "down" && "text-accent-coral bg-accent-coral/10",
              trend === "stable" && "text-ink-faint bg-surface-3"
            )}
          >
            {trend === "up" && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === "down" && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === "stable" && <Minus className="w-3.5 h-3.5" />}
          </span>
        )}
      </div>
      {detail && (
        <p className="text-xs text-ink-faint mt-1.5 relative">{detail}</p>
      )}
    </div>
  );
}
