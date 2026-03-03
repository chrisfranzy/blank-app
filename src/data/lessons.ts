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

  // ─── AI Tools & Techniques ───
  {
    id: "prompt-engineering-fundamentals",
    title: "Prompt Engineering Fundamentals",
    summary:
      "Master the core techniques for writing effective prompts — role assignment, structured output, chain-of-thought reasoning, and iterative refinement.",
    content: `## Prompt Engineering Fundamentals

Great prompts get great results. This lesson covers the techniques that separate vague asks from precise, reliable outputs.

### 1. Role Assignment
Tell Claude *who* it is before *what* to do:
\`\`\`
"You are a senior backend engineer reviewing a pull request.
Focus on security vulnerabilities, performance issues, and
API contract changes. Flag severity as critical/warning/info."
\`\`\`

Why it works: roles activate relevant knowledge and set the tone for responses.

### 2. Structured Output
Ask for the format you need:
\`\`\`
"Analyze this error log and return a JSON object with:
{
  "root_cause": "one-sentence summary",
  "affected_services": ["list of services"],
  "severity": "critical | high | medium | low",
  "suggested_fix": "specific action to take",
  "related_errors": ["any patterns you notice"]
}"
\`\`\`

### 3. Chain-of-Thought
For complex reasoning, ask Claude to think step by step:
\`\`\`
"Before answering, walk through your reasoning:
1. What are the constraints?
2. What are the trade-offs between approaches?
3. What's your recommendation and why?"
\`\`\`

### 4. Few-Shot Examples
Show Claude what you want with examples:
\`\`\`
"Convert these user stories to acceptance criteria.

Example:
Story: 'As a user, I want to reset my password'
Criteria:
- User clicks 'Forgot Password' on login page
- System sends reset link to registered email within 30 seconds
- Link expires after 24 hours
- User must set password meeting complexity requirements

Now convert this story: 'As a user, I want to filter search results by date range'"
\`\`\`

### 5. Iterative Refinement
Don't expect perfection on the first try. Build up:
1. Start with a rough prompt
2. Review the output — what's missing?
3. Add constraints: "Also include..." or "Don't..."
4. Save your refined prompt for reuse

### Common Mistakes
- **Too vague**: "Write me something about marketing" → Add audience, format, length, purpose
- **Too constrained**: Walls of rules that contradict → Pick the top 3-5 constraints
- **No context**: Asking about "the code" without sharing it → Always include relevant context
- **Ignoring iteration**: Treating the first response as final → Refine and follow up`,
    toolName: "Claude",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["prompts", "fundamentals", "techniques", "getting-started"],
    estimatedMinutes: 20,
    createdAt: "2025-02-08",
  },
  {
    id: "tool-use-structured-output",
    title: "Tool Use & Structured Output with the Claude API",
    summary:
      "Use Claude's tool use feature to get perfectly structured JSON every time — classification, extraction, and multi-step workflows.",
    content: `## Tool Use & Structured Output

Tool use (function calling) is the most reliable way to get structured data from Claude. Instead of hoping the model outputs valid JSON, you define a schema and Claude fills it.

### Basic Tool Use Pattern
\`\`\`typescript
const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  tools: [{
    name: "extract_contact",
    description: "Extract contact information from text",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        company: { type: "string" },
        role: { type: "string" },
        phone: { type: "string" }
      },
      required: ["name", "email"]
    }
  }],
  tool_choice: { type: "tool", name: "extract_contact" },
  messages: [{ role: "user", content: emailText }]
});

const contact = response.content[0].input;
// { name: "Jane Smith", email: "jane@acme.com", company: "Acme", ... }
\`\`\`

### Classification with Enums
Force Claude to pick from your categories:
\`\`\`typescript
input_schema: {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: ["bug", "feature-request", "question", "complaint"]
    },
    priority: {
      type: "string",
      enum: ["critical", "high", "medium", "low"]
    },
    summary: { type: "string" }
  }
}
\`\`\`

### Multi-Step Tool Chains
Claude can call multiple tools in sequence:
1. \`search_database\` → find relevant records
2. \`analyze_results\` → process and rank them
3. \`format_report\` → structure the final output

### When to Use Tool Use vs. Plain Prompts
| Scenario | Approach |
|----------|----------|
| Need exact JSON schema | Tool use |
| Free-form text response | Plain prompt |
| Classification into known categories | Tool use |
| Creative writing | Plain prompt |
| Data extraction from documents | Tool use |
| Conversational Q&A | Plain prompt |

### Tips
- Use \`tool_choice: { type: "tool", name: "..." }\` to force a specific tool
- Use \`tool_choice: { type: "auto" }\` when Claude should decide whether to call a tool
- Keep descriptions clear — Claude uses them to understand when and how to use the tool
- Use \`required\` fields to ensure critical data is always returned`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "intermediate",
    tags: ["tool-use", "structured-output", "api", "json", "extraction"],
    estimatedMinutes: 25,
    createdAt: "2025-02-10",
  },
  {
    id: "building-mcp-servers",
    title: "Building Custom MCP Servers",
    summary:
      "Build Model Context Protocol servers to give Claude access to your databases, APIs, and internal tools — with practical examples in Python and TypeScript.",
    content: `## Building Custom MCP Servers

MCP (Model Context Protocol) lets Claude access your data and tools directly. Instead of copy-pasting context, Claude queries your systems in real time.

### Architecture
\`\`\`
Claude Code / Claude Desktop
    ↓
MCP Client (built into Claude)
    ↓
Your MCP Server
    ├─ Database queries
    ├─ Internal APIs
    └─ File systems / search indexes
\`\`\`

### Python MCP Server (FastMCP)
\`\`\`python
from mcp.server.fastmcp import FastMCP
import sqlite3

mcp = FastMCP("my-company-data")

@mcp.tool()
def search_customers(query: str, limit: int = 10) -> str:
    """Search the customer database by name or email."""
    conn = sqlite3.connect("customers.db")
    results = conn.execute(
        "SELECT id, name, email, plan FROM customers "
        "WHERE name LIKE ? OR email LIKE ? LIMIT ?",
        (f"%{query}%", f"%{query}%", limit)
    ).fetchall()
    return json.dumps([dict(zip(["id","name","email","plan"], r)) for r in results])

@mcp.tool()
def get_recent_tickets(customer_id: str) -> str:
    """Get recent support tickets for a customer."""
    conn = sqlite3.connect("support.db")
    tickets = conn.execute(
        "SELECT id, subject, status, created_at FROM tickets "
        "WHERE customer_id = ? ORDER BY created_at DESC LIMIT 5",
        (customer_id,)
    ).fetchall()
    return json.dumps([dict(zip(["id","subject","status","created"], t)) for t in tickets])

@mcp.resource("docs://{doc_id}")
def get_internal_doc(doc_id: str) -> str:
    """Fetch an internal knowledge base document."""
    return load_document(doc_id)

mcp.run()
\`\`\`

### TypeScript MCP Server
\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "analytics", version: "1.0.0" });

server.tool("query_metrics",
  { metric: z.enum(["revenue", "signups", "churn"]), days: z.number().default(30) },
  async ({ metric, days }) => {
    const data = await db.query(\`SELECT date, value FROM metrics WHERE name = $1 AND date > NOW() - INTERVAL '\${days} days'\`, [metric]);
    return { content: [{ type: "text", text: JSON.stringify(data.rows) }] };
  }
);
\`\`\`

### Configuring Claude Code
Add to your project's \`.mcp.json\`:
\`\`\`json
{
  "mcpServers": {
    "my-data": {
      "command": "python",
      "args": ["mcp_server.py"],
      "env": { "DATABASE_URL": "..." }
    }
  }
}
\`\`\`

### Best Practices
1. **Keep tools focused** — one tool per action, clear descriptions
2. **Return structured data** — JSON that Claude can reason about
3. **Limit result size** — paginate or cap results to avoid overwhelming context
4. **Add resources** for reference data Claude should read, not execute
5. **Use environment variables** for credentials — never hardcode`,
    toolName: "MCP",
    category: "coding",
    difficulty: "advanced",
    tags: ["mcp", "servers", "database", "api", "integration"],
    estimatedMinutes: 35,
    createdAt: "2025-02-12",
  },
  {
    id: "claude-code-setup",
    title: "Setting Up Claude Code for Your Codebase",
    summary:
      "Configure Claude Code for maximum effectiveness — CLAUDE.md files, custom commands, MCP integration, and real-world workflows for any tech stack.",
    content: `## Setting Up Claude Code for Your Codebase

Claude Code works best when it understands your project. A few minutes of setup saves hours of repeated context.

### CLAUDE.md — Your Project's AI Config
Create a \`CLAUDE.md\` file at your project root:
\`\`\`markdown
# My Project

## Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS
- PostgreSQL via Prisma ORM
- Redis for caching
- Deployed on Vercel

## Architecture
- src/app/ — Pages and API routes
- src/components/ — React components (colocated with tests)
- src/lib/ — Shared utilities, database client, auth helpers
- src/hooks/ — Custom React hooks

## Key Patterns
- Server components by default; "use client" only when needed
- All database queries go through Prisma (never raw SQL)
- Auth via NextAuth.js — check session in middleware
- Feature flags in src/lib/flags.ts

## Commands
- npm run dev — Start dev server (port 3000)
- npm test — Jest + React Testing Library
- npm run build — Production build (must pass before merging)
- npm run db:migrate — Run Prisma migrations
\`\`\`

### What to Include in CLAUDE.md
1. **Stack & versions** — So Claude picks the right APIs
2. **Architecture** — Where things live in the codebase
3. **Patterns & conventions** — How your team writes code
4. **Commands** — Build, test, lint, deploy
5. **Gotchas** — Things that are easy to get wrong

### Effective Claude Code Prompts
\`\`\`bash
# Bug fixing — give Claude the error
claude "Fix this TypeScript error in src/lib/auth.ts:
'Property session does not exist on type Request'.
Check the middleware and NextAuth config."

# Feature development — reference existing patterns
claude "Add a /api/webhooks/stripe endpoint.
Follow the pattern in /api/webhooks/github for error handling and validation."

# Refactoring — be specific about scope
claude "Refactor the useSearch hook to use React Query instead of
manual fetch + useState. Keep the same return type interface."
\`\`\`

### Nested CLAUDE.md
Put additional CLAUDE.md files in subdirectories for team-specific context:
- \`src/components/CLAUDE.md\` — Component conventions, design system tokens
- \`src/api/CLAUDE.md\` — API patterns, auth requirements, rate limits

### Tips
- Keep CLAUDE.md under 500 lines — concise beats comprehensive
- Update it when patterns change — stale docs are worse than none
- Include examples of good code from your project
- List things Claude should *not* do (e.g., "Never use \`any\` type")`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "intermediate",
    tags: ["claude-code", "setup", "configuration", "codebase", "claudemd"],
    estimatedMinutes: 20,
    createdAt: "2025-02-15",
  },
  {
    id: "automating-reports-cowork",
    title: "Automating Reports & Dashboards with Cowork",
    summary:
      "Use Claude Cowork to automate recurring reports, dashboard monitoring, and data exports — no code required.",
    content: `## Automating Reports & Dashboards with Cowork

Claude Cowork automates browser-based tasks on a schedule. Perfect for reports that someone manually runs every week.

### What to Automate
Cowork is ideal for tasks that involve:
- Logging into a dashboard and exporting data
- Taking screenshots of charts and sharing them
- Monitoring metrics and alerting when they change
- Combining data from multiple web tools

### Weekly Report Example
\`\`\`
"Every Monday at 8am:
1. Open our analytics dashboard at analytics.example.com
2. Set the date range to last 7 days
3. Screenshot the conversion funnel chart
4. Export the summary table as CSV
5. Post the screenshot and key numbers to #metrics in Slack"
\`\`\`

### Metric Monitoring
\`\`\`
"Every day at 9am:
1. Check our Stripe dashboard for MRR
2. If MRR dropped more than 2% from yesterday, alert #revenue in Slack
3. Include the current MRR, change amount, and top 3 churned accounts"
\`\`\`

### Competitive Monitoring
\`\`\`
"Every Wednesday at 10am:
1. Check competitor pricing pages (list URLs)
2. Compare to our current pricing
3. If any pricing changed, summarize the differences
4. Post to #competitive-intel in Slack"
\`\`\`

### Multi-Source Reports
\`\`\`
"Every Friday at 4pm:
1. Pull this week's signups from our admin dashboard
2. Pull support ticket count from Zendesk
3. Pull deployment count from GitHub
4. Combine into a weekly summary with trends vs last week
5. Post to #weekly-update in Slack"
\`\`\`

### Best Practices
1. **Start with one report** — pick the one that takes the most manual time
2. **Use screenshots** for charts that can't be exported as data
3. **Set up alerts** for threshold breaches, not just scheduled reports
4. **Keep summaries concise** — bullet points beat paragraphs in Slack
5. **Review and refine** — adjust thresholds and formats after the first week`,
    toolName: "Claude Cowork",
    category: "automation",
    difficulty: "beginner",
    tags: ["analytics", "reporting", "cowork", "dashboards", "automation"],
    estimatedMinutes: 20,
    createdAt: "2025-02-22",
  },
  {
    id: "document-analysis-extraction",
    title: "Document Analysis & Data Extraction",
    summary:
      "Use Claude to parse long documents, extract structured data, compare multiple sources, and generate summaries — contracts, reports, specs, and more.",
    content: `## Document Analysis & Data Extraction

Claude's 200K token context window makes it ideal for analyzing long documents. This lesson covers patterns for extraction, comparison, and summarization.

### Structured Extraction with Tool Use
Pull specific fields from unstructured documents:
\`\`\`typescript
const analyzeContract = async (contractText: string) => {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    tools: [{
      name: "extract_contract",
      description: "Extract key terms from a contract",
      input_schema: {
        type: "object",
        properties: {
          parties: { type: "array", items: { type: "string" } },
          effectiveDate: { type: "string" },
          termLength: { type: "string" },
          totalValue: { type: "number" },
          renewalTerms: { type: "string" },
          terminationClauses: { type: "array", items: { type: "string" } },
          keyObligations: { type: "array", items: { type: "string" } },
          risks: { type: "array", items: { type: "string" } },
          summary: { type: "string" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "extract_contract" },
    messages: [{ role: "user", content: \`Extract key terms:\\n\${contractText}\` }]
  });
  return response.content[0].input;
};
\`\`\`

### Document Comparison
Compare two or more documents side by side:
\`\`\`
"Compare these two vendor proposals:
- Pricing structure and total cost
- Delivery timeline
- Support and SLA terms
- Key differences in scope
Present as a markdown table with a recommendation."
\`\`\`

### Summarization Patterns
For different audiences, different summaries:
\`\`\`
"Summarize this 50-page technical spec for three audiences:

1. **Executive summary** (3 sentences): Business impact, timeline, cost
2. **Technical summary** (1 page): Architecture, key decisions, risks
3. **Team checklist**: Action items by role (frontend, backend, QA)"
\`\`\`

### Batch Processing
Process multiple documents with consistent extraction:
\`\`\`typescript
const results = await Promise.all(
  documents.map(doc =>
    client.messages.create({
      model: "claude-haiku-4-5-20251001", // Fast + cheap for extraction
      tools: [extractionTool],
      tool_choice: { type: "tool", name: "extract_data" },
      messages: [{ role: "user", content: doc.text }]
    })
  )
);
\`\`\`

### Best Practices
1. **Use tool use for extraction** — guarantees structured output
2. **Use Haiku for high-volume tasks** — 10x cheaper, still accurate for extraction
3. **Chunk very long documents** — split into logical sections if over 100K tokens
4. **Validate extracted data** — spot-check a sample before trusting bulk results
5. **Include the source** — ask Claude to cite page numbers or section headings`,
    toolName: "Claude API",
    category: "automation",
    difficulty: "advanced",
    tags: ["documents", "extraction", "analysis", "contracts", "summarization"],
    estimatedMinutes: 30,
    createdAt: "2025-02-25",
  },

  {
    id: "ai-assisted-sales-prep",
    title: "AI-Assisted Sales & Meeting Prep",
    summary:
      "Use Claude to research prospects, prep for client calls, structure meeting notes, and draft follow-ups — practical prompts for any sales workflow.",
    content: `## AI-Assisted Sales & Meeting Prep

Claude can handle the prep work that eats into selling time — research, talking points, objection handling, and follow-up drafts.

### Pre-Call Research
Before any client meeting, load context and ask Claude to prep:
\`\`\`
"I have a call with [Company] in 30 minutes. Here's what I know:
- They're a Series B SaaS company, 200 employees
- Current pain: manual onboarding taking 2 weeks per customer
- Budget: $50-100K annually
- Decision maker: VP of Customer Success

Give me:
1. Three questions to uncover their real priorities
2. How our product solves their onboarding bottleneck
3. Likely objections and how to address each
4. A proposed next step if the call goes well"
\`\`\`

### Structuring Call Notes
After a meeting, dump your raw notes and let Claude organize:
\`\`\`
"Structure these call notes for our CRM:
- Client sentiment and buying stage
- Pain points discussed (ranked by urgency)
- Solutions presented and reactions
- Competitors mentioned
- Next steps and timeline
- Red flags or blockers

Raw notes: [paste your rough notes]"
\`\`\`

### Drafting Follow-Ups
\`\`\`
"Draft a follow-up email based on these call notes:
[paste structured notes]

Keep it under 150 words. Reference the specific pain points
they mentioned. Include a clear next step with a specific date."
\`\`\`

### Objection Handling Prep
\`\`\`
"I'm presenting our enterprise plan ($80K/year) to a prospect
who currently uses [Competitor] at $30K/year.

Give me responses for these likely objections:
1. 'Why should I pay 2.5x more?'
2. 'We're locked into a contract until Q3'
3. 'My team doesn't want to switch tools'
4. 'Can you match their pricing?'"
\`\`\`

### Best Practices
1. **Give Claude context** — the more you share, the better the prep
2. **Be specific about format** — CRM fields, email length, number of points
3. **Always review before sending** — Claude drafts, you finalize
4. **Save your best prompts** — create templates for common meeting types
5. **Use Projects** — keep client context persistent across conversations`,
    toolName: "Claude",
    category: "communication",
    difficulty: "beginner",
    tags: ["sales", "meetings", "prep", "follow-ups", "crm"],
    estimatedMinutes: 20,
    createdAt: "2025-02-26",
  },
  {
    id: "api-integration-workflows",
    title: "Building API Integration Workflows",
    summary:
      "Connect Claude to your CRM, project management, and communication tools via APIs — pipeline analysis, automated follow-ups, and cross-tool workflows.",
    content: `## Building API Integration Workflows

Claude's API can sit between your tools, analyzing data from one system and taking action in another. This lesson covers common integration patterns.

### CRM Pipeline Analysis
Use Claude to analyze exported CRM data:
\`\`\`typescript
const analyzePipeline = async (deals: Deal[]) => {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    tools: [{
      name: "pipeline_analysis",
      description: "Analyze a sales pipeline for issues and opportunities",
      input_schema: {
        type: "object",
        properties: {
          staleDeals: { type: "array", items: {
            type: "object",
            properties: {
              dealId: { type: "string" },
              daysSinceActivity: { type: "number" },
              suggestedAction: { type: "string" }
            }
          }},
          atRiskDeals: { type: "array", items: { type: "string" } },
          topPriorities: { type: "array", items: { type: "string" } },
          weeklyForecast: { type: "number" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "pipeline_analysis" },
    messages: [{ role: "user", content: JSON.stringify(deals) }]
  });
  return response.content[0].input;
};
\`\`\`

### Meeting Transcript Analysis
Process call recordings (from Fireflies, Gong, etc.):
\`\`\`typescript
const analyzeCall = async (transcript: string) => {
  return client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    tools: [{
      name: "call_analysis",
      input_schema: {
        type: "object",
        properties: {
          sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
          keyTopics: { type: "array", items: { type: "string" } },
          actionItems: { type: "array", items: { type: "string" } },
          objections: { type: "array", items: { type: "string" } },
          nextSteps: { type: "string" },
          followUpDraft: { type: "string" }
        }
      }
    }],
    tool_choice: { type: "tool", name: "call_analysis" },
    messages: [{ role: "user", content: transcript }]
  });
};
\`\`\`

### Cross-Tool Workflow Example
\`\`\`
Incoming email (Gmail/Outlook)
    ↓ Claude classifies intent + urgency
    ↓
CRM update (HubSpot/Salesforce)
    ↓ Claude drafts response
    ↓
Task created (Linear/Jira)
    ↓ Claude summarizes for Slack
    ↓
Slack notification (#sales-alerts)
\`\`\`

### Integration Tips
1. **Start with read-only** — analyze data before automating writes
2. **Use webhooks** to trigger Claude workflows in real time
3. **Always include human review** for customer-facing actions
4. **Log everything** — track what Claude analyzed and recommended
5. **Use Haiku for classification** — fast and cheap for routing decisions`,
    toolName: "Claude API",
    category: "workflow",
    difficulty: "intermediate",
    tags: ["api", "integration", "crm", "workflow", "automation"],
    estimatedMinutes: 25,
    createdAt: "2025-02-26",
  },
  {
    id: "content-creation-workflows",
    title: "Content Creation Workflows with Claude",
    summary:
      "Use Claude to research, draft, and refine content — newsletters, blog posts, social media, and marketing copy with consistent voice and quality.",
    content: `## Content Creation Workflows

Claude excels at content creation when you give it structure, voice guidelines, and a clear workflow. This lesson covers repeatable patterns for any content team.

### Newsletter Workflow
\`\`\`
"Draft this week's newsletter:

Topic: [paste topic or news summary]
Voice: Conversational, knowledgeable, slightly irreverent
Structure:
1. Hook (1 sentence that makes people keep reading)
2. Main story (100 words max)
3. Key stat or data point
4. Actionable takeaway (what the reader should do)

Keep total length under 300 words."
\`\`\`

### Blog Post Generation
\`\`\`
"Write a blog post outline for: '[Topic]'

Target audience: [describe reader]
Goal: [inform / persuade / educate]
SEO keywords: [list 3-5]
Tone: [professional / casual / technical]

Include:
- H2 headings with brief descriptions
- Key points under each section
- A compelling intro hook
- A clear CTA at the end"
\`\`\`

### Maintaining Voice Consistency
Create a voice guide and include it as context:
\`\`\`
"Use this voice guide for all drafts:
- First person plural ('we')
- Short sentences. Punchy paragraphs.
- No jargon — explain technical concepts simply
- Use concrete examples over abstract claims
- Humor is OK but never at the reader's expense
- Always end with a clear action step"
\`\`\`

### Content Repurposing
Turn one piece of content into many:
\`\`\`
"Here's a 2,000-word blog post. Create:
1. A LinkedIn post (150 words, professional tone)
2. Three tweets (each highlighting a different insight)
3. An email subject line + preview text
4. A 30-second script for a short-form video"
\`\`\`

### Editing & Refinement
\`\`\`
"Review this draft for:
- Clarity: Is any sentence confusing?
- Conciseness: What can be cut without losing meaning?
- Flow: Do paragraphs connect logically?
- CTA: Is the call-to-action clear and compelling?

Mark changes with [ORIGINAL] → [SUGGESTED] format."
\`\`\`

### Best Practices
1. **Always provide voice/tone guidelines** — Claude adapts fast
2. **Use Projects** to keep your brand voice guide persistent
3. **Draft → Review → Refine** — never publish first drafts
4. **Batch similar content** — write 5 social posts at once, not one at a time
5. **Include examples of content you love** — show don't tell`,
    toolName: "Claude",
    category: "communication",
    difficulty: "beginner",
    tags: ["content", "writing", "newsletters", "marketing", "copywriting"],
    estimatedMinutes: 15,
    createdAt: "2025-02-26",
  },
  {
    id: "browser-automation-scraping",
    title: "Browser Automation & Data Ingestion with Claude",
    summary:
      "Use Claude with browser automation tools to extract data from web dashboards, normalize messy data across sources, and build reliable ingestion pipelines.",
    content: `## Browser Automation & Data Ingestion

Many business tools don't have APIs. Claude + browser automation can extract, normalize, and pipeline that data anyway.

### The Pattern
\`\`\`
Web Dashboard (no API)
    ↓ Browser automation (Playwright / Puppeteer)
Extract raw data
    ↓ Claude normalizes & structures
Clean, consistent data
    ↓ Store in your database
Ready for analysis
\`\`\`

### Browser Automation with Playwright
\`\`\`typescript
import { chromium } from "playwright";

const extractDashboardData = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate and authenticate
  await page.goto("https://dashboard.example.com");
  await page.fill("#email", process.env.DASHBOARD_EMAIL!);
  await page.fill("#password", process.env.DASHBOARD_PASSWORD!);
  await page.click('button[type="submit"]');

  // Navigate to reports
  await page.click('[data-nav="reports"]');
  await page.waitForSelector(".report-table");

  // Extract data from the table
  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll(".report-table tr");
    return Array.from(rows).map(row => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map(c => c.textContent?.trim());
    });
  });

  await browser.close();
  return data;
};
\`\`\`

### Claude for Data Normalization
Different sources format data differently. Claude standardizes:
\`\`\`typescript
const normalizeData = async (rawData: string[][], source: string) => {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    tools: [{
      name: "normalize",
      description: "Normalize raw dashboard data into standard schema",
      input_schema: {
        type: "object",
        properties: {
          records: { type: "array", items: {
            type: "object",
            properties: {
              date: { type: "string", description: "ISO 8601 date" },
              metric: { type: "string" },
              value: { type: "number" },
              unit: { type: "string" },
              source: { type: "string" }
            }
          }}
        }
      }
    }],
    tool_choice: { type: "tool", name: "normalize" },
    messages: [{
      role: "user",
      content: \`Normalize this data from \${source}:\\n\${JSON.stringify(rawData)}\`
    }]
  });
  return response.content[0].input.records;
};
\`\`\`

### Handling Common Challenges
| Challenge | Solution |
|-----------|----------|
| Login requires 2FA | Use session cookies or API tokens when possible |
| Dashboard loads data async | \`waitForSelector\` or \`waitForResponse\` |
| Data in charts not tables | Screenshot + Claude vision, or intercept API calls |
| Rate limiting | Add delays between requests, run during off-hours |
| Schema changes | Claude adapts — re-run normalization on failures |

### Best Practices
1. **Always use read-only credentials** — never automate write actions
2. **Run on a schedule** — cron jobs or scheduled cloud functions
3. **Log raw data before normalizing** — you can always re-process
4. **Monitor for failures** — dashboards change without warning
5. **Use Haiku for normalization** — fast, cheap, handles repetitive extraction well`,
    toolName: "Claude Code",
    category: "coding",
    difficulty: "advanced",
    tags: ["browser-automation", "data-ingestion", "scraping", "playwright", "normalization"],
    estimatedMinutes: 40,
    createdAt: "2025-02-26",
  },
  {
    id: "building-ai-copilot",
    title: "Building an AI Copilot for Your Product",
    summary:
      "Architecture and implementation patterns for adding a natural language AI copilot to your product — tool use, role-based access, evidence-backed answers, and proactive insights.",
    content: `## Building an AI Copilot for Your Product

An AI copilot lets users ask questions in natural language and get answers backed by their actual data. This lesson covers the architecture and patterns.

### Design Principles
1. **Evidence-first** — Every claim tied to a data source users can verify
2. **Role-based** — Different users see different scopes of data
3. **Proactive** — Surface insights without waiting for questions
4. **Actionable** — Suggest specific next steps, not just observations

### Architecture
\`\`\`
User Question (natural language)
    ↓
Claude API (with tools)
    ├─ Database queries (your application data)
    ├─ Analytics engine (metrics, trends)
    └─ Document store (policies, docs)
    ↓
Evidence-backed response with citations
\`\`\`

### Implementation Pattern
\`\`\`typescript
const copilot = async (userQuestion: string, userRole: string) => {
  const config = roleConfigs[userRole];

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: config.systemPrompt,
    tools: config.tools, // Role-specific data access
    messages: [{ role: "user", content: userQuestion }]
  });

  // Handle tool use loop — Claude may call multiple tools
  let result = response;
  while (result.stop_reason === "tool_use") {
    const toolCalls = result.content.filter(c => c.type === "tool_use");
    const toolResults = await Promise.all(
      toolCalls.map(tc => executeToolCall(tc))
    );
    result = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: config.systemPrompt,
      tools: config.tools,
      messages: [
        { role: "user", content: userQuestion },
        { role: "assistant", content: result.content },
        { role: "user", content: toolResults }
      ]
    });
  }
  return result.content[0].text;
};
\`\`\`

### Role-Based Configuration
\`\`\`typescript
const roleConfigs = {
  admin: {
    systemPrompt: "You are a data analyst for the entire organization...",
    tools: [queryAllMetrics, userAnalytics, revenueData],
  },
  manager: {
    systemPrompt: "You advise a team manager on their team's performance...",
    tools: [teamMetrics, projectStatus, memberActivity],
  },
  member: {
    systemPrompt: "You help an individual contributor with their work...",
    tools: [myTasks, myMetrics, teamContext],
  }
};
\`\`\`

### Proactive Insights
Don't wait for questions — run daily analysis:
\`\`\`typescript
const dailyInsights = async (userId: string) => {
  const recentData = await fetchRecentMetrics(userId);
  return client.messages.create({
    model: "claude-haiku-4-5-20251001", // Fast for daily batch
    max_tokens: 512,
    system: "Generate the top 3 priorities based on this data. Be specific and actionable.",
    messages: [{ role: "user", content: JSON.stringify(recentData) }]
  });
};
\`\`\`

### Best Practices
1. **Always cite sources** — include where data came from
2. **Limit tool access by role** — don't expose data users shouldn't see
3. **Use streaming** for responsive UX — answers appear incrementally
4. **Cache common queries** — same question from different users can share results
5. **Log everything** — track questions, tool calls, and responses for improvement`,
    toolName: "Claude API",
    category: "coding",
    difficulty: "advanced",
    tags: ["copilot", "ai-product", "architecture", "tool-use", "role-based"],
    estimatedMinutes: 45,
    createdAt: "2025-02-26",
  },

  // ─── Non-Developer AI Tools ───
  {
    id: "claude-chat-projects",
    title: "Claude Projects: Persistent Context for Teams",
    summary:
      "Use Claude Projects to keep team knowledge, brand guidelines, and reference docs always available — no re-uploading, no lost context.",
    content: `## Claude Projects

Projects let you give Claude persistent context that stays across every conversation. Instead of re-explaining your business every time, Claude just *knows*.

### What Is a Project?
A Project is a shared workspace on Claude.ai where you can:
- Upload reference documents (PDFs, docs, spreadsheets)
- Set custom instructions that apply to every conversation
- Share the project with your team
- Keep all related conversations in one place

### Setting Up a Project
1. Go to Claude.ai → Projects → "New Project"
2. Add a **Project Name** (e.g., "Q1 Marketing Campaign")
3. Add **Custom Instructions**:
\`\`\`
You are helping the Franzy marketing team with Q1 campaign content.

Our brand voice is: conversational, knowledgeable, slightly irreverent.
Our audience is: franchise investors, 35-55, $100K+ liquid capital.
Our key messages this quarter:
1. Franchise ownership as a path to financial freedom
2. Franzy's AI-powered matching finds the right fit
3. Semi-absentee ownership is viable with the right brand
\`\`\`
4. Upload reference docs (brand guide, past campaigns, competitor analysis)
5. Start chatting — Claude has all the context

### Team Use Cases
- **Marketing**: Upload brand guide + past campaigns → consistent content
- **Sales**: Upload product docs + pricing → accurate prospect answers
- **Operations**: Upload SOPs + policies → instant team Q&A
- **Leadership**: Upload reports + strategy docs → analysis on demand

### Best Practices
1. **Keep instructions under 1 page** — focus on what Claude needs most
2. **Upload real examples** — show Claude what good output looks like
3. **Update docs quarterly** — stale context gives stale answers
4. **Share with your team** — everyone benefits from the same context
5. **Use separate projects** for separate workstreams`,
    toolName: "Claude",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["projects", "context", "teams", "no-code", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "claude-chat-artifacts",
    title: "Claude Artifacts: Documents, Code & Visualizations",
    summary:
      "Create standalone documents, spreadsheets, charts, and interactive tools directly in Claude — then iterate, export, and share them.",
    content: `## Claude Artifacts

Artifacts are standalone pieces of content Claude creates in a side panel — documents, code, charts, and even interactive tools you can use immediately.

### What Can Artifacts Create?
- **Documents** — Reports, proposals, SOPs, meeting agendas
- **Spreadsheets** — Data tables with calculations
- **Charts & visualizations** — Bar charts, pie charts, timelines
- **Interactive tools** — Calculators, quizzes, decision trees
- **Diagrams** — Org charts, flowcharts, process maps
- **Web pages** — Landing pages, dashboards, forms

### How to Trigger Artifacts
Just ask Claude to *create* something:
\`\`\`
"Create a project timeline chart for our Q2 product launch
with milestones for design, development, testing, and release"

"Build me an ROI calculator that takes monthly cost,
time saved per week, and hourly rate as inputs"

"Create a comparison table of our top 5 competitors
with columns for pricing, features, and target market"
\`\`\`

### Iterating on Artifacts
Click on any artifact and ask Claude to modify it:
\`\`\`
"Add a column for 'Implementation Difficulty'"
"Change the chart colors to match our brand (coral, navy)"
"Make the calculator also show annual savings"
\`\`\`

### Sharing & Exporting
- **Copy** the content to paste into other tools
- **Download** as a file (HTML, SVG, etc.)
- **Share** a link with teammates (published artifacts)
- **Remix** — others can modify shared artifacts

### Practical Examples
1. **Sales**: "Create a one-page proposal for [Client] based on these notes"
2. **Marketing**: "Build an interactive quiz: 'Which franchise model is right for you?'"
3. **Operations**: "Create a decision flowchart for handling customer complaints"
4. **HR**: "Create an onboarding checklist with checkboxes for new hires"
5. **Finance**: "Build a break-even calculator for franchise investment analysis"`,
    toolName: "Claude",
    category: "automation",
    difficulty: "beginner",
    tags: ["artifacts", "documents", "visualizations", "no-code", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "claude-chat-daily-workflows",
    title: "Daily Workflows with Claude Chat",
    summary:
      "Practical prompts and workflows for everyday business tasks — email drafting, meeting prep, data analysis, writing, and decision-making.",
    content: `## Daily Workflows with Claude Chat

These are the prompts and patterns your team can use every day — no technical skills required.

### Email & Communication
**Draft a reply:**
\`\`\`
"Draft a professional reply to this email. Be concise,
address their concerns, and suggest a meeting next week.

[paste the email]"
\`\`\`

**Summarize a thread:**
\`\`\`
"Summarize this email thread into:
- Key decisions made
- Open questions
- Action items with owners

[paste the thread]"
\`\`\`

### Meeting Prep & Notes
**Before a meeting:**
\`\`\`
"I'm meeting with [person/company] in 30 minutes about [topic].
Give me 5 smart questions to ask and key talking points."
\`\`\`

**After a meeting:**
\`\`\`
"Organize these raw meeting notes into:
- Decisions made
- Action items (who, what, when)
- Key discussion points
- Follow-up needed

[paste your messy notes]"
\`\`\`

### Data Analysis (Upload a File)
Upload a CSV or spreadsheet and ask:
\`\`\`
"Analyze this sales data and tell me:
- Which products are trending up/down?
- What's our best-performing region?
- Any patterns I should know about?
Include a chart if it helps explain."
\`\`\`

### Writing & Editing
\`\`\`
"Rewrite this paragraph to be:
- Half the length
- More direct
- Written for a busy executive

[paste the paragraph]"
\`\`\`

### Decision Making
\`\`\`
"Help me decide between these options:
Option A: [describe]
Option B: [describe]

Compare them on cost, time, risk, and impact.
Which would you recommend and why?"
\`\`\`

### Tips for Non-Technical Users
1. **Upload files** — Claude reads PDFs, spreadsheets, images, docs
2. **Be specific** — "draft a 150-word email" beats "write something"
3. **Iterate** — "make it shorter" or "add more detail about X"
4. **Use Projects** — save your instructions once, use them forever
5. **Ask Claude to explain** — "explain this in simple terms"`,
    toolName: "Claude",
    category: "workflow",
    difficulty: "beginner",
    tags: ["daily", "email", "meetings", "writing", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "chatgpt-for-business",
    title: "ChatGPT for Business: Features & Workflows",
    summary:
      "Get the most from ChatGPT at work — custom GPTs, Canvas for collaborative editing, data analysis, image generation, and memory features.",
    content: `## ChatGPT for Business

ChatGPT from OpenAI is one of the most widely used AI tools. Here's how to use its key features effectively for work.

### Key Features

#### Custom GPTs
Pre-configured ChatGPT versions for specific tasks:
- Browse the GPT Store for ready-made tools
- Create your own: Instructions + Knowledge files + Actions
- Share with your team

**Example custom GPT:**
\`\`\`
Name: "Franzy Email Drafter"
Instructions: "You draft professional emails for the Franzy sales team.
Use our brand voice (friendly, knowledgeable). Always include a clear CTA.
Reference the attached brand guide for tone."
Knowledge: [upload brand guide, email templates]
\`\`\`

#### Canvas
Collaborative editing mode for documents and code:
- ChatGPT writes in a side panel you can edit directly
- Ask for specific changes: "make paragraph 3 more concise"
- Great for long-form content like blog posts, reports, proposals

#### Data Analysis (Advanced Data Analysis)
Upload files and get instant analysis:
\`\`\`
Upload a CSV → "What are the top trends in this data?"
Upload a PDF → "Summarize the key findings"
Upload an image → "What does this chart show?"
\`\`\`

#### DALL-E (Image Generation)
Generate images from text descriptions:
\`\`\`
"Create a professional banner image for our franchise expo booth.
Modern, clean design with blue and white colors. Include icons
representing food service, real estate, and technology."
\`\`\`

#### Memory
ChatGPT remembers things across conversations:
- "Remember that I work at Franzy on the marketing team"
- "Remember our brand colors are coral and navy"
- Builds up context over time without re-explaining

### When to Use ChatGPT vs Claude
| Task | ChatGPT | Claude |
|------|---------|--------|
| Image generation | DALL-E built in | No native image gen |
| Long document analysis | Good | Better (200K context) |
| Custom tools (GPTs) | GPT Store | Projects |
| Collaborative editing | Canvas | Artifacts |
| Web browsing | Built in | Via connectors |
| Coding | Good | Better for complex code |

### Tips
1. **Use Custom GPTs** for repeated tasks — build once, use forever
2. **Upload files** directly — CSVs, PDFs, images all work
3. **Use Canvas** for anything longer than a paragraph
4. **Enable Memory** for personal context that carries over
5. **Browse the GPT Store** before building your own`,
    toolName: "ChatGPT",
    category: "workflow",
    difficulty: "beginner",
    tags: ["chatgpt", "openai", "gpts", "canvas", "non-developer"],
    estimatedMinutes: 20,
    createdAt: "2025-03-01",
  },
  {
    id: "google-gemini-workspace",
    title: "Google Gemini: AI in Your Workspace",
    summary:
      "Use Gemini across Google Docs, Sheets, Slides, Gmail, and Meet — built-in AI that works where you already work.",
    content: `## Google Gemini in Workspace

Gemini integrates directly into Google Workspace apps. If your team uses Google tools, AI is already one click away.

### Gemini in Google Docs
**Help me write:**
- Click the Gemini icon or type \`@\` → "Help me write"
- "Draft a project proposal for expanding into Texas market"
- "Summarize this document in 3 bullet points"
- "Rewrite this section for a non-technical audience"

**Refine existing text:**
- Select text → "Make it more formal" / "Shorten this" / "Elaborate"

### Gemini in Google Sheets
**Generate formulas:**
\`\`\`
"Create a formula that calculates the monthly growth rate
from column B (revenue) and shows it as a percentage in column C"
\`\`\`

**Analyze data:**
- "What trends do you see in this data?"
- "Create a pivot table summarizing sales by region"
- "Highlight rows where revenue dropped more than 10%"

**Generate tables:**
- "Create a project tracker with columns for task, owner, status, due date, and priority"

### Gemini in Google Slides
**Create presentations:**
\`\`\`
"Generate a 10-slide presentation about our Q1 results.
Include slides for: executive summary, revenue, growth metrics,
challenges, team highlights, and Q2 goals."
\`\`\`

**Generate images:**
- "Create a background image for a slide about innovation"
- Generates AI images directly in Slides

### Gemini in Gmail
**Draft emails:**
- Click "Help me write" in the compose window
- "Draft a follow-up to our meeting about the partnership"
- "Reply professionally declining this request"

**Summarize threads:**
- Long email chain? Click "Summarize this email"

### Gemini in Google Meet
- **Real-time notes** — Gemini takes notes during the meeting
- **Summary** — Get a meeting summary with action items after
- **Translation** — Real-time caption translation

### Gemini Chat (gemini.google.com)
Standalone chat with unique features:
- **Google Search integration** — answers grounded in real-time web data
- **Google Maps** — "Find restaurants near our Austin office"
- **YouTube** — "Summarize this YouTube video"
- **Google Flights/Hotels** — Travel research

### Best Practices
1. **Start in Workspace** — use Gemini where you already work
2. **Use @Gemini** in Docs for inline help
3. **Upload to Gemini chat** for analysis of non-Google files
4. **Combine with Sheets** for data analysis without formulas
5. **Use Meet integration** to never miss action items`,
    toolName: "Google Gemini",
    category: "workflow",
    difficulty: "beginner",
    tags: ["gemini", "google", "workspace", "docs", "sheets", "non-developer"],
    estimatedMinutes: 20,
    createdAt: "2025-03-01",
  },
  {
    id: "microsoft-copilot-365",
    title: "Microsoft Copilot: AI in Office 365",
    summary:
      "Use Copilot across Word, Excel, PowerPoint, Outlook, and Teams — the AI assistant built into the tools you already use daily.",
    content: `## Microsoft Copilot in Office 365

If your organization uses Microsoft 365, Copilot adds AI directly into Word, Excel, PowerPoint, Outlook, and Teams.

### Copilot in Word
**Draft documents:**
\`\`\`
"Draft a vendor evaluation report comparing three CRM platforms.
Include sections for features, pricing, integration capabilities,
and a recommendation."
\`\`\`

**Edit existing text:**
- Select text → Copilot icon → "Make it more concise"
- "Rewrite for a C-suite audience"
- "Add a table summarizing the key points"

**Reference other files:**
- "Draft a summary based on /Q4 Sales Report.xlsx"
- Copilot can pull from your OneDrive/SharePoint files

### Copilot in Excel
**Analyze data:**
\`\`\`
"What are the key trends in this sales data?"
"Which product category has the highest growth rate?"
"Create a chart showing monthly revenue by region"
\`\`\`

**Generate formulas:**
- "Add a column that calculates profit margin"
- "Create a VLOOKUP to match customer IDs from Sheet2"

**Format & clean data:**
- "Highlight all cells where value exceeds budget"
- "Sort by date and remove duplicate entries"

### Copilot in PowerPoint
**Create presentations:**
\`\`\`
"Create a presentation from /Project Proposal.docx"
"Add a slide comparing our pricing vs competitors"
"Generate speaker notes for each slide"
\`\`\`

**Design help:**
- "Make this slide more visual"
- "Add an icon for each bullet point"
- "Convert this text to a SmartArt diagram"

### Copilot in Outlook
**Email drafting:**
- "Draft a reply accepting the meeting but suggesting Thursday instead"
- "Summarize this email thread"
- "Write a professional decline for this request"

**Email management:**
- "What emails need my response today?"
- "Find all emails from [person] about [topic]"

### Copilot in Teams
**During meetings:**
- Real-time transcription and notes
- "What has been discussed so far?"
- "List the action items from this meeting"

**After meetings:**
- Auto-generated meeting summary
- Action items with assigned owners
- Key decisions highlighted

### When to Use Copilot
| Task | Best For |
|------|----------|
| Documents from templates | Word |
| Data analysis & charts | Excel |
| Presentation creation | PowerPoint |
| Email management | Outlook |
| Meeting summaries | Teams |

### Tips
1. **Reference files** — Copilot works best when you point it to existing docs
2. **Be specific** — "Create a 5-slide deck" beats "make a presentation"
3. **Iterate** — Ask for changes instead of starting over
4. **Use in Teams** — Meeting summaries alone justify the cost
5. **Check accuracy** — Always review AI-generated content`,
    toolName: "Microsoft Copilot",
    category: "workflow",
    difficulty: "beginner",
    tags: ["copilot", "microsoft", "office365", "word", "excel", "non-developer"],
    estimatedMinutes: 20,
    createdAt: "2025-03-01",
  },
  {
    id: "perplexity-research",
    title: "Perplexity AI: Research & Fact-Checking",
    summary:
      "Use Perplexity for research that cites its sources — competitive analysis, market research, fact-checking, and staying current on industry trends.",
    content: `## Perplexity AI for Research

Perplexity is an AI-powered research tool that searches the web in real time and cites every source. Think of it as Google search that reads and summarizes the results for you.

### Why Perplexity for Research?
- **Citations on everything** — every claim links to a source
- **Real-time web search** — always current information
- **Follow-up questions** — dig deeper without starting over
- **Collections** — organize research into folders

### Research Workflows

#### Competitive Analysis
\`\`\`
"What are the top 5 franchise matching platforms competing
with Franzy? For each, list:
- Their main features
- Pricing model
- Target audience
- Key differentiators
- Recent news or funding"
\`\`\`

#### Market Research
\`\`\`
"What is the current state of the franchise industry in 2025?
Include market size, growth trends, most popular categories,
and any notable shifts in investor behavior."
\`\`\`

#### Fact-Checking
\`\`\`
"Is it true that the average franchise failure rate
is lower than independent businesses? Cite specific studies."
\`\`\`

#### Industry Monitoring
\`\`\`
"What are the biggest franchise industry news stories
from the past week? Focus on QSR, home services,
and fitness categories."
\`\`\`

### Pro Features
- **Focus modes**: Academic (scholarly sources), Writing (detailed), Math, Video, Social
- **Collections**: Save and organize research by topic
- **File upload**: Upload documents and ask questions about them
- **API access**: For developers who want to integrate search

### Perplexity vs Other Tools
| Task | Perplexity | Claude | ChatGPT |
|------|-----------|--------|---------|
| Current events | Best (live search) | Limited | Good (browsing) |
| Source citations | Every answer cited | On request | Sometimes |
| Deep analysis | Good | Best | Good |
| Follow-up research | Excellent | Good | Good |
| Creative writing | Limited | Best | Good |

### Tips
1. **Use for anything time-sensitive** — Perplexity always has current data
2. **Click the citations** — verify claims before sharing with stakeholders
3. **Use Focus modes** — Academic for research, Writing for content
4. **Save to Collections** — build a research library over time
5. **Use follow-up questions** — "Tell me more about [specific finding]"`,
    toolName: "Perplexity",
    category: "workflow",
    difficulty: "beginner",
    tags: ["perplexity", "research", "citations", "fact-checking", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "notebooklm-docs",
    title: "NotebookLM: Turn Documents into Knowledge",
    summary:
      "Use Google's NotebookLM to upload documents and get AI-powered Q&A, summaries, study guides, and even audio overviews of your content.",
    content: `## NotebookLM: Document Intelligence

NotebookLM from Google turns your documents into an interactive knowledge base. Upload files, and the AI answers questions *only* from your sources — no hallucination from outside knowledge.

### What Makes NotebookLM Different?
- **Grounded answers only** — Claude/ChatGPT use general knowledge; NotebookLM answers *only* from your uploaded docs
- **Audio Overview** — converts documents into a podcast-style audio discussion
- **Source citations** — every answer points to the exact passage
- **Multi-document** — upload up to 50 sources per notebook

### Supported Sources
- Google Docs and Slides
- PDFs
- Web URLs
- YouTube videos
- Plain text / Markdown
- Audio files

### Use Cases

#### Onboarding New Employees
Upload your employee handbook, SOPs, and training docs:
\`\`\`
"What's the process for requesting PTO?"
"Explain our expense reimbursement policy"
"What are the key points from the employee handbook?"
\`\`\`

#### Meeting & Call Prep
Upload past meeting notes, reports, and emails:
\`\`\`
"What did we decide about the Texas expansion in last month's meeting?"
"Summarize all the action items from the last 3 meetings"
\`\`\`

#### Document Analysis
Upload contracts, proposals, or reports:
\`\`\`
"Compare the terms of Vendor A and Vendor B proposals"
"What are the key risks mentioned in this report?"
"Create a summary of the main findings"
\`\`\`

#### Audio Overview (Podcast Mode)
NotebookLM's standout feature:
1. Upload your documents
2. Click "Generate Audio Overview"
3. Two AI hosts discuss your content in a natural podcast format
4. Listen on your commute or while multitasking

Great for:
- Turning a 50-page report into a 15-minute listen
- Team members who prefer audio learning
- Making dense content more accessible

### NotebookLM vs Other Tools
| Feature | NotebookLM | Claude | ChatGPT |
|---------|-----------|--------|---------|
| Grounded answers only | Yes | Optional | No |
| Audio overview | Yes | No | No |
| Multi-doc analysis | Up to 50 | Large context | Limited |
| General knowledge | No | Yes | Yes |
| Creative writing | No | Yes | Yes |

### Tips
1. **Upload everything relevant** — more sources = better answers
2. **Use Audio Overview** for long reports you don't have time to read
3. **Create separate notebooks** for different projects
4. **Trust the citations** — click through to verify
5. **Combine with Claude** — use NotebookLM for grounded answers, Claude for creative tasks`,
    toolName: "NotebookLM",
    category: "automation",
    difficulty: "beginner",
    tags: ["notebooklm", "google", "documents", "audio", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "manus-autonomous-agent",
    title: "Manus AI: Autonomous Task Execution",
    summary:
      "Use Manus to delegate entire multi-step tasks — research projects, data collection, report generation, and web-based workflows that run autonomously.",
    content: `## Manus AI: Autonomous Task Execution

Manus is an autonomous AI agent that can browse the web, use tools, and complete multi-step tasks on its own. Think of it as giving an AI intern a task and getting the finished result.

### How Manus Works
1. You describe a task in natural language
2. Manus plans the steps
3. It executes each step autonomously (browsing, searching, analyzing)
4. You get the finished result

### What Manus Can Do
- **Browse the web** — navigate sites, fill forms, extract data
- **Research** — search multiple sources and compile findings
- **Create documents** — reports, spreadsheets, presentations
- **Data collection** — gather information from multiple websites
- **Analysis** — process and summarize collected data

### Use Cases

#### Market Research
\`\`\`
"Research the top 10 home service franchises under $100K investment.
For each, find: franchise fee, total investment range, number of units,
year founded, and recent news. Create a comparison spreadsheet."
\`\`\`

#### Competitive Intelligence
\`\`\`
"Monitor our top 3 competitors' websites and social media.
Identify any new features, pricing changes, or partnerships
announced in the last month. Summarize in a report."
\`\`\`

#### Lead Research
\`\`\`
"Research these 20 companies [list]. For each, find the
decision-maker's name, title, LinkedIn profile, company size,
and any recent news. Format as a CSV."
\`\`\`

#### Content Research
\`\`\`
"Find the 10 most-discussed franchise industry topics on Reddit
and Twitter this week. For each, summarize the discussion,
sentiment, and any actionable insights for our marketing team."
\`\`\`

### Manus vs Chat-Based AI
| Feature | Manus | Claude/ChatGPT |
|---------|-------|---------------|
| Autonomous execution | Yes — runs on its own | No — needs back-and-forth |
| Web browsing | Full browser | Limited/connectors |
| Multi-step tasks | Plans and executes | One step at a time |
| Time to result | Minutes to hours (runs alone) | Real-time but manual |
| Best for | Research, data collection | Analysis, writing, reasoning |

### Best Practices
1. **Be specific about output format** — "create a spreadsheet with columns for..."
2. **Set scope** — "focus on US market only" prevents rabbit holes
3. **Review results** — always verify before sharing externally
4. **Start with research tasks** — Manus excels at gathering and organizing
5. **Combine with Claude** — use Manus to gather data, Claude to analyze it`,
    toolName: "Manus",
    category: "automation",
    difficulty: "beginner",
    tags: ["manus", "autonomous", "agent", "research", "non-developer"],
    estimatedMinutes: 15,
    createdAt: "2025-03-01",
  },
  {
    id: "ai-tool-chooser",
    title: "Choosing the Right AI Tool for the Job",
    summary:
      "A practical decision guide for picking the best AI tool — Claude, ChatGPT, Gemini, Copilot, Perplexity, NotebookLM, or Manus — based on your actual task.",
    content: `## Choosing the Right AI Tool

You have access to multiple AI tools. Using the right one for each task makes a big difference in quality and speed.

### Quick Decision Guide

| Task | Best Tool | Why |
|------|-----------|-----|
| Long document analysis | **Claude** | 200K context, best reasoning |
| Quick current events lookup | **Perplexity** | Real-time search, citations |
| Creating presentations | **Copilot** or **Gemini** | Native Office/Workspace integration |
| Spreadsheet formulas | **Copilot** (Excel) or **Gemini** (Sheets) | Works in-app |
| Image generation | **ChatGPT** (DALL-E) | Best built-in image gen |
| Research with sources | **Perplexity** | Every answer cited |
| Onboarding docs Q&A | **NotebookLM** | Grounded in your docs only |
| Multi-step web research | **Manus** | Autonomous execution |
| Writing & editing | **Claude** or **ChatGPT** | Both excellent |
| Meeting summaries | **Copilot** (Teams) or **Gemini** (Meet) | Native integration |
| Code & technical work | **Claude Code** | Purpose-built for coding |

### Decision Framework
Ask yourself:

**1. Where does this task happen?**
- In Google Workspace → **Gemini**
- In Office 365 → **Copilot**
- Standalone task → **Claude** or **ChatGPT**

**2. Do I need current information?**
- Yes → **Perplexity** (best citations) or **ChatGPT** (browsing)
- No, working with existing docs → **Claude** or **NotebookLM**

**3. How complex is the reasoning?**
- Complex analysis, long docs → **Claude**
- Simple Q&A, quick tasks → Any tool works
- Multi-step autonomous → **Manus**

**4. Do I need to generate images?**
- Yes → **ChatGPT** (DALL-E) or **Gemini**
- No → Use whichever is best for the text task

**5. Do I need grounded-in-my-docs answers?**
- Yes, strictly → **NotebookLM**
- Yes, with some flexibility → **Claude Projects**
- No → Any tool

### Combining Tools
The power users on your team combine tools:

**Research workflow:**
1. **Perplexity** — gather current data with citations
2. **Claude** — analyze and synthesize into insights
3. **Copilot/Gemini** — format into a presentation

**Content workflow:**
1. **Perplexity** — research topic and find sources
2. **Claude** — draft the content
3. **ChatGPT** — generate accompanying images
4. **Gemini** — publish to Google Docs for team review

**Sales workflow:**
1. **Manus** — research prospect companies
2. **Claude** — draft personalized outreach
3. **Copilot** — schedule follow-ups in Outlook

### Tips
1. **Don't force one tool** — each has strengths
2. **Start with what's integrated** — Gemini in Workspace, Copilot in Office
3. **Use Claude for thinking** — complex analysis and reasoning
4. **Use Perplexity for facts** — anything needing current, cited info
5. **Experiment** — try the same task in two tools and compare`,
    toolName: "Claude",
    category: "best-practices",
    difficulty: "beginner",
    tags: ["comparison", "decision-guide", "tools", "non-developer"],
    estimatedMinutes: 10,
    createdAt: "2025-03-01",
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
