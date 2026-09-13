"use client";

import React, { useState } from "react";
import { analyzeText } from "@/lib/processing/text";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { Trash2, Clock, Volume2 } from "lucide-react";

export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState(
    "Kunalistic is a unified digital utility platform designed to keep every little tool in one cohesive, beautiful place. All processing is privacy-first and performed right inside your browser session."
  );

  const stats = analyzeText(text);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Words</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{stats.words}</p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Characters</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{stats.characters}</p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Sentences</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{stats.sentences}</p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Paragraphs</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{stats.paragraphs}</p>
        </div>
      </div>

      {/* Editor Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
            Type or Paste Text
          </span>
          <div className="flex items-center gap-2">
            <CopyButton text={text} size="sm" />
            <Button variant="secondary" size="sm" onClick={() => setText("")}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here..."
          rows={10}
          className="w-full text-sm p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.16)] text-[#C8BEFA] focus:border-[#C8BEFA] outline-none leading-relaxed"
        />
      </div>

      {/* Secondary Metrics: Reading pace and top keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)] space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
            Reading & Speaking Pace
          </h4>
          <div className="flex items-center justify-between text-xs text-[rgba(200,190,250,0.8)]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C8BEFA]" />
              Estimated Reading Time:
            </span>
            <span className="font-bold text-[#C8BEFA]">{stats.readingTimeMinutes} min</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[rgba(200,190,250,0.8)]">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#C8BEFA]" />
              Estimated Speaking Pace:
            </span>
            <span className="font-bold text-[#C8BEFA]">{stats.speakingTimeMinutes} min</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)] space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
            Top Repeated Keywords
          </h4>
          {stats.topKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {stats.topKeywords.map((kw) => (
                <span
                  key={kw.word}
                  className="px-2.5 py-1 rounded-lg bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.18)] text-xs text-[#C8BEFA]"
                >
                  <span className="font-medium">{kw.word}</span>{" "}
                  <span className="text-[rgba(200,190,250,0.5)] font-mono">({kw.count})</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[rgba(200,190,250,0.4)]">Type longer text to see keyword density.</p>
          )}
        </div>
      </div>
    </div>
  );
};
