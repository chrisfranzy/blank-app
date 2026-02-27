"use client";

import { Bell, Sparkles, ArrowRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const updates = [
  {
    id: "1",
    date: "2025-02-25",
    tool: "Claude Code",
    title: "GitHub @claude Mentions",
    description:
      "Tag @claude in any PR comment or issue to get AI-powered analysis, reviews, and code suggestions directly in GitHub.",
    isNew: true,
    relatedLessonId: "claude-code-reviews",
  },
  {
    id: "2",
    date: "2025-02-20",
    tool: "Agent SDK",
    title: "Multi-Agent Orchestration",
    description:
      "Build systems where multiple specialized agents collaborate — a coordinator delegates tasks to researcher, writer, and reviewer agents.",
    isNew: true,
    relatedLessonId: "agent-sdk-intro",
  },
  {
    id: "3",
    date: "2025-02-15",
    tool: "MCP",
    title: "OAuth2 Support for MCP Servers",
    description:
      "MCP servers can now use OAuth2 for secure authentication, making it easier to connect to enterprise tools.",
    isNew: false,
    relatedLessonId: "mcp-intro",
  },
  {
    id: "4",
    date: "2025-02-10",
    tool: "Claude API",
    title: "Batch Processing API",
    description:
      "Process up to 10,000 requests in a single batch at 50% reduced cost. Perfect for data processing and content analysis at scale.",
    isNew: false,
    relatedLessonId: "claude-api-tool-use",
  },
  {
    id: "5",
    date: "2025-02-05",
    tool: "AI Connectors",
    title: "50+ Connectors on Claude.ai",
    description:
      "Connect Claude to Google Drive, Notion, GitHub, Slack, and 46 more services directly from the Claude.ai interface — no code required.",
    isNew: false,
    relatedLessonId: "ai-connectors",
  },
  {
    id: "6",
    date: "2025-01-30",
    tool: "Claude Cowork",
    title: "Scheduled Automation Tasks",
    description:
      "Set up Cowork tasks to run on a schedule — daily reports, weekly data exports, and recurring workflows run automatically.",
    isNew: false,
    relatedLessonId: "cowork-getting-started",
  },
];

export default function UpdatesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Tool Updates
        </h1>
        <p className="text-zinc-400 mt-1">
          Latest features and capabilities across Claude tools
        </p>
      </div>

      <div className="space-y-3">
        {updates.map((update) => (
          <Card key={update.id} className="p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-medium text-white">{update.title}</h3>
                  {update.isNew && (
                    <Badge className="bg-brand-400/15 text-brand-300 text-[10px]">
                      NEW
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px]">
                    {update.tool}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  {update.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(update.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {update.relatedLessonId && (
                    <Link
                      href={`/library/${update.relatedLessonId}`}
                      className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                      Related lesson <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
