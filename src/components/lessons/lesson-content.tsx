"use client";

import { useEffect, useRef } from "react";
import { Lesson } from "@/types";

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    // Simple markdown-to-HTML conversion for lesson content
    let html = lesson.content;

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre><code class="language-$1">$2</code></pre>'
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Headers
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    // Lists
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    // Clean up nested ul tags
    html = html.replace(/<\/ul>\s*<ul>/g, "");

    // Numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

    // Paragraphs (lines that aren't already wrapped)
    html = html
      .split("\n\n")
      .map((block) => {
        if (
          block.startsWith("<") ||
          block.trim() === ""
        )
          return block;
        return `<p>${block}</p>`;
      })
      .join("\n");

    contentRef.current.innerHTML = html;
  }, [lesson.content]);

  return <div ref={contentRef} className="prose-lesson" />;
}
