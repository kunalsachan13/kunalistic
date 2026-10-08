'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, RefreshCw, PlusCircle, Layers } from 'lucide-react';
import { AppItem } from '@/types';
import AppCard from './AppCard';
import AppDetailModal from './AppDetailModal';

interface AppsShowcaseProps {
  initialApps: AppItem[];
}

export default function AppsShowcase({ initialApps }: AppsShowcaseProps) {
  const [apps, setApps] = useState<AppItem[]>(initialApps);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialApps.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [initialApps]);

  // Filtered apps based on search & category
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        app.title.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.tagline?.toLowerCase().includes(query) ||
        app.tech_stack?.some((t) => t.toLowerCase().includes(query)) ||
        app.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  const refreshApps = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/apps');
      const data = await res.json();
      if (data.success && data.data) {
        setApps(data.data);
      }
    } catch (e) {
      console.error('Failed to refresh apps', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLikeApp = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, likes_count: a.likes_count + 1 } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp((prev) => (prev ? { ...prev, likes_count: prev.likes_count + 1 } : null));
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-28 relative">
      {/* Background subtle spot */}
      <div className="glow-ambient w-[500px] h-[500px] bg-white/[0.02] top-[20%] left-[-100px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Clean non-technical language) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-zinc-300 border border-white/10 mb-3">
              <span>// CURATED REPOSITORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Production Showcase.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2.5 max-w-xl font-normal leading-relaxed">
              Explore deployed applications crafted for utility, speed, and refined aesthetics. Launch live demos or inspect source code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshApps}
              disabled={isRefreshing}
              className="p-3 rounded-full bg-[#101014] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all shadow-levitate-sm disabled:opacity-50"
              title="Refresh Catalog"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>
            <a
              href="#request-app"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-all shadow-levitate-sm hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Commission an App</span>
            </a>
          </div>
        </div>

        {/* Filter Bar & Search Field */}
        <div className="glass-panel-floating rounded-2xl p-3 sm:p-4 mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs (Monochrome Glider) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-white rounded-xl shadow-md shadow-white/10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & App Count */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search showcase..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2 rounded-xl bg-[#08080a] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-[11px] font-mono"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/5">
                  /
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-zinc-400 shrink-0">
              <Layers className="w-3.5 h-3.5 text-zinc-300" />
              <span>{filteredApps.length} Apps</span>
            </div>
          </div>

        </div>

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onOpenDetails={(selected) => setSelectedApp(selected)}
                  onLiked={handleLikeApp}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : apps.length === 0 ? (
          <div className="glass-panel-floating rounded-3xl p-12 text-center max-w-lg mx-auto my-12 border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-[#101014] border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-300 shadow-inner">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Showcase Catalog Empty
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-mono leading-relaxed">
              New production applications and MVPs will appear here as they are deployed. Have a bespoke project you need built?
            </p>
            <a
              href="#request-app"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all shadow-levitate-sm hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Commission an Application</span>
            </a>
          </div>
        ) : (
          <div className="glass-panel-floating rounded-2xl p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Filter className="w-5 h-5 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold text-white">No applications match</h3>
            <p className="text-xs text-zinc-400 mt-2 font-mono leading-relaxed">
              No results found for &ldquo;{searchQuery}&rdquo;. Try another term or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 rounded-full text-xs font-mono font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* App Details Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onLike={handleLikeApp}
      />
    </section>
  );
}
