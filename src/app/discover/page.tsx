"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { Badge } from "@/components/ui/badge";
import { lessons, getAllTools, getAllCategories } from "@/data/lessons";
import { cn, getDifficultyColor, getCategoryColor } from "@/lib/utils";
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Discover</h1>
        <p className="text-zinc-400 mt-1">
          Explore lessons across all Claude tools
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search lessons, tools, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/20"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "px-4 py-3 rounded-xl border text-sm font-medium transition-colors flex items-center gap-2",
            showFilters || hasFilters
              ? "bg-brand-400/10 border-brand-400/30 text-brand-300"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Filters</span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {/* Tool filter */}
          <div>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Tool
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <button
                  key={tool}
                  onClick={() =>
                    setSelectedTool(selectedTool === tool ? null : tool)
                  }
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    selectedTool === tool
                      ? "bg-brand-400/20 text-brand-300 border border-brand-400/30"
                      : "bg-zinc-800 text-zinc-400 hover:text-white border border-transparent"
                  )}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                    selectedCategory === cat
                      ? "bg-brand-400/20 text-brand-300 border border-brand-400/30"
                      : "bg-zinc-800 text-zinc-400 hover:text-white border border-transparent"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty filter */}
          <div>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
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
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                      selectedDifficulty === diff
                        ? "bg-brand-400/20 text-brand-300 border border-brand-400/30"
                        : "bg-zinc-800 text-zinc-400 hover:text-white border border-transparent"
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

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {filteredLessons.length} lesson{filteredLessons.length !== 1 ? "s" : ""}
          {hasFilters && " (filtered)"}
        </p>
      </div>

      {/* Lesson grid */}
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-lg">No lessons match your filters</p>
          <button
            onClick={() => {
              setSearch("");
              clearFilters();
            }}
            className="mt-3 text-brand-400 text-sm hover:text-brand-300"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
