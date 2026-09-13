"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Wrench, Trash2 } from "lucide-react";

export const JsonValidatorTool: React.FC = () => {
  const [input, setInput] = useState(`{\n  "title": "Kunalistic",\n  "active": true,\n  "version": 1,\n}`);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [errorDetails, setErrorDetails] = useState<{ message: string; line?: number; column?: number } | null>(null);

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setStatus("valid");
      setErrorDetails(null);
    } catch (err: unknown) {
      setStatus("invalid");
      const message = err instanceof Error ? err.message : "Syntax error";

      // Extract line and column from standard error message
      let line: number | undefined;
      let column: number | undefined;

      const posMatch = message.match(/position (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToError = input.substring(0, pos);
        const lines = upToError.split("\n");
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      const lineMatch = message.match(/line (\d+) column (\d+)/i);
      if (lineMatch) {
        line = parseInt(lineMatch[1], 10);
        column = parseInt(lineMatch[2], 10);
      }

      setErrorDetails({ message, line, column });
    }
  };

  const handleAutoFix = () => {
    try {
      // 1. Remove trailing commas before closing braces/brackets
      let fixed = input.replace(/,(\s*[}\]])/g, "$1");

      // 2. Replace single quotes with double quotes around keys and values
      fixed = fixed.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

      // 3. Fix unquoted keys
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

      setInput(fixed);
      JSON.parse(fixed);
      setStatus("valid");
      setErrorDetails(null);
    } catch (err: unknown) {
      handleValidate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[rgba(200,190,250,0.1)]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.7)]">
          JSON Syntax Checker
        </span>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => { setInput(""); setStatus("idle"); setErrorDetails(null); }}>
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={handleAutoFix} className="gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            <span>Auto-Fix Common Errors</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleValidate}>
            Validate JSON
          </Button>
        </div>
      </div>

      <div>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setStatus("idle"); }}
          placeholder="Paste JSON to test for validity..."
          rows={12}
          className="w-full font-mono text-xs p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.15)] text-[#C8BEFA] focus:border-[#C8BEFA] outline-none"
        />
      </div>

      {status === "valid" && (
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.35)] flex items-center gap-3 text-[#C8BEFA]">
          <CheckCircle2 className="w-5 h-5 text-[#C8BEFA] shrink-0" />
          <div>
            <p className="text-sm font-semibold">Valid JSON Syntax</p>
            <p className="text-xs text-[rgba(200,190,250,0.7)] mt-0.5">The provided payload is completely compliant with standard RFC 8259 JSON.</p>
          </div>
        </div>
      )}

      {status === "invalid" && errorDetails && (
        <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.4)] space-y-2 text-[#C8BEFA]">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>JSON Syntax Error Detected</span>
          </div>
          <p className="text-xs font-mono bg-[rgba(200,190,250,0.05)] p-2.5 rounded-lg border border-[rgba(200,190,250,0.1)]">
            {errorDetails.message}
          </p>
          {errorDetails.line && (
            <p className="text-xs text-[rgba(200,190,250,0.8)]">
              Approximate Location: <span className="font-mono font-bold text-[#C8BEFA]">Line {errorDetails.line}, Column {errorDetails.column || 1}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
