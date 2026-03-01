"use client";

import { Sparkles, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const updates = [
  { id: "1", date: "2025-02-25", tool: "Claude Code", title: "Agent Skills", description: "Build, configure, and share reusable markdown instructions that Claude Code automatically applies to the right tasks at the right time.", isNew: true, relatedLessonId: "agent-skills-intro", skilljarUrl: "https://anthropic.skilljar.com/introduction-to-agent-skills" },
  { id: "2", date: "2025-02-22", tool: "Claude Code", title: "GitHub @claude Mentions", description: "Tag @claude in any PR comment or issue to get AI-powered analysis, reviews, and code suggestions directly in GitHub.", isNew: true, relatedLessonId: "claude-code-reviews" },
  { id: "3", date: "2025-02-20", tool: "MCP", title: "MCP Advanced Topics Course", description: "New Anthropic Academy course covering sampling, transports, file access control, and production scaling for MCP.", isNew: true, relatedLessonId: "mcp-advanced-topics", skilljarUrl: "https://anthropic.skilljar.com/model-context-protocol-advanced-topics" },
  { id: "4", date: "2025-02-15", tool: "Claude API", title: "Agent Architectures", description: "Build multi-agent systems with parallelization, routing, and orchestration patterns using the Claude API.", isNew: false, relatedLessonId: "claude-api-agents" },
  { id: "5", date: "2025-02-10", tool: "Claude API", title: "RAG with Citations", description: "Build retrieval-augmented generation systems with precise source citations using Claude's built-in citations feature.", isNew: false, relatedLessonId: "claude-api-rag" },
  { id: "6", date: "2025-02-05", tool: "AI Connectors", title: "50+ Connectors on Claude.ai", description: "Connect Claude to Google Drive, Notion, GitHub, Slack, and 46 more services directly from the Claude.ai interface.", isNew: false, relatedLessonId: "ai-connectors" },
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
                  <div className="flex items-center gap-3">
                    {update.skilljarUrl && (
                      <a
                        href={update.skilljarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ink-faint hover:text-ink flex items-center gap-1 transition-colors"
                      >
                        Academy <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
