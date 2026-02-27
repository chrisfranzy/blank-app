import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  detail?: string;
  className?: string;
}

export function MetricCard({ label, value, trend, detail, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-5",
        className
      )}
    >
      <p className="text-sm text-zinc-400 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
        {trend && (
          <span
            className={cn(
              "p-1 rounded-full",
              trend === "up" && "text-emerald-400 bg-emerald-400/10",
              trend === "down" && "text-rose-400 bg-rose-400/10",
              trend === "stable" && "text-zinc-400 bg-zinc-800"
            )}
          >
            {trend === "up" && <TrendingUp className="w-4 h-4" />}
            {trend === "down" && <TrendingDown className="w-4 h-4" />}
            {trend === "stable" && <Minus className="w-4 h-4" />}
          </span>
        )}
      </div>
      {detail && <p className="text-xs text-zinc-500 mt-1">{detail}</p>}
    </div>
  );
}
