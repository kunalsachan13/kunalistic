"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Input } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { splitPdf } from "@/lib/processing/pdf";
import { formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";

export const SplitPdfTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rangeInput, setRangeInput] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; extractedCount: number; size: number } | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult(null);
      setErrorMsg(null);
    }
  };

  const handleSplit = async () => {
    if (!file || !rangeInput.trim()) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const res = await splitPdf(file, rangeInput);
      setResult({
        url: res.url,
        extractedCount: res.extractedPagesCount,
        size: res.blob.size,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to split PDF";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          maxSizeMB={50}
          label="Drop your PDF here to split or extract pages"
          sublabel="Extract specific pages or page ranges directly in your browser"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)]">
            <div>
              <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-sm">{file.name}</p>
              <p className="text-xs text-[rgba(200,190,250,0.6)]">Document Size: {formatFileSize(file.size)}</p>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
            <Input
              label="Pages to Extract (e.g. 1-3, 5, 8-10)"
              placeholder="e.g. 1-2, 4"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              hint="Specify single pages or comma-separated intervals."
            />

            <Button
              variant="primary"
              size="lg"
              onClick={handleSplit}
              isLoading={isProcessing}
              className="font-bold"
            >
              Extract Selected Pages
            </Button>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.3)] text-xs text-[#C8BEFA]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>Extracted Pages Ready</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Extracted <span className="font-bold text-[#C8BEFA]">{result.extractedCount} page(s)</span> • New File Size: {formatFileSize(result.size)}
              </p>
              <DownloadButton url={result.url} filename="kunalistic-extracted.pdf" label="Download Extracted PDF" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
