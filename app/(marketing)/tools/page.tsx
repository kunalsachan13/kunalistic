"use client";

import React, { useState } from "react";
import { getAllTools } from "@/lib/registry";
import { CATEGORIES } from "@/lib/registry/categories";
import { ToolCategory } from "@/lib/registry/types";
import { ToolCard } from "@/components/tool-shell/ToolCard";
import { Input } from "@/components/ui/FormControls";
import { Search, Wrench, Layers } from "lucide-react";

export default function ToolsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all");

  const allTools = getAllTools();

  const filteredTools = allTools.filter((t) => {
    if (selectedCategory !== "all" && t.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C8BEFA] tracking-tight">
          Tools Directory
        </h1>
        <p className="text-sm text-[rgba(200,190,250,0.65)] mt-2 leading-relaxed">
          Browse our complete ecosystem of in-browser utilities. Privacy-first, zero uploads, and 100% free with no subscriptions.
        </p>
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(200,190,250,0.5)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tools by name or tag..."
            className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] focus:border-[#C8BEFA] text-xs text-[#C8BEFA] rounded-xl pl-9 pr-3.5 py-2.5 outline-none placeholder-[rgba(200,190,250,0.38)]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#C8BEFA] text-[#151130]"
                : "bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] text-[rgba(200,190,250,0.7)] hover:text-[#C8BEFA]"
            }`}
          >
            All ({allTools.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#C8BEFA] text-[#151130]"
                  : "bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] text-[rgba(200,190,250,0.7)] hover:text-[#C8BEFA]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)]">
          <p className="text-sm font-semibold text-[#C8BEFA]">No tools found matching your criteria</p>
          <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">Try changing your category filter or search keywords.</p>
        </div>
      )}
    </div>
  );
}
