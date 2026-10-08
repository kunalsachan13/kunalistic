'use client';

import React from 'react';
import { Sparkles, Layers, ArrowUpRight, Compass, Shield, Check } from 'lucide-react';

const TICKER_ITEMS = [
  { text: 'BESPOKE WEB APPLICATIONS', tag: 'CRAFT' },
  { text: 'DIGITAL PRODUCT DESIGN', tag: 'UX' },
  { text: 'RAPID PROTOTYPING & MVPS', tag: 'VELOCITY' },
  { text: 'HIGH-PERFORMANCE INTERFACES', tag: 'POLISH' },
  { text: 'TAILORED CLIENT COMMISSIONS', tag: 'STUDIO' },
  { text: 'ARCHITECTURAL MINIMALISM', tag: 'NOIR' },
  { text: 'IMMERSIVE EXPERIENCES', tag: 'LIVE' },
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full py-3.5 overflow-hidden border-y border-white/[0.08] bg-[#0a0a0d]/60 backdrop-blur-md select-none my-6">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6 sm:gap-10">
        {/* Double the list for infinite looping */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => {
          return (
            <div
              key={index}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-colors"
            >
              <span className="text-xs font-mono font-medium tracking-wider text-zinc-300">
                {item.text}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/10 text-zinc-300 border border-white/15">
                {item.tag}
              </span>
              <span className="text-white/30 font-mono">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
