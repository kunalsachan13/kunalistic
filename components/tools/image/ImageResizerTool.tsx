"use client";

import React, { useState, useEffect } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Input } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { resizeImage, getImageDimensions, formatFileSize } from "@/lib/processing/image";
import { Lock, Unlock, CheckCircle2, RotateCcw } from "lucide-react";

export const ImageResizerTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origDimensions, setOrigDimensions] = useState<{ width: number; height: number } | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; width: number; height: number; filename: string } | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selected = files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResult(null);

      const dims = await getImageDimensions(selected);
      setOrigDimensions(dims);
      setWidth(dims.width);
      setHeight(dims.height);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspect && origDimensions && origDimensions.width > 0) {
      const ratio = origDimensions.height / origDimensions.width;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspect && origDimensions && origDimensions.height > 0) {
      const ratio = origDimensions.width / origDimensions.height;
      setWidth(Math.round(val * ratio));
    }
  };

  const handleScalePreset = (percent: number) => {
    if (!origDimensions) return;
    const factor = percent / 100;
    setWidth(Math.round(origDimensions.width * factor));
    setHeight(Math.round(origDimensions.height * factor));
  };

  const handleResize = async () => {
    if (!file || width <= 0 || height <= 0) return;
    setIsProcessing(true);
    try {
      const res = await resizeImage(file, width, height);
      const ext = file.name.split(".").pop() || "jpg";
      const base = file.name.replace(/\.[^/.]+$/, "");
      const outputName = `${base}-${width}x${height}.${ext}`;

      setResult({
        url: res.url,
        size: res.size,
        width: res.width,
        height: res.height,
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
    setOrigDimensions(null);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileDropzone
          accept="image/*"
          maxSizeMB={30}
          label="Drop an image to resize dimensions"
          sublabel="Resize by pixels or percentage with aspect ratio lock"
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
                <p className="text-xs text-[rgba(200,190,250,0.6)]">
                  Original: {origDimensions?.width} × {origDimensions?.height} px ({formatFileSize(file.size)})
                </p>
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            {/* Scale percentage presets */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-2">
                Quick Scale Presets
              </label>
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handleScalePreset(pct)}
                    className="px-3 py-1.5 rounded-lg border border-[rgba(200,190,250,0.15)] bg-[rgba(200,190,250,0.04)] text-xs font-semibold text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.1)] transition-colors cursor-pointer"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Width & Height with Aspect Ratio Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <Input
                label="Width (Pixels)"
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
              />
              <Input
                label="Height (Pixels)"
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMaintainAspect(!maintainAspect)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  maintainAspect
                    ? "bg-[rgba(200,190,250,0.12)] border-[rgba(200,190,250,0.35)] text-[#C8BEFA]"
                    : "bg-transparent border-[rgba(200,190,250,0.15)] text-[rgba(200,190,250,0.5)]"
                }`}
              >
                {maintainAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span>Maintain Original Aspect Ratio</span>
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleResize}
              isLoading={isProcessing}
              className="w-full sm:w-auto font-bold"
            >
              Resize Image Now
            </Button>
          </div>

          {result && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.3)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>Resized Successfully</span>
              </div>
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                New Dimensions: <span className="font-bold text-[#C8BEFA]">{result.width} × {result.height} px</span> • Size: {formatFileSize(result.size)}
              </p>
              <DownloadButton url={result.url} filename={result.filename} label="Download Resized Image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
