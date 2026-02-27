"""
AI Lesson Generator: Creates custom, personalized lessons for each user
based on their actual activity signals from Slack, Email, HubSpot, Linear, etc.

This is the core differentiator — not static docs, but lessons built from
what each person is *actually doing* and *actually struggling with*.
"""

import json
import os
from datetime import datetime, timezone
from typing import Optional


# ── Prompt Templates ────────────────────────────────────────

ANALYZE_SIGNALS_PROMPT = """You are an AI training specialist at a company called Franzy. Your job is to analyze
what an employee is actually doing across their work tools and identify the best opportunities
to teach them Claude AI tools that would save them time.

Here is the employee's profile:
- Name: {user_name}
- Team: {user_team}
- Role: {user_role}
- Lessons already completed: {completed_lessons}

Here are their recent activity signals from connected platforms:
{activity_signals}

Based on this data, identify the TOP 3 most impactful things this person could automate
or improve using Claude tools. For each opportunity:

1. What they're currently doing manually
2. Which Claude tool would help (Claude Code, Cowork, MCP, Claude API, Connectors)
3. How much time it would likely save them per week
4. A specific, actionable title for a lesson

Return JSON array:
[
  {{
    "manual_task": "what they do now",
    "claude_tool": "which tool helps",
    "time_saved": "estimated weekly time saved",
    "lesson_title": "actionable lesson title",
    "priority": "high|medium|low",
    "category": "automation|workflow|coding|communication|reporting|project-management"
  }}
]

Return ONLY the JSON array, no other text."""

GENERATE_LESSON_PROMPT = """You are an expert AI trainer at Franzy. Write a personalized, practical training lesson
for a specific employee. This is NOT generic documentation — it's built specifically for their workflow.

**Employee context:**
- Name: {user_name}
- Team: {user_team}
- What they're currently doing: {manual_task}
- Signals from their work tools: {relevant_signals}

**Lesson to write:**
- Title: {lesson_title}
- Claude tool: {claude_tool}
- Category: {category}

**Requirements:**
1. Start with "Why this matters for you" — reference their SPECIFIC situation
2. Show a step-by-step implementation they can follow TODAY
3. Include real code/config examples they can copy-paste
4. End with "Quick wins" — things they can do in the next 15 minutes
5. Keep it practical, not theoretical. They're busy.
6. Use Markdown formatting with headers, code blocks, and bullet points
7. Reference their actual tools and workflows where possible

Write the full lesson content in Markdown:"""

RETROFIT_USECASE_PROMPT = """You are an AI training specialist at Franzy. You've found an impressive Claude AI use case
from the community. Your job is to adapt it specifically for a Franzy employee based on their
profile and what they actually do at work.

**Original use case from the community:**
{original_usecase}

**Employee to adapt this for:**
- Name: {user_name}
- Team: {user_team}
- Their recent activity and tools: {user_context}
- What they've been asking about: {user_questions}

**Write an adapted lesson that:**
1. Explains the original use case briefly
2. Shows EXACTLY how this employee could implement a similar workflow for their specific job
3. Adapts all examples to use their actual tools (Slack channels, HubSpot pipelines, Linear projects, etc.)
4. Includes copy-paste-ready code/config
5. Starts with a hook: "Someone in the Claude community built X. Here's how you can do the same thing for [their specific workflow]."

Write the adapted lesson in Markdown:"""


class LessonGenerator:
    """Generates personalized lessons using Claude API based on real user activity."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")

    @property
    def client(self):
        import anthropic
        return anthropic.Anthropic(api_key=self.api_key)

    def _call_claude(self, prompt: str, max_tokens: int = 4000) -> str:
        """Call Claude API with the given prompt."""
        response = self.client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=max_tokens,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text

    def analyze_user_signals(self, user_profile: dict, signals: list[dict]) -> list[dict]:
        """
        Analyze a user's activity signals and identify lesson opportunities.
        Returns structured lesson suggestions.
        """
        if not self.api_key:
            return self._fallback_analysis(user_profile, signals)

        signals_text = "\n".join([
            f"- [{s.get('platform', '?')}] ({s.get('signal_type', '?')}): {s.get('content_summary', '')}"
            for s in signals[:30]  # Limit to avoid token overflow
        ])

        prompt = ANALYZE_SIGNALS_PROMPT.format(
            user_name=user_profile.get("name", "Employee"),
            user_team=user_profile.get("team", "Unknown"),
            user_role=user_profile.get("role", "member"),
            completed_lessons=", ".join(user_profile.get("completed_lesson_titles", [])) or "None yet",
            activity_signals=signals_text,
        )

        try:
            result = self._call_claude(prompt, max_tokens=1500)
            # Extract JSON from response
            start = result.find("[")
            end = result.rfind("]") + 1
            if start >= 0 and end > start:
                return json.loads(result[start:end])
        except Exception as e:
            pass

        return self._fallback_analysis(user_profile, signals)

    def generate_custom_lesson(
        self,
        user_profile: dict,
        lesson_title: str,
        claude_tool: str,
        manual_task: str,
        relevant_signals: list[dict],
        category: str = "automation",
    ) -> dict:
        """
        Generate a full, personalized lesson for a specific user.
        Returns a lesson dict ready to save to the database.
        """
        signals_text = "\n".join([
            f"- {s.get('content_summary', '')}"
            for s in relevant_signals[:10]
        ])

        if self.api_key:
            prompt = GENERATE_LESSON_PROMPT.format(
                user_name=user_profile.get("name", "Employee"),
                user_team=user_profile.get("team", "Unknown"),
                manual_task=manual_task,
                relevant_signals=signals_text or "No specific signals available",
                lesson_title=lesson_title,
                claude_tool=claude_tool,
                category=category,
            )

            try:
                content = self._call_claude(prompt, max_tokens=4000)
            except Exception:
                content = self._fallback_lesson_content(lesson_title, claude_tool, manual_task, user_profile)
        else:
            content = self._fallback_lesson_content(lesson_title, claude_tool, manual_task, user_profile)

        return {
            "title": lesson_title,
            "summary": f"Custom lesson for {user_profile.get('name', 'you')}: {manual_task[:150]}",
            "content_markdown": content,
            "tool_name": claude_tool,
            "category": category,
            "difficulty": "intermediate",
            "source": "ai-generated",
            "is_shared": False,
            "is_published": True,
            "relevance_score": 0.95,
        }

    def retrofit_external_usecase(
        self,
        original_usecase: dict,
        user_profile: dict,
        user_signals: list[dict],
    ) -> dict:
        """
        Take an external use case and adapt it specifically for a Franzy employee.
        """
        user_context = "\n".join([
            f"- {s.get('content_summary', '')}"
            for s in user_signals[:10]
        ])

        user_questions = "\n".join([
            f"- {s.get('content_summary', '')}"
            for s in user_signals if s.get("signal_type") == "asked_about"
        ][:5]) or "No specific questions detected"

        if self.api_key:
            prompt = RETROFIT_USECASE_PROMPT.format(
                original_usecase=json.dumps(original_usecase, indent=2),
                user_name=user_profile.get("name", "Employee"),
                user_team=user_profile.get("team", "Unknown"),
                user_context=user_context or "General office work",
                user_questions=user_questions,
            )

            try:
                content = self._call_claude(prompt, max_tokens=4000)
            except Exception:
                content = self._fallback_retrofit(original_usecase, user_profile)
        else:
            content = self._fallback_retrofit(original_usecase, user_profile)

        return {
            "title": f"Inspired by the community: {original_usecase.get('title', 'Cool use case')}",
            "summary": f"Adapted from a real-world Claude use case, customized for {user_profile.get('name', 'you')} at Franzy.",
            "content_markdown": content,
            "tool_name": original_usecase.get("tool", "general"),
            "category": original_usecase.get("category", "automation"),
            "difficulty": original_usecase.get("difficulty", "intermediate"),
            "source": "ai-generated",
            "is_shared": True,
            "is_published": True,
            "relevance_score": 0.85,
        }

    # ── Fallback methods (no API key) ───────────────────────

    def _fallback_analysis(self, user_profile: dict, signals: list[dict]) -> list[dict]:
        """Analyze signals without API — uses rule-based matching."""
        suggestions = []
        team = (user_profile.get("team", "") or "").lower()
        signal_texts = " ".join([s.get("content_summary", "").lower() for s in signals])

        # Detect patterns and suggest lessons
        patterns = [
            {
                "keywords": ["code review", "pr review", "pull request", "pr "],
                "result": {
                    "manual_task": "Manually reviewing pull requests and code changes",
                    "claude_tool": "claude-code",
                    "time_saved": "3-5 hours/week",
                    "lesson_title": f"Automate Your Code Reviews with Claude Code",
                    "priority": "high",
                    "category": "coding",
                },
            },
            {
                "keywords": ["follow-up", "follow up", "outreach", "email draft", "cold email"],
                "result": {
                    "manual_task": "Manually writing follow-up and outreach emails",
                    "claude_tool": "claude-api",
                    "time_saved": "2-4 hours/week",
                    "lesson_title": f"Auto-Draft Personalized Emails with Claude + {('HubSpot' if 'hubspot' in signal_texts else 'Gmail')}",
                    "priority": "high",
                    "category": "communication",
                },
            },
            {
                "keywords": ["report", "weekly update", "metrics", "dashboard", "status"],
                "result": {
                    "manual_task": "Manually compiling reports and status updates",
                    "claude_tool": "cowork",
                    "time_saved": "2-3 hours/week",
                    "lesson_title": f"Schedule Automated Reports with Claude Cowork",
                    "priority": "high",
                    "category": "reporting",
                },
            },
            {
                "keywords": ["ticket", "issue", "bug", "triage", "backlog"],
                "result": {
                    "manual_task": "Manually creating and triaging issues/tickets",
                    "claude_tool": "claude-api",
                    "time_saved": "1-3 hours/week",
                    "lesson_title": f"Auto-Triage Issues: Slack to Linear with Claude",
                    "priority": "medium",
                    "category": "project-management",
                },
            },
            {
                "keywords": ["automate", "automation", "manual process", "repetitive"],
                "result": {
                    "manual_task": "Doing repetitive work that could be automated",
                    "claude_tool": "cowork",
                    "time_saved": "3-5 hours/week",
                    "lesson_title": f"Your First Claude Cowork Automation (No Code Required)",
                    "priority": "high",
                    "category": "automation",
                },
            },
            {
                "keywords": ["slack", "channel", "message", "thread", "summarize"],
                "result": {
                    "manual_task": "Reading through long Slack threads and channels",
                    "claude_tool": "mcp",
                    "time_saved": "1-2 hours/week",
                    "lesson_title": f"Auto-Summarize Slack Channels with Claude + MCP",
                    "priority": "medium",
                    "category": "communication",
                },
            },
            {
                "keywords": ["hubspot", "crm", "deal", "pipeline", "contact"],
                "result": {
                    "manual_task": "Manually updating CRM records and tracking deals",
                    "claude_tool": "claude-api",
                    "time_saved": "2-4 hours/week",
                    "lesson_title": f"Supercharge Your HubSpot Workflow with Claude",
                    "priority": "high",
                    "category": "automation",
                },
            },
        ]

        for pattern in patterns:
            if any(kw in signal_texts for kw in pattern["keywords"]):
                suggestions.append(pattern["result"])

        # Default suggestion based on team
        if not suggestions:
            if "eng" in team or "dev" in team:
                suggestions.append({
                    "manual_task": "General development workflow",
                    "claude_tool": "claude-code",
                    "time_saved": "3-5 hours/week",
                    "lesson_title": "Claude Code Power User: Your Personalized Guide",
                    "priority": "high",
                    "category": "coding",
                })
            elif "sales" in team or "revenue" in team:
                suggestions.append({
                    "manual_task": "Sales outreach and pipeline management",
                    "claude_tool": "cowork",
                    "time_saved": "3-5 hours/week",
                    "lesson_title": "Automate Your Sales Workflow with Claude Cowork",
                    "priority": "high",
                    "category": "automation",
                })
            else:
                suggestions.append({
                    "manual_task": "General workflow tasks",
                    "claude_tool": "cowork",
                    "time_saved": "2-3 hours/week",
                    "lesson_title": "Get Started with Claude: Your Personal AI Assistant",
                    "priority": "high",
                    "category": "automation",
                })

        return suggestions[:3]

    def _fallback_lesson_content(self, title: str, tool: str, manual_task: str, profile: dict) -> str:
        """Generate lesson content without API."""
        name = profile.get("name", "there").split()[0]
        team = profile.get("team", "your team")

        tool_guides = {
            "claude-code": f"""## Why This Matters for You, {name}

Based on what we've seen from your work in {team}, you're spending time on **{manual_task}**. Claude Code can handle this for you.

## What is Claude Code?

Claude Code is a CLI tool that lives in your terminal. It reads your codebase, edits files, runs commands, and handles multi-step tasks autonomously.

## Getting Started (15 minutes)

```bash
# Install
npm install -g @anthropic-ai/claude-code

# Go to your project
cd your-project

# Start
claude
```

## Your Specific Use Case: {manual_task}

Here's exactly how to use Claude Code for what you're doing:

1. **Open your terminal** in the relevant project directory
2. **Describe what you need**: Just tell Claude what you want in plain English
3. **Review the changes**: Claude will show you what it plans to do
4. **Approve and iterate**: Accept changes or ask for modifications

### Example Prompt for Your Workflow

```
claude "Help me {manual_task.lower()}. Look at the current codebase and suggest improvements."
```

## Quick Wins (do these in the next 15 minutes)

1. Install Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Create a `CLAUDE.md` file in your main project with your team's conventions
3. Try one task you'd normally do manually — let Claude handle it
4. Share what you learned in your team's Slack channel
""",
            "cowork": f"""## Why This Matters for You, {name}

You're on the {team} team, and we've noticed you're spending time on **{manual_task}**. Claude Cowork can automate this without writing any code.

## What is Claude Cowork?

Cowork is Claude's GUI automation tool. You describe a task, and it executes it — browsing the web, filling out forms, generating reports, sending emails. You can even schedule it to run weekly.

## Setting Up Your First Automation

1. **Open Claude.ai** and look for the Cowork feature
2. **Describe your task** in plain English:
   > "Every Monday at 9am, pull our metrics from [tool], summarize them, and post to #team-updates in Slack"
3. **Review the plan** Claude generates
4. **Schedule it** to run automatically

## Your Specific Use Case: {manual_task}

### Step 1: Break it down
Think about exactly what you do manually:
- Where do you get the data?
- What do you do with it?
- Where does the result go?

### Step 2: Tell Cowork
Write it out as a natural instruction, like you're telling an assistant.

### Step 3: Schedule it
Set it to run on the cadence you need — daily, weekly, or on-demand.

## Quick Wins

1. Identify your most repetitive weekly task
2. Write out the steps as if explaining to a new hire
3. Feed those steps to Cowork
4. Set it to run automatically and get your time back
""",
            "claude-api": f"""## Why This Matters for You, {name}

We've seen from your {team} team activity that you're dealing with **{manual_task}**. The Claude API with tool use can automate this programmatically.

## Quick Start

```python
import anthropic

client = anthropic.Anthropic()  # Set ANTHROPIC_API_KEY env var

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{{"role": "user", "content": "Help me with: {manual_task}"}}],
)
print(response.content[0].text)
```

## Your Specific Automation

Based on what you're doing, here's a skeleton you can customize:

```python
import anthropic
import json

client = anthropic.Anthropic()

# Define the tools Claude can use
tools = [
    {{
        "name": "process_task",
        "description": "Process and automate: {manual_task}",
        "input_schema": {{
            "type": "object",
            "properties": {{
                "action": {{"type": "string", "description": "The action to take"}},
                "data": {{"type": "string", "description": "Relevant data"}},
            }},
            "required": ["action"],
        }},
    }}
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{{"role": "user", "content": "Automate this task: {manual_task}"}}],
)

for block in response.content:
    if block.type == "tool_use":
        print(f"Claude wants to: {{block.name}}({{block.input}})")
```

## Quick Wins

1. Install the SDK: `pip install anthropic`
2. Set your API key: `export ANTHROPIC_API_KEY=your-key`
3. Run the quick start example above
4. Adapt the tool definition for your specific workflow
""",
            "mcp": f"""## Why This Matters for You, {name}

Your {team} team could benefit from connecting Claude directly to your tools. MCP (Model Context Protocol) lets Claude talk to Slack, databases, GitHub, and more.

## What is MCP?

Think of it as plugins for Claude. Each MCP server connects Claude to a different tool, so it can read and write data from your actual work systems.

## Setting It Up

Add MCP servers to your Claude configuration:

```json
{{
  "mcpServers": {{
    "slack": {{
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-slack"],
      "env": {{ "SLACK_BOT_TOKEN": "xoxb-your-token" }}
    }}
  }}
}}
```

## Your Use Case: {manual_task}

With MCP connected, you can ask Claude to directly interact with your tools:

> "Search our Slack for discussions about [topic] and summarize the key decisions"
> "Check our GitHub PRs from this week and flag any that need review"
> "Look up the contact in our database and draft a follow-up"

## Quick Wins

1. Pick ONE tool to connect first (Slack is easiest)
2. Follow the setup above
3. Ask Claude to do something with that tool
4. Expand from there
""",
        }

        return tool_guides.get(tool, tool_guides["cowork"])

    def _fallback_retrofit(self, usecase: dict, profile: dict) -> str:
        """Retrofit a use case without API."""
        name = profile.get("name", "there").split()[0]
        team = profile.get("team", "your team")

        return f"""## Inspired by the Community

Someone built something cool: **{usecase.get('title', 'An amazing automation')}**

> {usecase.get('description', '')}

## How This Applies to You, {name}

You're on the {team} team, and this exact pattern could work for your workflows. Here's how to adapt it:

### The Original Idea
{usecase.get('description', 'A clever use of Claude tools to automate work.')}

### Your Version

**Tools you'll need:**
- {usecase.get('tool', 'Claude')}
- Your existing {team} tools

**Steps to implement:**

1. **Understand the pattern**: The key insight from this use case is about automating {usecase.get('category', 'repetitive work')}
2. **Map it to your workflow**: Think about where you have a similar pattern in your daily work
3. **Start small**: Pick one piece of this to implement first
4. **Iterate**: Get it working, then expand

### Example Implementation

{usecase.get('example_code', '```\\n# Start with the basic setup from the Tool Updates page\\n# Then adapt it for your specific use case\\n```')}

## Quick Wins

1. Read through the original use case above
2. Identify ONE similar workflow in your daily work
3. Try implementing just the first step
4. Share your results with the team
"""
