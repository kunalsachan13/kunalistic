"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Slider } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { convertImage, formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const ImageConverterTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/png");
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; filename: string } | null>(null);

  const formatOptions = [
    { label: "PNG (.png)", mime: "image/png", ext: "png" },
    { label: "JPG / JPEG (.jpg)", mime: "image/jpeg", ext: "jpg" },
    { label: "WEBP (.webp)", mime: "image/webp", ext: "webp" },
  ];

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
      const res = await convertImage(file, targetFormat, quality / 100);
      const chosen = formatOptions.find((f) => f.mime === targetFormat);
      const ext = chosen?.ext || "png";
      const base = file.name.replace(/\.[^/.]+$/, "");
      const outputName = `${base}-converted.${ext}`;

      setResult({
        url: res.url,
        size: res.size,
        filename: outputName,
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
          accept="image/*"
          maxSizeMB={30}
          label="Drop an image to convert"
          sublabel="Convert between PNG, JPG, and WEBP directly in your browser"
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
                  alt="Original"
                  className="w-14 h-14 rounded-lg object-cover border border-[rgba(200,190,250,0.2)]"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-[rgba(200,190,250,0.6)]">Original: {formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-2">
                Convert To Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formatOptions.map((opt) => (
                  <button
                    key={opt.mime}
                    onClick={() => setTargetFormat(opt.mime)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      targetFormat === opt.mime
                        ? "bg-[#C8BEFA] text-[#151130] border-[#C8BEFA] shadow-[0_0_12px_rgba(200,190,250,0.2)]"
                        : "bg-[rgba(200,190,250,0.05)] border-[rgba(200,190,250,0.15)] text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.09)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {targetFormat !== "image/png" && (
              <Slider
                label="Output Quality"
                min={20}
                max={100}
                step={5}
                value={quality}
                valueDisplay={`${quality}%`}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              isLoading={isProcessing}
              className="w-full sm:w-auto font-bold"
            >
              Convert Image Now
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>Conversion Complete</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                New Size: <span className="font-bold text-[#C8BEFA]">{formatFileSize(result.size)}</span>
              </p>
              <DownloadButton url={result.url} filename={result.filename} label="Download Converted File" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
