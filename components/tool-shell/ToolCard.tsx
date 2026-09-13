"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { ToolDefinition } from "@/lib/registry/types";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Badge } from "@/components/ui/Badge";
import { getLocalFavorites, toggleLocalFavorite } from "@/lib/storage/guest";

interface ToolCardProps {
  tool: ToolDefinition;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favs = getLocalFavorites();
    setIsFavorited(favs.includes(tool.slug));

    const handleUpdate = () => {
      setIsFavorited(getLocalFavorites().includes(tool.slug));
    };
    window.addEventListener("kunalistic_storage_update", handleUpdate);
    return () => window.removeEventListener("kunalistic_storage_update", handleUpdate);
  }, [tool.slug]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleLocalFavorite(tool.slug);
    setIsFavorited(newState);
  };

  const isComingSoon = tool.status === "coming-soon";

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] hover:bg-[rgba(200,190,250,0.08)] hover:border-[rgba(200,190,250,0.32)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-200"
    >
      <div>
        {/* Card Header: Icon, Tags, Favorite */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-10 h-10 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.18)] flex items-center justify-center text-[#C8BEFA] group-hover:bg-[#C8BEFA] group-hover:text-[#151130] transition-all">
            <DynamicIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {isComingSoon ? (
              <Badge variant="subtle" size="sm">Soon</Badge>
            ) : tool.featured ? (
              <Badge variant="active" size="sm">Popular</Badge>
            ) : (
              <Badge variant="default" size="sm">{tool.category}</Badge>
            )}

            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isFavorited
                  ? "bg-[rgba(200,190,250,0.2)] border-[rgba(200,190,250,0.4)] text-[#C8BEFA]"
                  : "bg-transparent border-transparent text-[rgba(200,190,250,0.4)] hover:text-[#C8BEFA]"
              }`}
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title & Short Description */}
        <h3 className="text-base font-semibold text-[#C8BEFA] tracking-tight group-hover:underline decoration-[rgba(200,190,250,0.4)]">
          {tool.name}
        </h3>
        <p className="text-xs text-[rgba(200,190,250,0.62)] mt-1.5 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Card Footer: tags and open arrow */}
      <div className="pt-4 mt-4 border-t border-[rgba(200,190,250,0.08)] flex items-center justify-between text-[11px] text-[rgba(200,190,250,0.45)]">
        <span className="truncate max-w-[150px]">
          {tool.tags.slice(0, 2).map((t) => `#${t}`).join(" ")}
        </span>
        <div className="flex items-center gap-1 text-[#C8BEFA] font-medium group-hover:translate-x-0.5 transition-transform">
          <span>{isComingSoon ? "Preview" : "Open"}</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
};
