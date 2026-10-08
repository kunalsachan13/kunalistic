'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ExternalLink, Heart, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { AppItem } from '@/types';

interface AppCardProps {
  app: AppItem;
  onOpenDetails: (app: AppItem) => void;
  onLiked: (appId: string) => void;
}

export default function AppCard({ app, onOpenDetails, onLiked }: AppCardProps) {
  const [likes, setLikes] = useState(app.likes_count);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked || isLiking) return;

    // Trigger subtle monochrome + silver confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a'],
    });

    // Optimistic update
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    setIsLiking(true);

    try {
      const res = await fetch(`/api/apps/${app.id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success && data.likes_count) {
        setLikes(data.likes_count);
      }
      onLiked(app.id);
    } catch (err) {
      console.error('Error liking app:', err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpenDetails(app)}
      className="glass-panel-floating rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full group relative transition-all duration-300 ease-antigravity hover:border-white/30 hover:shadow-levitate-lg"
    >
      {/* Featured Ribbon (Monochrome Luxury) */}
      {app.featured && (
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[10px] font-black tracking-wider uppercase shadow-md shadow-white/10 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-black fill-black" />
          <span>Featured</span>
        </div>
      )}

      {/* Card Image Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0c0c10]">
        {app.thumbnail_url ? (
          <img
            src={app.thumbnail_url}
            alt={app.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#0a0a0d] via-[#121216] to-[#1a1a20] flex items-center justify-center relative overflow-hidden">
            <span className="text-4xl font-extrabold text-white/20 font-mono tracking-tight group-hover:scale-110 transition-transform duration-500">
              {app.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/30 to-transparent" />

        {/* Category Pill and Live Status */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-medium bg-black/75 text-zinc-300 border border-white/10 backdrop-blur-md">
            {app.category}
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/75 text-zinc-300 border border-white/10 backdrop-blur-md">
            <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'live' ? 'bg-white animate-pulse' : 'bg-zinc-400'}`} />
            {app.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title and Launch Arrow */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors tracking-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            {app.title}
          </h3>
          <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-white/10 flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>

        {/* Tagline / Purpose */}
        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
          {app.tagline || app.description}
        </p>

        {/* Feature / Concept Badges (Clean non-technical tags) */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.tech_stack?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-[#141418] text-zinc-300 border border-white/10 group-hover:border-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
          {app.tech_stack && app.tech_stack.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-[#141418]/60 text-zinc-500 border border-white/5">
              +{app.tech_stack.length - 3}
            </span>
          )}
        </div>

        {/* Card Footer Bar */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1 font-mono text-zinc-400">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              {app.views_count}
            </span>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 font-mono px-2 py-1 rounded-full text-xs transition-all ${
                hasLiked
                  ? 'bg-white/10 text-white font-bold border border-white/20'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                  hasLiked ? 'fill-white text-white' : ''
                }`}
              />
              <span>{likes}</span>
            </button>
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {app.github_url && (
              <a
                href={app.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                title="View Source Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {app.live_url && (
              <a
                href={app.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-all hover:scale-105 shadow-sm"
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
