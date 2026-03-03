"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  X,
  ExternalLink,
  ArrowUp,
  MessageCircle,
  Sparkles,
  Lightbulb,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons, getAllTools, getAllCategories } from "@/data/lessons";
import { cn } from "@/lib/utils";
import { Difficulty, ProgressStatus, DiscoverItem } from "@/types";
import { getProgress } from "@/lib/storage";

type TabId = "feed" | "lessons";

const SOURCE_ICONS: Record<string, string> = {
  reddit: "Reddit",
  twitter: "X / Twitter",
  hackernews: "Hacker News",
  web: "Web",
};

const SOURCE_COLORS: Record<string, string> = {
  reddit: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  twitter: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  hackernews: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  web: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

function DiscoverCard({ item }: { item: DiscoverItem }) {
  return (
    <div className="card-surface p-5 space-y-4 hover:border-surface-4 transition-all group">
      {/* Header: source badge + score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2 py-0.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border",
              SOURCE_COLORS[item.source] || SOURCE_COLORS.web
            )}
          >
            {SOURCE_ICONS[item.source] || item.source}
          </span>
          {item.subreddit && (
            <span className="text-xs text-ink-faint font-mono">
              {item.subreddit}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-faint">
          <span className="flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            {item.score.toLocaleString()}
          </span>
          {item.commentCount !== undefined && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {item.commentCount}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-display font-semibold text-ink leading-snug group-hover:text-accent-coral transition-colors">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-ink-muted leading-relaxed">{item.summary}</p>

      {/* AI Tools used */}
      <div className="flex flex-wrap gap-1.5">
        {item.aiTools.map((tool) => (
          <span
            key={tool}
            className="px-2 py-0.5 bg-accent-coral/8 text-accent-coral text-[10px] font-medium rounded-lg border border-accent-coral/15"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Franzy relevance */}
      <div className="bg-surface-2/50 rounded-xl p-3 border border-surface-3/50">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-accent-coral mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-mono text-accent-coral uppercase tracking-wider mb-1">
              How this applies to Franzy
            </p>
            <p className="text-xs text-ink-muted leading-relaxed">
              {item.franzyRelevance}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: author + link */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-ink-faint font-mono">{item.author}</span>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent-coral hover:text-accent-coral-light flex items-center gap-1 transition-colors"
        >
          View original <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [progressMap, setProgressMap] = useState<
    Record<string, ProgressStatus>
  >({});

  // Feed state
  const [feedItems, setFeedItems] = useState<DiscoverItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedSource, setFeedSource] = useState<"seed" | "reddit" | "all">(
    "seed"
  );

  const tools = getAllTools();
  const categories = getAllCategories();

  useEffect(() => {
    const allProgress = getProgress();
    const map: Record<string, ProgressStatus> = {};
    for (const [id, p] of Object.entries(allProgress)) {
      map[id] = p.status;
    }
    setProgressMap(map);
  }, []);

  const fetchFeed = useCallback(
    async (source: "seed" | "reddit" | "all") => {
      setFeedLoading(true);
      try {
        const res = await fetch(`/api/discover?source=${source}&limit=20`);
        if (res.ok) {
          const data = await res.json();
          setFeedItems(data.items);
        }
      } catch {
        // Fallback to seed data on error
        try {
          const res = await fetch("/api/discover?source=seed");
          if (res.ok) {
            const data = await res.json();
            setFeedItems(data.items);
          }
        } catch {
          // Silent fail — items stay empty
        }
      } finally {
        setFeedLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchFeed(feedSource);
  }, [feedSource, fetchFeed]);

  // Filter feed items
  const filteredFeedItems = useMemo(() => {
    return feedItems.filter((item) => {
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.aiTools.some((t) => t.toLowerCase().includes(q)) ||
          item.franzyRelevance.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (selectedTool && !item.aiTools.includes(selectedTool)) return false;
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedDifficulty && item.difficulty !== selectedDifficulty)
        return false;
      return true;
    });
  }, [feedItems, search, selectedTool, selectedCategory, selectedDifficulty]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          lesson.title.toLowerCase().includes(q) ||
          lesson.summary.toLowerCase().includes(q) ||
          lesson.tags.some((t) => t.includes(q)) ||
          lesson.toolName.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (selectedTool && lesson.toolName !== selectedTool) return false;
      if (selectedCategory && lesson.category !== selectedCategory)
        return false;
      if (selectedDifficulty && lesson.difficulty !== selectedDifficulty)
        return false;
      return true;
    });
  }, [search, selectedTool, selectedCategory, selectedDifficulty]);

  const hasFilters = selectedTool || selectedCategory || selectedDifficulty;

  function clearFilters() {
    setSelectedTool(null);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Discover
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Discover AI workflows
        </h1>
        <p className="text-ink-muted mt-2">
          Real-world AI workflows from Reddit, X, and Hacker News — with
          insights on how they apply to Franzy
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-surface-1 rounded-2xl p-1 border border-surface-3 w-fit">
        <button
          onClick={() => setActiveTab("feed")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
            activeTab === "feed"
              ? "bg-surface-0 text-ink shadow-sm"
              : "text-ink-muted hover:text-ink"
          )}
        >
          <Sparkles className="w-4 h-4" />
          AI Feed
        </button>
        <button
          onClick={() => setActiveTab("lessons")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
            activeTab === "lessons"
              ? "bg-surface-0 text-ink shadow-sm"
              : "text-ink-muted hover:text-ink"
          )}
        >
          <BookOpen className="w-4 h-4" />
          All Lessons
          <span className="text-[10px] font-mono text-ink-faint">
            {lessons.length}
          </span>
        </button>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder={
              activeTab === "feed"
                ? "Search workflows, tools, topics..."
                : "Search lessons, tools, topics..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-1 border border-surface-3 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent-coral/30 focus:ring-1 focus:ring-accent-coral/10 transition-all font-body"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "px-4 py-3 rounded-2xl border text-sm font-medium transition-all flex items-center gap-2",
            showFilters || hasFilters
              ? "bg-accent-coral/10 border-accent-coral/20 text-accent-coral"
              : "bg-surface-1 border-surface-3 text-ink-muted hover:text-ink hover:border-surface-4"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
        {activeTab === "feed" && (
          <button
            onClick={() => fetchFeed(feedSource)}
            disabled={feedLoading}
            className={cn(
              "px-4 py-3 rounded-2xl border text-sm font-medium transition-all flex items-center gap-2",
              "bg-surface-1 border-surface-3 text-ink-muted hover:text-ink hover:border-surface-4",
              feedLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <RefreshCw
              className={cn("w-4 h-4", feedLoading && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {/* Source selector for feed */}
      {activeTab === "feed" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-faint font-mono">Source:</span>
          {(
            [
              { id: "seed", label: "Curated" },
              { id: "reddit", label: "Live Reddit" },
              { id: "all", label: "All Sources" },
            ] as const
          ).map((src) => (
            <button
              key={src.id}
              onClick={() => setFeedSource(src.id)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-all",
                feedSource === src.id
                  ? "bg-accent-coral/15 text-accent-coral border border-accent-coral/25"
                  : "bg-surface-3/50 text-ink-muted hover:text-ink border border-transparent"
              )}
            >
              {src.label}
            </button>
          ))}
        </div>
      )}

      {/* Filters panel */}
      {showFilters && (
        <div className="card-surface p-5 space-y-5 animate-scale-in">
          <div className="flex items-center justify-between">
            <span className="text-sm font-display font-medium text-ink">
              Filters
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {[
            {
              label: "Tool",
              items: tools,
              selected: selectedTool,
              setter: setSelectedTool,
            },
            {
              label: "Category",
              items: categories,
              selected: selectedCategory,
              setter: setSelectedCategory,
            },
          ].map((filter) => (
            <div key={filter.label}>
              <p className="text-[10px] text-ink-faint mb-2.5 font-mono uppercase tracking-[0.15em]">
                {filter.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {filter.items.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      filter.setter(filter.selected === item ? null : item)
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all capitalize",
                      filter.selected === item
                        ? "bg-accent-coral/15 text-accent-coral border border-accent-coral/25"
                        : "bg-surface-3/50 text-ink-muted hover:text-ink border border-transparent hover:border-surface-4"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[10px] text-ink-faint mb-2.5 font-mono uppercase tracking-[0.15em]">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
                (diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      setSelectedDifficulty(
                        selectedDifficulty === diff ? null : diff
                      )
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all capitalize",
                      selectedDifficulty === diff
                        ? "bg-accent-coral/15 text-accent-coral border border-accent-coral/25"
                        : "bg-surface-3/50 text-ink-muted hover:text-ink border border-transparent hover:border-surface-4"
                    )}
                  >
                    {diff}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feed tab content */}
      {activeTab === "feed" && (
        <>
          {feedLoading && (
            <div className="text-center py-12">
              <RefreshCw className="w-6 h-6 text-ink-faint animate-spin mx-auto mb-3" />
              <p className="text-sm text-ink-muted">
                Fetching AI workflows...
              </p>
            </div>
          )}

          {!feedLoading && filteredFeedItems.length > 0 && (
            <>
              <p className="text-sm text-ink-muted font-mono">
                {filteredFeedItems.length} workflow
                {filteredFeedItems.length !== 1 ? "s" : ""}
                {hasFilters && " (filtered)"}
              </p>
              <div className="grid md:grid-cols-2 gap-4 stagger">
                {filteredFeedItems.map((item) => (
                  <DiscoverCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}

          {!feedLoading && filteredFeedItems.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="w-8 h-8 text-ink-faint mx-auto mb-3" />
              <p className="text-ink-muted text-lg font-display">
                No workflows match your filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  clearFilters();
                }}
                className="mt-4 text-accent-coral text-sm hover:text-accent-coral-light transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Lessons tab content */}
      {activeTab === "lessons" && (
        <>
          <p className="text-sm text-ink-muted font-mono">
            {filteredLessons.length} result
            {filteredLessons.length !== 1 ? "s" : ""}
            {hasFilters && " (filtered)"}
          </p>

          <div className="grid md:grid-cols-2 gap-4 stagger">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progress={progressMap[lesson.id]}
              />
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-20">
              <p className="text-ink-muted text-lg font-display">
                No lessons match your filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  clearFilters();
                }}
                className="mt-4 text-accent-coral text-sm hover:text-accent-coral-light transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
