"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ToolCard } from "@/components/tool-shell/ToolCard";
import { Button } from "@/components/ui/Button";
import { getToolBySlug } from "@/lib/registry";
import { getRecentTools } from "@/lib/storage/guest";
import { History, Trash2 } from "lucide-react";

export default function HistoryDashboardPage() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    setRecentSlugs(getRecentTools());
    const handleUpdate = () => setRecentSlugs(getRecentTools());
    window.addEventListener("kunalistic_storage_update", handleUpdate);
    return () => window.removeEventListener("kunalistic_storage_update", handleUpdate);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("kunalistic_recent_tools");
    setRecentSlugs([]);
  };

  const tools = recentSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
            Tool History
          </h1>
          <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.65)] mt-1">
            Chronological record of utilities you have recently opened and used.
          </p>
        </div>

        {tools.length > 0 && (
          <Button variant="secondary" size="sm" onClick={handleClearHistory} className="gap-1.5 self-start">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </Button>
        )}
      </div>

      <DashboardNav />

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-center max-w-md mx-auto space-y-4">
          <History className="w-10 h-10 text-[rgba(200,190,250,0.3)] mx-auto" />
          <h2 className="text-base font-semibold text-[#C8BEFA]">No Recent History</h2>
          <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
            As you use tools across Kunalistic, your recent activity will be remembered here for easy access.
          </p>
          <Link href="/tools">
            <Button variant="primary" size="sm">
              Explore Tools
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
