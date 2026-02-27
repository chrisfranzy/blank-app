"use client";

import { useState } from "react";
import {
  Check,
  Plus,
  RefreshCw,
  MessageSquare,
  Mail,
  BarChart3,
  GitBranch,
  ArrowUpRight,
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

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    { id: "slack", name: "Slack", description: "Monitor conversations for tool questions and automation opportunities", icon: MessageSquare, color: "text-accent-lavender bg-accent-lavender/10", connected: true, lastSync: "2 min ago", signalCount: 24 },
    { id: "email", name: "Gmail", description: "Detect repetitive email tasks and follow-up patterns", icon: Mail, color: "text-accent-sage bg-accent-sage/10", connected: true, lastSync: "15 min ago", signalCount: 12 },
    { id: "hubspot", name: "HubSpot", description: "Track deal activity and identify CRM automation opportunities", icon: BarChart3, color: "text-accent-sand bg-accent-sand/10", connected: false },
    { id: "linear", name: "Linear", description: "Analyze issue patterns and optimize project management", icon: ArrowUpRight, color: "text-accent-coral bg-accent-coral/10", connected: true, lastSync: "1 hr ago", signalCount: 8 },
    { id: "github", name: "GitHub", description: "Monitor PR activity, review patterns, and dev workflows", icon: GitBranch, color: "text-ink-muted bg-surface-3", connected: false },
  ]);

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? { ...int, connected: !int.connected, lastSync: !int.connected ? "Just now" : undefined, signalCount: !int.connected ? 0 : undefined }
          : int
      )
    );
  }

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Integrations
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Connect your tools
        </h1>
        <p className="text-ink-muted mt-2">
          More connections mean better personalized recommendations
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
                    {integration.signalCount !== undefined && (
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
