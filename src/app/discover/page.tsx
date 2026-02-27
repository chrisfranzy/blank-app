"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessons, getAllTools, getAllCategories } from "@/data/lessons";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/types";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const tools = getAllTools();
  const categories = getAllCategories();

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
      if (selectedCategory && lesson.category !== selectedCategory) return false;
      if (selectedDifficulty && lesson.difficulty !== selectedDifficulty) return false;
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
          Explore lessons
        </h1>
        <p className="text-ink-muted mt-2">
          Browse {lessons.length} lessons across all Claude tools
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search lessons, tools, topics..."
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
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="card-surface p-5 space-y-5 animate-scale-in">
          <div className="flex items-center justify-between">
            <span className="text-sm font-display font-medium text-ink">Filters</span>
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
            { label: "Tool", items: tools, selected: selectedTool, setter: setSelectedTool },
            { label: "Category", items: categories, selected: selectedCategory, setter: setSelectedCategory },
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
              {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() =>
                    setSelectedDifficulty(selectedDifficulty === diff ? null : diff)
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-ink-muted font-mono">
        {filteredLessons.length} result{filteredLessons.length !== 1 ? "s" : ""}
        {hasFilters && " (filtered)"}
      </p>

      <div className="grid md:grid-cols-2 gap-4 stagger">
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
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
    </div>
  );
}
