"use client";

import {
  Users,
  TrendingUp,
  Zap,
  MessageSquare,
  BarChart3,
  Trophy,
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    completed: 12,
    total: 17,
    topTool: "Claude Code",
    streak: 8,
  },
  {
    name: "Mike Rodriguez",
    role: "Full-Stack Dev",
    completed: 8,
    total: 17,
    topTool: "Claude API",
    streak: 5,
  },
  {
    name: "Priya Patel",
    role: "DevOps Engineer",
    completed: 6,
    total: 17,
    topTool: "MCP",
    streak: 3,
  },
  {
    name: "James Kim",
    role: "Product Manager",
    completed: 4,
    total: 17,
    topTool: "Claude Cowork",
    streak: 2,
  },
  {
    name: "Alex Johnson",
    role: "Junior Dev",
    completed: 3,
    total: 17,
    topTool: "Claude Code",
    streak: 7,
  },
];

const topQuestions = [
  { question: "How do I set up MCP servers for our internal tools?", count: 8 },
  { question: "Can Claude Code review PRs automatically?", count: 6 },
  { question: "How do I automate our weekly reporting?", count: 5 },
  { question: "What's the best way to use structured outputs?", count: 4 },
];

const automationOpportunities = [
  {
    title: "PR Review Automation",
    impact: "High",
    description: "12 PRs/week could be auto-reviewed with Claude Code",
    savings: "~6 hrs/week",
  },
  {
    title: "Standup Summaries",
    impact: "Medium",
    description: "Auto-compile standups from Slack threads",
    savings: "~2 hrs/week",
  },
  {
    title: "Issue Triage",
    impact: "Medium",
    description: "Auto-label and assign incoming Linear issues",
    savings: "~3 hrs/week",
  },
];

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Team Insights
        </h1>
        <p className="text-zinc-400 mt-1">
          How your team is learning and using Claude tools
        </p>
      </div>

      {/* Team metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          label="Team Members"
          value={5}
          detail="active learners"
        />
        <MetricCard
          label="Avg. Completion"
          value="39%"
          trend="up"
          detail="+8% this week"
        />
        <MetricCard
          label="Top Tool"
          value="Code"
          detail="most popular tool"
        />
        <MetricCard
          label="Time Saved"
          value="~11h"
          trend="up"
          detail="per week estimated"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Team leaderboard */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-brand-400" />
            <CardTitle>Team Progress</CardTitle>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-zinc-500">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-300">
                      {member.completed}/{member.total}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {member.streak}d streak
                    </p>
                  </div>
                </div>
                <ProgressBar value={member.completed} max={member.total} />
              </div>
            ))}
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-4 md:space-y-6">
          {/* Top questions */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-brand-400" />
              <CardTitle>Common Questions</CardTitle>
            </div>
            <div className="space-y-3">
              {topQuestions.map((q) => (
                <div
                  key={q.question}
                  className="flex items-start justify-between gap-3"
                >
                  <p className="text-sm text-zinc-300">{q.question}</p>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full flex-shrink-0">
                    {q.count}x
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Automation opportunities */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-brand-400" />
              <CardTitle>Automation Opportunities</CardTitle>
            </div>
            <div className="space-y-3">
              {automationOpportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white">{opp.title}</p>
                    <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      {opp.savings}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{opp.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
