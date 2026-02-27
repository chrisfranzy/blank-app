"use client";

import { useState } from "react";
import {
  FileText,
  Terminal,
  Monitor,
  Plug,
  Code,
  Link as LinkIcon,
  Bot,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolRegistry } from "@/data/tools";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  terminal: Terminal,
  monitor: Monitor,
  plug: Plug,
  code: Code,
  link: LinkIcon,
  bot: Bot,
};

export default function ReferencePage() {
  const [expandedTool, setExpandedTool] = useState<string | null>(
    "Claude Code"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Claude Tools Reference
        </h1>
        <p className="text-zinc-400 mt-1">
          Quick reference for all Claude tools and capabilities
        </p>
      </div>

      {/* Tool cards */}
      <div className="space-y-3">
        {toolRegistry.map((tool) => {
          const Icon = iconMap[tool.icon] || Code;
          const isExpanded = expandedTool === tool.name;

          return (
            <Card key={tool.name} className="p-0 overflow-hidden">
              <button
                onClick={() =>
                  setExpandedTool(isExpanded ? null : tool.name)
                }
                className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-zinc-800/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{tool.name}</h3>
                    <Badge variant="outline" className="text-[10px]">
                      {tool.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-400 mt-0.5 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-zinc-800">
                  <p className="text-sm text-zinc-300 mt-4 mb-4">
                    {tool.description}
                  </p>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-zinc-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
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
