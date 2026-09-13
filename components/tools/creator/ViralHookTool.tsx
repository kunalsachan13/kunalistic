"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { ViralHook } from "@/lib/ai/prompts";
import { Sparkles, Flame, Eye, Lightbulb } from "lucide-react";

export const ViralHookTool: React.FC = () => {
  const [topic, setTopic] = useState("learning to code in 2026");
  const [niche, setNiche] = useState("tech & software");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hooks, setHooks] = useState<ViralHook[] | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let generatedHooks: ViralHook[] | null = null;
      try {
        const res = await fetch("/api/ai/hooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, niche }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            generatedHooks = json.data;
          }
        }
      } catch {
        // Fallback for static hosting
      }

      if (!generatedHooks) {
        const { generateLocalHooks } = await import("@/lib/ai/heuristics");
        generatedHooks = generateLocalHooks(topic, niche);
      }

      setHooks(generatedHooks);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Video Topic / Angle"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. passive income, workout form, productivity apps"
          />
          <Input
            label="Niche / Target Market"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness, creators, entrepreneurs, students"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleGenerate}
          isLoading={isGenerating}
          className="font-bold"
        >
          <Flame className="w-4 h-4 mr-2" />
          <span>Generate 5+ Psychological Viral Hooks</span>
        </Button>
      </div>

      {/* Results List */}
      {hooks && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C8BEFA]">
            Psychology-Engineered Openers ({hooks.length})
          </h3>

          <div className="space-y-3.5">
            {hooks.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] hover:border-[rgba(200,190,250,0.3)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C8BEFA] bg-[rgba(200,190,250,0.1)] px-2.5 py-1 rounded-md border border-[rgba(200,190,250,0.2)]">
                    {item.framework}
                  </span>
                  <CopyButton text={item.hook} size="sm" label="Copy Hook" />
                </div>

                <p className="text-base font-bold text-[#C8BEFA] leading-snug">
                  &ldquo;{item.hook}&rdquo;
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[rgba(200,190,250,0.7)] border-t border-[rgba(200,190,250,0.08)]">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[#C8BEFA] shrink-0 mt-0.5" />
                    <span><strong className="text-[#C8BEFA]">Psychology:</strong> {item.psychologyExplanation}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#C8BEFA] shrink-0 mt-0.5" />
                    <span><strong className="text-[#C8BEFA]">Delivery:</strong> {item.exampleDelivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
