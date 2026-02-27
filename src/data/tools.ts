import { ToolInfo } from "@/types";

export const toolRegistry: ToolInfo[] = [
  {
    name: "Claude Code",
    description: "AI-powered CLI for reading, editing, and managing codebases from the terminal.",
    features: [
      "Natural language code editing",
      "Full codebase understanding",
      "Git operations (commit, PR, push)",
      "CLAUDE.md project configuration",
      "MCP integration for external tools",
      "GitHub @claude mentions",
      "Slash commands (/help, /review, etc.)",
    ],
    icon: "terminal",
    category: "Development",
  },
  {
    name: "Claude Cowork",
    description: "GUI automation tool that can see your screen, click, type, and automate visual workflows.",
    features: [
      "Visual GUI automation",
      "Scheduled task execution",
      "Sandboxed VM environment",
      "Plugin marketplace",
      "Live execution monitoring",
      "Screenshot and reporting",
    ],
    icon: "monitor",
    category: "Automation",
  },
  {
    name: "MCP",
    description: "Model Context Protocol — open standard for connecting AI to external tools and data sources.",
    features: [
      "JSON-RPC protocol",
      "3,000+ community servers",
      "OAuth2 authentication",
      "Tool and resource exposure",
      "TypeScript & Python SDKs",
      "Claude Code integration",
    ],
    icon: "plug",
    category: "Infrastructure",
  },
  {
    name: "Claude API",
    description: "Direct API access to Claude for building custom AI-powered applications.",
    features: [
      "Tool use / function calling",
      "Structured outputs",
      "Web search capability",
      "Batch processing",
      "Vision (image understanding)",
      "Streaming responses",
      "System prompts",
    ],
    icon: "code",
    category: "Development",
  },
  {
    name: "AI Connectors",
    description: "50+ pre-built integrations on Claude.ai — connect to Google Drive, GitHub, Slack, and more.",
    features: [
      "50+ service integrations",
      "No-code setup via Claude.ai",
      "OAuth secure connections",
      "Real-time data access",
      "Google Drive, Notion, GitHub, etc.",
    ],
    icon: "link",
    category: "Integrations",
  },
  {
    name: "Agent SDK",
    description: "Build autonomous AI agents that plan, use tools, and complete multi-step tasks.",
    features: [
      "Python & TypeScript support",
      "Multi-agent orchestration",
      "Tool use chains",
      "Error recovery",
      "Streaming execution",
      "Custom agent architectures",
    ],
    icon: "bot",
    category: "Development",
  },
];

export function getToolByName(name: string): ToolInfo | undefined {
  return toolRegistry.find((t) => t.name === name);
}
