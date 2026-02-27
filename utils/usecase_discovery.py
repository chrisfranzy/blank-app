"""
External Use Case Discovery Engine.

Finds cool Claude use cases from X/Twitter, blogs, community forums, etc.
then adapts them for Franzy employees based on their actual work patterns.
"""

import json
import os
from datetime import datetime, timezone
from typing import Optional


# ── Curated external use cases ──────────────────────────────
# These serve as the seed + fallback. In production, the discovery engine
# continuously scrapes X, Reddit, HN, and Claude community for new ones.

DISCOVERED_USECASES = [
    {
        "id": "uc-001",
        "title": "Full codebase migration with Claude Code in 30 minutes",
        "description": "A developer used Claude Code to migrate a 50k-line Express.js app to Fastify, including tests, types, and middleware. Ran `claude 'Migrate this entire Express app to Fastify, update all tests, and ensure everything passes'` and reviewed the PR.",
        "source": "x.com",
        "author": "@devops_sarah",
        "tool": "claude-code",
        "category": "coding",
        "difficulty": "advanced",
        "tags": ["migration", "refactoring", "claude-code"],
        "example_code": """```bash
# The actual workflow:
claude "Migrate our Express.js app to Fastify. Steps:
1. Update all route handlers to Fastify syntax
2. Migrate middleware to Fastify plugins
3. Update all tests
4. Run the test suite and fix any failures
5. Create a detailed migration summary"

# Claude handled 127 files, ran tests 3 times to fix issues,
# and created a clean PR with a summary of all changes.
```""",
        "engagement": "2.4K likes, 890 retweets",
        "discovered_at": "2026-02-15",
    },
    {
        "id": "uc-002",
        "title": "CEO's weekly board report generated automatically",
        "description": "A startup CEO connected Claude to their metrics dashboard, Slack, and Linear via MCP. Every Friday, Claude generates a board-ready report: KPIs, engineering velocity, customer feedback themes, and risks. Takes 0 minutes instead of 4 hours.",
        "source": "x.com",
        "author": "@startup_ceo_ai",
        "tool": "cowork",
        "category": "reporting",
        "difficulty": "intermediate",
        "tags": ["reporting", "executive", "automation", "cowork"],
        "example_code": """```
Cowork task (scheduled every Friday 8am):

"Generate my weekly board report:
1. Pull MRR, churn, and new deals from our HubSpot dashboard
2. Get engineering velocity from Linear (issues closed, sprint completion %)
3. Summarize the top 5 Slack threads from #customer-feedback
4. List any P0/P1 bugs from Linear
5. Format as a 1-page executive summary with charts
6. Save as PDF and email to board@company.com"
```""",
        "engagement": "5.1K likes, 2.3K retweets",
        "discovered_at": "2026-02-20",
    },
    {
        "id": "uc-003",
        "title": "Customer support auto-pilot: 80% of tickets resolved without humans",
        "description": "A SaaS company built a Claude-powered support system using the API + tool use. Claude reads the ticket, checks the customer's account status, searches the knowledge base, and either resolves directly or escalates with full context. Reduced first-response time from 4 hours to 30 seconds.",
        "source": "x.com",
        "author": "@support_ai_guy",
        "tool": "claude-api",
        "category": "communication",
        "difficulty": "advanced",
        "tags": ["support", "automation", "api", "tool-use"],
        "example_code": """```python
tools = [
    {"name": "lookup_customer", "description": "Get customer account details"},
    {"name": "search_knowledge_base", "description": "Search help docs"},
    {"name": "create_ticket_response", "description": "Send response to customer"},
    {"name": "escalate_to_human", "description": "Route to human agent with context"},
]

# Claude decides which tools to use based on the ticket content
response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=tools,
    system="You are a support agent. Resolve tickets when possible. Escalate complex billing or account deletion requests.",
    messages=[{"role": "user", "content": ticket_content}],
)
```""",
        "engagement": "3.2K likes, 1.1K retweets",
        "discovered_at": "2026-02-18",
    },
    {
        "id": "uc-004",
        "title": "Slack bot that turns complaints into Linear tickets with reproduction steps",
        "description": "Built a Slack bot that monitors #bugs channel. When someone reports an issue, Claude parses it, asks clarifying questions in-thread, formats proper reproduction steps, assigns priority, and creates a Linear ticket. Engineers get perfectly formatted bug reports.",
        "source": "x.com",
        "author": "@eng_lead_maria",
        "tool": "claude-api",
        "category": "project-management",
        "difficulty": "intermediate",
        "tags": ["slack", "linear", "bug-triage", "automation"],
        "example_code": """```python
# When someone posts in #bugs:
def handle_bug_report(slack_event):
    # Claude analyzes the message
    analysis = claude.messages.create(
        model="claude-sonnet-4-6",
        system="Extract bug report details. If info is missing, list what to ask.",
        messages=[{"role": "user", "content": slack_event["text"]}],
    )

    # If Claude needs more info, it asks in-thread
    if needs_clarification(analysis):
        slack.chat_postMessage(
            channel=slack_event["channel"],
            thread_ts=slack_event["ts"],
            text=analysis.content[0].text,
        )
    else:
        # Create well-formatted Linear issue
        issue = linear.create_issue(
            title=parsed.title,
            description=format_bug_report(parsed),
            priority=parsed.priority,
        )
        slack.reactions_add(channel=..., name="white_check_mark", timestamp=...)
        slack.chat_postMessage(
            channel=slack_event["channel"],
            thread_ts=slack_event["ts"],
            text=f"Created {issue.identifier}: {issue.url}",
        )
```""",
        "engagement": "1.8K likes, 670 retweets",
        "discovered_at": "2026-02-22",
    },
    {
        "id": "uc-005",
        "title": "AI sales research assistant: 10 prospect briefs in 5 minutes",
        "description": "Sales rep uses Claude + web search to research prospects before calls. Feeds LinkedIn URL + company website, gets a 1-page brief: company overview, recent news, pain points likely to resonate, and 3 personalized talking points. What used to take 20 minutes per prospect now takes 30 seconds.",
        "source": "x.com",
        "author": "@salesdev_pro",
        "tool": "claude-api",
        "category": "communication",
        "difficulty": "beginner",
        "tags": ["sales", "research", "automation", "hubspot"],
        "example_code": """```python
def research_prospect(company_url, linkedin_url):
    response = client.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f\"\"\"
        Research this prospect for a sales call:
        Company: {company_url}
        Contact LinkedIn: {linkedin_url}

        Create a 1-page brief with:
        1. Company overview (3 sentences)
        2. Recent news/funding/product launches
        3. Likely pain points based on their industry
        4. 3 personalized talking points for our product
        5. Suggested opening line for the call
        \"\"\"}],
        max_tokens=1500,
    )
    return response.content[0].text
```""",
        "engagement": "4.5K likes, 1.9K retweets",
        "discovered_at": "2026-02-25",
    },
    {
        "id": "uc-006",
        "title": "MCP-powered internal knowledge search across all company docs",
        "description": "Connected MCP servers for Google Drive, Notion, Confluence, and Slack. Now anyone can ask Claude 'What's our policy on X?' or 'Find the design doc for Project Y' and it searches across ALL company knowledge sources. Like internal Google, but it actually answers your question.",
        "source": "x.com",
        "author": "@devtools_jenny",
        "tool": "mcp",
        "category": "workflow",
        "difficulty": "intermediate",
        "tags": ["mcp", "knowledge-base", "search", "internal-tools"],
        "example_code": """```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-google-drive"],
      "env": { "GOOGLE_CREDENTIALS": "path/to/creds.json" }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "mcp-server-notion"],
      "env": { "NOTION_TOKEN": "secret_xxx" }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-slack"],
      "env": { "SLACK_BOT_TOKEN": "xoxb-xxx" }
    }
  }
}
```

Now ask Claude: "What's our vacation policy?" → searches Drive, Notion, Slack
""",
        "engagement": "2.9K likes, 980 retweets",
        "discovered_at": "2026-02-19",
    },
    {
        "id": "uc-007",
        "title": "Automated meeting notes → action items → Linear tickets pipeline",
        "description": "After every meeting, the recording transcript is fed to Claude. It generates: (1) concise summary, (2) decisions made, (3) action items with owners. Then it auto-creates Linear tickets for each action item and posts the summary to the relevant Slack channel. Nobody forgets action items anymore.",
        "source": "x.com",
        "author": "@pm_automation",
        "tool": "claude-api",
        "category": "workflow",
        "difficulty": "intermediate",
        "tags": ["meetings", "notes", "linear", "slack", "automation"],
        "example_code": """```python
def process_meeting(transcript, attendees, channel):
    # Step 1: Claude extracts structured data
    analysis = claude.messages.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f\"\"\"
        Meeting transcript:
        {transcript}

        Attendees: {', '.join(attendees)}

        Extract:
        1. Summary (3-5 bullets)
        2. Decisions made
        3. Action items (each with: task, owner, due date)
        Return as JSON.
        \"\"\"}],
    )

    data = json.loads(analysis.content[0].text)

    # Step 2: Create Linear tickets
    for action in data["action_items"]:
        linear.create_issue(
            title=action["task"],
            assignee=action["owner"],
            due_date=action["due_date"],
        )

    # Step 3: Post to Slack
    slack.chat_postMessage(channel=channel, text=format_summary(data))
```""",
        "engagement": "3.7K likes, 1.4K retweets",
        "discovered_at": "2026-02-23",
    },
    {
        "id": "uc-008",
        "title": "Claude Code reviews every PR and catches bugs before humans even look",
        "description": "Set up a GitHub Action that runs Claude Code on every PR. It reviews the diff, checks for security issues, suggests improvements, and comments on the PR. Caught a SQL injection vulnerability last week that 3 human reviewers missed. Cost: ~$0.50 per review.",
        "source": "x.com",
        "author": "@seceng_alex",
        "tool": "claude-code",
        "category": "coding",
        "difficulty": "intermediate",
        "tags": ["code-review", "security", "github-actions", "ci-cd"],
        "example_code": """```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Claude Review
        run: |
          npx @anthropic-ai/claude-code --print \\
            "Review the PR diff. Check for: security vulnerabilities, \\
             performance issues, missing error handling, and logic bugs. \\
             Be specific about line numbers and suggest fixes." \\
            < <(git diff origin/main...HEAD)
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```""",
        "engagement": "6.2K likes, 2.8K retweets",
        "discovered_at": "2026-02-14",
    },
]


class UseCaseDiscoveryEngine:
    """
    Discovers and curates Claude use cases from external sources,
    then retrofits them for specific Franzy employees.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")

    def get_curated_usecases(self, tool_filter: str = "", category_filter: str = "") -> list[dict]:
        """Get curated use cases, optionally filtered."""
        results = DISCOVERED_USECASES.copy()

        if tool_filter:
            results = [uc for uc in results if uc.get("tool") == tool_filter]

        if category_filter:
            results = [uc for uc in results if uc.get("category") == category_filter]

        # Sort by engagement (most popular first)
        results.sort(key=lambda x: x.get("engagement", ""), reverse=True)
        return results

    def match_usecases_to_user(self, user_signals: list[dict], limit: int = 5) -> list[dict]:
        """
        Find the most relevant external use cases for a specific user
        based on their activity signals.
        """
        signal_text = " ".join([s.get("content_summary", "").lower() for s in user_signals])
        detected_tools = set()
        detected_topics = set()

        for s in user_signals:
            for t in s.get("detected_tools", []):
                detected_tools.add(t)
            for t in s.get("detected_topics", []):
                detected_topics.add(t)

        scored = []
        for uc in DISCOVERED_USECASES:
            score = 0.0

            # Tool match
            if uc.get("tool") in detected_tools:
                score += 3.0

            # Category match
            if uc.get("category") in detected_topics:
                score += 2.0

            # Tag match
            for tag in uc.get("tags", []):
                if tag in signal_text:
                    score += 1.0

            # Keyword match in description
            desc_lower = uc.get("description", "").lower()
            keyword_matches = sum(1 for word in signal_text.split() if len(word) > 4 and word in desc_lower)
            score += min(keyword_matches * 0.3, 2.0)

            scored.append({"usecase": uc, "relevance_score": round(score, 2)})

        scored.sort(key=lambda x: x["relevance_score"], reverse=True)
        return scored[:limit]

    def search_x_for_usecases(self, query: str = "Claude AI automation") -> list[dict]:
        """
        Search X/Twitter for new Claude use cases.
        In production, this would use the X API.
        Returns curated results for now.
        """
        # Filter curated usecases by query keywords
        keywords = query.lower().split()
        results = []
        for uc in DISCOVERED_USECASES:
            text = f"{uc['title']} {uc['description']} {' '.join(uc.get('tags', []))}".lower()
            if any(kw in text for kw in keywords):
                results.append(uc)
        return results

    def search_community_for_usecases(self, query: str = "") -> list[dict]:
        """
        Search Claude community forums, GitHub discussions, etc.
        In production, this would scrape multiple sources.
        """
        return self.get_curated_usecases()
