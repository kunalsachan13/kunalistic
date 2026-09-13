"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  getFeaturedTools,
  getTrendingTools,
  getRecentlyAddedTools,
  TOOL_REGISTRY,
} from "@/lib/registry";
import { CATEGORIES } from "@/lib/registry/categories";
import { ToolCard } from "@/components/tool-shell/ToolCard";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";
import {
  Search,
  ArrowRight,
  Shield,
  Sparkles,
  Heart,
  Flame,
  Clock,
  Layers,
  CheckCircle2,
  Box,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const featured = getFeaturedTools().slice(0, 8);
  const trending = getTrendingTools().slice(0, 4);
  const recent = getRecentlyAddedTools().slice(0, 4);
  const creatorTools = TOOL_REGISTRY.filter((t) => t.category === "creator" && t.status === "active");

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-24 pb-12 sm:pb-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.18)] text-xs text-[#C8BEFA] font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C8BEFA]" />
          <span>Kunalistic Digital Toolbox • 100% Free & In-Browser</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#C8BEFA] tracking-tight leading-[1.1] mb-6">
          Everything you need, <br className="hidden sm:block" />
          in one place.
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg text-[rgba(200,190,250,0.7)] max-w-2xl mx-auto leading-relaxed mb-8">
          Convert, create, calculate and simplify your everyday digital work with a growing collection of useful tools. No subscriptions. No uploads.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link href="/tools">
            <Button variant="primary" size="lg" className="font-bold gap-2">
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="secondary" size="lg" className="font-semibold">
              Browse Categories
            </Button>
          </Link>
        </div>

        {/* Prominent Search Bar */}
        <div className="max-w-xl mx-auto">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.22)] hover:border-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] shadow-[0_10px_35px_rgba(0,0,0,0.4)] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Search className="w-5 h-5 text-[rgba(200,190,250,0.6)] group-hover:text-[#C8BEFA] shrink-0 transition-colors" />
              <span className="text-sm text-[rgba(200,190,250,0.45)] group-hover:text-[rgba(200,190,250,0.7)] truncate">
                Search tools (e.g. compress, reel, json, pdf)...
              </span>
            </div>
            <kbd className="hidden sm:inline-flex text-xs bg-[rgba(200,190,250,0.1)] px-2 py-1 rounded-md border border-[rgba(200,190,250,0.15)] font-mono text-[#C8BEFA] shrink-0">
              Ctrl K
            </kbd>
          </button>
        </div>
      </section>

      {/* 2. POPULAR TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#C8BEFA] tracking-tight">
              Popular Utilities
            </h2>
            <p className="text-xs text-[rgba(200,190,250,0.6)] mt-0.5">
              Everyday workhorses used by thousands of creators and developers.
            </p>
          </div>
          <Link href="/tools" className="text-xs font-semibold text-[#C8BEFA] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#C8BEFA] tracking-tight">
              Curated Categories
            </h2>
            <p className="text-xs text-[rgba(200,190,250,0.6)] mt-0.5">
              Explore specialized suites engineered for your domain.
            </p>
          </div>
          <Link href="/categories" className="text-xs font-semibold text-[#C8BEFA] hover:underline flex items-center gap-1">
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] hover:bg-[rgba(200,190,250,0.08)] hover:border-[rgba(200,190,250,0.28)] transition-all group flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.16)] flex items-center justify-center text-[#C8BEFA] group-hover:bg-[#C8BEFA] group-hover:text-[#151130] transition-all mb-2.5">
                <DynamicIcon name={cat.icon} className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#C8BEFA]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CREATOR AI TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.16)] shadow-[0_15px_50px_rgba(0,0,0,0.4)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(200,190,250,0.1)] text-[#C8BEFA] text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#C8BEFA]">
                Creator & Short-Form Studio
              </h2>
              <p className="text-xs text-[rgba(200,190,250,0.65)] mt-1 max-w-xl">
                Psychology-backed viral hooks, full reel blueprints, and formatted captions crafted for Instagram, TikTok, and YouTube Shorts.
              </p>
            </div>
            <Link href="/categories/creator">
              <Button variant="secondary" size="sm">
                Explore Creator Suite
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {creatorTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING & RECENT TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trending */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-[#C8BEFA]" />
              <h3 className="text-base font-bold text-[#C8BEFA]">Trending Right Now</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trending.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#C8BEFA]" />
              <h3 className="text-base font-bold text-[#C8BEFA]">Recently Added to Toolbox</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recent.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY KUNALISTIC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#C8BEFA]">
              Why Kunalistic?
            </h2>
            <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.65)] mt-2">
              Designed as a unified utility operating system rather than a fragmented collection of mini-sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)] space-y-2.5">
              <Shield className="w-5 h-5 text-[#C8BEFA]" />
              <h3 className="text-sm font-bold text-[#C8BEFA]">100% In-Browser Privacy</h3>
              <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
                Images and PDFs are manipulated locally on your device via HTML5 canvas and WebAssembly. Your sensitive files never reach any server.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)] space-y-2.5">
              <Heart className="w-5 h-5 text-[#C8BEFA]" />
              <h3 className="text-sm font-bold text-[#C8BEFA]">Zero Subscriptions</h3>
              <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
                No monthly recurring charges, no gated pro tiers, and no artificial limitations designed only to force you to enter a credit card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)] space-y-2.5">
              <Layers className="w-5 h-5 text-[#C8BEFA]" />
              <h3 className="text-sm font-bold text-[#C8BEFA]">Modular Architecture</h3>
              <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
                A continuously expanding registry where dozens of micro-apps are added regularly without redesigning or fragmenting the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VOLUNTARY CREATOR SUPPORT SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.2)] text-center space-y-4">
          <Heart className="w-8 h-8 text-[#C8BEFA] fill-[#C8BEFA] mx-auto" />
          <h2 className="text-2xl font-bold text-[#C8BEFA]">
            Support Kunalistic
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.7)] max-w-xl mx-auto leading-relaxed">
            Kunalistic is built to keep useful tools in one place and make them freely accessible.
            If something here saved you time or helped you get something done, you can support the project.
          </p>
          <div className="pt-2">
            <Link href="/support">
              <Button variant="primary" size="lg" className="font-bold">
                Support Kunalistic
              </Button>
            </Link>
          </div>
          <p className="text-[11px] text-[rgba(200,190,250,0.45)]">
            No subscription • No recurring payment • Just optional support
          </p>
        </div>
      </section>

      {/* Global Search Dialog */}
      <GlobalSearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
