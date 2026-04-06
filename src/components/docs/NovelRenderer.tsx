"use client";

import React, { useMemo } from "react";
import { EditorRoot, EditorContent, JSONContent } from "novel";
import { defaultExtensions } from "@/lib/novel-extensions";
import { cn } from "@/lib/utils";

interface NovelRendererProps {
  content: string; // JSON string
  className?: string;
}

export default function NovelRenderer({ content, className }: NovelRendererProps) {
  const jsonContent = useMemo(() => {
    try {
      return JSON.parse(content) as JSONContent;
    } catch (e) {
      console.error("Failed to parse Novel JSON content", e);
      return null;
    }
  }, [content]);

  if (!jsonContent) {
    return <div className="text-red-500 italic">Error rendering content: Invalid format.</div>;
  }

  return (
    <div className={cn("max-w-none novel-renderer", className)}>
      <EditorRoot>
        <EditorContent
          initialContent={jsonContent}
          extensions={defaultExtensions}
          editable={false}
          editorProps={{
            attributes: {
              class: "prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-p:leading-relaxed focus:outline-none max-w-full",
            },
          }}
        />
      </EditorRoot>
    </div>
  );
}
