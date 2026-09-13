"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { imagesToPdf } from "@/lib/processing/pdf";
import { formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw, FileText, Trash2 } from "lucide-react";

export const JpgToPdfTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; pageCount: number; size: number } | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const res = await imagesToPdf(files);
      setResult({
        url: res.url,
        pageCount: res.pageCount,
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
          accept="image/jpeg, image/png"
          multiple={true}
          maxSizeMB={40}
          label="Drop your images here to create a PDF"
          sublabel="Upload one or multiple JPG/PNG images to bind into a document"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">
              Selected Images ({files.length})
            </h3>
            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[rgba(200,190,250,0.1)] text-[#C8BEFA] flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#C8BEFA] truncate">{file.name}</p>
                    <p className="text-[10px] text-[rgba(200,190,250,0.5)]">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFile(idx)}
                  className="p-1 text-[rgba(200,190,250,0.4)] hover:text-[#C8BEFA] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              isLoading={isProcessing}
              className="font-bold"
            >
              Generate PDF Document ({files.length} Pages)
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>PDF Successfully Assembled</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Contains <span className="font-bold text-[#C8BEFA]">{result.pageCount} page(s)</span> • Document Size: {formatFileSize(result.size)}
              </p>
              <DownloadButton url={result.url} filename="kunalistic-assembled.pdf" label="Download PDF Document" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
