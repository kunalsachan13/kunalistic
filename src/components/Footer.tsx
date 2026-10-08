'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, MailIcon } from './Icons';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('kunalsachan13@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full px-4 sm:px-6 pt-12 pb-14 relative overflow-hidden">
      {/* Detached Floating Footer Island (Monochrome Luxury) */}
      <div className="max-w-5xl mx-auto rounded-3xl glass-panel-floating border border-white/10 p-6 sm:p-10 shadow-levitate">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Studio Identity & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-[#08080a] shadow-sm shadow-white/5 shrink-0 flex items-center justify-center group">
                <Image
                  src="/icon.png"
                  alt="Kunalistic Logo"
                  width={38}
                  height={38}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-extrabold text-lg tracking-tight text-white"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    KUNALISTIC
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-white/10 text-zinc-300 border border-white/15">
                    Creative Labs
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  Bespoke Software • 3D Motion • Interactive Systems
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-normal leading-relaxed max-w-sm">
              An independent creative engineering studio founded by Kunal. Merging high-velocity full-stack code with 3D animation and tactile digital aesthetics.
            </p>

            {/* Availability status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Available for Commissioned Projects & MVPs</span>
            </div>
          </div>

          {/* Column 2: Direct Creator Contacts & Channels (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
              // Direct Channels & Contacts
            </h4>

            <div className="flex flex-col gap-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/kunalistic.io/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-zinc-200">Instagram</div>
                    <div className="text-[10px] font-mono text-zinc-400">@kunalistic.io</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@KuNaListic"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-zinc-200">YouTube</div>
                    <div className="text-[10px] font-mono text-zinc-400">@KuNaListic</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email (with direct mailto and copy button) */}
              <div className="group flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200">
                <a
                  href="mailto:kunalsachan13@gmail.com"
                  className="flex items-center gap-3 flex-1 min-w-0"
                  title="Send Email"
                >
                  <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                    <MailIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-white group-hover:text-zinc-200">Direct Mail</div>
                    <div className="text-[10px] font-mono text-zinc-400 truncate">kunalsachan13@gmail.com</div>
                  </div>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation & Legal (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
              // Navigation
            </h4>
            
            <div className="flex flex-col gap-1.5 text-xs font-mono text-zinc-400">
              <a
                href="/#showcase"
                className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Showcase</span>
                <span className="text-[10px] text-zinc-600">01</span>
              </a>
              <a
                href="/#request-app"
                className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Commission</span>
                <span className="text-[10px] text-zinc-600">02</span>
              </a>
              <Link
                href="/privacy"
                className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Privacy</span>
                <span className="text-[10px] text-zinc-600">03</span>
              </Link>
              <Link
                href="/terms"
                className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Terms</span>
                <span className="text-[10px] text-zinc-600">04</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom divider & Studio Manifesto */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Kunalistic. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Code Meets Motion</span>
            <span>•</span>
            <span className="text-white font-medium">Forged to Defy Limits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

