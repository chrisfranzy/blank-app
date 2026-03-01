"use client";

import { useState, useEffect } from "react";
import { Zap, MessageSquare, Trophy } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { lessons } from "@/data/lessons";
import { getCompletedLessonIds, getSettings } from "@/lib/storage";

const teamMembers = [
  { name: "Alex Smereczniak", role: "Co-Founder & CEO", dept: "Leadership", completed: 14, streak: 12 },
  { name: "Chris Wright", role: "Co-Founder & CPO/COO", dept: "Leadership", completed: 11, streak: 8 },
  { name: "Thomas Baker", role: "Lead Engineer, FranzyOS", dept: "Engineering", completed: 9, streak: 5 },
  { name: "Trevor Hutto", role: "Fractional Principal Engineer", dept: "Engineering", completed: 8, streak: 4 },
  { name: "Alex Vidor", role: "VP of Business Development", dept: "Sales", completed: 7, streak: 6 },
  { name: "Caleb Clayton", role: "Senior Franchise Advisor", dept: "Advisors", completed: 6, streak: 3 },
  { name: "Joe Ross", role: "Franchise Advisor", dept: "Advisors", completed: 5, streak: 2 },
  { name: "Elin Walton", role: "VP of Marketing/Growth", dept: "Marketing", completed: 5, streak: 4 },
  { name: "Brett Hines", role: "Marketing — The Franzy Brief", dept: "Marketing", completed: 4, streak: 7 },
  { name: "Dmitrii Ivanov", role: "Product Manager, Core", dept: "Product", completed: 3, streak: 1 },
  { name: "Dan D'Aquisto", role: "Chief of Staff, FranzyOS", dept: "Operations", completed: 3, streak: 2 },
  { name: "Riley Wingerd", role: "Brand Partnerships", dept: "Sales", completed: 2, streak: 1 },
];

const topQuestions = [
  { question: "How do I use Claude to analyze FDD documents for investor calls?", count: 8 },
  { question: "Can Claude Code help with the Toast/POS data ingestion for FranzyOS?", count: 6 },
  { question: "How do I automate my post-call HubSpot notes with Claude?", count: 5 },
  { question: "Can we use Claude to generate Franzy Brief drafts faster?", count: 4 },
];

const automationOpportunities = [
  { title: "FDD Analysis Automation", description: "Auto-extract Item 7, Item 19, fees from FDDs for investor research", savings: "~5 hrs/week", dept: "Advisors" },
  { title: "Franzy Brief Research", description: "Auto-pull franchise news from QSR Magazine, Franchise Times, IFA", savings: "~2 hrs/day", dept: "Marketing" },
  { title: "HubSpot Call Summaries", description: "Auto-rate and summarize advisor calls from Fireflies transcripts", savings: "~4 hrs/week", dept: "Sales" },
  { title: "POS Data Extraction", description: "Browser automation for Toast/Qu/Brink dashboards (no API)", savings: "~8 hrs/week", dept: "Engineering" },
];

export default function TeamPage() {
  const [yourCompleted, setYourCompleted] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setYourCompleted(getCompletedLessonIds().length);
    const settings = getSettings();
    setUserName(settings.name || "");
  }, []);

  const totalLessons = lessons.length;

  const allMembers = [
    ...teamMembers.map((m) => ({ ...m, total: totalLessons, isYou: false })),
    { name: userName || "You", role: "Current user", dept: "—", completed: yourCompleted, streak: 0, total: totalLessons, isYou: true },
  ].sort((a, b) => b.completed - a.completed);

  const avgCompletion = Math.round(
    allMembers.reduce((sum, m) => sum + m.completed, 0) / allMembers.length / totalLessons * 100
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Team
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Franzy team insights
        </h1>
        <p className="text-ink-muted mt-2">
          How the Franzy team is learning and adopting Claude tools
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 stagger">
        <MetricCard label="Team Size" value={allMembers.length} detail="active learners" />
        <MetricCard label="Avg. Completion" value={`${avgCompletion}%`} trend="up" detail="across team" />
        <MetricCard label="Top Dept" value="Eng" detail="most lessons completed" />
        <MetricCard label="Time Saved" value="~19h" trend="up" detail="per week estimated" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
        {/* Leaderboard */}
        <Card>
          <div className="flex items-center gap-2.5 mb-5">
            <Trophy className="w-5 h-5 text-accent-coral" strokeWidth={1.5} />
            <CardTitle>Team Progress</CardTitle>
          </div>
          <div className="space-y-5">
            {allMembers.slice(0, 8).map((member, i) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-surface-3/50 flex items-center justify-center text-xs text-ink-muted font-mono">
                      {i + 1}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${member.isYou ? "text-accent-coral" : "text-ink"}`}>
                        {member.name}
                        {member.isYou && <span className="text-xs text-ink-faint ml-1.5">(you)</span>}
                      </p>
                      <p className="text-[11px] text-ink-faint">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink-muted font-mono">
                      {member.completed}/{member.total}
                    </p>
                    {member.streak > 0 && (
                      <p className="text-[11px] text-ink-faint">{member.streak}d streak</p>
                    )}
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
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-ink-muted">{opp.description}</p>
                    <span className="text-[10px] text-ink-faint ml-2 flex-shrink-0">{opp.dept}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
