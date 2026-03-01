import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // ─── Claude 101 (Skilljar Course) ───
  {
    id: "claude-101-getting-started",
    title: "Claude 101: Getting Started",
    summary:
      "Learn how to use Claude for everyday work tasks, understand core features, and explore resources for more advanced learning.",
    content: `## Welcome to Claude

Claude is an AI assistant built by Anthropic to be helpful, harmless, and honest. This lesson covers the fundamentals you need to start using Claude effectively in your daily work.

### What Claude Can Do

- **Write & edit** — Draft emails, documents, marketing copy, code
- **Analyze & summarize** — Understand long documents, extract insights, create summaries
- **Reason & plan** — Break down complex problems, compare options, build plans
- **Code** — Write, debug, explain, and refactor code across 30+ languages
- **Research** — Synthesize information from provided context

### Core Concepts

#### Conversations
Claude works through conversations. Each message builds on previous context, so you can iterate and refine:

\`\`\`
You: "Draft an email to the team about the upcoming sprint"
Claude: [drafts email]
You: "Make it shorter and more casual"
Claude: [revises]
\`\`\`

#### Context Window
Claude can process large amounts of text — up to 200K tokens (roughly 150,000 words). This means you can:
- Upload entire documents for analysis
- Provide extensive background context
- Work with large codebases

#### Artifacts
Claude can create standalone content — code, documents, diagrams — that appear in a separate panel for easy copying and iteration.

### Best Practices
1. **Be specific** about what you want
2. **Provide context** — the more Claude knows, the better the output
3. **Iterate** — refine through follow-up messages
4. **Verify** — always review Claude's output, especially for factual claims

### Next Steps
Continue to the Anthropic Academy for the full interactive course with quizzes and hands-on exercises.`,
    toolName: "Claude",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["getting-started", "fundamentals", "claude-101"],
    estimatedMinutes: 20,
    createdAt: "2025-01-10",
    skilljarUrl: "https://anthropic.skilljar.com/claude-101",
    skilljarCourse: "Claude 101",
  },

  // ─── AI Fluency (Skilljar Course) ───
  {
    id: "ai-fluency-foundations",
    title: "AI Fluency: Framework & Foundations",
    summary:
      "Learn to collaborate with AI systems effectively, efficiently, ethically, and safely.",
    content: `## AI Fluency Framework

This course teaches you to work with AI systems using a structured framework built on four pillars: **Effective, Efficient, Ethical, and Safe**.

### The 4E Framework

#### 1. Effective
Getting high-quality results from AI:
- Writing clear prompts with the right level of detail
- Providing sufficient context for the task
- Iterating to refine outputs
- Knowing when AI is the right tool (and when it isn't)

#### 2. Efficient
Maximizing productivity:
- Structuring workflows to leverage AI at the right steps
- Using templates and system prompts for repeated tasks
- Batching similar requests
- Knowing shortcuts and power-user features

#### 3. Ethical
Using AI responsibly:
- Understanding AI limitations and potential biases
- Giving proper attribution
- Respecting intellectual property
- Considering impact on others
- Maintaining human oversight and accountability

#### 4. Safe
Protecting yourself and your organization:
- Never sharing sensitive data (PII, credentials, trade secrets) without appropriate safeguards
- Verifying AI-generated information before acting on it
- Understanding your organization's AI usage policies
- Recognizing when AI output needs human review

### Practical Application

For each task, ask yourself:
1. **Is AI the right tool?** — Some tasks need human judgment
2. **Do I have the right context?** — More context = better output
3. **Am I being responsible?** — Check for bias, verify facts
4. **Is the data safe?** — Don't expose sensitive information

### Certificate
Complete the full course on Anthropic Academy to earn your AI Fluency certificate.`,
    toolName: "Claude",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["ai-fluency", "framework", "ethics", "safety"],
    estimatedMinutes: 30,
    createdAt: "2025-01-05",
    skilljarUrl: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
    skilljarCourse: "AI Fluency: Framework & Foundations",
  },

  // ─── Claude Code in Action (Skilljar Course) ───
  {
    id: "claude-code-intro",
    title: "Getting Started with Claude Code",
    summary:
      "Learn the fundamentals of Claude Code — the AI-powered CLI that reads, edits, and manages your codebase directly from the terminal.",
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

### Tool Use System
Claude Code uses multiple tools under the hood:
- **Read** — Read file contents
- **Edit** — Make precise code changes
- **Bash** — Run terminal commands
- **Glob/Grep** — Search for files and content

### Tips
1. Be specific about what you want changed
2. Claude Code reads your CLAUDE.md file for project context
3. Use \`/help\` to see available slash commands
4. Use \`Shift+Tab\` to toggle plan mode for complex tasks`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "beginner",
    tags: ["cli", "getting-started", "terminal"],
    estimatedMinutes: 15,
    createdAt: "2025-01-15",
    skilljarUrl: "https://anthropic.skilljar.com/claude-code-in-action",
    skilljarCourse: "Claude Code in Action",
  },
  {
    id: "claude-code-reviews",
    title: "AI-Powered Code Reviews with Claude Code",
    summary:
      "Use Claude Code to review pull requests, catch bugs, and suggest improvements before merging.",
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

### Visual Communication Workflows
You can share screenshots with Claude Code for UI-related reviews:
\`\`\`bash
# Share a screenshot for visual review
claude "Here's a screenshot of the current UI.
Compare it to the design spec and identify differences."
\`\`\`

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
    skilljarUrl: "https://anthropic.skilljar.com/claude-code-in-action",
    skilljarCourse: "Claude Code in Action",
  },
  {
    id: "claude-md-config",
    title: "Configuring CLAUDE.md for Your Project",
    summary:
      "Set up CLAUDE.md to give Claude Code persistent context about your project's conventions, architecture, and rules.",
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

### Context Management
Claude Code uses CLAUDE.md as part of its context management system:
- **Root CLAUDE.md** — Project-wide rules
- **Directory CLAUDE.md** — Folder-specific conventions
- **~/.claude/CLAUDE.md** — Your personal global preferences

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
    skilljarUrl: "https://anthropic.skilljar.com/claude-code-in-action",
    skilljarCourse: "Claude Code in Action",
  },
  {
    id: "claude-code-thinking-planning",
    title: "Thinking & Planning Modes in Claude Code",
    summary:
      "Use thinking mode for complex reasoning and plan mode to architect multi-step changes before executing.",
    content: `## Thinking & Planning in Claude Code

Claude Code offers different reasoning approaches for different types of programming challenges.

### Thinking Mode
When Claude Code encounters a complex problem, it uses extended thinking to reason through it step by step before responding.

This is especially useful for:
- **Debugging** complex multi-file issues
- **Architecture** decisions with trade-offs
- **Refactoring** that touches many files
- **Performance** optimization

### Plan Mode
Use \`Shift+Tab\` to toggle Plan Mode. In this mode, Claude Code will:

1. **Analyze** the full scope of the change
2. **Create a plan** with specific steps
3. **Wait for approval** before making changes
4. **Execute** the plan step-by-step

\`\`\`
You: [Shift+Tab to enable Plan Mode]
You: "Add authentication to the API"

Claude Code:
## Plan
1. Install next-auth and dependencies
2. Create auth configuration in src/lib/auth.ts
3. Add API route at src/app/api/auth/[...nextauth]/route.ts
4. Create middleware for protected routes
5. Update existing API routes to check auth
6. Add login/logout UI components

Proceed? [y/n]
\`\`\`

### Custom Automation
Build reusable slash commands for common tasks:
\`\`\`markdown
# In your CLAUDE.md or as a /command
/review - Review current branch changes
/test - Run tests and fix failures
/deploy - Build, test, and prepare for deployment
\`\`\`

### When to Use Each Mode
| Scenario | Approach |
|----------|----------|
| Quick fix | Normal mode |
| Complex bug | Thinking mode (automatic) |
| Large feature | Plan mode (Shift+Tab) |
| Repeated task | Custom slash command |`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "intermediate",
    tags: ["thinking", "planning", "reasoning", "workflows"],
    estimatedMinutes: 20,
    createdAt: "2025-02-15",
    skilljarUrl: "https://anthropic.skilljar.com/claude-code-in-action",
    skilljarCourse: "Claude Code in Action",
  },

  // ─── Agent Skills (Skilljar Course) ───
  {
    id: "agent-skills-intro",
    title: "Introduction to Agent Skills",
    summary:
      "Learn how to build, configure, and share Skills in Claude Code — reusable markdown instructions that Claude applies to the right tasks at the right time.",
    content: `## What Are Agent Skills?

Skills are reusable markdown instructions that Claude Code automatically applies to the right tasks. Think of them as specialized "expertise" you can teach Claude.

### Skills vs Other Customization

| Method | Scope | When Applied |
|--------|-------|-------------|
| CLAUDE.md | Project-wide | Always loaded |
| Hooks | Event-driven | On specific tool calls |
| **Skills** | Task-specific | When Claude detects a match |
| Subagents | Delegated tasks | When spawned |

### Creating Your First Skill

Create a \`SKILL.md\` file with frontmatter:

\`\`\`markdown
---
description: "Review React components for accessibility issues"
tools: ["Read", "Edit", "Grep"]
---

# A11y Review Skill

When reviewing React components:
1. Check all images have alt text
2. Verify ARIA labels on interactive elements
3. Ensure color contrast meets WCAG AA
4. Check keyboard navigation support
5. Verify focus management in modals/dialogs
\`\`\`

### How Matching Works
Claude reads the \`description\` field and matches it against the user's request. Write clear, specific descriptions for reliable triggering.

### Sharing Skills
- **Repo-level**: Commit to your project's \`.claude/skills/\` directory
- **Plugins**: Distribute through Claude Code plugins
- **Enterprise**: Deploy organization-wide via managed settings

### Troubleshooting
- **Skill won't trigger**: Make the description more specific
- **Priority conflicts**: Use more targeted descriptions
- **Too much context**: Use progressive disclosure in skill content`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "intermediate",
    tags: ["skills", "automation", "customization"],
    estimatedMinutes: 25,
    createdAt: "2025-02-20",
    skilljarUrl: "https://anthropic.skilljar.com/introduction-to-agent-skills",
    skilljarCourse: "Introduction to Agent Skills",
  },

  // ─── MCP (Skilljar Course) ───
  {
    id: "mcp-intro",
    title: "Introduction to Model Context Protocol (MCP)",
    summary:
      "Understand MCP — the open protocol that lets AI models connect to external tools, databases, and services.",
    content: `## What is MCP?

The Model Context Protocol (MCP) is an open standard that lets AI assistants like Claude connect to external data sources and tools through a unified interface.

### The Problem MCP Solves
Before MCP, every AI integration was custom-built. Each tool needed its own connector, authentication, and data format. MCP standardizes this.

### Architecture
\`\`\`
Your App → Claude (AI) → MCP Client → MCP Server → External Tool
                                                    (Slack, DB, API, etc.)
\`\`\`

### The Three Core Primitives

1. **Tools** — Actions the AI can take
   - Send a message, query a database, create a file
   - Defined with JSON schemas for inputs/outputs

2. **Resources** — Read-only data the AI can access
   - Files, database records, API responses
   - Exposed with URI patterns and MIME types

3. **Prompts** — Pre-built workflow instructions
   - High-quality prompt templates for common tasks
   - Include argument placeholders for customization

### Transport Protocols
MCP supports multiple transport mechanisms:
- **stdio** — Local communication via stdin/stdout
- **StreamableHTTP** — Remote communication via HTTP + Server-Sent Events

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
\`\`\`

### Community Ecosystem
3,000+ community-built MCP servers covering databases, APIs, dev tools, productivity apps, and more.`,
    toolName: "MCP",
    category: "automation",
    difficulty: "beginner",
    tags: ["mcp", "protocol", "integrations"],
    estimatedMinutes: 20,
    createdAt: "2025-01-10",
    skilljarUrl:
      "https://anthropic.skilljar.com/introduction-to-model-context-protocol",
    skilljarCourse: "Introduction to Model Context Protocol",
  },
  {
    id: "mcp-custom-server",
    title: "Building a Custom MCP Server",
    summary:
      "Build your own MCP server in Python to expose internal tools and data to Claude using the three core primitives.",
    content: `## Build Your Own MCP Server

When community servers don't cover your use case, build a custom one using the Python SDK.

### Python Quick Start
\`\`\`python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-internal-tools")

# Define a Tool (action Claude can take)
@mcp.tool()
def search_docs(query: str) -> str:
    """Search internal documentation."""
    results = search_internal_docs(query)
    return json.dumps(results)

# Define a Resource (read-only data)
@mcp.resource("docs://{doc_id}")
def get_document(doc_id: str) -> str:
    """Retrieve a specific document by ID."""
    return load_document(doc_id)

# Define a Prompt (workflow template)
@mcp.prompt()
def review_code(language: str) -> str:
    """Generate a code review prompt for the given language."""
    return f"Review this {language} code for bugs, security issues, and style."

mcp.run()
\`\`\`

### TypeScript Example
\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-internal-tools",
  version: "1.0.0",
});

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

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### Testing with MCP Inspector
Use the built-in MCP Server Inspector to test your server before deploying:
\`\`\`bash
npx @modelcontextprotocol/inspector your-server.py
\`\`\`

### Best Practices
1. Keep tools focused — one action per tool
2. Write clear descriptions — Claude uses them to decide when to call tools
3. Validate inputs with schemas
4. Handle errors gracefully
5. Add authentication for sensitive operations`,
    toolName: "MCP",
    category: "coding",
    difficulty: "intermediate",
    tags: ["mcp", "server", "python", "development"],
    estimatedMinutes: 30,
    createdAt: "2025-02-10",
    skilljarUrl:
      "https://anthropic.skilljar.com/introduction-to-model-context-protocol",
    skilljarCourse: "Introduction to Model Context Protocol",
  },
  {
    id: "mcp-advanced-topics",
    title: "MCP Advanced: Transports, Sampling & Scaling",
    summary:
      "Deep dive into MCP transport protocols, sampling for AI integration, notification systems, and production scaling.",
    content: `## MCP Advanced Topics

Take your MCP knowledge further with advanced capabilities for production deployments.

### Sampling
MCP servers can request language model calls through connected clients:
- Enables AI-in-the-loop workflows
- Server asks the client to run a prompt through Claude
- Results come back to the server for further processing

### Notification Systems
Real-time feedback for long-running operations:
\`\`\`python
@mcp.tool()
async def process_large_dataset(path: str, ctx: Context) -> str:
    """Process a large dataset with progress reporting."""
    data = load_dataset(path)
    for i, chunk in enumerate(data.chunks()):
        await ctx.report_progress(i, len(data.chunks()))
        await ctx.log(f"Processing chunk {i}...")
        process(chunk)
    return "Complete"
\`\`\`

### Transport Protocols

#### stdio (Local)
- Communication via standard input/output
- Best for local development and single-user setups
- Simple, reliable, low-latency

#### StreamableHTTP (Remote)
- HTTP + Server-Sent Events for streaming
- Best for production, multi-user deployments
- Supports horizontal scaling

#### Choosing a Transport
| Requirement | stdio | StreamableHTTP |
|------------|-------|---------------|
| Local dev | Best | OK |
| Production | Limited | Best |
| Multi-user | No | Yes |
| Horizontal scaling | No | Yes |
| Simplicity | Best | Moderate |

### Roots-Based File Access
Permission system for controlled file access:
- Grant MCP servers access to specific directories
- Security boundaries prevent unauthorized access
- Fine-grained control over what the server can read/write

### Production Scaling
- Use StreamableHTTP for stateless deployment
- Horizontal scaling with load balancers
- Session management for stateful operations
- Health checks and monitoring`,
    toolName: "MCP",
    category: "coding",
    difficulty: "advanced",
    tags: ["mcp", "transports", "sampling", "scaling"],
    estimatedMinutes: 35,
    createdAt: "2025-02-18",
    skilljarUrl:
      "https://anthropic.skilljar.com/model-context-protocol-advanced-topics",
    skilljarCourse: "MCP: Advanced Topics",
  },

  // ─── Building with the Claude API (Skilljar Course) ───
  {
    id: "claude-api-setup",
    title: "Claude API: Setup & First Request",
    summary:
      "Set up the Anthropic SDK, manage API keys, and make your first API call to Claude.",
    content: `## Getting Started with the Claude API

The Claude API gives you programmatic access to Claude for building AI-powered applications.

### Installation
\`\`\`bash
# Python
pip install anthropic

# TypeScript/JavaScript
npm install @anthropic-ai/sdk
\`\`\`

### API Key Setup
\`\`\`bash
# Set your API key as an environment variable
export ANTHROPIC_API_KEY="sk-ant-..."
\`\`\`

**Security**: Never hardcode API keys. Use environment variables or a secrets manager.

### Your First Request
\`\`\`python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain quantum computing in simple terms"}
    ]
)
print(message.content[0].text)
\`\`\`

### TypeScript
\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Explain quantum computing in simple terms" }
  ],
});
console.log(message.content[0].text);
\`\`\`

### Multi-Turn Conversations
\`\`\`python
messages = [
    {"role": "user", "content": "What's the capital of France?"},
    {"role": "assistant", "content": "The capital of France is Paris."},
    {"role": "user", "content": "What's its population?"},
]
\`\`\`

### System Prompts
\`\`\`python
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="You are a helpful coding assistant. Always include code examples.",
    messages=[{"role": "user", "content": "How do I read a file in Python?"}]
)
\`\`\``,
    toolName: "Claude API",
    category: "coding",
    difficulty: "beginner",
    tags: ["api", "setup", "getting-started", "sdk"],
    estimatedMinutes: 15,
    createdAt: "2025-01-12",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },
  {
    id: "claude-api-tool-use",
    title: "Claude API: Tool Use & Function Calling",
    summary:
      "Learn to give Claude tools via the API — let it call functions, query databases, and take actions in your app.",
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
for (const block of response.content) {
  if (block.type === "tool_use") {
    const result = await executeFunction(block.name, block.input);
    // Send result back to Claude in a tool_result message
  }
}
\`\`\`

### Web Search
Claude can search the web when you enable it:
\`\`\`python
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=[{"type": "web_search_20250305"}],
    messages=[{"role": "user", "content": "What's the latest news about AI?"}]
)
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
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },
  {
    id: "claude-api-structured-output",
    title: "Structured Outputs with Claude API",
    summary:
      "Get reliable, typed JSON responses from Claude using structured output features.",
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

### Prompt Evaluation
Build automated grading for prompt quality:
\`\`\`python
# Define evaluation criteria
criteria = {
    "accuracy": "Does the response contain correct information?",
    "completeness": "Does it address all parts of the question?",
    "clarity": "Is the response clear and well-organized?",
}

# Use Claude to grade responses against criteria
grade = await evaluate_response(response, criteria)
\`\`\`

### Prompt Engineering with XML
Structure complex prompts using XML tags:
\`\`\`xml
<context>
  You are analyzing customer support tickets.
</context>

<instructions>
  Extract the following from each ticket:
  - Issue category
  - Severity level
  - Suggested resolution
</instructions>

<ticket>
  {{ticket_text}}
</ticket>
\`\`\`

### Use Cases
- **Data extraction** — Pull structured data from unstructured text
- **Classification** — Categorize content into predefined buckets
- **Entity recognition** — Extract names, dates, amounts
- **Form generation** — Convert descriptions into form schemas`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "intermediate",
    tags: ["api", "structured-output", "json", "evaluation"],
    estimatedMinutes: 20,
    createdAt: "2025-02-05",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },
  {
    id: "claude-api-rag",
    title: "Building RAG Systems with Claude",
    summary:
      "Implement retrieval-augmented generation using embeddings, BM25 search, and Claude for accurate, grounded responses.",
    content: `## Retrieval-Augmented Generation (RAG)

RAG combines document retrieval with Claude's generation capabilities for accurate, source-grounded responses.

### How RAG Works
\`\`\`
User Query → Retrieve Relevant Docs → Claude + Docs → Grounded Answer
\`\`\`

### Implementation Steps

#### 1. Index Your Documents
\`\`\`python
from anthropic import Anthropic

# Chunk your documents
chunks = split_into_chunks(documents, max_tokens=500)

# Create embeddings (use Voyage or similar)
embeddings = embed_chunks(chunks)

# Store in vector database
vector_db.insert(chunks, embeddings)
\`\`\`

#### 2. Retrieve on Query
\`\`\`python
# Hybrid retrieval: combine vector search + BM25
vector_results = vector_db.search(query_embedding, top_k=5)
bm25_results = bm25_index.search(query, top_k=5)

# Merge and deduplicate
relevant_docs = merge_results(vector_results, bm25_results)
\`\`\`

#### 3. Generate with Context
\`\`\`python
client = Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=2048,
    system="""Answer questions based on the provided documents.
    Always cite your sources. If the documents don't contain
    the answer, say so.""",
    messages=[{
        "role": "user",
        "content": f"""Documents:
{format_docs(relevant_docs)}

Question: {user_query}"""
    }]
)
\`\`\`

### Citations
Claude can provide precise citations with the citations feature:
- Reference specific passages from source documents
- Include page/section numbers
- Distinguish between sourced and inferred information

### Prompt Caching
Optimize costs for repeated context:
\`\`\`python
# Cache the system prompt + document context
# Only pay for the cache once, then reuse across queries
\`\`\``,
    toolName: "Claude API",
    category: "coding",
    difficulty: "advanced",
    tags: ["rag", "embeddings", "retrieval", "search"],
    estimatedMinutes: 35,
    createdAt: "2025-02-12",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },
  {
    id: "claude-api-agents",
    title: "Building Agents with the Claude API",
    summary:
      "Design agent architectures using Claude — from simple tool loops to multi-agent orchestration with parallelization and routing.",
    content: `## Agent-Based Systems with Claude

Agents are systems where Claude operates in a loop, using tools iteratively to accomplish complex tasks.

### The Agent Loop
\`\`\`python
import anthropic

client = anthropic.Anthropic()
tools = [search_tool, database_tool, email_tool]

messages = [{"role": "user", "content": task}]

# Agent loop
while True:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )

    # Check if Claude wants to use a tool
    if response.stop_reason == "tool_use":
        # Execute tool calls
        tool_results = execute_tools(response.content)
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
    else:
        # Claude is done
        break
\`\`\`

### Architecture Patterns

#### Parallelization
Run multiple Claude calls simultaneously:
\`\`\`python
import asyncio

async def parallel_analysis(documents):
    tasks = [analyze(doc) for doc in documents]
    return await asyncio.gather(*tasks)
\`\`\`

#### Routing
Direct tasks to specialized handlers:
\`\`\`python
# Claude classifies the task, then routes to specialist
task_type = classify(user_input)  # "code", "writing", "analysis"
result = specialists[task_type].handle(user_input)
\`\`\`

#### Multi-Agent Orchestration
\`\`\`python
coordinator = Agent(tools=[researcher, writer, reviewer])
researcher = Agent(tools=[web_search, database])
writer = Agent(tools=[document_editor])
reviewer = Agent(tools=[linter, fact_checker])
\`\`\`

### Use Cases
- **Research assistants** — Multi-source data gathering
- **Data pipelines** — ETL with AI understanding
- **Customer support** — Multi-step issue resolution
- **Content creation** — Research → draft → review → publish`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "advanced",
    tags: ["agents", "orchestration", "architecture"],
    estimatedMinutes: 40,
    createdAt: "2025-02-20",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },

  // ─── Prompt Engineering ───
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Best Practices",
    summary:
      "Write effective prompts that get consistent, high-quality results from Claude across all tools.",
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

#### 4. Use XML Structure for Complex Prompts
\`\`\`xml
<context>Background information here</context>
<instructions>What you want Claude to do</instructions>
<constraints>Rules and limitations</constraints>
<output_format>Expected response structure</output_format>
\`\`\`

#### 5. Use System Prompts
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
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },

  // ─── Security ───
  {
    id: "security-best-practices",
    title: "Security Best Practices for AI Tools",
    summary:
      "Keep your AI integrations secure — API key management, data handling, and access control.",
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
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },

  // ─── Integration Recipes ───
  {
    id: "slack-bot-automation",
    title: "Building a Slack Bot with Claude",
    summary:
      "Create an intelligent Slack bot that answers questions, summarizes threads, and automates workflows using Claude.",
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
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },

  // ─── Claude on Cloud Platforms ───
  {
    id: "claude-bedrock",
    title: "Claude with Amazon Bedrock",
    summary:
      "Deploy and use Claude models through AWS Bedrock for enterprise-grade AI applications.",
    content: `## Claude on Amazon Bedrock

Amazon Bedrock provides a fully managed way to access Claude models within your AWS infrastructure.

### Why Bedrock?
- **No API key management** — Uses AWS IAM
- **VPC integration** — Keep data in your network
- **Compliance** — AWS security and compliance frameworks
- **Scaling** — Auto-scales with demand

### Setup
\`\`\`python
import boto3

client = boto3.client("bedrock-runtime", region_name="us-east-1")

response = client.invoke_model(
    modelId="anthropic.claude-sonnet-4-20250514-v1:0",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [
            {"role": "user", "content": "Hello, Claude!"}
        ]
    })
)

result = json.loads(response["body"].read())
print(result["content"][0]["text"])
\`\`\`

### Key Differences from Direct API
| Feature | Direct API | Bedrock |
|---------|-----------|---------|
| Auth | API key | AWS IAM |
| Billing | Anthropic | AWS |
| Network | Public | VPC support |
| Models | Latest | Bedrock catalog |

### Features Supported
- Multi-turn conversations
- System prompts
- Tool use / function calling
- Streaming responses
- Vision (image input)

### Best Practices
- Use IAM roles with least-privilege permissions
- Enable CloudWatch logging for monitoring
- Set up AWS Budgets for cost control
- Use provisioned throughput for predictable workloads`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "intermediate",
    tags: ["aws", "bedrock", "cloud", "enterprise"],
    estimatedMinutes: 25,
    createdAt: "2025-02-08",
    skilljarUrl: "https://anthropic.skilljar.com/claude-in-amazon-bedrock",
    skilljarCourse: "Claude with Amazon Bedrock",
  },
  {
    id: "claude-vertex",
    title: "Claude with Google Cloud Vertex AI",
    summary:
      "Access Claude through Google Cloud's Vertex AI platform for seamless integration with GCP services.",
    content: `## Claude on Vertex AI

Google Cloud's Vertex AI offers Claude models with native GCP integration.

### Setup
\`\`\`python
from anthropic import AnthropicVertex

client = AnthropicVertex(
    region="us-east5",
    project_id="your-gcp-project"
)

message = client.messages.create(
    model="claude-sonnet-4@20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello from Vertex AI!"}
    ]
)
print(message.content[0].text)
\`\`\`

### GCP Integration Benefits
- **IAM** — Use Google Cloud IAM for access control
- **VPC Service Controls** — Keep data within your perimeter
- **Cloud Logging** — Monitor usage with Cloud Logging
- **BigQuery** — Export usage data for analysis

### Feature Parity
Vertex AI supports the same Claude features:
- Tool use / function calling
- Multi-turn conversations
- System prompts
- Streaming
- Vision

### When to Use Vertex AI vs Direct API
- **Use Vertex** when your stack is on GCP
- **Use Direct API** for multi-cloud or standalone apps
- **Use Bedrock** when your stack is on AWS

### Billing
- Billed through your GCP account
- Same model pricing, paid through GCP
- Use Budgets & Alerts for cost management`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "intermediate",
    tags: ["gcp", "vertex", "cloud", "enterprise"],
    estimatedMinutes: 25,
    createdAt: "2025-02-10",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-google-vertex",
    skilljarCourse: "Claude with Google Cloud Vertex AI",
  },

  // ─── Workflow ───
  {
    id: "multi-tool-workflow",
    title: "Multi-Tool Workflow: End-to-End Automation",
    summary:
      "Build an end-to-end workflow connecting Slack, Linear, and other tools using Claude as the intelligent orchestrator.",
    content: `## Multi-Tool Workflow

Connect your entire toolchain with Claude as the intelligent middleware.

### The Pipeline
\`\`\`
Slack message (customer request)
    ↓ Claude analyzes
Linear issue (auto-created with details)
    ↓ Claude monitors
CRM deal (updated with context)
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

  // 4. Respond in Slack
  await say(\`Created \${issue.identifier}: \${summary}\`);
});
\`\`\`

### Benefits
- Zero manual data entry
- Consistent categorization
- Full traceability across tools
- Team stays in their preferred tool`,
    toolName: "Claude API",
    category: "workflow",
    difficulty: "advanced",
    tags: ["workflow", "multi-tool", "slack", "linear", "automation"],
    estimatedMinutes: 35,
    createdAt: "2025-02-18",
    skilljarUrl: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    skilljarCourse: "Building with the Claude API",
  },

  // ─── Franzy Team: Integration Recipes ───
  {
    id: "email-automation",
    title: "Email Automation with Claude",
    summary:
      "Automate email drafting, classification, and response generation using Claude's language understanding.",
    content: `## Email Automation

Use Claude to handle the repetitive parts of email — drafting, sorting, summarizing, and responding.

### Email Classification
\`\`\`typescript
const classifyEmail = async (email: string) => {
  const response = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
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
    tags: ["email", "automation", "classification", "franzy"],
    estimatedMinutes: 25,
    createdAt: "2025-02-08",
  },
  {
    id: "hubspot-integration",
    title: "HubSpot CRM Automation with Claude",
    summary:
      "Automate deal tracking, contact enrichment, and CRM workflows using Claude + HubSpot integration.",
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
    tags: ["hubspot", "crm", "sales", "automation", "franzy"],
    estimatedMinutes: 25,
    createdAt: "2025-02-12",
  },
  {
    id: "linear-management",
    title: "Linear Issue Management with Claude",
    summary:
      "Automate issue triage, sprint planning, and project management in Linear using Claude.",
    content: `## Linear + Claude

Streamline your project management with AI-powered issue handling.

### Automated Issue Triage
\`\`\`typescript
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
      content: \\\`Triage: \\\${issue.title}\\n\\\${issue.description}\\\`
    }]
  });
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
    tags: ["linear", "project-management", "automation", "franzy"],
    estimatedMinutes: 25,
    createdAt: "2025-02-15",
  },
  {
    id: "cowork-getting-started",
    title: "Getting Started with Claude Cowork",
    summary:
      "Learn to use Claude Cowork for GUI automation, scheduled tasks, and visual workflows.",
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
    tags: ["cowork", "gui", "automation", "scheduled", "franzy"],
    estimatedMinutes: 20,
    createdAt: "2025-02-22",
  },

  // ─── AI Connectors ───
  {
    id: "ai-connectors",
    title: "Using AI Connectors on Claude.ai",
    summary:
      "Connect Claude to 50+ services directly through Claude.ai — Google Drive, Notion, GitHub, and more.",
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
