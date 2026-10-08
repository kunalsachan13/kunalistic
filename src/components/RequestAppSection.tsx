'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import { BudgetPreset, DEFAULT_SERVICE_TYPES } from '@/types';
import { InstagramIcon, YoutubeIcon, MailIcon } from './Icons';

const PROJECT_TYPES = DEFAULT_SERVICE_TYPES;

const DEFAULT_BUDGET_RANGES: BudgetPreset[] = [
  { id: 'b1', label: 'Under $100', tag: 'MICRO', desc: 'Proof-of-concept / single-utility MVP' },
  { id: 'b2', label: '$100 - $1,000', tag: 'CORE', desc: 'Functional prototype + interactive workflow' },
  { id: 'b3', label: '$1,000 - $5,000', tag: 'POPULAR', desc: 'Full production SaaS MVP / complete launch' },
  { id: 'b4', label: '$5,000+', tag: 'SCALE', desc: 'Bespoke multi-tier enterprise architecture' },
];

const TIMELINES = [
  'Within 1-2 Weeks',
  '2-4 Weeks',
  '1-2 Months',
  'Flexible / Open',
];

export default function RequestAppSection() {
  const [budgetPresets, setBudgetPresets] = useState<BudgetPreset[]>(DEFAULT_BUDGET_RANGES);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_company: '',
    project_title: '',
    project_type: DEFAULT_SERVICE_TYPES[0].label,
    budget_range: '$1,500 - $5,000',
    timeline: '2-4 Weeks',
    description: '',
    features_needed: '',
    preferred_tech: '',
    reference_links: '',
    bot_field: '',
  });

  React.useEffect(() => {
    fetch('/api/budget-presets')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setBudgetPresets(data.data);
          // If current budget_range is not in list, set to first one
          setFormData((prev) => {
            const exists = data.data.some((p: BudgetPreset) => p.label === prev.budget_range);
            return exists ? prev : { ...prev, budget_range: data.data[0].label };
          });
        }
      })
      .catch((err) => console.error('Failed to load dynamic budget presets', err));
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request');
      }

      // Trigger celebratory monochrome silver particle explosion
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a'],
      });

      setSubmitSuccess({ id: data.id });
      // Reset form
      setFormData({
        client_name: '',
        client_email: '',
        client_company: '',
        project_title: '',
        project_type: DEFAULT_SERVICE_TYPES[0].label,
        budget_range: '$1,500 - $5,000',
        timeline: '2-4 Weeks',
        description: '',
        features_needed: '',
        preferred_tech: '',
        reference_links: '',
        bot_field: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRequestId = () => {
    if (!submitSuccess?.id) return;
    navigator.clipboard.writeText(submitSuccess.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section id="request-app" className="py-24 relative overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="glow-ambient w-[600px] h-[600px] bg-white/[0.02] top-[15%] right-[-100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] text-zinc-300 border border-white/10 mb-3 shadow-sm">
            <span>// COMMISSIONS & CREATIVE DIRECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            Commission A Custom Project. <br />
            <span className="gradient-text-noir">
              From 3D Motion To Full-Stack Deployment.
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-normal leading-relaxed">
            Direct collaboration with founder Kunal. Provide your project parameters below or connect directly across channels to receive an architecture roadmap, motion scope, and delivery estimate.
          </p>

          {/* Quick Direct Channel Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="https://www.instagram.com/kunalistic.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>DM on Instagram</span>
            </a>

            <a
              href="https://www.youtube.com/@KuNaListic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>YouTube @KuNaListic</span>
            </a>

            <a
              href="mailto:kunalsachan13@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <MailIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>kunalsachan13@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Antigravity Floating Form Container */}
        <div className="glass-panel-floating rounded-3xl p-6 sm:p-10 border border-white/15 shadow-levitate-lg relative backdrop-blur-2xl">
          
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Honeypot Spam Bot Trap (Hidden from humans, filled by bots) */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="company_fax_trap">Leave this blank</label>
              <input
                id="company_fax_trap"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.bot_field}
                onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
              />
            </div>

            {/* Step 1: Contact Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-mono text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold">
                  01
                </span>
                <span>Contact & Identity</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                    Your Name <span className="text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                    Email Address <span className="text-white">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Company / Organization <span className="text-zinc-500 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stealth Labs, Independent Founder, Agency"
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono"
                />
              </div>
            </div>

            {/* Step 2: Project Scope */}
            <div className="space-y-4 pt-5 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-mono text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold">
                  02
                </span>
                <span>Project Scope & Archetype</span>
              </h3>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Project Title / Working Name <span className="text-zinc-500 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Velocity Analytics (Optional)"
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono"
                />
              </div>

              {/* Bento Project Type Grid */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-2">
                  Select Project / Service Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {PROJECT_TYPES.map((item) => {
                    const isSelected = formData.project_type === item.label;
                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => setFormData({ ...formData, project_type: item.label })}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-md shadow-white/10'
                            : 'bg-[#09090c]/70 border-white/10 text-zinc-400 hover:text-white hover:bg-[#09090c]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.icon}</span>
                          <span className={`text-xs font-mono font-bold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {item.label}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Detailed Project Description <span className="text-white">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what problem the product solves, the intended target audience, and primary workflow interactions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono leading-relaxed"
                />
              </div>

              {/* Features Needed */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Key Features / Must-Haves
                </label>
                <input
                  type="text"
                  placeholder="e.g. User Authentication, Stripe Payments, Interactive Charts, CSV Export"
                  value={formData.features_needed}
                  onChange={(e) => setFormData({ ...formData, features_needed: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all font-mono"
                />
              </div>
            </div>

            {/* Step 3: Budget & Timeline */}
            <div className="space-y-4 pt-5 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-mono text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold">
                  03
                </span>
                <span>Budget & Execution Timeline</span>
              </h3>

              {/* Budget Tiers */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-2">
                  Budget Allocation <span className="text-white">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {budgetPresets.map((tier) => {
                    const isSelected = formData.budget_range === tier.label;
                    return (
                      <button
                        type="button"
                        key={tier.label}
                        onClick={() => setFormData({ ...formData, budget_range: tier.label })}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-md shadow-white/10'
                            : 'bg-[#09090c]/70 border-white/10 text-zinc-400 hover:text-white hover:bg-[#09090c]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`text-xs font-mono font-bold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {tier.label}
                          </div>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
                            isSelected ? 'bg-black text-white' : 'bg-white/10 text-zinc-400'
                          }`}>
                            {tier.tag}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-1 ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {tier.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline selector */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-2">
                  Target Delivery Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINES.map((time) => {
                    const isSelected = formData.timeline === time;
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setFormData({ ...formData, timeline: time })}
                        className={`p-2.5 rounded-xl text-xs font-mono font-medium border text-center transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-[#09090c]/70 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reference Links */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                  Design Inspiration & Reference Links
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://dribbble.com/..., https://linear.app"
                  value={formData.reference_links}
                  onChange={(e) => setFormData({ ...formData, reference_links: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090c] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Confidential transmission. Direct founder review.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-mono font-bold text-black text-xs tracking-wider uppercase bg-white hover:bg-zinc-200 shadow-levitate hover:shadow-glow-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-antigravity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Transmitting Parameters...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Brief</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitSuccess(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md glass-panel-floating bg-[#0d0d12] rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.06)] z-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                Receipt Logged
              </span>

              <h3 className="text-2xl font-black text-white mt-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Brief Dispatched
              </h3>
              <p className="text-zinc-400 text-xs font-mono mt-2 leading-relaxed">
                Your project parameters have been securely recorded. Kunal will review your scope and follow up within 24-48 hours.
              </p>

              {/* Tracking Reference Ticket */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#08080a] border border-white/10 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                    Tracking Reference ID
                  </div>
                  <div className="text-xs font-mono font-bold text-white">
                    {submitSuccess.id}
                  </div>
                </div>
                <button
                  onClick={copyRequestId}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy Tracking ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={() => setSubmitSuccess(null)}
                className="mt-6 w-full py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-colors"
              >
                Return to Showcase
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
