'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Shield } from 'lucide-react';

const STORAGE_KEY = 'kunalistic_cookie_consent_v1';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const savedChoice = localStorage.getItem(STORAGE_KEY);
      if (!savedChoice) {
        // Small delay so it smoothly floats in after page load
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access denied or private mode
    }
  }, []);

  const handleChoice = (preference: 'all' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        choice: preference,
        timestamp: new Date().toISOString()
      }));
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: preference }));
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)]"
        >
          <div className="bg-[#0e0e12]/95 backdrop-blur-xl border border-white/15 p-5 sm:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-xs text-neutral-300 font-['Inter',sans-serif] space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white font-['Syne',sans-serif] text-sm">
                    Cookie & Privacy Notice
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400">Minimal Telemetry Standards</p>
                </div>
              </div>
              <button
                onClick={() => handleChoice('essential')}
                className="p-1 rounded-lg text-neutral-500 hover:text-white transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-neutral-400 leading-relaxed text-[11px]">
              We use strictly essential cookies for secure administration sessions and anonymous telemetry to measure showcase interactions. Review our{' '}
              <Link href="/privacy" className="text-white underline hover:text-neutral-200">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-white underline hover:text-neutral-200">
                Terms
              </Link>.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleChoice('all')}
                className="flex-1 py-2 px-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-sm active:scale-[0.99]"
              >
                Accept All
              </button>
              <button
                onClick={() => handleChoice('essential')}
                className="flex-1 py-2 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-semibold text-xs transition-all active:scale-[0.99]"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
