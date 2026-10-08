'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-4 sm:pt-6 px-4 sm:px-6">
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0d]/90 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.03)] py-2.5 px-4 sm:px-6'
            : 'bg-[#0d0d12]/75 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-white/40 rounded-full pr-2">
            {/* Transparent Avatar Icon with Subtle Halo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 bg-[#08080a] shadow-sm shadow-white/10 group-hover:border-white/50 transition-all duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center">
              <Image
                src="/icon.png"
                alt="Kunalistic Logo"
                width={36}
                height={36}
                priority
                className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span
                className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-zinc-200 transition-colors"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                KUNALISTIC
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase -mt-0.5">
                Software Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
            <a
              href="#showcase"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
            >
              Apps Showcase
            </a>

            <a
              href="#request-app"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/30"
            >
              Commission Project
            </a>

            <div className="mx-1 h-3.5 w-px bg-white/10" />

            {/* Studio Availability Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Available for Work</span>
            </div>
          </nav>

          {/* Right Action Island */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="#request-app"
              className="px-5 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 shadow-sm shadow-white/10 hover:shadow-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span>Commission App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/30"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Detached Floating Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden max-w-sm mx-auto mt-2 rounded-3xl bg-[#0d0d12]/95 backdrop-blur-2xl border border-white/15 p-4 shadow-2xl space-y-2"
          >
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              Apps Showcase
            </a>
            <a
              href="#request-app"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              Commission Project
            </a>
            <div className="pt-2 border-t border-white/10 flex items-center justify-center px-2 text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Available for Work
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
