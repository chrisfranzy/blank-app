import { NextResponse } from "next/server";
import { DiscoverItem, DiscoverSource } from "@/types";
import { seedDiscoverItems } from "@/data/discover-seed";

const SUBREDDITS = [
  "ClaudeAI",
  "ChatGPT",
  "artificial",
  "MachineLearning",
  "LocalLLaMA",
  "MicrosoftCopilot",
  "GoogleGemini",
  "NotebookLM",
  "salestools",
  "ContentMarketing",
];

const AI_KEYWORDS = [
  "claude",
  "chatgpt",
  "gemini",
  "copilot",
  "perplexity",
  "notebooklm",
  "manus",
  "ai workflow",
  "ai automation",
  "prompt",
  "mcp",
  "gpt",
  "llm",
];

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext: string;
    author: string;
    subreddit: string;
    score: number;
    num_comments: number;
    permalink: string;
    created_utc: number;
    url: string;
    thumbnail?: string;
  };
}

function detectAiTools(text: string): string[] {
  const lower = text.toLowerCase();
  const tools: string[] = [];
  if (lower.includes("claude")) tools.push("Claude");
  if (lower.includes("chatgpt") || lower.includes("gpt-4") || lower.includes("openai"))
    tools.push("ChatGPT");
  if (lower.includes("gemini")) tools.push("Google Gemini");
  if (lower.includes("copilot") && lower.includes("microsoft"))
    tools.push("Microsoft Copilot");
  if (lower.includes("perplexity")) tools.push("Perplexity");
  if (lower.includes("notebooklm") || lower.includes("notebook lm"))
    tools.push("NotebookLM");
  if (lower.includes("manus")) tools.push("Manus");
  if (lower.includes("mcp") || lower.includes("model context protocol"))
    tools.push("MCP");
  if (lower.includes("cowork")) tools.push("Claude Cowork");
  if (lower.includes("claude code")) tools.push("Claude Code");
  return [...new Set(tools)];
}

function isRelevantPost(post: RedditPost): boolean {
  const text = `${post.data.title} ${post.data.selftext}`.toLowerCase();
  // Must mention at least one AI tool/keyword
  const hasKeyword = AI_KEYWORDS.some((kw) => text.includes(kw));
  // Must have some substance (not just a question with no body)
  const hasSubstance = post.data.selftext.length > 100 || post.data.score > 50;
  // Must have community engagement
  const hasEngagement = post.data.score > 20 && post.data.num_comments > 5;
  return hasKeyword && hasSubstance && hasEngagement;
}

function categorizePost(text: string): { category: DiscoverItem["category"]; difficulty: DiscoverItem["difficulty"] } {
  const lower = text.toLowerCase();
  let category: DiscoverItem["category"] = "workflow";
  let difficulty: DiscoverItem["difficulty"] = "beginner";

  if (lower.includes("automat") || lower.includes("pipeline") || lower.includes("schedule"))
    category = "automation";
  else if (lower.includes("code") || lower.includes("api") || lower.includes("build") || lower.includes("deploy"))
    category = "coding";
  else if (lower.includes("email") || lower.includes("content") || lower.includes("write") || lower.includes("draft"))
    category = "communication";
  else if (lower.includes("best practice") || lower.includes("tip") || lower.includes("guide"))
    category = "best-practices";

  if (lower.includes("api") || lower.includes("code") || lower.includes("typescript") || lower.includes("python"))
    difficulty = "intermediate";
  if (lower.includes("architecture") || lower.includes("deploy") || lower.includes("production") || lower.includes("mcp server"))
    difficulty = "advanced";

  return { category, difficulty };
}

function generateFranzyRelevance(title: string, tools: string[]): string {
  const toolStr = tools.join(", ");
  // Simple relevance generation — in production, this would use Claude API
  return `This ${toolStr} workflow could be adapted for Franzy's team to improve efficiency and reduce manual work in similar areas.`;
}

async function fetchRedditPosts(subreddit: string): Promise<RedditPost[]> {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=25`,
      {
        headers: { "User-Agent": "FranzyAIHub/1.0" },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.children || [];
  } catch {
    return [];
  }
}

function redditPostToDiscoverItem(post: RedditPost): DiscoverItem {
  const text = `${post.data.title} ${post.data.selftext}`;
  const tools = detectAiTools(text);
  const { category, difficulty } = categorizePost(text);
  const summary =
    post.data.selftext.length > 200
      ? post.data.selftext.slice(0, 200).trim() + "..."
      : post.data.selftext || post.data.title;

  return {
    id: `reddit-${post.data.id}`,
    title: post.data.title,
    summary,
    source: "reddit" as DiscoverSource,
    sourceUrl: `https://reddit.com${post.data.permalink}`,
    author: `u/${post.data.author}`,
    subreddit: `r/${post.data.subreddit}`,
    score: post.data.score,
    commentCount: post.data.num_comments,
    aiTools: tools.length > 0 ? tools : ["AI"],
    useCase: post.data.title,
    franzyRelevance: generateFranzyRelevance(post.data.title, tools),
    category,
    difficulty,
    fetchedAt: new Date().toISOString(),
    thumbnailUrl:
      post.data.thumbnail && post.data.thumbnail.startsWith("http")
        ? post.data.thumbnail
        : undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source"); // "reddit" | "seed" | "all"
  const limit = parseInt(searchParams.get("limit") || "20");

  let items: DiscoverItem[] = [];

  if (source === "seed" || !source) {
    // Return seed data (fallback / demo mode)
    items = seedDiscoverItems;
  }

  if (source === "reddit" || source === "all") {
    // Fetch live from Reddit
    const allPosts: RedditPost[] = [];
    const fetches = SUBREDDITS.map((sub) => fetchRedditPosts(sub));
    const results = await Promise.all(fetches);
    for (const posts of results) {
      allPosts.push(...posts);
    }

    const relevant = allPosts
      .filter(isRelevantPost)
      .sort((a, b) => b.data.score - a.data.score)
      .slice(0, limit);

    const redditItems = relevant.map(redditPostToDiscoverItem);

    if (source === "all") {
      items = [...seedDiscoverItems, ...redditItems];
    } else {
      items = redditItems;
    }
  }

  // Sort by score descending
  items.sort((a, b) => b.score - a.score);

  return NextResponse.json({
    items: items.slice(0, limit),
    total: items.length,
    sources: source || "seed",
    fetchedAt: new Date().toISOString(),
  });
}
