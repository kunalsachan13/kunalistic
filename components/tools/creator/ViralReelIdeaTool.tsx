"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { ViralReelIdea } from "@/lib/ai/prompts";
import { saveLocalOutput } from "@/lib/storage/guest";
import {
  Sparkles,
  RotateCw,
  Bookmark,
  Share2,
  Check,
  Flame,
  Zap,
  Sliders,
  FileCode,
  FileText,
  Clock,
  Layers
} from "lucide-react";

export const ViralReelIdeaTool: React.FC = () => {
  const [niche, setNiche] = useState("Fitness & Health");
  const [audience, setAudience] = useState("Busy professionals");
  const [platform, setPlatform] = useState("Instagram Reels");
  const [style, setStyle] = useState("Talking Head + B-Roll");
  const [goal, setGoal] = useState("Viral Growth & Saves");
  const [tone, setTone] = useState("Curious & Counter-intuitive");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<ViralReelIdea[] | null>(null);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(0);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleGenerate = async (variation: "default" | "controversial" | "emotional" | "concise" | "expanded" = "default") => {
    setIsGenerating(true);
    setSavedStatus(false);
    try {
      let generatedIdeas: ViralReelIdea[] | null = null;
      try {
        const res = await fetch("/api/ai/reel-ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            niche,
            audience,
            platform,
            style,
            goal,
            tone,
            topic,
            variation,
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            generatedIdeas = json.data;
          }
        }
      } catch {
        // In static export mode, gracefully fall back to local client generation
      }

      if (!generatedIdeas) {
        const { generateLocalReelIdeas } = await import("@/lib/ai/heuristics");
        generatedIdeas = generateLocalReelIdeas({
          niche,
          audience,
          platform,
          style,
          goal,
          tone,
          topic,
          variation,
        });
      }

      setIdeas(generatedIdeas);
      setSelectedIdeaIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentIdea = ideas ? ideas[selectedIdeaIndex] : null;

  const handleSave = () => {
    if (!currentIdea) return;
    saveLocalOutput({
      slug: "viral-reel-idea-generator",
      toolName: "Viral Reel Idea Generator",
      title: currentIdea.title,
      data: currentIdea,
    });
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const handleExportMarkdown = () => {
    if (!currentIdea) return;
    const md = `# ${currentIdea.title}
**Platform:** ${platform} | **Niche:** ${niche} | **Goal:** ${goal}

## 🎯 Viral Hook
> "${currentIdea.viralHook}"

## 💡 Core Concept
${currentIdea.coreConcept}

## 🎬 Opening Frame
${currentIdea.opening}

## ⏱️ Scene Breakdown
${currentIdea.sceneStructure.map((s) => `### ${s.timestamp}\n- **Visual:** ${s.visual}\n- **Audio:** ${s.audio}\n- **Retention Note:** ${s.note}\n`).join("\n")}

## 🧠 Why This Works
${currentIdea.whyItWorks}

## 💬 Caption & Hashtags
${currentIdea.caption}

${currentIdea.hashtags.join(" ")}
`;

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentIdea.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8">
      {/* Configuration Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.12)] space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-[rgba(200,190,250,0.1)]">
          <Sliders className="w-4 h-4 text-[#C8BEFA]" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C8BEFA]">
            Video Parameters & Strategy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Niche / Industry
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Fitness & Health" className="bg-[#151130]">Fitness & Health</option>
              <option value="Tech & Artificial Intelligence" className="bg-[#151130]">Tech & AI</option>
              <option value="Personal Finance & Investing" className="bg-[#151130]">Personal Finance</option>
              <option value="Productivity & Systems" className="bg-[#151130]">Productivity & Habits</option>
              <option value="Software Development" className="bg-[#151130]">Software & Coding</option>
              <option value="Content Creation & Marketing" className="bg-[#151130]">Creator Economy</option>
              <option value="Design & Aesthetics" className="bg-[#151130]">Design & UI/UX</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Target Audience
            </label>
            <Input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. US college students, agency founders"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Instagram Reels" className="bg-[#151130]">Instagram Reels</option>
              <option value="TikTok" className="bg-[#151130]">TikTok</option>
              <option value="YouTube Shorts" className="bg-[#151130]">YouTube Shorts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Video Format / Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Talking Head + B-Roll" className="bg-[#151130]">Talking Head + B-Roll</option>
              <option value="Cinematic B-Roll" className="bg-[#151130]">Cinematic B-Roll</option>
              <option value="Screen Recording / Tutorial" className="bg-[#151130]">Screen Recording</option>
              <option value="Split Screen Comparison" className="bg-[#151130]">Split Screen Comparison</option>
              <option value="POV / First Person Story" className="bg-[#151130]">POV / Candid Story</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Strategic Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Viral Growth & Saves" className="bg-[#151130]">Viral Growth & Saves</option>
              <option value="Lead Generation & DMs" className="bg-[#151130]">Lead Generation</option>
              <option value="Authority & Education" className="bg-[#151130]">Authority & Education</option>
              <option value="Community Engagement" className="bg-[#151130]">Community Engagement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
              Tone & Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              <option value="Curious & Counter-intuitive" className="bg-[#151130]">Curious & Counter-intuitive</option>
              <option value="Direct & Urgent" className="bg-[#151130]">Direct & Urgent</option>
              <option value="Controversial & Provocative" className="bg-[#151130]">Controversial & Bold</option>
              <option value="Warm & Vulnerable" className="bg-[#151130]">Emotional & Relatable</option>
            </select>
          </div>
        </div>

        <div>
          <Input
            label="Optional Specific Topic / Angle"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 5 AM routine vs 8 hours of sleep, or why most apps fail"
            hint="Leave blank to generate optimal concepts for your niche automatically."
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => handleGenerate("default")}
          isLoading={isGenerating}
          className="font-bold w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Engineer Viral Reel Concepts</span>
        </Button>
      </div>

      {/* Generated Ideas Presentation */}
      {currentIdea && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.25)] shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-8">
          {/* Header & Concept Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(200,190,250,0.12)]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.6)]">
                  Concept #{selectedIdeaIndex + 1}
                </span>
                <span className="text-xs text-[rgba(200,190,250,0.4)]">•</span>
                <span className="text-xs text-[#C8BEFA] font-medium">{platform}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#C8BEFA] mt-1">
                {currentIdea.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {ideas && ideas.length > 1 && (
                <div className="flex items-center gap-1 bg-[rgba(200,190,250,0.06)] p-1 rounded-lg border border-[rgba(200,190,250,0.12)]">
                  {ideas.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdeaIndex(idx)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        selectedIdeaIndex === idx
                          ? "bg-[#C8BEFA] text-[#151130]"
                          : "text-[rgba(200,190,250,0.6)] hover:text-[#C8BEFA]"
                      }`}
                    >
                      Idea {idx + 1}
                    </button>
                  ))}
                </div>
              )}

              <Button variant="secondary" size="sm" onClick={handleSave} className="gap-1.5">
                {savedStatus ? <Check className="w-3.5 h-3.5 text-[#C8BEFA]" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedStatus ? "Saved" : "Save"}</span>
              </Button>

              <Button variant="secondary" size="sm" onClick={handleExportMarkdown} className="gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Export MD</span>
              </Button>
            </div>
          </div>

          {/* 1. Viral Hook Highlight */}
          <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.3)]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8BEFA]">
                <Flame className="w-4 h-4 text-[#C8BEFA]" />
                <span>Psychological Opening Hook (0:00 - 0:02)</span>
              </span>
              <CopyButton text={currentIdea.viralHook} size="sm" label="Copy Hook" />
            </div>
            <p className="text-base sm:text-lg font-bold text-[#C8BEFA] leading-snug">
              &ldquo;{currentIdea.viralHook}&rdquo;
            </p>
          </div>

          {/* 2. Opening & Retention Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
                Visual Frame Direction
              </p>
              <p className="text-xs text-[rgba(200,190,250,0.85)] leading-relaxed">
                {currentIdea.opening}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
                Retention Mechanism
              </p>
              <p className="text-xs text-[rgba(200,190,250,0.85)] leading-relaxed">
                {currentIdea.retentionMechanism}
              </p>
            </div>
          </div>

          {/* 3. Scene Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C8BEFA]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
                Second-By-Second Scene Structure
              </h3>
            </div>
            <div className="space-y-2.5">
              {currentIdea.sceneStructure.map((scene, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] text-xs grid grid-cols-1 sm:grid-cols-4 gap-3 items-start"
                >
                  <div className="sm:col-span-1 font-mono font-bold text-[#C8BEFA]">
                    {scene.timestamp}
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <p className="text-[rgba(200,190,250,0.9)]">
                      <span className="font-semibold text-[#C8BEFA]">Visual:</span> {scene.visual}
                    </p>
                    <p className="text-[rgba(200,190,250,0.8)]">
                      <span className="font-semibold text-[#C8BEFA]">Audio:</span> {scene.audio}
                    </p>
                    <p className="text-[11px] text-[rgba(200,190,250,0.55)] italic">
                      Note: {scene.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Caption & Hashtags */}
          <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
                Optimized Social Caption
              </span>
              <CopyButton text={`${currentIdea.caption}\n\n${currentIdea.hashtags.join(" ")}`} size="sm" label="Copy Caption" />
            </div>
            <p className="text-xs text-[rgba(200,190,250,0.8)] whitespace-pre-line leading-relaxed">
              {currentIdea.caption}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(200,190,250,0.08)]">
              {currentIdea.hashtags.map((tag) => (
                <span key={tag} className="text-[11px] text-[#C8BEFA] font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 5. One-Click Angle Iterations */}
          <div className="pt-4 border-t border-[rgba(200,190,250,0.1)] space-y-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.6)]">
              Iterate & Refine Concept
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => handleGenerate("controversial")} isLoading={isGenerating}>
                Make More Controversial
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerate("emotional")} isLoading={isGenerating}>
                Make More Emotional
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerate("concise")} isLoading={isGenerating}>
                Make Shorter / Punchier
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerate("default")} isLoading={isGenerating}>
                Regenerate Angle
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
