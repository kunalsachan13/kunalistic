import React from "react";
import { Shield, Lock, EyeOff, ServerOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Guarantee — Kunalistic",
  description: "Learn how Kunalistic protects your privacy with client-side, in-browser execution.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <Shield className="w-10 h-10 text-[#C8BEFA] mx-auto mb-3" />
        <h1 className="text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
          Privacy-First Architecture
        </h1>
        <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.7)] mt-2">
          Your files belong to you. Here is exactly how we ensure your data never leaks.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] space-y-6 text-xs sm:text-sm text-[rgba(200,190,250,0.75)] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
            <ServerOff className="w-4 h-4 text-[#C8BEFA]" />
            <span>1. In-Browser File Execution</span>
          </h2>
          <p>
            Image compression, format conversions, resizing, and PDF merges are executed locally in your web browser via Web APIs and WebAssembly. Your files are not uploaded, saved, or inspected by our servers.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[rgba(200,190,250,0.08)]">
          <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-[#C8BEFA]" />
            <span>2. Zero AI Training on Your Content</span>
          </h2>
          <p>
            When utilizing creator and text generation tools, your inputs are passed ephemerally via secure encrypted API routes solely to generate the requested output. We never store your prompts for training.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[rgba(200,190,250,0.08)]">
          <h2 className="text-base font-bold text-[#C8BEFA] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C8BEFA]" />
            <span>3. No Sensitive Payment Credential Storage</span>
          </h2>
          <p>
            For voluntary support transactions, Kunalistic never sees or stores card numbers, CVVs, or UPI PINs. All processing is handed off securely to trusted payment providers with server-side signature validation.
          </p>
        </div>
      </div>
    </div>
  );
}
