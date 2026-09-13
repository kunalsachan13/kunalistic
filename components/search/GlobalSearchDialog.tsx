"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, Sparkles, ArrowRight } from "lucide-react";
import { searchTools, TOOL_REGISTRY } from "@/lib/registry";
import { ToolCategory, ToolDefinition } from "@/lib/registry/types";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Badge } from "@/components/ui/Badge";

interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchDialog: React.FC<GlobalSearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchTools(query, selectedCategory).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setSelectedCategory(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        onClose();
        router.push(`/tools/${target.slug}`);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop strictly styled with Champion Blue tinted glass */}
      <div
        className="fixed inset-0 bg-[#151130]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-2xl bg-[#151130] border border-[rgba(200,190,250,0.22)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden z-10"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(200,190,250,0.14)]">
          <Search className="w-5 h-5 text-[rgba(200,190,250,0.6)] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, formats, tasks (e.g. compress, reel, json, pdf)..."
            className="w-full bg-transparent text-[#C8BEFA] text-base placeholder-[rgba(200,190,250,0.4)] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[rgba(200,190,250,0.5)] hover:text-[#C8BEFA]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center ml-2 pl-2 border-l border-[rgba(200,190,250,0.14)] text-[10px] text-[rgba(200,190,250,0.5)] uppercase tracking-wider font-mono">
            ESC to close
          </div>
        </div>

        {/* Quick Filter Categories */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[rgba(200,190,250,0.02)] border-b border-[rgba(200,190,250,0.08)] overflow-x-auto text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              !selectedCategory
                ? "bg-[#C8BEFA] text-[#151130] font-semibold"
                : "text-[rgba(200,190,250,0.6)] hover:text-[#C8BEFA]"
            }`}
          >
            All
          </button>
          {(["image", "pdf", "creator", "developer", "text", "student"] as ToolCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? undefined : cat)}
              className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                selectedCategory === cat
                  ? "bg-[#C8BEFA] text-[#151130] font-semibold"
                  : "text-[rgba(200,190,250,0.6)] hover:text-[#C8BEFA]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[rgba(200,190,250,0.05)]">
          {results.length > 0 ? (
            results.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[rgba(200,190,250,0.12)] border border-[rgba(200,190,250,0.3)] shadow-[0_0_15px_rgba(200,190,250,0.08)]"
                      : "hover:bg-[rgba(200,190,250,0.05)] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.16)] flex items-center justify-center text-[#C8BEFA] shrink-0">
                      <DynamicIcon name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#C8BEFA] truncate">
                          {tool.name}
                        </span>
                        {tool.status === "coming-soon" ? (
                          <Badge variant="subtle" size="sm">Soon</Badge>
                        ) : tool.featured ? (
                          <Badge variant="active" size="sm">Popular</Badge>
                        ) : null}
                      </div>
                      <p className="text-xs text-[rgba(200,190,250,0.55)] truncate mt-0.5">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[rgba(200,190,250,0.4)] ml-3 shrink-0">
                    <span className="hidden sm:inline capitalize">{tool.category}</span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#C8BEFA]" />}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-[rgba(200,190,250,0.6)]">
                No tools matching &ldquo;<span className="text-[#C8BEFA]">{query}</span>&rdquo;
              </p>
              <p className="text-xs text-[rgba(200,190,250,0.4)] mt-1">
                Try searching for keywords like &ldquo;compress&rdquo;, &ldquo;pdf&rdquo;, &ldquo;reel&rdquo;, or &ldquo;counter&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[rgba(200,190,250,0.02)] border-t border-[rgba(200,190,250,0.1)] flex justify-between items-center text-[11px] text-[rgba(200,190,250,0.5)]">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="font-mono bg-[rgba(200,190,250,0.1)] px-1.5 py-0.5 rounded text-[#C8BEFA]">↑</kbd> <kbd className="font-mono bg-[rgba(200,190,250,0.1)] px-1.5 py-0.5 rounded text-[#C8BEFA]">↓</kbd></span>
            <span>Open: <kbd className="font-mono bg-[rgba(200,190,250,0.1)] px-1.5 py-0.5 rounded text-[#C8BEFA]">↵</kbd></span>
          </div>
          <span>Total {TOOL_REGISTRY.length} tools</span>
        </div>
      </div>
    </div>
  );
};
