"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { convertImage, formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const JpgToPngTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; filename: string } | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
      setResult(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const res = await convertImage(file, "image/png", 1.0);
      const base = file.name.replace(/\.[^/.]+$/, "");
      setResult({
        url: res.url,
        size: res.size,
        filename: `${base}.png`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileDropzone
          accept="image/jpeg"
          maxSizeMB={30}
          label="Drop your JPG / JPEG image here"
          sublabel="Converts directly to lossless PNG format in your browser"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)]">
            <div className="flex items-center gap-3">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Original JPG"
                  className="w-14 h-14 rounded-lg object-cover border border-[rgba(200,190,250,0.2)]"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-[rgba(200,190,250,0.6)]">Original JPG: {formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
            <p className="text-xs text-[rgba(200,190,250,0.7)]">
              Converting to PNG format ensures lossless quality and full compatibility with graphic software.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              isLoading={isProcessing}
              className="font-bold"
            >
              Convert to PNG
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>PNG File Ready</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Output: <span className="font-bold text-[#C8BEFA]">{result.filename}</span> ({formatFileSize(result.size)})
              </p>
              <DownloadButton url={result.url} filename={result.filename} label="Download PNG" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
