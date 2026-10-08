'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col items-center justify-center p-6 relative font-['Inter',sans-serif]">
      <div className="max-w-md w-full bg-[#0e0e12] rounded-3xl p-8 border border-white/10 text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            SYSTEM ANOMALY
          </span>
          <h2 className="text-2xl font-bold text-white font-['Syne',sans-serif] mt-1">
            Execution Interrupted
          </h2>
          <p className="text-xs text-neutral-400 mt-2 font-mono leading-relaxed">
            An unexpected error occurred during rendering. The issue has been captured in local diagnostics.
          </p>
        </div>

        {error.digest && (
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-neutral-500">
            Digest: {error.digest}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
