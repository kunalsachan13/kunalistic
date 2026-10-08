import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection standards for Kunalistic bespoke software laboratory.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col font-['Inter',sans-serif] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Showcase</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-['Space_Grotesk',monospace] text-neutral-400 uppercase tracking-widest mb-4">
          <Shield className="w-3 h-3 text-white" />
          <span>LEGAL COMPLIANCE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Syne',sans-serif] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-neutral-500 mt-2">
          Effective Date: October 8, 2026 • Version 2.0
        </p>

        <div className="mt-12 space-y-10 text-neutral-300 text-sm leading-relaxed">
          {/* Overview */}
          <section className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="text-lg font-bold text-white font-['Syne',sans-serif] flex items-center gap-2">
              <Lock className="w-4 h-4 text-white" />
              1. Overview & Commitment to Privacy
            </h2>
            <p>
              At <strong>Kunalistic</strong> (&quot;the Studio&quot;, &quot;we&quot;, &quot;our&quot;), we operate under a strict principle of digital privacy, minimal telemetry, and zero unneeded surveillance. This Privacy Policy details how we handle information submitted when you browse our showcase, interact with live demonstrations, or commission a bespoke software application.
            </p>
          </section>

          {/* Data Collected */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">
              2. Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-semibold text-white text-xs font-mono uppercase tracking-wider">
                  A. Inbound Project Commissions
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  When you submit a project brief through our commission form, we collect your name, email address, optional organization, project title, budget tier, and project specifications necessary to formulate blueprints and quotes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-semibold text-white text-xs font-mono uppercase tracking-wider">
                  B. Technical Telemetry
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  When upvoting applications or accessing demonstrations, we store minimal cryptographic IP hashes to prevent duplicate spam votes. We do not sell, rent, or monetize any visitor data.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">
              3. Cookies & Local Storage
            </h2>
            <p>
              We use strictly essential cookies and local storage tokens:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-400 font-mono">
              <li><strong className="text-white">Admin Session Cookie:</strong> Secures authorized console sessions with httpOnly encryption.</li>
              <li><strong className="text-white">Consent Preferences:</strong> Retains your cookie preferences in localStorage to prevent annoying recurring popups.</li>
              <li><strong className="text-white">Upvote State:</strong> Tracks which showcase apps you have endorsed locally.</li>
            </ul>
          </section>

          {/* GDPR / CCPA Rights */}
          <section className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="text-lg font-bold text-white font-['Syne',sans-serif] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              4. User Sovereignty & Legal Rights (GDPR & CCPA)
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Regardless of your geographic location, you retain full rights over any submitted information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                • <strong className="text-white">Right of Access:</strong> Request a complete record of your submitted inquiries.
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                • <strong className="text-white">Right to Erasure:</strong> Request total deletion of your custom project brief at any time.
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white font-['Syne',sans-serif]">
              5. Privacy Inquiries
            </h2>
            <p className="text-xs text-neutral-400">
              For inquiries regarding data protection or to request the deletion of a project brief, contact the studio directly via the commission pipeline or directly at <span className="text-white font-mono">privacy@kunalistic.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
