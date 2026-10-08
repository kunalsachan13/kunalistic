import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, ArrowLeft, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service, client licensing agreements, and studio policies for Kunalistic.',
};

export default function TermsPage() {
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
          <Scale className="w-3 h-3 text-white" />
          <span>LEGAL AGREEMENT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Syne',sans-serif] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-neutral-500 mt-2">
          Last Updated: October 8, 2026 • Version 2.0
        </p>

        <div className="mt-12 space-y-10 text-neutral-300 text-sm leading-relaxed">
          {/* Agreement */}
          <section className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="text-lg font-bold text-white font-['Syne',sans-serif] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the services provided by <strong>Kunalistic</strong> (&quot;the Studio&quot;), including exploring our showcase applications and submitting custom commission requests, you agree to comply with and be legally bound by these Terms of Service.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">
              2. Intellectual Property & Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider">
                  Showcase Projects
                </h3>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Applications published in the Kunalistic showcase are proprietary digital artifacts. Demos are open for interaction and testing, but source code is protected under corresponding repository licenses.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider">
                  Client Commissioned Code
                </h3>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Upon completion of commissioned projects and receipt of agreed milestones, full ownership of the bespoke source code and deployed assets transitions directly to the client as outlined in individual contract agreements.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">
              3. Acceptable Use
            </h2>
            <p>
              When interacting with the platform or submitting briefs, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400 font-mono">
              <li>Submit malicious payloads, unauthorized automated bots, or spam requests.</li>
              <li>Attempt to reverse-engineer or breach administrative gateways or database systems.</li>
              <li>Impersonate individuals or organizations in project commissioning briefs.</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="text-lg font-bold text-white font-['Syne',sans-serif]">
              4. Disclaimer of Warranties & Limitation of Liability
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Showcase applications and interactive demonstrations are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. Kunalistic will not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white font-['Syne',sans-serif]">
              5. Contact & Governance
            </h2>
            <p className="text-xs text-neutral-400">
              Questions regarding these Terms should be sent to <span className="text-white font-mono">legal@kunalistic.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
