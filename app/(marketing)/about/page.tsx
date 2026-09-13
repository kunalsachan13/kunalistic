import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Shield, Sparkles, Heart, Box, Cpu, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kunalistic — Your Digital Toolbox",
  description: "Learn about Kunalistic, its privacy-first design, and the creator behind the unified utility ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.1)] border border-[rgba(200,190,250,0.25)] flex items-center justify-center text-[#C8BEFA] mx-auto">
          <Box className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C8BEFA] tracking-tight">
          One place. Every little tool.
        </h1>
        <p className="text-sm sm:text-base text-[rgba(200,190,250,0.7)] leading-relaxed">
          Kunalistic exists to simplify everyday digital work by bringing useful tools together in one cohesive, beautiful place.
        </p>
      </div>

      {/* Philosophy */}
      <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] space-y-4 text-xs sm:text-sm text-[rgba(200,190,250,0.75)] leading-relaxed">
        <h2 className="text-lg font-bold text-[#C8BEFA]">The Kunalistic Philosophy</h2>
        <p>
          Whenever someone needs to compress a photo, convert a PDF, format some JSON, or calculate a percentage, they usually end up navigating to sketchy, ad-riddled websites with confusing buttons and aggressive subscription popups.
        </p>
        <p>
          Kunalistic was built on a different premise: <strong>everyday utilities should be fast, private, and pleasant to use.</strong>
        </p>
        <p>
          Whenever technically practical, our tools run <em>locally inside your browser</em>. That means your images, PDF documents, and private text strings never get uploaded to an unknown server.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-3">
          <Shield className="w-6 h-6 text-[#C8BEFA]" />
          <h3 className="text-base font-bold text-[#C8BEFA]">Privacy by Default</h3>
          <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
            Client-side image and PDF manipulation ensures confidential data remains securely on your machine.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-3">
          <Heart className="w-6 h-6 text-[#C8BEFA]" />
          <h3 className="text-base font-bold text-[#C8BEFA]">No Subscriptions</h3>
          <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
            Zero paywalls, zero artificial lockouts. Supported entirely by voluntary creator support from happy users.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-3">
          <Sparkles className="w-6 h-6 text-[#C8BEFA]" />
          <h3 className="text-base font-bold text-[#C8BEFA]">Modular Ecosystem</h3>
          <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
            Engineered so that new utilities for creators, developers, students, and professionals can be continuously added.
          </p>
        </div>
      </div>

      {/* Creator Note & CTA */}
      <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-base font-bold text-[#C8BEFA]">Built with curiosity by Kunal</h3>
          <p className="text-xs text-[rgba(200,190,250,0.65)] mt-1 max-w-lg">
            Have a tool idea you&apos;d love to see on Kunalistic? We&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/tools">
            <Button variant="primary">Explore Tools</Button>
          </Link>
          <Link href="/support">
            <Button variant="secondary">Support Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
