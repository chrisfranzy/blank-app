"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Plus,
  RefreshCw,
  MessageSquare,
  BarChart3,
  GitBranch,
  Database,
  Search,
  FlaskConical,
  Utensils,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  connected: boolean;
  lastSync?: string;
  signalCount?: number;
}

const STORAGE_KEY = "claude-hub:integrations";

const defaultIntegrations: IntegrationItem[] = [
  { id: "hubspot", name: "HubSpot", description: "Two-way CRM sync — pipeline management, call ratings, automated follow-up workflows for franchise leads", icon: BarChart3, color: "text-accent-sand bg-accent-sand/10", connected: true, lastSync: "5 min ago", signalCount: 34 },
  { id: "slack", name: "Slack", description: "Monitor team conversations for tool questions, franchise deal discussions, and automation opportunities", icon: MessageSquare, color: "text-accent-lavender bg-accent-lavender/10", connected: true, lastSync: "2 min ago", signalCount: 18 },
  { id: "toast", name: "Toast POS", description: "Pull daily sales, labor, comps/voids data from Toast for FranzyOS pilot locations (MPZ Hot, Onyx Brands)", icon: Utensils, color: "text-accent-coral bg-accent-coral/10", connected: true, lastSync: "1 hr ago", signalCount: 62 },
  { id: "typesense", name: "Typesense", description: "Franchise search index — powers the Franzy Core search, Fit Score matching, and brand discovery", icon: Search, color: "text-accent-sage bg-accent-sage/10", connected: true, lastSync: "30 min ago", signalCount: 0 },
  { id: "github", name: "GitHub", description: "Monorepo PR activity, code reviews, and Claude Code @claude mentions for Core + FranzyOS", icon: GitBranch, color: "text-ink-muted bg-surface-3", connected: false },
  { id: "clickhouse", name: "ClickHouse", description: "FranzyOS analytics database — location benchmarking, operator performance metrics, trend analysis", icon: Database, color: "text-accent-lavender bg-accent-lavender/10", connected: false },
  { id: "growthbook", name: "GrowthBook", description: "Feature flags and A/B experiments — Fit Score v2, Connection Wizard, UI tests on franzy.com", icon: FlaskConical, color: "text-accent-sage bg-accent-sage/10", connected: false },
];

function loadIntegrations(): IntegrationItem[] {
  if (typeof window === "undefined") return defaultIntegrations;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultIntegrations;
    const saved = JSON.parse(raw) as Record<string, { connected: boolean; lastSync?: string; signalCount?: number }>;
    return defaultIntegrations.map((int) => {
      const s = saved[int.id];
      if (s) return { ...int, connected: s.connected, lastSync: s.lastSync, signalCount: s.signalCount };
      return int;
    });
  } catch {
    return defaultIntegrations;
  }
}

function saveIntegrations(integrations: IntegrationItem[]) {
  const data: Record<string, { connected: boolean; lastSync?: string; signalCount?: number }> = {};
  for (const int of integrations) {
    data[int.id] = { connected: int.connected, lastSync: int.lastSync, signalCount: int.signalCount };
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(defaultIntegrations);

  useEffect(() => {
    setIntegrations(loadIntegrations());
  }, []);

  function toggleConnection(id: string) {
    setIntegrations((prev) => {
      const next = prev.map((int) =>
        int.id === id
          ? { ...int, connected: !int.connected, lastSync: !int.connected ? "Just now" : undefined, signalCount: !int.connected ? 0 : undefined }
          : int
      );
      saveIntegrations(next);
      return next;
    });
  }

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Integrations
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Franzy tool connections
        </h1>
        <p className="text-ink-muted mt-2">
          Connect your tools for better recommendations and automation
        </p>
      </div>

      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-ink">
            {connectedCount} of {integrations.length} connected
          </p>
          <p className="text-xs text-ink-faint mt-0.5">
            Connect more for better recommendations
          </p>
        </div>
        <div className="flex -space-x-1.5">
          {integrations.map((int) => (
            <div
              key={int.id}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center border-2 border-surface-0 transition-colors",
                int.connected ? int.color : "bg-surface-3 text-ink-faint"
              )}
            >
              <int.icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-3 stagger">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  integration.color
                )}
              >
                <integration.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-ink">
                    {integration.name}
                  </h3>
                  {integration.connected && (
                    <span className="w-2 h-2 rounded-full bg-accent-sage" />
                  )}
                </div>
                <p className="text-sm text-ink-muted mb-3 leading-relaxed">
                  {integration.description}
                </p>
                {integration.connected && (
                  <div className="flex items-center gap-4 text-[11px] text-ink-faint font-mono">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      {integration.lastSync}
                    </span>
                    {integration.signalCount !== undefined && integration.signalCount > 0 && (
                      <span>{integration.signalCount} signals</span>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleConnection(integration.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 flex-shrink-0",
                  integration.connected
                    ? "bg-surface-3/50 text-ink-muted hover:bg-surface-4/50"
                    : "bg-gradient-to-r from-accent-coral to-accent-sand text-surface-0 hover:opacity-90 glow-coral"
                )}
              >
                {integration.connected ? (
                  <>
                    <Check className="w-4 h-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Connect
                  </>
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
