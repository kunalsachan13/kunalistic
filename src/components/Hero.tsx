'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Play, Compass } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, MailIcon } from './Icons';

interface HeroProps {
  appsCount: number;
  totalViews: number;
}

const ROTATING_DISCIPLINES = [
  '3D Motion Graphics',
  'Bespoke Web Applications',
  'Cinematic Digital Interfaces',
  'Production SaaS MVPs',
  'Fluid Creative Code',
];

export default function Hero({ appsCount, totalViews }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_DISCIPLINES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Monochromatic atmospheric ambient glows */}
      <div className="glow-ambient w-[700px] h-[700px] bg-white/[0.035] top-[-120px] left-[50%] -translate-x-1/2 animate-glow-pulse" />
      <div className="glow-ambient w-[450px] h-[450px] bg-white/[0.02] bottom-[-50px] left-[15%]" />
      <div className="glow-ambient w-[400px] h-[400px] bg-white/[0.02] top-[40%] right-[10%]" />

      {/* Subtle architectural dot matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Background Kinetic Orbital Rings (3D Motion Aesthetics) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none opacity-20 hidden md:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full border border-dashed border-white/20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#fff]" />
          <div className="absolute bottom-10 right-16 w-2 h-2 rounded-full bg-zinc-400" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[120px] rounded-full border border-white/10"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Creator Identity Mark (Transparent Cutout Logo with Atmospheric Halo) */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3.5 px-4 py-1.5 rounded-full bg-[#101014]/90 border border-white/15 text-xs font-mono text-zinc-300 shadow-levitate-sm mb-7 backdrop-blur-xl group hover:border-white/30 transition-all duration-300"
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
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            3D MOTION & CREATIVE LABS
          </span>
        </motion.div>

        {/* Dynamic Kinetic Headline */}
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
            Digital Craft.{' '}
            <span className="gradient-text-noir block sm:inline">
              Cinematic Motion.
            </span>
          </h1>

          {/* Morphing Kinetic Focus Discipline Banner */}
          <div className="h-12 sm:h-16 flex items-center justify-center mt-3 sm:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-levitate-sm"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span
                  className="text-base sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-space), monospace" }}
                >
                  {ROTATING_DISCIPLINES[index]}
                </span>
                <span className="text-zinc-500 font-mono text-xs hidden sm:inline">✦</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle (Refined Editorial Tone) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Welcome to <strong className="text-white font-medium">Kunalistic</strong> — an independent digital laboratory directed by Kunal. We engineer production web software, tactile 3D interactive experiences, and fluid motion graphics built to captivate.
        </motion.p>

        {/* Tactile Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
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
            <span>Commission Project</span>
          </a>
        </motion.div>

        {/* Floating Social Contact Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          <a
            href="https://www.instagram.com/kunalistic.io/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white text-xs font-mono transition-all duration-200 group"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>@kunalistic.io</span>
          </a>

          <a
            href="https://www.youtube.com/@KuNaListic"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white text-xs font-mono transition-all duration-200 group"
          >
            <YoutubeIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>@KuNaListic</span>
          </a>

          <a
            href="mailto:kunalsachan13@gmail.com"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white text-xs font-mono transition-all duration-200 group"
          >
            <MailIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>kunalsachan13@gmail.com</span>
          </a>
        </motion.div>

        {/* Bento Floating Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto"
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
              Curated & Deployed
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
              Code & Motion
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Bespoke Architecture
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
            <span>3D Motion Graphics & Animation</span>
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

