"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { CheckCircle2, AlertCircle, Trash2, Download } from "lucide-react";

export const JsonFormatterTool: React.FC = () => {
  const [input, setInput] = useState(`{"name":"Kunalistic","tagline":"One place. Every little tool.","features":["modular","private","no-subscriptions"],"stats":{"tools":19,"active":true}}`);
  const [indent, setIndent] = useState<number | string>(2);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const indentation = indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentation));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid JSON syntax";
      setError(msg);
      setOutput("");
    }
  };

  const handleMinify = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid JSON syntax";
      setError(msg);
      setOutput("");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[rgba(200,190,250,0.1)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
            Indentation:
          </span>
          {[
            { label: "2 Spaces", val: 2 },
            { label: "4 Spaces", val: 4 },
            { label: "Tabs", val: "tab" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setIndent(item.val)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                indent === item.val
                  ? "bg-[#C8BEFA] text-[#151130] border-[#C8BEFA]"
                  : "bg-[rgba(200,190,250,0.04)] border-[rgba(200,190,250,0.15)] text-[#C8BEFA]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => { setInput(""); setOutput(""); setError(null); }}>
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={handleMinify}>
            Minify JSON
          </Button>
          <Button variant="primary" size="sm" onClick={handleFormat}>
            Beautify / Format
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-2">
            Raw JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            rows={14}
            className="w-full font-mono text-xs p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.15)] text-[#C8BEFA] focus:border-[#C8BEFA] outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)]">
              Formatted Result
            </label>
            {output && (
              <div className="flex items-center gap-2">
                <CopyButton text={output} size="sm" />
                <Button variant="secondary" size="sm" onClick={handleDownload} title="Download JSON file">
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted output will appear here..."
            rows={14}
            className="w-full font-mono text-xs p-4 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.15)] text-[#C8BEFA] outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.35)] text-xs text-[#C8BEFA]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Error parsing JSON: {error}</span>
        </div>
      )}
    </div>
  );
};
