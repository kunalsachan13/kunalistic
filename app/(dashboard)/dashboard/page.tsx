"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ToolCard } from "@/components/tool-shell/ToolCard";
import { Button } from "@/components/ui/Button";
import { getToolBySlug, getFeaturedTools } from "@/lib/registry";
import { getLocalFavorites, getRecentTools, getLocalSavedOutputs } from "@/lib/storage/guest";
import { Heart, Clock, Bookmark, ArrowRight, Shield, Sparkles } from "lucide-react";

export default function DashboardOverviewPage() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    setFavoriteSlugs(getLocalFavorites());
    setRecentSlugs(getRecentTools());
    setSavedCount(getLocalSavedOutputs().length);

    const handleUpdate = () => {
      setFavoriteSlugs(getLocalFavorites());
      setRecentSlugs(getRecentTools());
      setSavedCount(getLocalSavedOutputs().length);
    };

    window.addEventListener("kunalistic_storage_update", handleUpdate);
    return () => window.removeEventListener("kunalistic_storage_update", handleUpdate);
  }, []);

  const favoriteTools = favoriteSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => !!t);

  const recentTools = recentSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => !!t);

  const quickTools = getFeaturedTools().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
          Personal Toolbox
        </h1>
        <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.65)] mt-1">
          Your favorited utilities, recent usage, and saved outputs saved directly in your private session.
        </p>
      </div>

      <DashboardNav />

      {/* Stats Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(200,190,250,0.08)] text-[#C8BEFA] flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[rgba(200,190,250,0.6)]">Favorited Tools</p>
            <p className="text-xl font-bold text-[#C8BEFA]">{favoriteTools.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(200,190,250,0.08)] text-[#C8BEFA] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[rgba(200,190,250,0.6)]">Recently Used</p>
            <p className="text-xl font-bold text-[#C8BEFA]">{recentTools.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(200,190,250,0.08)] text-[#C8BEFA] flex items-center justify-center">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[rgba(200,190,250,0.6)]">Saved AI Outputs</p>
            <p className="text-xl font-bold text-[#C8BEFA]">{savedCount}</p>
          </div>
        </div>
      </div>

      {/* Favorited Section */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C8BEFA]" />
            <span>My Favorite Tools</span>
          </h2>
          <Link href="/dashboard/favorites" className="text-xs text-[#C8BEFA] hover:underline">
            View All
          </Link>
        </div>

        {favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-center space-y-2">
            <p className="text-xs text-[rgba(200,190,250,0.7)]">You haven&apos;t favorited any tools yet.</p>
            <p className="text-xs text-[rgba(200,190,250,0.45)]">Click the heart icon on any tool card to keep it accessible right here.</p>
          </div>
        )}
      </div>

      {/* Recently Used Section */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C8BEFA]" />
            <span>Recently Opened Tools</span>
          </h2>
          <Link href="/dashboard/history" className="text-xs text-[#C8BEFA] hover:underline">
            View History
          </Link>
        </div>

        {recentTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-center space-y-2">
            <p className="text-xs text-[rgba(200,190,250,0.7)]">No recent history recorded.</p>
            <p className="text-xs text-[rgba(200,190,250,0.45)]">When you use tools, they will appear here for fast re-access.</p>
          </div>
        )}
      </div>

      {/* Recommended Quick Tools */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C8BEFA]" />
          <span>Quick Launch Utilities</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
