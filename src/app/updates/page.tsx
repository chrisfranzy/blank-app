"use client";

import { Sparkles, ArrowRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const updates = [
  { id: "1", date: "2025-02-25", tool: "Claude Code", title: "GitHub @claude Mentions", description: "Tag @claude in any PR comment or issue to get AI-powered analysis, reviews, and code suggestions directly in GitHub.", isNew: true, relatedLessonId: "claude-code-reviews" },
  { id: "2", date: "2025-02-20", tool: "Agent SDK", title: "Multi-Agent Orchestration", description: "Build systems where multiple specialized agents collaborate — a coordinator delegates tasks to researcher, writer, and reviewer agents.", isNew: true, relatedLessonId: "agent-sdk-intro" },
  { id: "3", date: "2025-02-15", tool: "MCP", title: "OAuth2 Support for MCP Servers", description: "MCP servers can now use OAuth2 for secure authentication, making it easier to connect to enterprise tools.", isNew: false, relatedLessonId: "mcp-intro" },
  { id: "4", date: "2025-02-10", tool: "Claude API", title: "Batch Processing API", description: "Process up to 10,000 requests in a single batch at 50% reduced cost. Perfect for data processing at scale.", isNew: false, relatedLessonId: "claude-api-tool-use" },
  { id: "5", date: "2025-02-05", tool: "AI Connectors", title: "50+ Connectors on Claude.ai", description: "Connect Claude to Google Drive, Notion, GitHub, Slack, and 46 more services directly from the Claude.ai interface.", isNew: false, relatedLessonId: "ai-connectors" },
  { id: "6", date: "2025-01-30", tool: "Claude Cowork", title: "Scheduled Automation Tasks", description: "Set up Cowork tasks to run on a schedule — daily reports, weekly exports, and recurring workflows.", isNew: false, relatedLessonId: "cowork-getting-started" },
];

export default function UpdatesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Updates
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          What&apos;s new
        </h1>
        <p className="text-ink-muted mt-2">
          Latest features across Claude tools
        </p>
      </div>

      <div className="space-y-3 stagger">
        {updates.map((update) => (
          <Card key={update.id} className="p-5 md:p-6 relative overflow-hidden">
            {update.isNew && (
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-coral/[0.04] rounded-full blur-2xl -translate-y-4 translate-x-4" />
            )}
            <div className="flex items-start gap-4 relative">
              <div className="w-10 h-10 rounded-xl bg-surface-3/50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent-sand" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <h3 className="font-display font-semibold text-ink">
                    {update.title}
                  </h3>
                  {update.isNew && (
                    <Badge className="bg-accent-coral/15 text-accent-coral text-[10px] font-mono">
                      NEW
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {update.tool}
                  </Badge>
                </div>
                <p className="text-sm text-ink-muted mb-3 leading-relaxed">
                  {update.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] text-ink-faint font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(update.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {update.relatedLessonId && (
                    <Link
                      href={`/library/${update.relatedLessonId}`}
                      className="text-xs text-accent-coral hover:text-accent-coral-light flex items-center gap-1 transition-colors"
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
