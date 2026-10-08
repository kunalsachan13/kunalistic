'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  appsCount: number;
  totalViews: number;
}

export default function Hero({ appsCount, totalViews }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Monochromatic atmospheric ambient glows */}
      <div className="glow-ambient w-[650px] h-[650px] bg-white/[0.03] top-[-100px] left-[50%] -translate-x-1/2 animate-glow-pulse" />
      <div className="glow-ambient w-[450px] h-[450px] bg-white/[0.02] bottom-[-50px] left-[20%]" />

      {/* Subtle architectural dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Creator Identity Mark (Transparent Cutout Logo with Atmospheric Halo) */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3.5 px-4 py-1.5 rounded-full bg-[#101014]/90 border border-white/15 text-xs font-mono text-zinc-300 shadow-levitate-sm mb-8 backdrop-blur-xl group hover:border-white/30 transition-all duration-300"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-black/80 border border-white/20 shrink-0 flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="Kunal"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <span className="text-zinc-400">ARCHITECTED BY KUNAL</span>
          <span className="text-white/20">|</span>
          <span className="text-white font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            BESPOKE SOFTWARE LABS
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.04]"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Digital Artifacts. <br />
            <span className="gradient-text-noir">
              Engineered In The Shadows.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle (Refined Editorial Tone) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Welcome to <strong className="text-white font-medium">Kunalistic</strong> — an independent digital laboratory crafting production web applications, bespoke interactive platforms, and custom software MVPs.
        </motion.p>

        {/* Tactile Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#showcase"
            className="group px-7 py-3.5 rounded-full font-semibold text-black text-sm bg-white hover:bg-zinc-200 shadow-levitate hover:shadow-glow-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-antigravity flex items-center gap-2"
          >
            <span>Explore Showcase</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#request-app"
            className="px-7 py-3.5 rounded-full font-semibold text-zinc-200 hover:text-white text-sm bg-[#121216]/80 hover:bg-[#18181e] border border-white/15 hover:border-white/30 shadow-levitate-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-antigravity flex items-center gap-2 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>Commission Custom MVP</span>
          </a>
        </motion.div>

        {/* Bento Floating Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto"
        >
          {/* Metric 1 */}
          <div className="glass-panel-floating rounded-2xl p-5 text-center relative overflow-hidden group hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ease-antigravity">
            <div
              className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              {appsCount > 0 ? `${appsCount}` : '0'}
            </div>
            <div className="text-xs font-mono font-medium text-zinc-400 mt-1 uppercase tracking-wider">
              Live Applications
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Curated & Maintained
            </div>
          </div>

          {/* Metric 2 */}
          <div className="glass-panel-floating rounded-2xl p-5 text-center relative overflow-hidden group hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ease-antigravity">
            <div
              className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              100%
            </div>
            <div className="text-xs font-mono font-medium text-zinc-400 mt-1 uppercase tracking-wider">
              Bespoke Architecture
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Zero Generic Templates
            </div>
          </div>

          {/* Metric 3 */}
          <div className="glass-panel-floating rounded-2xl p-5 text-center relative overflow-hidden group hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ease-antigravity">
            <div
              className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              {totalViews > 0 ? `${totalViews.toLocaleString()}` : '0'}
            </div>
            <div className="text-xs font-mono font-medium text-zinc-400 mt-1 uppercase tracking-wider">
              Product Impressions
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Tested by Global Users
            </div>
          </div>

          {/* Metric 4 */}
          <div className="glass-panel-floating rounded-2xl p-5 text-center relative overflow-hidden group hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ease-antigravity">
            <div
              className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              24-48h
            </div>
            <div className="text-xs font-mono font-medium text-zinc-400 mt-1 uppercase tracking-wider">
              Blueprint Response
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Direct Founder Scoping
            </div>
          </div>
        </motion.div>

        {/* Quality Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
            <span>Interactive Live Demonstrations</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
            <span>Tactile Community Upvoting</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
            <span>Direct Client Commission Pipeline</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
}
