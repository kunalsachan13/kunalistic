"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { getLocalSavedOutputs, LocalSavedOutput } from "@/lib/storage/guest";
import { Bookmark, Sparkles, Trash2, ArrowRight } from "lucide-react";

export default function SavedOutputsDashboardPage() {
  const [savedItems, setSavedItems] = useState<LocalSavedOutput[]>([]);

  useEffect(() => {
    setSavedItems(getLocalSavedOutputs());
    const handleUpdate = () => setSavedItems(getLocalSavedOutputs());
    window.addEventListener("kunalistic_storage_update", handleUpdate);
    return () => window.removeEventListener("kunalistic_storage_update", handleUpdate);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("kunalistic_saved_outputs");
    setSavedItems([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
            Saved AI & Utility Outputs
          </h1>
          <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.65)] mt-1">
            Reel scripts, generated hooks, and custom calculation outputs saved to your toolbox.
          </p>
        </div>

        {savedItems.length > 0 && (
          <Button variant="secondary" size="sm" onClick={handleClear} className="gap-1.5 self-start">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved Items</span>
          </Button>
        )}
      </div>

      <DashboardNav />

      {savedItems.length > 0 ? (
        <div className="space-y-4">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.5)]">
                    {item.toolName}
                  </span>
                  <h3 className="text-base font-bold text-[#C8BEFA]">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <CopyButton text={JSON.stringify(item.data, null, 2)} size="sm" label="Copy JSON" />
                  <Link href={`/tools/${item.slug}`}>
                    <Button variant="secondary" size="sm" className="gap-1">
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.08)] max-h-48 overflow-y-auto">
                <pre className="text-xs font-mono text-[rgba(200,190,250,0.8)] whitespace-pre-wrap">
                  {typeof item.data === "string" ? item.data : JSON.stringify(item.data, null, 2)}
                </pre>
              </div>

              <p className="text-[10px] text-[rgba(200,190,250,0.4)]">
                Saved on: {new Date(item.savedAt).toLocaleDateString()} at {new Date(item.savedAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-center max-w-md mx-auto space-y-4">
          <Bookmark className="w-10 h-10 text-[rgba(200,190,250,0.3)] mx-auto" />
          <h2 className="text-base font-semibold text-[#C8BEFA]">No Saved Outputs Yet</h2>
          <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
            When you generate viral reel ideas or hooks, click &ldquo;Save&rdquo; to store them here.
          </p>
          <Link href="/tools/viral-reel-idea-generator">
            <Button variant="primary" size="sm">
              Try Viral Reel Generator
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
