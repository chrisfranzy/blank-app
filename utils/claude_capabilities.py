"""
Comprehensive Claude Capabilities Reference.

A living document of EVERYTHING Claude can do today — all products, features,
and how to use them. Auto-generates training content and stays current
with releases.
"""

from datetime import datetime

LAST_UPDATED = "2026-02-27"

CLAUDE_CAPABILITIES = {
    # ═══════════════════════════════════════════════════════════
    # CLAUDE MODELS
    # ═══════════════════════════════════════════════════════════
    "models": {
        "title": "Claude Model Family",
        "description": "Claude's model lineup — pick the right model for the right job.",
        "items": [
            {
                "name": "Claude Opus 4.6",
                "id": "claude-opus-4-6",
                "description": "Most powerful model. Best for complex reasoning, nuanced writing, coding, and agentic tasks.",
                "best_for": ["Complex analysis", "Agentic workflows", "Hard coding problems", "Long documents"],
                "context_window": "200K tokens",
            },
            {
                "name": "Claude Sonnet 4.6",
                "id": "claude-sonnet-4-6",
                "description": "Best balance of speed and intelligence. The go-to for most tasks.",
                "best_for": ["Everyday coding", "Content generation", "Data analysis", "Automations"],
                "context_window": "200K tokens",
            },
            {
                "name": "Claude Haiku 4.5",
                "id": "claude-haiku-4-5-20251001",
                "description": "Fastest and most cost-effective. Great for high-volume, simpler tasks.",
                "best_for": ["Classification", "Data extraction", "Quick answers", "High-volume processing"],
                "context_window": "200K tokens",
            },
        ],
        "training_content": """## Choosing the Right Claude Model

**Use Opus** when you need the absolute best quality:
- Complex code refactoring across many files
- Nuanced business strategy analysis
- Long-form content that needs to be perfect
- Multi-step agentic workflows where accuracy is critical

**Use Sonnet** for 90% of your daily work:
- Writing emails, docs, and summaries
- Code generation and debugging
- Data analysis and reporting
- Most automations and integrations

**Use Haiku** when speed and cost matter:
- Classifying hundreds of support tickets
- Extracting data from forms/emails
- Real-time chat responses
- Any task where you're processing high volumes

**Pro tip**: Start with Sonnet. Only upgrade to Opus if Sonnet isn't good enough. Use Haiku for anything running at scale.
""",
    },

    # ═══════════════════════════════════════════════════════════
    # CLAUDE.AI (Web & Desktop)
    # ═══════════════════════════════════════════════════════════
    "claude_ai": {
        "title": "Claude.ai & Claude Desktop",
        "description": "The main Claude interface — web app and desktop app.",
        "items": [
            {
                "name": "Conversations",
                "description": "Chat with Claude, attach files, share images, have extended thinking enabled.",
            },
            {
                "name": "Projects",
                "description": "Organize conversations by topic. Add project knowledge (files, instructions) that Claude remembers across all conversations in that project.",
            },
            {
                "name": "Artifacts",
                "description": "Claude creates interactive documents, code, websites, diagrams, and more — rendered live in the sidebar.",
            },
            {
                "name": "Extended Thinking",
                "description": "Claude shows its reasoning process for complex problems. Toggle on for math, logic, and analysis tasks.",
            },
            {
                "name": "File Uploads",
                "description": "Upload PDFs, images, CSVs, code files, and more. Claude can read and analyze them.",
            },
            {
                "name": "Custom Styles",
                "description": "Set Claude's communication style (formal, concise, explanatory, etc.) globally or per conversation.",
            },
            {
                "name": "Memory",
                "description": "Claude remembers key facts about you across conversations — your preferences, projects, and context.",
            },
        ],
        "training_content": """## Getting the Most from Claude.ai

### Projects: Your Knowledge Hub
Create a project for each major workstream. Upload key documents (strategy docs, brand guides, codebases). Claude will reference them in every conversation.

```
Example project setup:
📁 Q1 Marketing Campaign
  📄 Brand guidelines.pdf
  📄 Target audience research.csv
  📄 Competitor analysis.docx
  📝 Instructions: "Always reference our brand voice. Focus on B2B SaaS."
```

### Artifacts: Live Outputs
Ask Claude to create:
- Interactive dashboards from your data
- Mermaid diagrams of your architecture
- React components you can preview live
- SVG visualizations

### Pro Tips
1. **Start conversations with context**: "I'm working on [X]. Here's what I have so far: [paste]. Help me [specific task]."
2. **Use follow-ups**: Don't start new conversations — build on existing ones.
3. **Attach files**: Claude reads PDFs, images, spreadsheets, and code files.
4. **Extended thinking**: Turn it on for math, logic puzzles, and complex analysis.
""",
    },

    # ═══════════════════════════════════════════════════════════
    # CLAUDE AI CONNECTORS
    # ═══════════════════════════════════════════════════════════
    "connectors": {
        "title": "Claude AI Connectors",
        "description": "50+ one-click integrations that connect Claude to your existing tools.",
        "items": [
            {"name": "Gmail", "description": "Search and read emails, draft responses."},
            {"name": "Google Drive", "description": "Search and read Google Docs, Sheets, Slides."},
            {"name": "Google Calendar", "description": "View and manage calendar events."},
            {"name": "Slack", "description": "Search messages, read channels, interact with workspaces."},
            {"name": "Notion", "description": "Search and read Notion pages and databases."},
            {"name": "Asana", "description": "View and manage tasks and projects."},
            {"name": "Figma", "description": "View and interact with Figma designs."},
            {"name": "Canva", "description": "Create and edit Canva designs from Claude."},
            {"name": "GitHub", "description": "Browse repos, PRs, issues."},
            {"name": "Jira", "description": "View and manage Jira issues and projects."},
            {"name": "HubSpot", "description": "Access CRM data, contacts, deals."},
            {"name": "Salesforce", "description": "Access Salesforce CRM data."},
            {"name": "Linear", "description": "View and manage Linear issues."},
            {"name": "Confluence", "description": "Search and read Confluence pages."},
            {"name": "Box", "description": "Search and read files stored in Box."},
            {"name": "Hex", "description": "Create data analyses and notebooks."},
        ],
        "training_content": """## Claude AI Connectors: One-Click Power

### Setting Up
1. Go to **claude.ai/settings/connectors**
2. Click **Connect** next to any tool
3. Authorize access
4. Done — Claude can now access that tool in any conversation

### Real Examples

**Email triage:**
> "Check my Gmail for unread emails from this week. Categorize them as: needs response, FYI, or can ignore."

**Cross-tool research:**
> "Search our Slack for discussions about the Q1 launch, then check Google Drive for the launch plan doc, and compare what was planned vs. what people are discussing."

**Meeting prep:**
> "I have a meeting with Acme Corp in 1 hour. Check my Gmail for recent threads with them, look up their info in HubSpot, and prepare talking points."

### Available on All Plans
Connectors work on Free, Pro, and Team plans. No API key required.
""",
    },

    # ═══════════════════════════════════════════════════════════
    # CLAUDE CODE
    # ═══════════════════════════════════════════════════════════
    "claude_code": {
        "title": "Claude Code",
        "description": "Anthropic's CLI for AI-powered coding directly in your terminal.",
        "items": [
            {"name": "Codebase Understanding", "description": "Reads and comprehends your entire project — files, dependencies, architecture."},
            {"name": "File Editing", "description": "Creates and modifies files with surgical precision using diff-based edits."},
            {"name": "Command Execution", "description": "Runs shell commands — tests, builds, linters, git operations."},
            {"name": "Git Operations", "description": "Commits, branches, creates PRs, manages the full git workflow."},
            {"name": "Multi-file Refactoring", "description": "Handles complex changes across dozens of files autonomously."},
            {"name": "CLAUDE.md", "description": "Project config file that gives Claude persistent context about your codebase."},
            {"name": "Custom Slash Commands", "description": "Define reusable commands like /review, /test, /deploy."},
            {"name": "Hooks", "description": "Shell commands that run before/after tool calls for deterministic automation."},
            {"name": "MCP Server Integration", "description": "Connect external tools via Model Context Protocol."},
            {"name": "Multi-Agent / Subagent", "description": "Spawn sub-agents for parallel tasks (research, testing, etc.)."},
            {"name": "GitHub Integration", "description": "Use @claude in PR comments for AI-powered code review on GitHub."},
            {"name": "Headless / CI Mode", "description": "Run Claude Code non-interactively in CI/CD pipelines."},
            {"name": "Model Selection", "description": "Switch between Opus, Sonnet, and Haiku mid-conversation."},
            {"name": "IDE Integration", "description": "Works in VS Code, JetBrains, and other editors via extensions."},
        ],
        "training_content": """## Claude Code: Your AI Pair Programmer

### Installation
```bash
npm install -g @anthropic-ai/claude-code
```

### Daily Workflows

**Morning standup prep:**
```bash
claude "What changed in this repo since yesterday? Summarize the commits and any open PRs."
```

**Bug fixing:**
```bash
claude "The login flow is broken — users get a 500 error after OAuth callback. Debug and fix it."
```

**Code review:**
```bash
claude "Review the changes in my current branch. Focus on security, performance, and edge cases."
```

**Refactoring:**
```bash
claude "Migrate all our API endpoints from REST to GraphQL. Update tests too."
```

### CLAUDE.md — Give Claude Context
Create `CLAUDE.md` in your repo root:
```markdown
# Project: Our App
## Stack: React + Python FastAPI + PostgreSQL
## Test command: make test
## Lint command: make lint
## Conventions: snake_case for Python, camelCase for TS
```

### Slash Commands
```
/compact  — Compress conversation context
/review   — Review current changes
/commit   — Commit with a good message
/help     — Show all commands
```

### GitHub @claude
Comment `@claude` on any PR to get an AI review. Claude reads the diff, understands context, and leaves actionable feedback.
""",
    },

    # ═══════════════════════════════════════════════════════════
    # COWORK
    # ═══════════════════════════════════════════════════════════
    "cowork": {
        "title": "Claude Cowork",
        "description": "GUI-based task automation — Claude does work for you in a virtual environment, no code needed.",
        "items": [
            {"name": "Task Execution", "description": "Describe a task in plain English. Claude plans and executes it in a virtual machine."},
            {"name": "Scheduled Tasks", "description": "Set tasks to run on a schedule — daily reports, weekly cleanups, etc."},
            {"name": "Browser Automation", "description": "Claude browses the web, fills forms, extracts data, and interacts with web apps."},
            {"name": "Plugin Marketplace", "description": "11+ launch plugins for common tools. Enterprise can create private plugins."},
            {"name": "Cross-App Workflows", "description": "Chain actions across multiple apps in a single task."},
            {"name": "MCP Connections", "description": "Connect to databases, APIs, and custom tools via MCP."},
            {"name": "Enterprise Management", "description": "IT admins control which plugins are available, manage permissions."},
        ],
        "training_content": """## Claude Cowork: Automation Without Code

### What Can Cowork Do?

Think of Cowork as a virtual assistant that can use your computer. You tell it what to do, it does it.

### Example Tasks

**Weekly report:**
> "Every Monday at 8am, go to our analytics dashboard, screenshot the key metrics, write a summary, and post it to #team-updates in Slack."

**Data entry:**
> "Go through this spreadsheet of leads. For each one, look up their company website, find their LinkedIn, and fill in the missing fields."

**Research:**
> "Research the top 10 competitors in our space. Create a comparison table with pricing, features, and recent funding. Save as a Google Sheet."

**Email management:**
> "Go through my inbox. Draft responses to anything from customers. Flag anything urgent. Summarize the rest."

### Scheduling

Set tasks to run automatically:
- **Daily**: Morning email digest, EOD Slack summary
- **Weekly**: Pipeline report, sprint recap, competitor monitoring
- **Monthly**: Board deck data collection, metric trend analysis

### Plugins

Browse the marketplace for pre-built automations:
- Slack plugin: Read/post messages
- Google Workspace: Docs, Sheets, Calendar
- Salesforce: CRM automation
- Custom: Build your own via MCP
""",
    },

    # ═══════════════════════════════════════════════════════════
    # MCP (Model Context Protocol)
    # ═══════════════════════════════════════════════════════════
    "mcp": {
        "title": "Model Context Protocol (MCP)",
        "description": "Open standard for connecting Claude to any external tool or data source.",
        "items": [
            {"name": "JSON-RPC Protocol", "description": "Standardized communication between Claude and external tools."},
            {"name": "3000+ Community Servers", "description": "Open-source MCP servers for nearly every popular tool."},
            {"name": "Tools Primitive", "description": "Let Claude call functions in your systems."},
            {"name": "Resources Primitive", "description": "Let Claude read data from your systems."},
            {"name": "Prompts Primitive", "description": "Pre-built prompt templates for specific tools."},
            {"name": "OAuth2 Authorization", "description": "Secure authentication for MCP connections."},
            {"name": "Official Servers", "description": "Anthropic-maintained servers: GitHub, Slack, Google Drive, Postgres, Puppeteer."},
            {"name": "Custom Servers", "description": "Build your own in Python or TypeScript."},
        ],
        "training_content": """## MCP: Connect Claude to Everything

### The Big Idea
MCP is like USB for AI. Just as USB standardized how peripherals connect to computers, MCP standardizes how Claude connects to tools.

### Quick Setup (Claude Desktop)

Add to your MCP config:
```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-slack"],
      "env": { "SLACK_BOT_TOKEN": "xoxb-your-token" }
    }
  }
}
```

Restart Claude Desktop. Now Claude can search and read Slack messages.

### Building Custom MCP Servers

```python
from mcp.server import Server

server = Server("my-company-tools")

@server.tool("search_internal_docs")
async def search_docs(query: str) -> str:
    results = your_search_function(query)
    return format_results(results)

@server.tool("create_ticket")
async def create_ticket(title: str, description: str, priority: str) -> str:
    ticket = your_ticketing_system.create(title=title, desc=description, priority=priority)
    return f"Created ticket {ticket.id}"
```

### Popular Use Cases
1. **Internal knowledge search**: Connect Notion + Drive + Confluence
2. **Database queries**: Let Claude query your production DB (read-only!)
3. **Custom APIs**: Wrap your internal APIs as MCP tools
4. **Browser automation**: Puppeteer MCP for web scraping
""",
    },

    # ═══════════════════════════════════════════════════════════
    # CLAUDE API
    # ═══════════════════════════════════════════════════════════
    "claude_api": {
        "title": "Claude API",
        "description": "Build custom AI applications with the Claude API.",
        "items": [
            {"name": "Messages API", "description": "Core API for sending messages and getting responses."},
            {"name": "Tool Use / Function Calling", "description": "Claude can call functions you define — the foundation of automations."},
            {"name": "Structured Outputs", "description": "Force Claude to return specific JSON schemas."},
            {"name": "Streaming", "description": "Get responses token-by-token for real-time UIs."},
            {"name": "Web Search", "description": "Claude searches the web and cites sources in responses."},
            {"name": "Computer Use (Beta)", "description": "Claude controls a computer — clicking, typing, navigating."},
            {"name": "Batch Processing", "description": "Process thousands of requests at 50% cost."},
            {"name": "Prompt Caching", "description": "Cache system prompts and documents for faster, cheaper API calls."},
            {"name": "Extended Thinking", "description": "Let Claude reason step-by-step for complex problems."},
            {"name": "Multi-modal Input", "description": "Send images, PDFs, and other files alongside text."},
            {"name": "Token Counting", "description": "Count tokens before sending to estimate cost."},
        ],
        "training_content": """## Claude API: Build Your Own AI Tools

### Quick Start (Python)

```bash
pip install anthropic
export ANTHROPIC_API_KEY=your-key
```

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.content[0].text)
```

### Tool Use: The Foundation of Automations

```python
tools = [{
    "name": "send_email",
    "description": "Send an email to a recipient",
    "input_schema": {
        "type": "object",
        "properties": {
            "to": {"type": "string"},
            "subject": {"type": "string"},
            "body": {"type": "string"},
        },
        "required": ["to", "subject", "body"],
    },
}]

response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=tools,
    messages=[{"role": "user", "content": "Email Sarah about the Q1 review meeting next Tuesday"}],
)

# Claude will call send_email with appropriate parameters
```

### Cost Optimization

- Use **Haiku** for classification/extraction ($0.80/M input)
- Use **Sonnet** for general tasks ($3/M input)
- Use **Opus** only for complex reasoning ($15/M input)
- Use **Batch API** for 50% cost reduction on non-urgent work
- Use **Prompt Caching** to avoid resending the same context
""",
    },

    # ═══════════════════════════════════════════════════════════
    # AGENT SDK
    # ═══════════════════════════════════════════════════════════
    "agent_sdk": {
        "title": "Claude Agent SDK",
        "description": "Build custom AI agents that can reason, use tools, and complete complex tasks.",
        "items": [
            {"name": "Python SDK", "description": "Build agents in Python with full tool access."},
            {"name": "TypeScript SDK", "description": "Build agents in TypeScript/Node.js."},
            {"name": "Agent Loop", "description": "Built-in loop: Claude reasons → calls tools → observes results → continues."},
            {"name": "Custom Tools", "description": "Define any tool — file access, web requests, database queries, API calls."},
            {"name": "File System Access", "description": "Agents can read and write files."},
            {"name": "Terminal Access", "description": "Agents can run shell commands."},
            {"name": "Web Access", "description": "Agents can fetch web pages and APIs."},
            {"name": "Multi-Agent", "description": "Orchestrate multiple agents working together."},
        ],
        "training_content": """## Agent SDK: Build Your Own AI Agents

### What's an Agent?

An agent is Claude + tools + a loop. Claude decides what to do, uses tools to do it, observes the results, and continues until the task is done.

### Quick Start

```python
from claude_agent import Agent, Tool

agent = Agent(model="claude-sonnet-4-6")

@agent.tool
def search_database(query: str) -> str:
    return db.search(query)

@agent.tool
def send_notification(message: str, channel: str) -> str:
    return slack.post(channel, message)

# The agent will autonomously decide which tools to use
result = agent.run("Find all overdue invoices and notify the finance team in Slack")
```

### Multi-Agent Example

```python
researcher = Agent(model="claude-sonnet-4-6", tools=[web_search, read_docs])
writer = Agent(model="claude-opus-4-6", tools=[create_document])

# Researcher gathers info, writer produces the output
research = researcher.run("Research our competitors' pricing pages")
report = writer.run(f"Write a competitive analysis based on: {research}")
```

### When to Use Agent SDK vs. Other Tools

| Need | Use |
|------|-----|
| Quick one-off task | Claude.ai |
| Coding tasks | Claude Code |
| No-code automation | Cowork |
| Custom business logic | Agent SDK |
| Simple API integration | Claude API + Tool Use |
""",
    },

    # ═══════════════════════════════════════════════════════════
    # ENTERPRISE FEATURES
    # ═══════════════════════════════════════════════════════════
    "enterprise": {
        "title": "Claude Enterprise & Team Features",
        "description": "Enterprise-grade features for teams and organizations.",
        "items": [
            {"name": "Team Plan", "description": "Shared workspace, admin controls, usage analytics."},
            {"name": "Enterprise Plan", "description": "SSO/SAML, audit logs, custom data retention, dedicated support."},
            {"name": "Admin Console", "description": "Manage users, permissions, and usage across the organization."},
            {"name": "Data Privacy", "description": "Your data is never used to train Claude models on Team/Enterprise plans."},
            {"name": "Custom System Prompts", "description": "Set organization-wide instructions and guardrails."},
            {"name": "Usage Analytics", "description": "Track token usage, costs, and adoption across teams."},
        ],
        "training_content": """## Claude for Teams & Enterprise

### Team Plan Features
- Shared project spaces
- Admin controls for user management
- Higher rate limits
- Your data is NOT used for training

### Enterprise Features
- SSO / SAML authentication
- Audit logs for compliance
- Custom data retention policies
- Dedicated account manager
- Custom integrations support

### Rolling Out Claude to Your Team
1. **Start with power users**: Identify 3-5 people who are already using AI tools
2. **Pick one workflow**: Choose a specific, measurable workflow to automate first
3. **Measure the impact**: Track time saved, quality improvements, and adoption
4. **Share wins**: Broadcast successes to drive organic adoption
5. **Expand gradually**: Add teams and use cases based on what's working
""",
    },
}


def get_all_capabilities() -> dict:
    """Get the full capabilities reference."""
    return CLAUDE_CAPABILITIES


def get_capability(key: str) -> dict:
    """Get a specific capability section."""
    return CLAUDE_CAPABILITIES.get(key, {})


def get_capability_list() -> list[tuple[str, str]]:
    """Get a list of (key, title) pairs for all capabilities."""
    return [(k, v["title"]) for k, v in CLAUDE_CAPABILITIES.items()]


def get_total_feature_count() -> int:
    """Count total features across all capabilities."""
    return sum(len(cap.get("items", [])) for cap in CLAUDE_CAPABILITIES.values())


def search_capabilities(query: str) -> list[dict]:
    """Search across all capabilities for matching items."""
    query_lower = query.lower()
    results = []

    for cap_key, cap in CLAUDE_CAPABILITIES.items():
        # Check top-level match
        if query_lower in cap["title"].lower() or query_lower in cap["description"].lower():
            results.append({
                "section": cap["title"],
                "name": cap["title"],
                "description": cap["description"],
                "type": "section",
                "key": cap_key,
            })

        # Check individual items
        for item in cap.get("items", []):
            if query_lower in item["name"].lower() or query_lower in item.get("description", "").lower():
                results.append({
                    "section": cap["title"],
                    "name": item["name"],
                    "description": item.get("description", ""),
                    "type": "feature",
                    "key": cap_key,
                })

    return results
