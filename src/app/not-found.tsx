import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Compass, Search, Home, PlusCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Inter',sans-serif] selection:bg-white selection:text-black">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        {/* Silhouette Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto shadow-inner">
          <Image
            src="/icon.png"
            alt="Kunalistic Logo"
            width={38}
            height={38}
            className="opacity-80"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-['Space_Grotesk',monospace] text-neutral-400 uppercase tracking-widest">
          <Compass className="w-3 h-3 text-white" />
          <span>ERROR 404 • UNCHARTED PATH</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Syne',sans-serif] tracking-tight">
          Artifact Not Found
        </h1>

        <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-sm mx-auto">
          The requested coordinate or digital artifact does not exist in this sector. It may have been moved, decommissioned, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-sm flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Showcase</span>
          </Link>

          <Link
            href="/#request-app"
            className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Commission an App</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
