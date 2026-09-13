import React from "react";
import Link from "next/link";
import { TOOL_REGISTRY } from "@/lib/registry";
import { getAllSupportersForAdmin } from "@/lib/payments/ledger";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Wrench, HeartHandshake, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminOverviewPage() {
  const allTools = TOOL_REGISTRY;
  const activeTools = allTools.filter((t) => t.status === "active");
  const comingSoonTools = allTools.filter((t) => t.status === "coming-soon");

  const supporters = getAllSupportersForAdmin();
  const totalAmount = supporters.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Active Utilities</span>
            <Wrench className="w-4 h-4 text-[#C8BEFA]" />
          </div>
          <p className="text-3xl font-extrabold text-[#C8BEFA] mt-2">{activeTools.length}</p>
          <p className="text-[11px] text-[rgba(200,190,250,0.5)] mt-1">{comingSoonTools.length} in development</p>
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Voluntary Support</span>
            <HeartHandshake className="w-4 h-4 text-[#C8BEFA]" />
          </div>
          <p className="text-3xl font-extrabold text-[#C8BEFA] mt-2">₹{totalAmount}</p>
          <p className="text-[11px] text-[rgba(200,190,250,0.5)] mt-1">{supporters.length} total contributions</p>
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Client-Side Ratio</span>
            <Shield className="w-4 h-4 text-[#C8BEFA]" />
          </div>
          <p className="text-3xl font-extrabold text-[#C8BEFA] mt-2">100%</p>
          <p className="text-[11px] text-[rgba(200,190,250,0.5)] mt-1">Files processed in-browser</p>
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Monetization Model</span>
            <Sparkles className="w-4 h-4 text-[#C8BEFA]" />
          </div>
          <p className="text-xl font-bold text-[#C8BEFA] mt-3">Voluntary</p>
          <p className="text-[11px] text-[rgba(200,190,250,0.5)] mt-1">Zero subscriptions active</p>
        </div>
      </div>

      {/* Quick Administration Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8BEFA]">
              Tool Registry Management
            </h3>
            <Link href="/admin/tools" className="text-xs text-[#C8BEFA] hover:underline flex items-center gap-1">
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-[rgba(200,190,250,0.65)] leading-relaxed">
            Toggle tool statuses between Active, Beta, and Coming Soon. Configure featured and trending badges without touching page code.
          </p>
          <div className="pt-2">
            <Link href="/admin/tools">
              <Button variant="secondary" size="sm">
                Open Tools Manager
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8BEFA]">
              Supporter Wall Moderation
            </h3>
            <Link href="/admin/support" className="text-xs text-[#C8BEFA] hover:underline flex items-center gap-1">
              <span>View Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-[rgba(200,190,250,0.65)] leading-relaxed">
            Review public messages left on the /support page. Approve, hide, or moderate entries to keep the community wall clean.
          </p>
          <div className="pt-2">
            <Link href="/admin/support">
              <Button variant="secondary" size="sm">
                Open Supporter Moderation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
