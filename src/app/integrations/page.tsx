"use client";

import { useState } from "react";
import {
  Link as LinkIcon,
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
    {
      id: "slack",
      name: "Slack",
      description: "Monitor team conversations for tool questions and automation opportunities",
      icon: MessageSquare,
      color: "text-purple-400 bg-purple-400/10",
      connected: true,
      lastSync: "2 min ago",
      signalCount: 24,
    },
    {
      id: "email",
      name: "Gmail",
      description: "Detect repetitive email tasks and follow-up patterns",
      icon: Mail,
      color: "text-sky-400 bg-sky-400/10",
      connected: true,
      lastSync: "15 min ago",
      signalCount: 12,
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Track deal activity and identify CRM automation opportunities",
      icon: BarChart3,
      color: "text-orange-400 bg-orange-400/10",
      connected: false,
    },
    {
      id: "linear",
      name: "Linear",
      description: "Analyze issue patterns and optimize project management workflows",
      icon: ArrowUpRight,
      color: "text-violet-400 bg-violet-400/10",
      connected: true,
      lastSync: "1 hr ago",
      signalCount: 8,
    },
    {
      id: "github",
      name: "GitHub",
      description: "Monitor PR activity, code review patterns, and development workflows",
      icon: GitBranch,
      color: "text-zinc-300 bg-zinc-800",
      connected: false,
    },
  ]);

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? {
              ...int,
              connected: !int.connected,
              lastSync: !int.connected ? "Just now" : undefined,
              signalCount: !int.connected ? 0 : undefined,
            }
          : int
      )
    );
  }

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Integrations
        </h1>
        <p className="text-zinc-400 mt-1">
          Connect your tools to discover personalized learning opportunities
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">
            {connectedCount} of {integrations.length} connected
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            More connections = better recommendations
          </p>
        </div>
        <div className="flex -space-x-1">
          {integrations.map((int) => (
            <div
              key={int.id}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 border-zinc-900",
                int.connected ? int.color : "bg-zinc-800 text-zinc-600"
              )}
            >
              <int.icon className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                  integration.color
                )}
              >
                <integration.icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-white">{integration.name}</h3>
                  {integration.connected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  {integration.description}
                </p>
                {integration.connected && (
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Synced {integration.lastSync}
                    </span>
                    {integration.signalCount !== undefined && (
                      <span>{integration.signalCount} signals detected</span>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleConnection(integration.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 flex-shrink-0",
                  integration.connected
                    ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    : "bg-brand-400 text-zinc-900 hover:bg-brand-300"
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
