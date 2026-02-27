"use client";

import { useState } from "react";
import {
  Terminal,
  Monitor,
  Plug,
  Code,
  Link as LinkIcon,
  Bot,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolRegistry } from "@/data/tools";

const iconMap: Record<string, React.ElementType> = {
  terminal: Terminal,
  monitor: Monitor,
  plug: Plug,
  code: Code,
  link: LinkIcon,
  bot: Bot,
};

export default function ReferencePage() {
  const [expandedTool, setExpandedTool] = useState<string | null>("Claude Code");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Reference
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Claude tools
        </h1>
        <p className="text-ink-muted mt-2">
          Quick reference for all tools and capabilities
        </p>
      </div>

      <div className="space-y-3 stagger">
        {toolRegistry.map((tool) => {
          const Icon = iconMap[tool.icon] || Code;
          const isExpanded = expandedTool === tool.name;

          return (
            <Card key={tool.name} className="p-0 overflow-hidden">
              <button
                onClick={() => setExpandedTool(isExpanded ? null : tool.name)}
                className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-surface-2/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-surface-3/50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-ink-muted" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display font-semibold text-ink">
                      {tool.name}
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {tool.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-ink-muted mt-0.5 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-ink-faint flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-ink-faint flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-surface-3/50 animate-fade-in">
                  <p className="text-sm text-ink/80 mt-5 mb-5 leading-relaxed">
                    {tool.description}
                  </p>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink-faint mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2.5">
                      {tool.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-ink/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-coral mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
