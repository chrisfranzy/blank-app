"use client";

import { Zap, MessageSquare, Trophy } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const teamMembers = [
  { name: "Sarah Chen", role: "Engineering Lead", completed: 12, total: 17, topTool: "Claude Code", streak: 8 },
  { name: "Mike Rodriguez", role: "Full-Stack Dev", completed: 8, total: 17, topTool: "Claude API", streak: 5 },
  { name: "Priya Patel", role: "DevOps Engineer", completed: 6, total: 17, topTool: "MCP", streak: 3 },
  { name: "James Kim", role: "Product Manager", completed: 4, total: 17, topTool: "Claude Cowork", streak: 2 },
  { name: "Alex Johnson", role: "Junior Dev", completed: 3, total: 17, topTool: "Claude Code", streak: 7 },
];

const topQuestions = [
  { question: "How do I set up MCP servers for our internal tools?", count: 8 },
  { question: "Can Claude Code review PRs automatically?", count: 6 },
  { question: "How do I automate our weekly reporting?", count: 5 },
  { question: "What's the best way to use structured outputs?", count: 4 },
];

const automationOpportunities = [
  { title: "PR Review Automation", description: "12 PRs/week could be auto-reviewed", savings: "~6 hrs/week" },
  { title: "Standup Summaries", description: "Auto-compile from Slack threads", savings: "~2 hrs/week" },
  { title: "Issue Triage", description: "Auto-label incoming Linear issues", savings: "~3 hrs/week" },
];

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Team
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Team insights
        </h1>
        <p className="text-ink-muted mt-2">
          How your team is learning and adopting Claude tools
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 stagger">
        <MetricCard label="Members" value={5} detail="active learners" />
        <MetricCard label="Avg. Completion" value="39%" trend="up" detail="+8% this week" />
        <MetricCard label="Top Tool" value="Code" detail="most popular" />
        <MetricCard label="Time Saved" value="~11h" trend="up" detail="per week estimated" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
        {/* Leaderboard */}
        <Card>
          <div className="flex items-center gap-2.5 mb-5">
            <Trophy className="w-5 h-5 text-accent-coral" strokeWidth={1.5} />
            <CardTitle>Team Progress</CardTitle>
          </div>
          <div className="space-y-5">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-surface-3/50 flex items-center justify-center text-xs text-ink-muted font-mono">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{member.name}</p>
                      <p className="text-[11px] text-ink-faint">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink-muted font-mono">
                      {member.completed}/{member.total}
                    </p>
                    <p className="text-[11px] text-ink-faint">{member.streak}d streak</p>
                  </div>
                </div>
                <ProgressBar value={member.completed} max={member.total} />
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5 md:space-y-8">
          {/* Questions */}
          <Card>
            <div className="flex items-center gap-2.5 mb-5">
              <MessageSquare className="w-5 h-5 text-accent-sage" strokeWidth={1.5} />
              <CardTitle>Common Questions</CardTitle>
            </div>
            <div className="space-y-3.5">
              {topQuestions.map((q) => (
                <div key={q.question} className="flex items-start justify-between gap-3">
                  <p className="text-sm text-ink/80 leading-relaxed">{q.question}</p>
                  <span className="text-[10px] text-ink-faint bg-surface-3/50 px-2 py-0.5 rounded-full flex-shrink-0 font-mono">
                    {q.count}x
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Automation opps */}
          <Card>
            <div className="flex items-center gap-2.5 mb-5">
              <Zap className="w-5 h-5 text-accent-sand" strokeWidth={1.5} />
              <CardTitle>Automation Opportunities</CardTitle>
            </div>
            <div className="space-y-3">
              {automationOpportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="bg-surface-2/40 rounded-xl p-4 border border-surface-3/30 hover:border-surface-4/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-ink">{opp.title}</p>
                    <span className="text-[11px] text-accent-sage bg-accent-sage/10 px-2.5 py-0.5 rounded-full font-mono">
                      {opp.savings}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">{opp.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
