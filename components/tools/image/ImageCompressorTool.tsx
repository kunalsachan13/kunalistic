"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Slider } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { compressImage, formatFileSize } from "@/lib/processing/image";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

export const ImageCompressorTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    url: string;
    originalSize: number;
    compressedSize: number;
    savedPercentage: number;
    filename: string;
  } | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const selected = files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const res = await compressImage(file, quality);
      const ext = file.name.split(".").pop() || "jpg";
      const base = file.name.replace(/\.[^/.]+$/, "");
      const outputName = `${base}-compressed.${ext}`;

      setResult({
        url: res.url,
        originalSize: res.originalSize,
        compressedSize: res.compressedSize,
        savedPercentage: res.savedPercentage,
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
          accept="image/jpeg, image/png, image/webp"
          maxSizeMB={30}
          label="Drop your image here to compress"
          sublabel="Supports JPG, PNG, and WEBP • 100% In-browser compression"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          {/* File Selected Overview */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Original Preview"
                  className="w-14 h-14 rounded-lg object-cover border border-[rgba(200,190,250,0.2)]"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-[rgba(200,190,250,0.6)]">Original Size: {formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5 self-end sm:self-center">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          {/* Compression Configuration */}
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
            <Slider
              label="Target Compression Quality"
              min={10}
              max={95}
              step={5}
              value={quality}
              valueDisplay={`${quality}%`}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
            <p className="text-xs text-[rgba(200,190,250,0.5)]">
              Lower quality delivers smaller file size. 70-80% is recommended for web-ready images without noticeable visual loss.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCompress}
              isLoading={isProcessing}
              className="w-full sm:w-auto font-bold mt-2"
            >
              Compress Image Now
            </Button>
          </div>

          {/* Result Presentation */}
          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] shadow-[0_0_20px_rgba(200,190,250,0.08)] space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>Compression Completed Successfully</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)]">
                  <p className="text-[11px] text-[rgba(200,190,250,0.5)] uppercase tracking-wider">Original</p>
                  <p className="text-lg font-bold text-[#C8BEFA] mt-1">{formatFileSize(result.originalSize)}</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.1)]">
                  <p className="text-[11px] text-[rgba(200,190,250,0.5)] uppercase tracking-wider">Compressed</p>
                  <p className="text-lg font-bold text-[#C8BEFA] mt-1">{formatFileSize(result.compressedSize)}</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(200,190,250,0.12)] border border-[rgba(200,190,250,0.3)]">
                  <p className="text-[11px] text-[rgba(200,190,250,0.7)] uppercase tracking-wider">Saved</p>
                  <p className="text-lg font-bold text-[#C8BEFA] mt-1">{result.savedPercentage}%</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-[rgba(200,190,250,0.6)]">
                  Ready to download: <span className="font-mono text-[#C8BEFA]">{result.filename}</span>
                </div>
                <DownloadButton url={result.url} filename={result.filename} label="Download Compressed Image" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
