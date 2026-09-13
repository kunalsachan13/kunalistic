"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { mergePdfs } from "@/lib/processing/pdf";
import { formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw, FileText, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export const MergePdfTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; totalPages: number; size: number } | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= files.length) return;
    const updated = [...files];
    const item = updated.splice(fromIndex, 1)[0];
    updated.splice(toIndex, 0, item);
    setFiles(updated);
  };

  const removeItem = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const res = await mergePdfs(files);
      setResult({
        url: res.url,
        totalPages: res.totalPages,
        size: res.blob.size,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <FileDropzone
          accept="application/pdf"
          multiple={true}
          maxSizeMB={50}
          label="Drop multiple PDF documents here to merge"
          sublabel="Combine 2 or more PDF files into a single master document"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">
              Documents to Merge ({files.length})
            </h3>
            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-[rgba(200,190,250,0.1)] text-[#C8BEFA] flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#C8BEFA] truncate">{file.name}</p>
                    <p className="text-[10px] text-[rgba(200,190,250,0.5)]">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(idx, idx - 1)}
                    disabled={idx === 0}
                    className="p-1 text-[rgba(200,190,250,0.5)] hover:text-[#C8BEFA] disabled:opacity-20"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, idx + 1)}
                    disabled={idx === files.length - 1}
                    className="p-1 text-[rgba(200,190,250,0.5)] hover:text-[#C8BEFA] disabled:opacity-20"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(idx)}
                    className="p-1 text-[rgba(200,190,250,0.5)] hover:text-[#C8BEFA] ml-2"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleMerge}
              isLoading={isProcessing}
              disabled={files.length < 2}
              className="font-bold"
            >
              Merge {files.length} PDF Documents
            </Button>
            {files.length < 2 && (
              <span className="text-xs text-[rgba(200,190,250,0.5)]">Add at least 2 files to merge</span>
            )}
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>PDF Documents Merged Successfully</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Combined into <span className="font-bold text-[#C8BEFA]">{result.totalPages} total pages</span> • Size: {formatFileSize(result.size)}
              </p>
              <DownloadButton url={result.url} filename="kunalistic-merged.pdf" label="Download Merged Document" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
