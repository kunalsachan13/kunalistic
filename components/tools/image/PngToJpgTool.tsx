"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Slider } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { convertImage, formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const PngToJpgTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
  const [backgroundColor, setBackgroundColor] = useState<string>("#151130");
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
      const res = await convertImage(file, "image/jpeg", quality / 100, backgroundColor);
      const base = file.name.replace(/\.[^/.]+$/, "");
      setResult({
        url: res.url,
        size: res.size,
        filename: `${base}.jpg`,
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
          accept="image/png"
          maxSizeMB={30}
          label="Drop your PNG image here"
          sublabel="Converts to compact JPG with custom quality & transparent background fill"
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
                  alt="Original PNG"
                  className="w-14 h-14 rounded-lg object-cover border border-[rgba(200,190,250,0.2)]"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-[rgba(200,190,250,0.6)]">Original PNG: {formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <Slider
              label="JPG Quality"
              min={30}
              max={100}
              step={5}
              value={quality}
              valueDisplay={`${quality}%`}
              onChange={(e) => setQuality(Number(e.target.value))}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-2">
                Background Fill for Transparency
              </label>
              <div className="flex gap-2">
                {[
                  { label: "Champion Blue (#151130)", val: "#151130" },
                  { label: "Lavender Tonic (#C8BEFA)", val: "#C8BEFA" },
                ].map((bg) => (
                  <button
                    key={bg.val}
                    onClick={() => setBackgroundColor(bg.val)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      backgroundColor === bg.val
                        ? "bg-[#C8BEFA] text-[#151130] border-[#C8BEFA]"
                        : "bg-[rgba(200,190,250,0.04)] border-[rgba(200,190,250,0.15)] text-[#C8BEFA]"
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              isLoading={isProcessing}
              className="font-bold"
            >
              Convert to JPG
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>JPG Ready</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Output: <span className="font-bold text-[#C8BEFA]">{result.filename}</span> ({formatFileSize(result.size)})
              </p>
              <DownloadButton url={result.url} filename={result.filename} label="Download JPG" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
