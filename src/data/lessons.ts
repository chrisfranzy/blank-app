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

  // ─── Franzy-Specific: Franchise Matching Platform ───
  {
    id: "franzy-fit-score-claude",
    title: "Improving Franzy Fit Score with Claude",
    summary:
      "Use Claude to enhance franchise-investor matching — better scoring, explainable recommendations, and natural language queries against your franchise database.",
    content: `## Enhancing Franzy Fit Score with Claude

The Franzy Fit Score already uses AI to match investors with franchises. Here's how to augment it with Claude for deeper, more explainable matching.

### Explainable Match Reasons
Instead of just a score, give investors a narrative:
\`\`\`typescript
const explainMatch = async (investor: InvestorProfile, franchise: Franchise) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: \`You are a franchise advisor. Given an investor profile and
    franchise details, explain why this is a good (or poor) match.
    Be specific about financial fit, lifestyle alignment, and market factors.\`,
    messages: [{
      role: "user",
      content: \`Investor: \${JSON.stringify(investor)}
Franchise: \${JSON.stringify(franchise)}
Fit Score: \${investor.fitScore}

Explain this match in 3-4 sentences that help the investor decide.\`
    }]
  });
  return response.content[0].text;
};
\`\`\`

### Natural Language Franchise Search
Let investors search with questions instead of filters:
\`\`\`typescript
// "I have $150K, want a food franchise in Texas, semi-absentee"
const tools = [{
  name: "search_franchises",
  description: "Search the Franzy franchise database",
  input_schema: {
    type: "object",
    properties: {
      investmentRange: { type: "object", properties: {
        min: { type: "number" }, max: { type: "number" }
      }},
      categories: { type: "array", items: { type: "string" } },
      states: { type: "array", items: { type: "string" } },
      ownershipType: { enum: ["owner-operator", "semi-absentee", "absentee"] }
    }
  }
}];
\`\`\`

### FDD Document Analysis
Use Claude to summarize Franchise Disclosure Documents:
- Extract key financial metrics (Item 19, Item 7)
- Compare terms across similar franchises
- Flag unusual clauses or restrictions
- Generate investor-friendly summaries

### Franzy-Specific Applications
1. **Match explanation** — Why this franchise fits this investor
2. **Franchise comparison** — Side-by-side analysis for investors
3. **Market analysis** — Territory opportunity assessment
4. **Risk assessment** — Financial viability scoring`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "intermediate",
    tags: ["fit-score", "matching", "franchise", "franzy"],
    estimatedMinutes: 30,
    createdAt: "2025-02-08",
  },
  {
    id: "franzy-investor-comms",
    title: "Automating Investor Communications",
    summary:
      "Use Claude to draft personalized investor emails, classify inbound inquiries, and automate follow-up sequences for franchise leads.",
    content: `## Investor Communication Automation

Franzy handles thousands of investor inquiries. Claude can help personalize and automate communication without losing the human touch.

### Classify Incoming Investor Inquiries
\`\`\`typescript
const classifyInquiry = async (message: string) => {
  const response = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    tools: [{
      name: "classify_inquiry",
      description: "Classify a franchise investor inquiry",
      input_schema: {
        type: "object",
        properties: {
          stage: { enum: ["browsing", "researching", "ready-to-invest", "returning"] },
          intent: { enum: ["general-info", "specific-brand", "financing", "territory", "support"] },
          investmentLevel: { enum: ["under-50k", "50k-150k", "150k-500k", "500k-plus", "unknown"] },
          urgency: { enum: ["high", "medium", "low"] },
          suggestedAction: { type: "string" }
        },
        required: ["stage", "intent", "urgency", "suggestedAction"]
      }
    }],
    tool_choice: { type: "tool", name: "classify_inquiry" },
    messages: [{ role: "user", content: message }]
  });
  return response.content[0].input;
};
\`\`\`

### Personalized Follow-Up Drafts
\`\`\`
"Draft a follow-up email for an investor who:
- Viewed 5 QSR franchises in the $100-200K range
- Completed their Fit Score profile but hasn't requested info
- Located in Austin, TX
- Previously worked in restaurant management"
\`\`\`

### Communication Workflows
1. **New lead** → Classify intent & investment level → Route to right sequence
2. **Stale lead (7 days)** → Claude drafts re-engagement email with new matches
3. **Post-call** → Auto-summarize call notes, draft next steps
4. **Franchisor intro** → Personalized introduction email with Fit Score context

### Best Practices
- Always flag AI-drafted emails for human review before sending
- Include Fit Score context in every franchisor introduction
- Personalize based on investor's browsing behavior on franzy.com`,
    toolName: "Claude API",
    category: "communication",
    difficulty: "intermediate",
    tags: ["email", "investors", "leads", "communication", "franzy"],
    estimatedMinutes: 25,
    createdAt: "2025-02-10",
  },
  {
    id: "franzy-franchise-data-mcp",
    title: "MCP Server for Franzy's Franchise Database",
    summary:
      "Build a custom MCP server to let Claude query your franchise database, search Typesense, and access investor profiles directly.",
    content: `## MCP Server for Franzy Data

Give Claude direct access to Franzy's franchise database and Typesense search index through a custom MCP server.

### Architecture
\`\`\`
Claude Code / Claude API
    ↓
MCP Client
    ↓
Franzy MCP Server
    ├─ Typesense (franchise search)
    ├─ PostgreSQL (investor profiles, matches)
    └─ Franzy API (Fit Score, Connect Tool)
\`\`\`

### Python MCP Server
\`\`\`python
from mcp.server.fastmcp import FastMCP
import typesense

mcp = FastMCP("franzy-data")

# Initialize Typesense client
ts_client = typesense.Client({
    "api_key": os.environ["TYPESENSE_API_KEY"],
    "nodes": [{"host": "search.franzy.com", "port": 443, "protocol": "https"}]
})

@mcp.tool()
def search_franchises(
    query: str,
    min_investment: int = 0,
    max_investment: int = 1000000,
    categories: list[str] | None = None
) -> str:
    """Search Franzy's franchise database with filters."""
    filter_by = f"min_investment:<={max_investment} && max_investment:>={min_investment}"
    if categories:
        filter_by += f" && category:={categories}"

    results = ts_client.collections["franchises"].documents.search({
        "q": query,
        "query_by": "name,description,category",
        "filter_by": filter_by,
        "sort_by": "fit_score:desc"
    })
    return json.dumps(results["hits"][:10])

@mcp.tool()
def get_investor_profile(investor_id: str) -> str:
    """Get an investor's profile and match history."""
    profile = db.query("SELECT * FROM investors WHERE id = %s", investor_id)
    matches = db.query("SELECT * FROM matches WHERE investor_id = %s ORDER BY score DESC", investor_id)
    return json.dumps({"profile": profile, "recent_matches": matches[:5]})

@mcp.resource("franchise://{franchise_id}")
def get_franchise_details(franchise_id: str) -> str:
    """Get detailed franchise information including FDD highlights."""
    return json.dumps(db.query("SELECT * FROM franchises WHERE id = %s", franchise_id))

mcp.run()
\`\`\`

### Use Cases in Claude Code
\`\`\`bash
claude "Search for food franchises under $200K in Texas"
claude "Pull the investor profile for ID 12345 and suggest new matches"
claude "Compare the FDD terms of McDonald's vs Chick-fil-A"
\`\`\`

### Integration with GrowthBook
Use the MCP server to also query GrowthBook experiment results:
- Which matching algorithms perform better?
- A/B test results on email templates
- Conversion funnel analysis`,
    toolName: "MCP",
    category: "coding",
    difficulty: "advanced",
    tags: ["mcp", "typesense", "database", "franchise-data", "franzy"],
    estimatedMinutes: 35,
    createdAt: "2025-02-12",
  },
  {
    id: "franzy-codebase-claude-code",
    title: "Using Claude Code with Franzy's Next.js Codebase",
    summary:
      "Set up Claude Code for Franzy's Next.js/React app — CLAUDE.md config, search component debugging, Typesense integration, and GrowthBook feature flags.",
    content: `## Claude Code for Franzy's Stack

Franzy runs on Next.js/React with Typesense search and GrowthBook feature flags. Here's how to configure Claude Code for maximum effectiveness.

### CLAUDE.md for Franzy
\`\`\`markdown
# Franzy — Franchise Matching Platform

## Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Typesense (franchise search)
- GrowthBook (feature flags & experiments)
- Referral Rock (referral tracking)

## Architecture
- src/app/ — Pages (franchise browse, investor dashboard, matching)
- src/components/ — Shared UI (FranchiseCard, FitScoreBadge, SearchFilters)
- src/lib/ — Typesense client, GrowthBook config, API helpers
- src/hooks/ — Custom hooks (useSearch, useFitScore, useInvestorProfile)

## Key Patterns
- Server components by default, client only for interactive search/filters
- Typesense for all franchise search (NOT database queries)
- GrowthBook feature flags wrap all new features
- Fit Score calculations happen server-side

## Commands
- npm run dev — Start dev server
- npm test — Run test suite
- npm run build — Production build
- npm run search:reindex — Reindex Typesense
\`\`\`

### Common Tasks
\`\`\`bash
# Debug search results
claude "The franchise search isn't returning results for 'pizza'.
Check the Typesense query in useSearch and the index schema."

# Add a new filter
claude "Add a 'semi-absentee' filter to the franchise search page.
Follow the pattern of the existing category filter."

# GrowthBook experiment
claude "Wrap the new Fit Score explanation component in a
GrowthBook feature flag called 'fit-score-v2-explanation'"
\`\`\`

### Tips for Franzy's Codebase
1. Always check GrowthBook before shipping new UI
2. Test search changes against the Typesense staging index
3. Fit Score changes need both frontend and API updates
4. Run \`npm run search:reindex\` after schema changes`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "intermediate",
    tags: ["nextjs", "typesense", "growthbook", "codebase", "franzy"],
    estimatedMinutes: 20,
    createdAt: "2025-02-15",
  },
  {
    id: "franzy-analytics-cowork",
    title: "Automating Franzy Analytics with Cowork",
    summary:
      "Use Claude Cowork to automate weekly franchise matching reports, investor funnel analysis, and franchisor performance dashboards.",
    content: `## Franzy Analytics Automation

Claude Cowork can automate the reports and dashboard checks your team does manually every week.

### What to Automate
- **Weekly matching report** — How many investors matched, conversion rates, top franchises
- **Funnel analysis** — Where investors drop off (browse → match → connect → invest)
- **Franchisor performance** — Which brands are converting leads vs sitting idle
- **Referral Rock metrics** — Referral program performance

### Weekly Matching Report
\`\`\`
"Every Monday at 8am:
1. Open the Franzy analytics dashboard
2. Filter to last 7 days
3. Screenshot the matching funnel chart
4. Export investor-franchise match data as CSV
5. Summarize: total matches, conversion rate, top 5 franchises
6. Post summary + screenshot to #analytics in Slack"
\`\`\`

### Investor Funnel Monitoring
\`\`\`
"Every day at 9am:
1. Check the investor signup funnel in our analytics
2. If conversion from 'profile complete' to 'match viewed' drops below 40%, alert #product in Slack
3. Include the current rate and last 7-day trend"
\`\`\`

### GrowthBook Experiment Results
\`\`\`
"Every Friday at 4pm:
1. Open GrowthBook dashboard
2. Check all running experiments
3. For any experiment with >95% significance, summarize the winner
4. Post results to #experiments in Slack"
\`\`\`

### Tips
- Start with the weekly report — highest ROI
- Use screenshots for visual dashboards that don't have CSV export
- Set up alerts for metric drops, not just reports
- Combine with MCP for richer data analysis`,
    toolName: "Claude Cowork",
    category: "automation",
    difficulty: "beginner",
    tags: ["analytics", "reporting", "cowork", "dashboards", "franzy"],
    estimatedMinutes: 20,
    createdAt: "2025-02-22",
  },
  {
    id: "franzy-fdd-analysis",
    title: "FDD Document Analysis with Claude",
    summary:
      "Use Claude to parse, summarize, and compare Franchise Disclosure Documents — extracting key financials, fees, and territory terms for investors.",
    content: `## FDD Analysis with Claude

Franchise Disclosure Documents are 200+ page legal documents. Claude can extract the information investors actually need.

### Key FDD Items to Extract
- **Item 5** — Initial fees
- **Item 6** — Other fees (royalties, marketing, technology)
- **Item 7** — Estimated initial investment range
- **Item 19** — Financial performance representations
- **Item 12** — Territory rights and exclusivity

### Structured Extraction
\`\`\`typescript
const analyzeFDD = async (fddText: string) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    tools: [{
      name: "extract_fdd",
      description: "Extract key information from a Franchise Disclosure Document",
      input_schema: {
        type: "object",
        properties: {
          brandName: { type: "string" },
          initialFee: { type: "string" },
          totalInvestmentMin: { type: "number" },
          totalInvestmentMax: { type: "number" },
          royaltyRate: { type: "string" },
          marketingFee: { type: "string" },
          termLength: { type: "string" },
          renewalTerms: { type: "string" },
          territoryType: { enum: ["exclusive", "protected", "none"] },
          averageRevenue: { type: "string" },
          unitCount: { type: "number" },
          keyRisks: { type: "array", items: { type: "string" } },
          summary: { type: "string" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "extract_fdd" },
    messages: [{ role: "user", content: \`Analyze this FDD:\\n\${fddText}\` }]
  });
  return response.content[0].input;
};
\`\`\`

### Franchise Comparison
\`\`\`
"Compare these two franchise FDDs:
- Investment range
- Ongoing fees (royalty + marketing)
- Territory protection
- Average unit revenue
- Growth trajectory (unit count over 3 years)
Present as a side-by-side table."
\`\`\`

### Investor-Friendly Summaries
Turn 200-page FDDs into 1-page summaries:
1. **The Basics** — What is this franchise, what does it cost
2. **The Money** — What do operators typically earn
3. **The Commitment** — Term length, territory, restrictions
4. **The Risks** — Key things to watch out for

### Feeding into Fit Score
FDD analysis can enhance the Franzy Fit Score:
- Compare investor's budget to Item 7 investment range
- Match investor's desired involvement to operating requirements
- Flag territory conflicts with investor's preferred location`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "advanced",
    tags: ["fdd", "documents", "analysis", "franchise", "franzy"],
    estimatedMinutes: 30,
    createdAt: "2025-02-25",
  },

  // ─── Franzy: Sales & Advisors ───
  {
    id: "franzy-advisor-matching",
    title: "AI-Assisted Franchise Matching for Advisors",
    summary:
      "How Franzy advisors can use Claude to research brands, prep for client calls, and generate better Fit Score explanations during the matching process.",
    content: `## AI-Assisted Matching for Franzy Advisors

As a Franzy Advisor, you guide buyers through a 90-400+ day journey from discovery to ownership. Claude can help at every stage.

### Pre-Call Research
Before a client meeting, ask Claude to prep:
\`\`\`
"I have a call with a prospect who has $200K liquid,
wants a semi-absentee QSR franchise in the Southeast.
They're a former restaurant manager.

Based on our brand portfolio, give me:
1. Top 5 brand recommendations with reasoning
2. Key talking points for each
3. Potential objections they might raise
4. Territory availability questions to ask"
\`\`\`

### Explaining Fit Scores
Turn the numeric Fit Score into a conversation:
\`\`\`
"This investor scored 87 for Marco's Pizza and 62 for Jersey Mike's.
Explain why in plain language, covering:
- Financial fit (Item 7 investment range vs their capital)
- Lifestyle fit (semi-absentee vs owner-operator)
- Market fit (territory saturation in their area)
- Experience fit (their background vs brand requirements)"
\`\`\`

### Track 1 vs Track 2 Routing
Help classify prospects into the right sales track:
- **Track 1**: Clear goals, qualified capital, ready to move → fast-track to matching
- **Track 2**: Needs education, exploring, not sure about franchising → nurture sequence

### Post-Call Notes
After a client call, dictate notes and let Claude structure them:
\`\`\`
"Structure these call notes for HubSpot:
- Client sentiment and readiness level
- Brands discussed and reactions
- Next steps and follow-up timeline
- Any red flags or concerns"
\`\`\`

### Key Phrases to Know
- "Maybe until it's a no" — support the exploration, don't pressure
- "The only dog in the fight we have is you" — no brand-specific incentives
- "Frick and fracking" — relationship management with FranDev teams`,
    toolName: "Claude",
    category: "communication",
    difficulty: "beginner",
    tags: ["advisors", "matching", "sales", "franzy"],
    estimatedMinutes: 20,
    createdAt: "2025-02-26",
  },
  {
    id: "franzy-hubspot-pipeline",
    title: "Claude + HubSpot: Managing the Franzy Pipeline",
    summary:
      "Use Claude to analyze your HubSpot pipeline, draft follow-ups, rate calls, and automate the two-way sync between Franzy Core and HubSpot CRM.",
    content: `## HubSpot Pipeline Management with Claude

Franzy Core has a two-way HubSpot sync. Claude can help you work smarter with your pipeline data.

### Pipeline Health Check
\`\`\`
"Analyze my HubSpot pipeline and flag:
- Deals stale for 14+ days with no activity
- Prospects who completed Assessment but haven't booked a meeting
- Connection Wizard intros that haven't had follow-up
- Any deals where the prospect's liquid capital doesn't match the brand's Item 7 range"
\`\`\`

### Automated Call Ratings
After advisor calls (from Fireflies transcripts):
\`\`\`typescript
const rateCall = async (transcript: string) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    tools: [{
      name: "rate_call",
      description: "Rate a Franzy advisor call",
      input_schema: {
        type: "object",
        properties: {
          overallRating: { type: "number", minimum: 1, maximum: 10 },
          prospectReadiness: { enum: ["not-ready", "exploring", "researching", "ready-to-invest"] },
          brandsDiscussed: { type: "array", items: { type: "string" } },
          nextSteps: { type: "array", items: { type: "string" } },
          objections: { type: "array", items: { type: "string" } },
          followUpDraft: { type: "string" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "rate_call" },
    messages: [{ role: "user", content: \`Rate this advisor call:\\n\${transcript}\` }]
  });
  return response.content[0].input;
};
\`\`\`

### Key Metrics to Track
- **Leads** → **Qualified Leads** ($50K liquid, $150K+ net worth)
- **Booked Meetings** → **Match Requested** → **Match Made**
- **Confirmation Days** → **Deals Closed**
- **CPL** and **Cost per Deal**

### Follow-Up Sequences
Claude can draft stage-appropriate follow-ups:
1. **Post-Assessment** → "Here are your top matches and why"
2. **Post-Brand Call** → "Summary of what you learned + next steps"
3. **Pre-Confirmation Day** → "What to expect and questions to prepare"
4. **Post-Close** → Transition to FranzyOS onboarding`,
    toolName: "Claude API",
    category: "workflow",
    difficulty: "intermediate",
    tags: ["hubspot", "pipeline", "crm", "sales", "franzy"],
    estimatedMinutes: 25,
    createdAt: "2025-02-26",
  },
  {
    id: "franzy-brief-content",
    title: "Generating Content for The Franzy Brief",
    summary:
      "Use Claude to research franchise industry news, draft newsletter sections, and maintain the 70% open rate on Franzy's daily newsletter.",
    content: `## Content Generation for The Franzy Brief

The Franzy Brief is Franzy's daily newsletter with a 70% open rate. Claude can help research, draft, and maintain quality.

### Newsletter Structure
Each edition of The Franzy Brief includes:
1. **Big Moves** — Major franchise industry news
2. **Numbers That Matter** — Key stats and data points
3. **Use This Today** — Actionable tip for franchise investors/operators
4. **Random Franchise Fact** — Fun/surprising franchise trivia

### Daily Research Workflow
\`\`\`
"Search for today's franchise industry news from:
- Franchise Times
- QSR Magazine
- Restaurant Dive
- IFA announcements
- Franchising.com

Summarize the top 3 stories in 2-3 sentences each.
Flag any stories relevant to Franzy's brand partners."
\`\`\`

### Draft Generation
\`\`\`
"Draft today's Franzy Brief:

Big Move: [paste news summary]
Write in Brett's voice — conversational, knowledgeable, slightly irreverent.
Keep it under 100 words per section.
Include one data point or stat in 'Numbers That Matter.'
Make 'Use This Today' actionable for someone considering franchise ownership."
\`\`\`

### SEO & Blog Content
For franzy.com content marketing:
- Franchise comparison articles ("Marco's Pizza vs Jersey Mike's: Which Is Right for You?")
- Investment guides by category ("Best Home Service Franchises Under $100K")
- Territory analysis content
- FDD explainers for first-time buyers

### Brand Spotlight Content
For franchisor partners, generate:
- Brand comparison pages
- Investment breakdown articles
- Success story templates
- Territory availability updates`,
    toolName: "Claude",
    category: "communication",
    difficulty: "beginner",
    tags: ["newsletter", "content", "marketing", "franzy-brief", "franzy"],
    estimatedMinutes: 15,
    createdAt: "2025-02-26",
  },
  {
    id: "franzy-os-data-ingestion",
    title: "FranzyOS: Solving the Data Ingestion Challenge",
    summary:
      "How to use Claude and browser automation to ingest data from POS systems (Toast, Qu), payroll, and scheduling tools that don't have APIs.",
    content: `## FranzyOS Data Ingestion

The biggest technical challenge in FranzyOS: many franchise systems don't have APIs. Here's how Claude + automation can help.

### The Problem
Multi-unit operators (20-70 units) have data across:
- **POS**: Toast, Qu, Brink/PAR (sales, tickets, menu mix)
- **Labor**: HotSchedules, WiseTail (scheduling, training)
- **Accounting**: Restaurant 365, Crunchtime (P&L, food cost)
- **Reviews**: Google, Yelp (customer feedback)

Most of these systems have limited or no APIs.

### Browser Automation Approach
Using Stagehand.dev + Browserbase.com:
\`\`\`typescript
// Example: Extract daily sales from Toast dashboard
const session = await browserbase.createSession();
const page = await session.newPage();

// Navigate and authenticate
await page.goto("https://pos.toasttab.com");
await page.fill("#email", credentials.email);
await page.fill("#password", credentials.password);

// Navigate to reports
await page.click('[data-testid="reports-nav"]');
await page.click('[data-testid="daily-sales"]');

// Extract data
const salesData = await page.evaluate(() => {
  // Parse the dashboard DOM for sales figures
  return extractSalesTable();
});

// Store in ClickHouse for analytics
await clickhouse.insert("daily_sales", salesData);
\`\`\`

### Claude for Data Normalization
Different POS systems report data differently. Claude normalizes:
\`\`\`
"Normalize these Toast and Qu POS reports into a standard schema:
- location_id, date, gross_sales, net_sales, ticket_count,
  avg_ticket, labor_cost, food_cost, comps, voids
Handle the different field names and formats between systems."
\`\`\`

### Credential Provisioning
The biggest bottleneck. For each pilot partner:
1. Request system credentials (POS, labor, accounting)
2. Verify access levels (read-only minimum)
3. Navigate corporate franchisor concerns (e.g., Jersey Mike's legal)
4. Set up automated extraction schedules

### Current Pilot Systems
| Partner | POS | Other Systems |
|---------|-----|---------------|
| MPZ Hot (62 units) | Toast | WiseTail |
| Walcorp (22 units) | Qu | Crunchtime, R365, Vantage Point |
| KM Dev (8 units) | Mixed | — |
| Onyx Brands | Toast, Brink/PAR | Operandio, HotSchedules |
| PBHG (300+ units) | Multiple | Multiple |`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "advanced",
    tags: ["franzyos", "data-ingestion", "pos", "toast", "browser-automation", "franzy"],
    estimatedMinutes: 40,
    createdAt: "2025-02-26",
  },
  {
    id: "franzy-os-copilot",
    title: "Building the FranzyOS AI Copilot",
    summary:
      "Architecture and implementation of FranzyOS's natural language copilot — evidence-first answers, role-based insights, and proactive recommendations for franchise operators.",
    content: `## FranzyOS AI Copilot Architecture

FranzyOS's core feature: operators ask questions in natural language, get answers backed by their actual data.

### Design Principles
1. **Evidence-first** — Every claim tied to a data source. Operators trust data they can verify.
2. **Role-based** — Owners see portfolio-level insights. Area managers see location comparisons. Store leaders see daily priorities.
3. **Proactive** — Surface top 3 priorities daily, don't wait for questions.
4. **Actionable** — Don't just report problems, suggest specific actions.

### Architecture
\`\`\`
Operator Question (natural language)
    ↓
Claude API (with tools)
    ├─ ClickHouse queries (analytics, benchmarking)
    ├─ PostgreSQL queries (location data, org structure)
    └─ S3 documents (FDDs, training materials)
    ↓
Evidence-backed response with citations
\`\`\`

### Example Interactions
\`\`\`
Operator: "Why did our Charlotte Marco's location underperform last week?"

AI Copilot: "Charlotte Marco's (Unit #247) had $18,200 in net sales
last week, 22% below its 8-week average of $23,400.

Key factors:
1. Labor cost was 38% of sales (vs target of 30%) — overtime hours
   were 2.3x the location average [Source: Toast labor report]
2. Ticket count dropped 15% vs prior week, likely weather-related
   (Charlotte had 3 rain days) [Source: Toast daily sales]
3. Comp/void rate was 4.2% (vs 1.8% average) — investigate
   [Source: Toast comp report]

Recommended actions:
- Review overtime scheduling with store manager
- Audit comp/void reasons for the week
- Compare with other Charlotte-area locations"
\`\`\`

### Role-Based Dashboards
\`\`\`typescript
// Different tools/prompts per role
const roleConfigs = {
  owner: {
    system: "You are a franchise profitability advisor for a multi-unit operator...",
    tools: [portfolioOverview, locationBenchmark, profitabilityTrend],
    dailyPrompt: "Top 3 priorities across all locations this week"
  },
  areaManager: {
    system: "You advise an area manager overseeing 8-15 franchise locations...",
    tools: [locationComparison, laborAnalysis, salesTrend],
    dailyPrompt: "Which locations need attention today and why"
  },
  storeLeader: {
    system: "You help a franchise store leader optimize daily operations...",
    tools: [dailySales, laborSchedule, customerFeedback],
    dailyPrompt: "Today's focus areas based on yesterday's performance"
  }
};
\`\`\`

### Coaching Cards
Turn insights into action:
1. Identify the issue (data-backed)
2. Explain the impact ($$)
3. Suggest specific corrective action
4. Assign to the right role
5. Track completion`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "advanced",
    tags: ["franzyos", "copilot", "ai", "operators", "franzy"],
    estimatedMinutes: 45,
    createdAt: "2025-02-26",
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
