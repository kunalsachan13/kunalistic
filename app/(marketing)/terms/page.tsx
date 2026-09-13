import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Kunalistic",
  description: "Terms of service and acceptable usage guidelines for Kunalistic.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.65)] mt-2">
          Last updated: September 2026
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] space-y-6 text-xs sm:text-sm text-[rgba(200,190,250,0.75)] leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-[#C8BEFA] mb-2">1. Use of the Services</h2>
          <p>
            Kunalistic grants you a free, non-exclusive license to utilize all publicly available web utilities for personal and commercial purposes.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#C8BEFA] mb-2">2. Voluntary Creator Support</h2>
          <p>
            Contributions made through the /support page are voluntary gifts to support development. They do not constitute a purchase of securities, commercial equity, or subscription entitlements.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#C8BEFA] mb-2">3. Disclaimer of Warranties</h2>
          <p>
            Kunalistic is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. While we rigorously test all utilities, users are encouraged to maintain independent backups of critical files.
          </p>
        </div>
      </div>
    </div>
  );
}
