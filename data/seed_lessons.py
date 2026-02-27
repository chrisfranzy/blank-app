"""
Seed data: built-in lessons covering the Claude tools ecosystem.
These form the base knowledge that gets personalized per user.
"""

SEED_LESSONS = [
    # ── Claude Code ──────────────────────────────────────────
    {
        "title": "Getting Started with Claude Code CLI",
        "summary": "Install and configure the Claude Code command-line tool to get AI-assisted coding directly in your terminal.",
        "content_markdown": """## What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings Claude directly into your terminal. It can read your codebase, edit files, run commands, and handle complex multi-step engineering tasks autonomously.

## Quick Start

```bash
# Install globally
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-project

# Start Claude Code
claude
```

## Key Capabilities

- **Codebase understanding**: Claude reads and understands your entire project structure
- **File editing**: Directly creates and modifies files with surgical precision
- **Command execution**: Runs tests, builds, linters, and any shell commands
- **Git operations**: Commits, creates branches, opens PRs
- **Multi-step tasks**: Handles complex refactors that touch many files

## Practical Example: Bug Fix Workflow

```
> claude "Fix the failing test in auth.test.js - it's timing out on the login flow"
```

Claude will:
1. Read the test file and related source code
2. Identify the root cause
3. Fix the code
4. Run the test to verify
5. Optionally commit the fix

## Tips for Your Team

- Use `CLAUDE.md` files in your repo root to give Claude project-specific context
- Run `claude --help` to see all available flags
- Use `/compact` to manage long conversations
- Pair it with your existing code review process
""",
        "tool_name": "claude-code",
        "category": "coding",
        "difficulty": "beginner",
        "tags": ["claude-code", "cli", "getting-started", "developer-tools"],
    },
    {
        "title": "Automating Code Reviews with Claude Code",
        "summary": "Use Claude Code to automate PR reviews, catch bugs early, and maintain code quality standards.",
        "content_markdown": """## Why Automate Code Reviews?

Code reviews are essential but time-consuming. Claude Code can act as a first-pass reviewer, catching issues before human review.

## Setting Up Automated PR Review

### Option 1: GitHub Actions Integration

Create `.github/workflows/claude-review.yml`:

```yaml
name: Claude Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Run Claude Review
        run: |
          npx @anthropic-ai/claude-code \\
            "Review this PR. Check for bugs, security issues, and style problems. \\
             Focus on the diff between ${{ github.event.pull_request.base.sha }} and HEAD"
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Option 2: Manual Review Command

```bash
claude "Review the changes in my current branch compared to main. \\
        Flag any security issues, performance problems, or violations of our coding standards."
```

## What Claude Catches

- Security vulnerabilities (injection, XSS, auth issues)
- Performance anti-patterns
- Missing error handling
- Code style inconsistencies
- Logic errors and edge cases

## Team Workflow

1. Developer opens PR
2. Claude Code runs automated review
3. Developer addresses Claude's feedback
4. Human reviewer does final approval
5. Merge with confidence
""",
        "tool_name": "claude-code",
        "category": "automation",
        "difficulty": "intermediate",
        "tags": ["claude-code", "code-review", "automation", "github", "ci-cd"],
    },
    {
        "title": "Using CLAUDE.md for Project Context",
        "summary": "Configure CLAUDE.md files to give Claude Code persistent project-specific knowledge.",
        "content_markdown": """## What is CLAUDE.md?

`CLAUDE.md` is a special file that Claude Code reads automatically when you start a session. It gives Claude persistent context about your project — coding standards, architecture decisions, common commands, and team conventions.

## Where to Place It

- **Repo root**: `./CLAUDE.md` — applies to the whole project
- **Subdirectories**: `./src/CLAUDE.md` — applies when working in that directory
- **Home directory**: `~/.claude/CLAUDE.md` — applies to all your projects

## Example CLAUDE.md

```markdown
# Project: Acme Dashboard

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Python FastAPI
- Database: PostgreSQL with SQLAlchemy ORM
- Testing: pytest (backend), vitest (frontend)

## Commands
- Run all tests: `make test`
- Run backend only: `cd api && pytest`
- Run frontend dev: `cd web && npm run dev`
- Lint: `make lint`

## Conventions
- Use snake_case for Python, camelCase for TypeScript
- All API endpoints return {data, error, meta} shape
- Database migrations go in api/migrations/
- Never commit .env files

## Architecture Notes
- Auth uses JWT tokens stored in httpOnly cookies
- Background jobs run via Celery + Redis
- File uploads go to S3 via presigned URLs
```

## Tips

- Keep it concise — Claude reads it every session
- Update it as your project evolves
- Include the commands your team actually runs
- Document non-obvious architecture decisions
""",
        "tool_name": "claude-code",
        "category": "workflow",
        "difficulty": "beginner",
        "tags": ["claude-code", "configuration", "project-setup", "best-practices"],
    },
    # ── MCP (Model Context Protocol) ─────────────────────────
    {
        "title": "Introduction to MCP Servers",
        "summary": "Connect Claude to your tools and data sources using the Model Context Protocol (MCP).",
        "content_markdown": """## What is MCP?

The Model Context Protocol (MCP) is an open standard that lets Claude connect to external tools and data sources. Think of it as plugins for Claude — each MCP server exposes specific capabilities that Claude can use.

## How It Works

```
Your App  <-->  Claude  <-->  MCP Server  <-->  External Tool
                                |
                                ├── Slack MCP Server → Slack API
                                ├── GitHub MCP Server → GitHub API
                                ├── Database MCP Server → Your DB
                                └── Custom MCP Server → Anything
```

## Setting Up MCP in Claude Desktop

Edit your Claude Desktop config (`~/.claude/settings.json` or the app settings):

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your-token"
      }
    }
  }
}
```

## Popular MCP Servers

| Server | What It Does |
|--------|-------------|
| Slack | Read/send messages, search channels |
| GitHub | Manage repos, PRs, issues |
| Google Drive | Search and read documents |
| PostgreSQL | Query your database safely |
| Filesystem | Read/write local files |
| Puppeteer | Browse and interact with websites |

## Building Your Own MCP Server

```python
from mcp.server import Server
from mcp.types import Tool

server = Server("my-tool")

@server.tool("search_docs")
async def search_docs(query: str) -> str:
    # Your custom logic here
    results = your_search_function(query)
    return format_results(results)
```

## When to Use MCP vs. Direct API Calls

- **Use MCP** when you want Claude to autonomously decide when to use a tool
- **Use direct API calls** when you need programmatic control over exactly when tools are called
""",
        "tool_name": "mcp",
        "category": "automation",
        "difficulty": "intermediate",
        "tags": ["mcp", "integrations", "model-context-protocol", "automation"],
    },
    # ── Claude API & Tool Use ────────────────────────────────
    {
        "title": "Building Automations with the Claude API",
        "summary": "Use the Claude API with tool use to build custom automations for your team's workflows.",
        "content_markdown": """## Claude API + Tool Use

The Claude API lets you build custom AI-powered automations. With tool use (function calling), Claude can interact with your systems programmatically.

## Basic Setup

```python
import anthropic

client = anthropic.Anthropic()  # uses ANTHROPIC_API_KEY env var

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Summarize our Q4 metrics"}],
)
print(response.content[0].text)
```

## Tool Use Example: Auto-Triage Support Tickets

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "assign_ticket",
        "description": "Assign a support ticket to a team member",
        "input_schema": {
            "type": "object",
            "properties": {
                "ticket_id": {"type": "string"},
                "assignee": {"type": "string"},
                "priority": {"type": "string", "enum": ["low", "medium", "high", "critical"]},
                "category": {"type": "string"},
            },
            "required": ["ticket_id", "assignee", "priority"],
        },
    }
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{
        "role": "user",
        "content": "New ticket #4521: 'Cannot login after password reset'. Triage this."
    }],
)

# Claude will call assign_ticket with appropriate values
for block in response.content:
    if block.type == "tool_use":
        print(f"Action: {block.name}({block.input})")
```

## Real-World Automation Ideas

1. **Meeting note processor**: Transcribe → summarize → create Linear tickets → post to Slack
2. **Email auto-responder**: Classify incoming emails → draft responses → route to right team
3. **Report generator**: Pull data from HubSpot → analyze trends → generate weekly report
4. **Onboarding assistant**: New hire detected → create accounts → send welcome messages → schedule training

## Best Practices

- Always set `max_tokens` appropriately
- Use `claude-sonnet-4-6` for most automations (fast + capable)
- Use `claude-opus-4-6` for complex reasoning tasks
- Implement proper error handling and retries
- Log all tool calls for auditability
""",
        "tool_name": "claude-api",
        "category": "automation",
        "difficulty": "intermediate",
        "tags": ["api", "tool-use", "automation", "python", "development"],
    },
    # ── Workflow Automation ──────────────────────────────────
    {
        "title": "Automating Slack Workflows with Claude",
        "summary": "Build intelligent Slack bots and workflows powered by Claude to automate team communication.",
        "content_markdown": """## Why Automate Slack with Claude?

Your team spends hours in Slack answering the same questions, routing requests, and summarizing threads. Claude can handle this automatically.

## Quick Wins

### 1. Auto-Answer Common Questions

Set up a Slack bot that monitors channels and answers FAQs:

```python
from slack_sdk import WebClient
from slack_sdk.socket_mode import SocketModeClient
import anthropic

slack = WebClient(token="xoxb-your-bot-token")
claude = anthropic.Anthropic()

def handle_message(event):
    # Only respond to questions in #help channel
    if event.get("channel") != "C_HELP_CHANNEL_ID":
        return

    response = claude.messages.create(
        model="claude-sonnet-4-6",
        system="You are a helpful team assistant. Answer based on our docs. If unsure, say so.",
        messages=[{"role": "user", "content": event["text"]}],
        max_tokens=500,
    )

    slack.chat_postMessage(
        channel=event["channel"],
        thread_ts=event["ts"],  # Reply in thread
        text=response.content[0].text,
    )
```

### 2. Summarize Long Threads

```python
def summarize_thread(channel_id, thread_ts):
    replies = slack.conversations_replies(channel=channel_id, ts=thread_ts)
    thread_text = "\\n".join([f"{m.get('user','?')}: {m['text']}" for m in replies["messages"]])

    summary = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f"Summarize this Slack thread concisely:\\n\\n{thread_text}"}],
        max_tokens=300,
    )
    return summary.content[0].text
```

### 3. Route Requests to the Right Team

Claude can read a message and determine which team should handle it, then post to the right channel or tag the right people.

## Implementation Tips

- Start with one channel, expand gradually
- Always respond in threads to keep channels clean
- Add a reaction (like :robot_face:) so people know it's automated
- Include a "Was this helpful?" reaction for feedback
- Log everything for improvement
""",
        "tool_name": "claude-api",
        "category": "communication",
        "difficulty": "intermediate",
        "tags": ["slack", "automation", "bot", "communication", "workflow"],
    },
    {
        "title": "Connecting HubSpot to Claude for Sales Automation",
        "summary": "Use Claude to automate CRM tasks: enrich contacts, draft follow-ups, and generate reports from HubSpot data.",
        "content_markdown": """## HubSpot + Claude

Your CRM is full of data that Claude can help you act on. Instead of manually writing follow-up emails, researching contacts, or building reports — let Claude do it.

## Use Cases

### 1. Auto-Draft Follow-Up Emails

```python
import hubspot
from anthropic import Anthropic

hs = hubspot.Client.create(access_token="your-token")
claude = Anthropic()

def draft_followup(contact_id):
    # Get contact details from HubSpot
    contact = hs.crm.contacts.basic_api.get_by_id(contact_id, properties=["firstname", "lastname", "company", "notes_last_contacted"])

    prompt = f\"\"\"Draft a follow-up email for:
    Name: {contact.properties['firstname']} {contact.properties['lastname']}
    Company: {contact.properties.get('company', 'Unknown')}
    Last interaction: {contact.properties.get('notes_last_contacted', 'No notes')}

    Keep it brief, professional, and personalized.\"\"\"

    response = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
    )
    return response.content[0].text
```

### 2. Weekly Pipeline Report

```python
def generate_pipeline_report():
    deals = hs.crm.deals.get_all(properties=["dealname", "amount", "dealstage", "closedate"])
    deals_text = "\\n".join([f"- {d.properties['dealname']}: ${d.properties.get('amount','?')} ({d.properties['dealstage']})" for d in deals])

    report = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f"Generate a concise weekly sales pipeline report from this data:\\n\\n{deals_text}"}],
        max_tokens=1000,
    )
    return report.content[0].text
```

### 3. Contact Enrichment

Feed Claude a contact's website, LinkedIn summary, or recent news to auto-fill CRM fields and suggest talking points.

## Getting Started

1. Create a HubSpot private app with the scopes you need
2. Store the access token securely (use environment variables)
3. Start with read-only operations, then add write capabilities
4. Test with a sandbox HubSpot account first
""",
        "tool_name": "hubspot",
        "category": "automation",
        "difficulty": "intermediate",
        "tags": ["hubspot", "crm", "sales", "automation", "email"],
    },
    {
        "title": "Managing Linear Issues with Claude",
        "summary": "Automate project management by using Claude to create, triage, and update Linear issues from natural language.",
        "content_markdown": """## Linear + Claude

Linear is where your engineering work lives. Claude can help you manage it more efficiently — creating issues from Slack threads, auto-triaging bugs, and keeping the board up to date.

## Setup

```python
import requests

LINEAR_API_KEY = "lin_api_your_key"
HEADERS = {
    "Authorization": LINEAR_API_KEY,
    "Content-Type": "application/json",
}

def linear_query(query, variables=None):
    response = requests.post(
        "https://api.linear.app/graphql",
        json={"query": query, "variables": variables or {}},
        headers=HEADERS,
    )
    return response.json()
```

## Use Cases

### 1. Create Issues from Natural Language

```python
def create_issue_from_text(text):
    # Use Claude to parse natural language into structured issue
    parsed = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f\"\"\"Parse this into a Linear issue:
        "{text}"

        Return JSON with: title, description, priority (1-4), labels[]\"\"\"}],
        max_tokens=500,
    )
    issue_data = json.loads(parsed.content[0].text)

    mutation = \"\"\"
    mutation CreateIssue($input: IssueCreateInput!) {
        issueCreate(input: $input) {
            issue { id identifier title }
        }
    }\"\"\"

    return linear_query(mutation, {"input": {
        "title": issue_data["title"],
        "description": issue_data["description"],
        "teamId": "YOUR_TEAM_ID",
        "priority": issue_data["priority"],
    }})
```

### 2. Slack → Linear Pipeline

When someone reports a bug in Slack, Claude can:
1. Parse the message for reproduction steps
2. Determine priority and affected area
3. Create a well-formatted Linear issue
4. Reply in Slack with the issue link

### 3. Sprint Summary Generator

Pull all completed issues from a sprint and have Claude generate a summary for stakeholders.

## Tips

- Use Linear's webhooks to trigger Claude-powered automations
- Start with issue creation, then expand to updates and queries
- Always include the source link (Slack message, email, etc.) in issue descriptions
""",
        "tool_name": "linear",
        "category": "project-management",
        "difficulty": "intermediate",
        "tags": ["linear", "project-management", "automation", "engineering"],
    },
    {
        "title": "Email Automation with Claude",
        "summary": "Use Claude to classify, summarize, draft responses, and automate email workflows via Gmail API.",
        "content_markdown": """## Email + Claude

Email is a massive time sink. Claude can help you process, classify, and respond to emails faster.

## Setup: Gmail API

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_gmail_service(credentials_path):
    creds = Credentials.from_authorized_user_file(credentials_path)
    return build('gmail', 'v1', credentials=creds)
```

## Use Cases

### 1. Email Classification & Routing

```python
def classify_email(subject, body, sender):
    response = claude.messages.create(
        model="claude-haiku-4-5-20251001",  # Fast + cheap for classification
        messages=[{"role": "user", "content": f\"\"\"Classify this email:
        From: {sender}
        Subject: {subject}
        Body: {body[:500]}

        Categories: [urgent-action, follow-up-needed, informational, spam, meeting-request]
        Also return: suggested_responder (sales, engineering, support, exec)

        Return JSON only.\"\"\"}],
        max_tokens=200,
    )
    return json.loads(response.content[0].text)
```

### 2. Daily Email Digest

Instead of reading 50 emails, get a 2-minute summary:

```python
def generate_email_digest(emails):
    email_text = "\\n---\\n".join([
        f"From: {e['from']}\\nSubject: {e['subject']}\\nPreview: {e['snippet']}"
        for e in emails
    ])

    digest = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f\"\"\"Create a brief morning email digest from these {len(emails)} emails.
        Group by: Action Required, FYI, Can Wait.
        Be concise.

        {email_text}\"\"\"}],
        max_tokens=1000,
    )
    return digest.content[0].text
```

### 3. Smart Draft Responses

Claude drafts a response based on the email content and your previous communication style.

## Privacy & Security

- Process email summaries, not full content when possible
- Never store raw email content in logs
- Use OAuth2 with minimal scopes
- Let users review drafts before sending
""",
        "tool_name": "gmail",
        "category": "communication",
        "difficulty": "intermediate",
        "tags": ["email", "gmail", "automation", "communication", "productivity"],
    },
    {
        "title": "Building a Multi-Tool Workflow: Slack → Linear → HubSpot",
        "summary": "Chain multiple integrations together to create end-to-end automated workflows powered by Claude.",
        "content_markdown": """## The Power of Chaining Tools

The real magic happens when you connect multiple tools together. Here's a complete workflow example:

**Scenario**: A customer reports an issue in your shared Slack channel.

## The Automated Flow

```
Customer posts in Slack
        ↓
Claude reads & classifies the message
        ↓
   ┌────┴────┐
   ↓         ↓
Creates    Updates
Linear     HubSpot
issue      contact
   ↓         ↓
Tags the   Logs the
right eng  interaction
   ↓
Posts back to Slack
with issue link
```

## Implementation

```python
class WorkflowOrchestrator:
    def __init__(self):
        self.claude = anthropic.Anthropic()
        self.slack = WebClient(token=SLACK_TOKEN)
        self.linear = LinearClient(LINEAR_API_KEY)
        self.hubspot = hubspot.Client.create(access_token=HS_TOKEN)

    def handle_customer_message(self, slack_event):
        message = slack_event["text"]
        channel = slack_event["channel"]
        user = slack_event["user"]

        # Step 1: Claude analyzes the message
        analysis = self.claude.messages.create(
            model="claude-sonnet-4-6",
            messages=[{"role": "user", "content": f\"\"\"Analyze this customer message:
            "{message}"

            Return JSON:
            - is_issue: bool
            - priority: 1-4
            - category: bug|feature-request|question|feedback
            - summary: one-line summary
            - customer_sentiment: positive|neutral|negative
            \"\"\"}],
            max_tokens=300,
        )
        analysis_data = json.loads(analysis.content[0].text)

        if not analysis_data["is_issue"]:
            return

        # Step 2: Create Linear issue
        issue = self.linear.create_issue(
            title=analysis_data["summary"],
            description=f"Reported by customer in Slack\\n\\nOriginal message:\\n> {message}",
            priority=analysis_data["priority"],
        )

        # Step 3: Update HubSpot contact
        self.hubspot.log_interaction(
            channel="slack",
            summary=analysis_data["summary"],
            sentiment=analysis_data["customer_sentiment"],
        )

        # Step 4: Reply in Slack
        self.slack.chat_postMessage(
            channel=channel,
            thread_ts=slack_event["ts"],
            text=f"Tracked as {issue.identifier}. Our team will look into this.",
        )
```

## Building Your Own Workflows

1. **Map the manual process** you do today
2. **Identify the decision points** — these become Claude prompts
3. **Connect the APIs** for each tool involved
4. **Add error handling** and fallbacks
5. **Start with notifications**, then add auto-actions
6. **Get team feedback** and iterate
""",
        "tool_name": "workflow",
        "category": "automation",
        "difficulty": "advanced",
        "tags": ["workflow", "multi-tool", "automation", "slack", "linear", "hubspot", "advanced"],
    },
    # ── Prompt Engineering & Best Practices ──────────────────
    {
        "title": "Prompt Engineering for Team Automations",
        "summary": "Write effective prompts that produce reliable, consistent results for automated workflows.",
        "content_markdown": """## Why Prompt Engineering Matters for Automations

When Claude is running in an automation (no human in the loop), your prompts need to be more precise than in a conversation. Bad prompts → unreliable automations → broken trust.

## Key Principles

### 1. Be Explicit About Output Format

```
Bad:  "Summarize this email"
Good: "Summarize this email in exactly 2-3 bullet points. Each bullet should start
       with an action verb. Return only the bullets, no preamble."
```

### 2. Use System Prompts for Role & Constraints

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    system=\"\"\"You are an email classifier for Acme Corp.
    Rules:
    - Always return valid JSON
    - Categories: [sales, support, billing, spam, internal]
    - Confidence must be 0.0-1.0
    - If confidence < 0.7, set needs_human_review: true\"\"\",
    messages=[{"role": "user", "content": email_text}],
)
```

### 3. Include Examples (Few-Shot)

```python
system_prompt = \"\"\"Classify support tickets. Examples:

Input: "App crashes when I upload a PDF"
Output: {"category": "bug", "priority": "high", "component": "upload"}

Input: "Can you add dark mode?"
Output: {"category": "feature-request", "priority": "low", "component": "ui"}

Now classify the following ticket:\"\"\"
```

### 4. Handle Edge Cases

Always tell Claude what to do when:
- Input is empty or malformed
- The task is ambiguous
- It's not confident in the answer
- The input is in a different language

### 5. Test with Real Data

- Collect 20+ real examples from your actual workflow
- Run them through your prompt
- Check for consistency and correctness
- Iterate on failures
""",
        "tool_name": "general",
        "category": "best-practices",
        "difficulty": "beginner",
        "tags": ["prompt-engineering", "best-practices", "automation", "reliability"],
    },
    {
        "title": "Security Best Practices for Claude Integrations",
        "summary": "Keep your Claude-powered automations secure: API key management, data handling, and access controls.",
        "content_markdown": """## Security Matters

When you connect Claude to your team's tools, you're giving it access to sensitive data. Here's how to keep things secure.

## API Key Management

### Do This

```python
import os

# Load from environment variables
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
SLACK_TOKEN = os.environ["SLACK_BOT_TOKEN"]

# Or use a secrets manager
from your_secrets_lib import get_secret
api_key = get_secret("anthropic-api-key")
```

### Never Do This

```python
# NEVER hardcode API keys
client = anthropic.Anthropic(api_key="sk-ant-abc123...")  # NO!

# NEVER commit .env files
# Add to .gitignore: .env, *.key, credentials.json
```

## Data Handling

1. **Minimize data sent to Claude**: Send summaries, not full databases
2. **Redact PII before processing**: Strip SSNs, credit cards, passwords
3. **Don't log Claude's responses** if they might contain sensitive data
4. **Use Claude's built-in safety**: It will refuse harmful requests

## Access Controls

- **Principle of least privilege**: Each integration should have minimal permissions
- **Separate tokens per environment**: Dev, staging, production
- **Rotate keys regularly**: Set calendar reminders
- **Audit logs**: Track every automated action for accountability

## Slack Bot Security

- Limit bot to specific channels, not workspace-wide
- Use Socket Mode instead of public webhooks when possible
- Don't let the bot post to channels it doesn't need access to

## Rate Limiting

```python
import time
from anthropic import RateLimitError

def call_claude_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(
                model="claude-sonnet-4-6",
                messages=messages,
                max_tokens=1000,
            )
        except RateLimitError:
            wait_time = 2 ** attempt
            time.sleep(wait_time)
    raise Exception("Max retries exceeded")
```
""",
        "tool_name": "general",
        "category": "best-practices",
        "difficulty": "beginner",
        "tags": ["security", "best-practices", "api-keys", "data-handling"],
    },
]
