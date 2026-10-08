'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Check, Eye, Heart, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { AppItem } from '@/types';

interface AppDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
  onLike: (appId: string) => void;
}

export default function AppDetailModal({ app, onClose, onLike }: AppDetailModalProps) {
  if (!app) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Soft Dimmed Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Floating Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl glass-panel-floating bg-[#0d0d12] rounded-3xl border border-white/15 shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.06)] overflow-hidden z-10 my-8"
        >
          {/* Header Banner Thumbnail */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#09090c]">
            {app.thumbnail_url ? (
              <img
                src={app.thumbnail_url}
                alt={app.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#0a0a0d] via-[#121216] to-[#1c1c22] flex items-center justify-center">
                <Layers className="w-16 h-16 text-white/20" />
              </div>
            )}
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Badges */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/80 text-white border border-white/15 backdrop-blur-md">
                  {app.category}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-black/80 text-zinc-300 border border-white/15 backdrop-blur-md">
                  <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'live' ? 'bg-white animate-pulse' : 'bg-zinc-400'}`} />
                  {app.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-300 bg-black/70 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  {app.views_count.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-white fill-white/40" />
                  {app.likes_count.toLocaleString()} likes
                </span>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Tagline */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/10 mb-2">
                Application Overview
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                {app.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-medium mt-1">
                {app.tagline}
              </p>
            </div>

            {/* Overview Description */}
            <div className="text-zinc-300 text-sm leading-relaxed border-t border-white/10 pt-5">
              <h3 className="text-xs uppercase tracking-widest font-mono text-zinc-400 mb-2">
                About the Application
              </h3>
              <p className="leading-relaxed text-zinc-300/90">{app.description}</p>
            </div>

            {/* Highlights Bento */}
            {app.features && app.features.length > 0 && (
              <div className="border-t border-white/10 pt-5">
                <h3 className="text-xs uppercase tracking-widest font-mono text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Key Features & Architecture</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {app.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-zinc-200 bg-[#121217] p-3 rounded-xl border border-white/10 shadow-sm"
                    >
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies / Capabilities */}
            {app.tech_stack && app.tech_stack.length > 0 && (
              <div className="border-t border-white/10 pt-5">
                <h3 className="text-xs uppercase tracking-widest font-mono text-zinc-400 mb-3">
                  Capabilities & Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {app.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#141418] text-zinc-200 border border-white/10 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Action Dock */}
            <div className="border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onLike(app.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>Upvote ({app.likes_count})</span>
              </button>

              <div className="flex items-center gap-3">
                {app.github_url && (
                  <a
                    href={app.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono font-semibold border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {app.live_url && (
                  <a
                    href={app.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold shadow-md shadow-white/15 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
