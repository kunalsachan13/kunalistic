"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { CaptionOutput } from "@/lib/ai/prompts";
import { Sparkles, PenTool, CheckCircle2 } from "lucide-react";

export const CaptionGeneratorTool: React.FC = () => {
  const [topic, setTopic] = useState("launching a privacy-first web utility platform");
  const [tone, setTone] = useState("Casual & Engaging");
  const [platform, setPlatform] = useState("Instagram");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CaptionOutput | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          tone,
          platform,
          includeEmojis,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Parameters */}
      <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-4">
        <Input
          label="Post Subject / Main Idea"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. 5 habits for better focus, launching my new side project"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Tone & Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Casual & Engaging" className="bg-[#151130]">Casual & Engaging</option>
              <option value="Punchy & Minimal" className="bg-[#151130]">Punchy & Direct</option>
              <option value="Storytelling & Vulnerable" className="bg-[#151130]">Storytelling & Relatable</option>
              <option value="Professional Authority" className="bg-[#151130]">Professional Authority</option>
              <option value="Witty & Playful" className="bg-[#151130]">Witty & Playful</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Target Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Instagram" className="bg-[#151130]">Instagram Caption</option>
              <option value="TikTok" className="bg-[#151130]">TikTok Description</option>
              <option value="LinkedIn" className="bg-[#151130]">LinkedIn Post</option>
              <option value="YouTube" className="bg-[#151130]">YouTube Description</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="emojiToggle"
            checked={includeEmojis}
            onChange={(e) => setIncludeEmojis(e.target.checked)}
            className="rounded accent-[#C8BEFA]"
          />
          <label htmlFor="emojiToggle" className="text-xs text-[rgba(200,190,250,0.8)] cursor-pointer">
            Include clean visual emojis & bullet indicators
          </label>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleGenerate}
          isLoading={isGenerating}
          className="font-bold"
        >
          <PenTool className="w-4 h-4 mr-2" />
          <span>Generate Structured Caption</span>
        </Button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.25)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
              Formatted Social Caption
            </span>
            <CopyButton text={result.fullFormatted} size="sm" label="Copy Entire Caption" />
          </div>

          <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-xs text-[rgba(200,190,250,0.9)] whitespace-pre-line leading-relaxed font-sans">
            {result.fullFormatted}
          </div>
        </div>
      )}
    </div>
  );
};
