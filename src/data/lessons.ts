import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  {
    id: "claude-code-intro",
    title: "Getting Started with Claude Code",
    summary: "Learn the fundamentals of Claude Code — the AI-powered CLI that reads, edits, and manages your codebase directly from the terminal.",
    content: `## What is Claude Code?

Claude Code is an agentic coding tool that lives in your terminal. It understands your entire codebase and can help you code faster through natural language commands.

### Key Capabilities
- **Read & understand** entire codebases instantly
- **Edit files** across your project with natural language
- **Run commands** and debug errors in real-time
- **Git operations** — commit, push, create PRs
- **Search code** — find patterns, references, definitions

### Quick Start
\`\`\`bash
# Install
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-project

# Start Claude Code
claude
\`\`\`

### Your First Commands
Try these in your project:
- \`"Explain this codebase"\` — Get a high-level overview
- \`"Find all API endpoints"\` — Search for patterns
- \`"Fix the failing tests"\` — Debug and fix issues
- \`"Add input validation to the signup form"\` — Make changes

### Tips
1. Be specific about what you want changed
2. Claude Code reads your CLAUDE.md file for project context
3. Use \`/help\` to see available slash commands`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "beginner",
    tags: ["cli", "getting-started", "terminal"],
    estimatedMinutes: 15,
    createdAt: "2025-01-15",
  },
  {
    id: "claude-code-reviews",
    title: "AI-Powered Code Reviews with Claude Code",
    summary: "Use Claude Code to review pull requests, catch bugs, and suggest improvements before merging.",
    content: `## Code Reviews with Claude Code

Stop manually reviewing hundreds of lines. Let Claude Code analyze PRs for bugs, style issues, and potential improvements.

### Review a PR
\`\`\`bash
# Review the current branch against main
claude "Review the changes in this branch compared to main.
Look for bugs, security issues, and style problems."

# Review a specific PR
claude "Review PR #42 and summarize the changes"
\`\`\`

### What Claude Code Checks
- **Logic errors** — off-by-one, null references, race conditions
- **Security issues** — SQL injection, XSS, exposed secrets
- **Style consistency** — naming conventions, patterns
- **Performance** — N+1 queries, unnecessary re-renders
- **Missing tests** — untested edge cases

### GitHub Integration
Claude Code works with \`@claude\` mentions in GitHub PRs:
1. Tag \`@claude\` in a PR comment
2. Claude reviews and responds directly
3. Can push fixes to the branch

### Best Practices
- Review before you push, not after
- Ask Claude Code to explain unfamiliar patterns
- Use it to generate test cases for changed code`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "intermediate",
    tags: ["code-review", "github", "quality"],
    estimatedMinutes: 20,
    createdAt: "2025-01-20",
  },
  {
    id: "claude-md-config",
    title: "Configuring CLAUDE.md for Your Project",
    summary: "Set up CLAUDE.md to give Claude Code persistent context about your project's conventions, architecture, and rules.",
    content: `## CLAUDE.md — Your Project's AI Config

CLAUDE.md is a markdown file at the root of your repo that gives Claude Code persistent context about your project.

### Why Use It?
Without CLAUDE.md, Claude Code has to infer your project's conventions each time. With it, Claude Code immediately knows:
- Your tech stack and architecture
- Coding conventions and style rules
- How to run tests and builds
- What patterns to follow

### Example CLAUDE.md
\`\`\`markdown
# Project: Acme Dashboard

## Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Prisma + PostgreSQL

## Conventions
- Use server components by default
- Client components only when needed (interactivity)
- All API routes in src/app/api/
- Use zod for validation

## Commands
- \\\`npm run dev\\\` — Start dev server
- \\\`npm test\\\` — Run tests
- \\\`npm run lint\\\` — Run ESLint

## Architecture
- src/app/ — Pages and layouts
- src/components/ — Shared components
- src/lib/ — Utilities and helpers
- prisma/ — Database schema
\`\`\`

### Tips
- Keep it concise — Claude Code reads the whole thing
- Update it as your project evolves
- Include team-specific rules and preferences`,
    toolName: "Claude Code",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["configuration", "project-setup", "conventions"],
    estimatedMinutes: 10,
    createdAt: "2025-02-01",
  },
  {
    id: "mcp-intro",
    title: "Introduction to Model Context Protocol (MCP)",
    summary: "Understand MCP — the open protocol that lets AI models connect to external tools, databases, and services.",
    content: `## What is MCP?

The Model Context Protocol (MCP) is an open standard that lets AI assistants like Claude connect to external data sources and tools through a unified interface.

### The Problem MCP Solves
Before MCP, every AI integration was custom-built. Each tool needed its own connector, authentication, and data format. MCP standardizes this.

### How It Works
\`\`\`
Your App → Claude (AI) → MCP Server → External Tool
                                        (Slack, DB, API, etc.)
\`\`\`

### Key Concepts
- **MCP Server** — Exposes tools/resources via JSON-RPC
- **MCP Client** — Claude or any AI that speaks MCP
- **Tools** — Actions the AI can take (send message, query DB)
- **Resources** — Data the AI can read (files, records)

### 3,000+ Community Servers
The MCP ecosystem includes servers for:
- **Databases**: PostgreSQL, MySQL, MongoDB
- **Communication**: Slack, Discord, Email
- **Dev Tools**: GitHub, Linear, Jira
- **Files**: Google Drive, Dropbox, S3
- **And many more**

### Getting Started
\`\`\`json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-slack"],
      "env": {
        "SLACK_TOKEN": "xoxb-your-token"
      }
    }
  }
}
\`\`\``,
    toolName: "MCP",
    category: "automation",
    difficulty: "beginner",
    tags: ["mcp", "protocol", "integrations"],
    estimatedMinutes: 20,
    createdAt: "2025-01-10",
  },
  {
    id: "mcp-custom-server",
    title: "Building a Custom MCP Server",
    summary: "Build your own MCP server to expose internal tools and data to Claude.",
    content: `## Build Your Own MCP Server

When community servers don't cover your use case, build a custom one. MCP servers are simple JSON-RPC services.

### TypeScript Example
\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-internal-tools",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "search_docs",
  "Search internal documentation",
  { query: z.string().describe("Search query") },
  async ({ query }) => {
    const results = await searchInternalDocs(query);
    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### Python Example
\`\`\`python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-internal-tools")

@mcp.tool()
def search_docs(query: str) -> str:
    \"\"\"Search internal documentation.\"\"\"
    results = search_internal_docs(query)
    return json.dumps(results)

mcp.run()
\`\`\`

### Best Practices
1. Keep tools focused — one action per tool
2. Write clear descriptions — Claude uses them to decide when to call tools
3. Validate inputs with schemas
4. Handle errors gracefully
5. Add authentication for sensitive operations`,
    toolName: "MCP",
    category: "coding",
    difficulty: "advanced",
    tags: ["mcp", "server", "custom", "development"],
    estimatedMinutes: 30,
    createdAt: "2025-02-10",
  },
  {
    id: "claude-api-tool-use",
    title: "Claude API: Tool Use & Function Calling",
    summary: "Learn to give Claude tools via the API — let it call functions, query databases, and take actions in your app.",
    content: `## Tool Use with the Claude API

Tool use (function calling) lets Claude call functions you define. Claude decides when to use tools based on the conversation.

### Basic Setup
\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const tools = [
  {
    name: "get_weather",
    description: "Get current weather for a location",
    input_schema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "City name, e.g. San Francisco",
        },
      },
      required: ["location"],
    },
  },
];

const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  tools,
  messages: [{ role: "user", content: "What's the weather in SF?" }],
});
\`\`\`

### Handling Tool Calls
\`\`\`typescript
// Check if Claude wants to use a tool
for (const block of response.content) {
  if (block.type === "tool_use") {
    const result = await executeFunction(block.name, block.input);
    // Send result back to Claude
  }
}
\`\`\`

### Common Patterns
- **Database queries** — Let Claude query your DB naturally
- **API calls** — Claude calls external services
- **File operations** — Read, write, search files
- **Calculations** — Offload math/computation`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "intermediate",
    tags: ["api", "tool-use", "function-calling"],
    estimatedMinutes: 25,
    createdAt: "2025-01-25",
  },
  {
    id: "claude-api-structured-output",
    title: "Structured Outputs with Claude API",
    summary: "Get reliable, typed JSON responses from Claude using structured output features.",
    content: `## Structured Outputs

Get predictable, parseable responses from Claude instead of free-form text.

### Using Tool Use for Structured Output
\`\`\`typescript
const tools = [{
  name: "extract_info",
  description: "Extract structured information",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      sentiment: { enum: ["positive", "negative", "neutral"] },
      topics: { type: "array", items: { type: "string" } }
    },
    required: ["name", "email", "sentiment", "topics"]
  }
}];

// Force Claude to use the tool
const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  tools,
  tool_choice: { type: "tool", name: "extract_info" },
  messages: [{ role: "user", content: emailText }]
});
\`\`\`

### Use Cases
- **Data extraction** — Pull structured data from unstructured text
- **Classification** — Categorize content into predefined buckets
- **Entity recognition** — Extract names, dates, amounts
- **Form generation** — Convert descriptions into form schemas`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "intermediate",
    tags: ["api", "structured-output", "json"],
    estimatedMinutes: 20,
    createdAt: "2025-02-05",
  },
  {
    id: "slack-bot-automation",
    title: "Building a Slack Bot with Claude",
    summary: "Create an intelligent Slack bot that answers questions, summarizes threads, and automates workflows using Claude.",
    content: `## Slack Bot Powered by Claude

Build a Slack bot that actually understands context and can take actions.

### Architecture
\`\`\`
Slack Event → Your Server → Claude API → Response → Slack
                    ↓
              MCP Server (optional)
              → Database queries
              → Internal tool access
\`\`\`

### Basic Slack Bot
\`\`\`typescript
import { App } from "@slack/bolt";
import Anthropic from "@anthropic-ai/sdk";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const claude = new Anthropic();

app.message(async ({ message, say }) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: "You are a helpful team assistant in Slack. Be concise.",
    messages: [{ role: "user", content: message.text }],
  });

  await say(response.content[0].text);
});
\`\`\`

### Useful Automations
- **Thread summarization** — \`@bot summarize this thread\`
- **Question answering** — Query internal docs via MCP
- **Standup collection** — Automated standup prompts
- **Incident triage** — Auto-categorize and route alerts`,
    toolName: "Claude API",
    category: "communication",
    difficulty: "intermediate",
    tags: ["slack", "bot", "automation", "integration"],
    estimatedMinutes: 30,
    createdAt: "2025-01-30",
  },
  {
    id: "email-automation",
    title: "Email Automation with Claude",
    summary: "Automate email drafting, classification, and response generation using Claude's language understanding.",
    content: `## Email Automation

Use Claude to handle the repetitive parts of email — drafting, sorting, summarizing, and responding.

### Email Classification
\`\`\`typescript
const classifyEmail = async (email: string) => {
  const response = await claude.messages.create({
    model: "claude-haiku-3-5-20241022",
    max_tokens: 256,
    tools: [{
      name: "classify",
      description: "Classify an email",
      input_schema: {
        type: "object",
        properties: {
          category: { enum: ["urgent", "action-needed", "fyi", "spam"] },
          priority: { enum: ["high", "medium", "low"] },
          suggestedAction: { type: "string" }
        },
        required: ["category", "priority", "suggestedAction"]
      }
    }],
    tool_choice: { type: "tool", name: "classify" },
    messages: [{ role: "user", content: email }]
  });
  return response.content[0].input;
};
\`\`\`

### Auto-Draft Responses
- Pull context from CRM (via MCP)
- Match tone to previous emails
- Flag for human review before sending

### Workflow
1. Email arrives → classify priority
2. High priority → draft response, notify team
3. Action needed → create task in Linear
4. FYI → summarize and archive`,
    toolName: "Claude API",
    category: "communication",
    difficulty: "intermediate",
    tags: ["email", "automation", "classification"],
    estimatedMinutes: 25,
    createdAt: "2025-02-08",
  },
  {
    id: "hubspot-integration",
    title: "HubSpot CRM Automation with Claude",
    summary: "Automate deal tracking, contact enrichment, and CRM workflows using Claude + HubSpot integration.",
    content: `## HubSpot + Claude

Supercharge your CRM with AI-powered automation.

### What You Can Automate
- **Deal summaries** — Auto-generate deal status updates
- **Contact enrichment** — Research and fill in missing contact info
- **Follow-up drafting** — Generate personalized follow-ups
- **Pipeline analysis** — Identify at-risk deals

### MCP Server for HubSpot
\`\`\`json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "mcp-server-hubspot"],
      "env": {
        "HUBSPOT_API_KEY": "your-key"
      }
    }
  }
}
\`\`\`

### Example: Auto Deal Summary
\`\`\`
Claude, summarize the current status of the Acme Corp deal:
- Recent activities
- Next steps
- Risk factors
- Suggested actions
\`\`\`

### Pipeline Automation
1. New deal created → Claude researches company
2. Deal stage change → draft appropriate follow-up
3. Deal stale > 14 days → alert with suggestions
4. Deal won → generate onboarding plan`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "intermediate",
    tags: ["hubspot", "crm", "sales", "automation"],
    estimatedMinutes: 25,
    createdAt: "2025-02-12",
  },
  {
    id: "linear-management",
    title: "Linear Issue Management with Claude",
    summary: "Automate issue triage, sprint planning, and project management in Linear using Claude.",
    content: `## Linear + Claude

Streamline your project management with AI-powered issue handling.

### Automated Issue Triage
\`\`\`typescript
// When a new issue is created in Linear
const triageIssue = async (issue: LinearIssue) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    tools: [{
      name: "triage",
      description: "Triage a Linear issue",
      input_schema: {
        type: "object",
        properties: {
          priority: { enum: ["urgent", "high", "medium", "low"] },
          labels: { type: "array", items: { type: "string" } },
          estimatePoints: { type: "number" },
          assignTeam: { type: "string" },
          suggestedAssignee: { type: "string" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "triage" },
    messages: [{
      role: "user",
      content: \`Triage: \${issue.title}\\n\${issue.description}\`
    }]
  });
  // Apply triage results to Linear issue
};
\`\`\`

### Sprint Planning
- Auto-estimate story points based on description
- Suggest sprint assignments based on team capacity
- Identify blockers and dependencies

### Bug Report Enhancement
- Auto-add reproduction steps
- Link related issues
- Suggest fix approaches based on codebase context`,
    toolName: "Claude API",
    category: "workflow",
    difficulty: "intermediate",
    tags: ["linear", "project-management", "automation"],
    estimatedMinutes: 25,
    createdAt: "2025-02-15",
  },
  {
    id: "agent-sdk-intro",
    title: "Getting Started with the Agent SDK",
    summary: "Build multi-step AI agents that can plan, use tools, and complete complex tasks autonomously.",
    content: `## Claude Agent SDK

The Agent SDK lets you build autonomous AI agents that can plan and execute multi-step tasks.

### What Agents Can Do
Unlike simple API calls, agents can:
- **Plan** multi-step approaches
- **Use tools** iteratively based on results
- **Recover** from errors and adjust strategy
- **Orchestrate** multiple sub-agents

### Basic Agent (Python)
\`\`\`python
from claude_code_sdk import Agent

agent = Agent(
    model="claude-sonnet-4-20250514",
    tools=[search_tool, database_tool, email_tool],
    system_prompt="""You are a research agent.
    Given a topic, search for information,
    compile findings, and email a summary."""
)

result = await agent.run(
    "Research competitor pricing for Q1 2025
     and email the summary to team@company.com"
)
\`\`\`

### Multi-Agent Orchestration
\`\`\`python
# Coordinator delegates to specialized agents
coordinator = Agent(
    tools=[researcher, writer, reviewer],
    system_prompt="Coordinate research and report writing"
)

researcher = Agent(
    tools=[web_search, database],
    system_prompt="Research topics thoroughly"
)

writer = Agent(
    tools=[document_editor],
    system_prompt="Write clear, concise reports"
)
\`\`\`

### Use Cases
- **Research assistants** — Multi-source data gathering
- **Data pipelines** — ETL with AI understanding
- **Customer support** — Multi-step issue resolution
- **Content creation** — Research → draft → review → publish`,
    toolName: "Agent SDK",
    category: "coding",
    difficulty: "advanced",
    tags: ["agent", "sdk", "multi-step", "autonomous"],
    estimatedMinutes: 35,
    createdAt: "2025-02-20",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Best Practices",
    summary: "Write effective prompts that get consistent, high-quality results from Claude across all tools.",
    content: `## Prompt Engineering for Claude

Better prompts = better results. These patterns work across Claude Code, API, and all tools.

### The Clarity Principle
Bad: \`"Fix the code"\`
Good: \`"Fix the null reference error in src/auth/login.ts on line 42 where user.email is accessed before checking if user exists"\`

### Key Patterns

#### 1. Be Specific
\`\`\`
Instead of: "Make it better"
Say: "Refactor the fetchUsers function to:
- Use async/await instead of .then()
- Add error handling for network failures
- Add TypeScript types for the response"
\`\`\`

#### 2. Provide Context
\`\`\`
"We use React Query for data fetching in this project.
Add a useQuery hook for the /api/users endpoint
following the pattern in src/hooks/useProducts.ts"
\`\`\`

#### 3. Define Output Format
\`\`\`
"Analyze this error log and return:
1. Root cause (one sentence)
2. Affected components (list)
3. Fix steps (numbered)
4. Prevention strategy (one paragraph)"
\`\`\`

#### 4. Use System Prompts
For API usage, set clear system prompts that define:
- Role and expertise
- Output format expectations
- Constraints and boundaries
- Tone and style

### Anti-Patterns
- Don't be vague — "do something with this data"
- Don't over-constrain — let Claude use its judgment
- Don't include irrelevant context — focus on what matters`,
    toolName: "Claude API",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["prompts", "best-practices", "tips"],
    estimatedMinutes: 15,
    createdAt: "2025-01-12",
  },
  {
    id: "security-best-practices",
    title: "Security Best Practices for AI Tools",
    summary: "Keep your AI integrations secure — API key management, data handling, and access control.",
    content: `## Security for AI Integrations

AI tools are powerful but need proper security guardrails.

### API Key Management
\`\`\`bash
# NEVER do this
const API_KEY = "sk-ant-abc123..."  # Hardcoded key

# DO this
const API_KEY = process.env.ANTHROPIC_API_KEY;
\`\`\`

**Rules:**
- Store keys in environment variables
- Use secrets managers (AWS Secrets Manager, Vault)
- Rotate keys regularly
- Use separate keys for dev/staging/production

### Data Handling
- **Don't send PII** to AI unless necessary
- **Redact sensitive data** before processing
- **Log AI interactions** for audit trails
- **Set retention policies** for AI-processed data

### Access Control
\`\`\`typescript
// Validate user permissions before AI actions
const canExecute = await checkPermission(user, action);
if (!canExecute) {
  throw new ForbiddenError("Insufficient permissions");
}
// Then call Claude
\`\`\`

### MCP Security
- Restrict MCP server permissions to minimum needed
- Validate all tool inputs
- Use OAuth2 for MCP authentication
- Audit MCP tool usage

### Checklist
- [ ] API keys in environment variables
- [ ] No secrets in source code
- [ ] Input validation on all AI-powered endpoints
- [ ] Rate limiting on AI API calls
- [ ] Logging and monitoring
- [ ] Regular security reviews`,
    toolName: "Claude API",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["security", "api-keys", "best-practices"],
    estimatedMinutes: 15,
    createdAt: "2025-01-18",
  },
  {
    id: "multi-tool-workflow",
    title: "Multi-Tool Workflow: Slack → Linear → HubSpot",
    summary: "Build an end-to-end workflow that connects Slack messages to Linear issues and HubSpot deals using Claude as the orchestrator.",
    content: `## Multi-Tool Workflow

Connect your entire toolchain with Claude as the intelligent middleware.

### The Pipeline
\`\`\`
Slack message (customer request)
    ↓ Claude analyzes
Linear issue (auto-created with details)
    ↓ Claude monitors
HubSpot deal (updated with context)
    ↓ Claude drafts
Slack response (to customer channel)
\`\`\`

### Implementation
\`\`\`typescript
// 1. Listen for Slack messages
app.message(/customer request/i, async ({ message }) => {
  // 2. Claude analyzes the request
  const analysis = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: message.text }],
    tools: [analyzeTool],
    tool_choice: { type: "tool", name: "analyze_request" }
  });

  const { priority, category, summary } = analysis.content[0].input;

  // 3. Create Linear issue
  const issue = await linearClient.createIssue({
    title: summary,
    priority: mapPriority(priority),
    labels: [category],
  });

  // 4. Update HubSpot deal
  await hubspotClient.updateDeal(dealId, {
    notes: \`New request: \${summary} (Linear: \${issue.id})\`,
  });

  // 5. Respond in Slack
  await say(\`Created \${issue.identifier}: \${summary}\`);
});
\`\`\`

### Benefits
- Zero manual data entry
- Consistent categorization
- Full traceability across tools
- Team stays in Slack`,
    toolName: "Claude API",
    category: "workflow",
    difficulty: "advanced",
    tags: ["workflow", "multi-tool", "slack", "linear", "hubspot"],
    estimatedMinutes: 35,
    createdAt: "2025-02-18",
  },
  {
    id: "cowork-getting-started",
    title: "Getting Started with Claude Cowork",
    summary: "Learn to use Claude Cowork for GUI automation, scheduled tasks, and visual workflows.",
    content: `## Claude Cowork

Cowork is Claude's GUI automation tool — it can see your screen, click buttons, fill forms, and complete visual tasks.

### What Cowork Does
- **GUI Automation** — Interact with any application visually
- **Scheduled Tasks** — Run workflows on a schedule
- **VM Execution** — Safe, sandboxed environment
- **Plugin Marketplace** — Pre-built automation recipes

### Use Cases
1. **Data entry** — Fill forms across multiple apps
2. **Report generation** — Navigate dashboards, export data
3. **Testing** — Visual regression testing
4. **Monitoring** — Check dashboards on schedule

### Setting Up a Task
1. Describe what you want done in natural language
2. Cowork plans the steps
3. Review and approve the plan
4. Cowork executes (you can watch live)
5. Results are saved and reported

### Example
\`\`\`
"Every Monday at 9am:
1. Open our analytics dashboard
2. Screenshot the weekly metrics
3. Export the CSV data
4. Post the screenshot and summary to #metrics in Slack"
\`\`\`

### Tips
- Start with simple, repeatable tasks
- Review Cowork's plan before execution
- Use schedules for regular workflows
- Combine with MCP for data access`,
    toolName: "Claude Cowork",
    category: "automation",
    difficulty: "beginner",
    tags: ["cowork", "gui", "automation", "scheduled"],
    estimatedMinutes: 20,
    createdAt: "2025-02-22",
  },
  {
    id: "ai-connectors",
    title: "Using AI Connectors on Claude.ai",
    summary: "Connect Claude to 50+ services directly through Claude.ai — Google Drive, Notion, GitHub, and more.",
    content: `## AI Connectors

AI Connectors let Claude access your tools directly from the Claude.ai interface — no code required.

### Available Connectors (50+)
- **Productivity**: Google Drive, Notion, Confluence
- **Development**: GitHub, GitLab, Bitbucket
- **Communication**: Slack, Gmail
- **Design**: Figma
- **Data**: Google Sheets, Airtable
- **Project Management**: Linear, Jira, Asana

### How to Connect
1. Go to Claude.ai → Settings → Connectors
2. Click "Add Connector"
3. Authorize access to the service
4. Start using it in conversations

### Example Usage
\`\`\`
"Search my Google Drive for the Q4 planning doc
and summarize the key objectives"

"Look at the open issues in our GitHub repo
and identify which ones are blocking the release"

"Check my Notion workspace for the product roadmap
and list features planned for March"
\`\`\`

### Benefits
- No code needed — works through Claude.ai
- Real-time access to your data
- Secure OAuth connections
- Works with Claude's full reasoning`,
    toolName: "AI Connectors",
    category: "automation",
    difficulty: "beginner",
    tags: ["connectors", "integrations", "no-code"],
    estimatedMinutes: 10,
    createdAt: "2025-02-25",
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByTool(toolName: string): Lesson[] {
  return lessons.filter((l) => l.toolName === toolName);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter((l) => l.category === category);
}

export function getLessonsByDifficulty(difficulty: string): Lesson[] {
  return lessons.filter((l) => l.difficulty === difficulty);
}

export function searchLessons(query: string): Lesson[] {
  const q = query.toLowerCase();
  return lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q) ||
      l.tags.some((t) => t.includes(q)) ||
      l.toolName.toLowerCase().includes(q)
  );
}

export function getAllTools(): string[] {
  return [...new Set(lessons.map((l) => l.toolName))];
}

export function getAllCategories(): string[] {
  return [...new Set(lessons.map((l) => l.category))];
}

export function getAllTags(): string[] {
  return [...new Set(lessons.flatMap((l) => l.tags))];
}
