import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 pt-10 pb-12 relative overflow-hidden">
      {/* Detached Floating Footer Island (Monochrome Luxury) */}
      <div className="max-w-5xl mx-auto rounded-3xl glass-panel-floating border border-white/10 p-6 sm:p-10 shadow-levitate">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Studio Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-[#08080a] shadow-sm shadow-white/5 shrink-0 flex items-center justify-center">
              <Image
                src="/icon.png"
                alt="Kunalistic Logo"
                width={36}
                height={36}
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-extrabold text-base tracking-tight text-white"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  KUNALISTIC
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-white/10 text-zinc-300 border border-white/15">
                  Studio
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                Architected & Engineered by Kunal
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400">
            <a
              href="/#showcase"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Showcase
            </a>
            <a
              href="/#request-app"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Commission
            </a>
            <Link
              href="/privacy"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>

          {/* Operational Availability */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Available for Commissions</span>
          </div>

        </div>

        {/* Bottom divider */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Kunalistic. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Designed in the Shadows</span>
            <span>•</span>
            <span className="text-white font-medium">Built to Defy Gravity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
