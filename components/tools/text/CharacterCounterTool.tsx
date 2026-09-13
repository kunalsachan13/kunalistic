"use client";

import React, { useState } from "react";
import { checkSocialLimits } from "@/lib/processing/text";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { Trash2 } from "lucide-react";

export const CharacterCounterTool: React.FC = () => {
  const [text, setText] = useState("Crafting an engaging social hook for Kunalistic. Simple, elegant, and fast.");

  const totalChars = text.length;
  const noSpaceChars = text.replace(/\s/g, "").length;
  const byteSize = new Blob([text]).size;
  const limits = checkSocialLimits(text);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Total Characters</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{totalChars}</p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Without Spaces</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{noSpaceChars}</p>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.5)]">Byte Size (UTF-8)</p>
          <p className="text-2xl font-bold text-[#C8BEFA] mt-1">{byteSize} B</p>
        </div>
      </div>

      {/* Editor */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
            Input Text
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
          placeholder="Paste or type content to inspect character limits..."
          rows={8}
          className="w-full text-sm p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.16)] text-[#C8BEFA] focus:border-[#C8BEFA] outline-none leading-relaxed"
        />
      </div>

      {/* Social Platform Limits */}
      <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8BEFA]">
          Social Media & Platform Limits
        </h4>
        <div className="space-y-3.5">
          {limits.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex justify-between text-xs text-[rgba(200,190,250,0.8)]">
                <span className="font-medium">{item.name}</span>
                <span className="font-mono text-xs">
                  <span className={item.isOverLimit ? "font-bold underline text-[#C8BEFA]" : "text-[#C8BEFA]"}>
                    {item.current}
                  </span>{" "}
                  / {item.max} ({item.remaining} left)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[rgba(200,190,250,0.1)] overflow-hidden">
                <div
                  className="h-full bg-[#C8BEFA] transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
