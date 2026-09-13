"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Heart, Share2, HelpCircle, Shield, Sparkles, Check } from "lucide-react";
import { ToolDefinition } from "@/lib/registry/types";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ToolCard } from "./ToolCard";
import { getRelatedTools } from "@/lib/registry";
import { getLocalFavorites, toggleLocalFavorite, recordRecentTool } from "@/lib/storage/guest";

interface ToolShellProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({ tool, children }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [shared, setShared] = useState(false);
  const related = getRelatedTools(tool.slug, 3);

  useEffect(() => {
    recordRecentTool(tool.slug);
    setIsFavorited(getLocalFavorites().includes(tool.slug));

    const handleUpdate = () => {
      setIsFavorited(getLocalFavorites().includes(tool.slug));
    };
    window.addEventListener("kunalistic_storage_update", handleUpdate);
    return () => window.removeEventListener("kunalistic_storage_update", handleUpdate);
  }, [tool.slug]);

  const handleFavoriteToggle = () => {
    const newState = toggleLocalFavorite(tool.slug);
    setIsFavorited(newState);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Fallback
    }
  };

  const isComingSoon = tool.status === "coming-soon";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-[rgba(200,190,250,0.5)] mb-6">
        <Link href="/" className="hover:text-[#C8BEFA] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/tools" className="hover:text-[#C8BEFA] transition-colors">
          Tools
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/categories/${tool.category}`} className="hover:text-[#C8BEFA] capitalize transition-colors">
          {tool.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#C8BEFA] font-medium truncate">{tool.name}</span>
      </nav>

      {/* 2. Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[rgba(200,190,250,0.12)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.22)] flex items-center justify-center text-[#C8BEFA] shrink-0">
            <DynamicIcon name={tool.icon} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C8BEFA]">
                {tool.name}
              </h1>
              {isComingSoon ? (
                <Badge variant="subtle" size="md">Coming Soon</Badge>
              ) : tool.featured ? (
                <Badge variant="active" size="md">Featured</Badge>
              ) : (
                <Badge variant="default" size="md">{tool.category}</Badge>
              )}
            </div>
            <p className="text-sm text-[rgba(200,190,250,0.65)] mt-1.5 leading-relaxed max-w-2xl">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFavoriteToggle}
            className="gap-1.5"
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#C8BEFA] text-[#C8BEFA]" : ""}`} />
            <span className="hidden sm:inline">{isFavorited ? "Favorited" : "Favorite"}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="gap-1.5"
            title="Copy share link"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C8BEFA]" />
                <span className="hidden sm:inline">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 3. Privacy & Processing Badge */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[rgba(200,190,250,0.55)] bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.08)] px-3 py-1.5 rounded-lg w-fit">
        <Shield className="w-3.5 h-3.5 text-[#C8BEFA]" />
        <span>
          {tool.requiresAI
            ? "Server-side structured AI generation • Zero permanent data logging"
            : "100% In-browser execution • Your files never leave your device"}
        </span>
      </div>

      {/* 4. Tool Workspace (Micro-app Content) */}
      <div className="bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] mb-12">
        {isComingSoon ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.2)] flex items-center justify-center text-[#C8BEFA] mx-auto mb-4">
              <DynamicIcon name={tool.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#C8BEFA] mb-2">Tool Under Development</h3>
            <p className="text-xs text-[rgba(200,190,250,0.6)] mb-6 leading-relaxed">
              {tool.longDescription} This micro-app is being engineered for high-performance client-side execution.
            </p>
            <div className="inline-flex items-center gap-2 text-xs bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.2)] px-4 py-2 rounded-full text-[#C8BEFA]">
              <span>Status: In Active Sprint</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* 5. Tool FAQ Section (if available) */}
      {tool.faq && tool.faq.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#C8BEFA]" />
            <h2 className="text-base font-semibold text-[#C8BEFA]">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-xs"
              >
                <p className="font-semibold text-[#C8BEFA] mb-1.5">{item.question}</p>
                <p className="text-[rgba(200,190,250,0.6)] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Subtle Voluntary Support Callout */}
      <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <h4 className="text-sm font-semibold text-[#C8BEFA] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C8BEFA]" />
            <span>Find this tool helpful?</span>
          </h4>
          <p className="text-xs text-[rgba(200,190,250,0.6)] mt-1 max-w-xl">
            Kunalistic is 100% free with no subscriptions. If it saved you time, you can voluntarily support the creator to help keep it running.
          </p>
        </div>
        <Link href="/support">
          <Button variant="secondary" size="sm">
            Support Kunalistic
          </Button>
        </Link>
      </div>

      {/* 7. Related Tools Section */}
      {related.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.6)] mb-4">
            Related Utilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
