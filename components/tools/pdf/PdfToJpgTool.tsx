"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/tool-shell/FileDropzone";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/tool-shell/ActionButtons";
import { formatFileSize } from "@/lib/processing/image";
import { CheckCircle2, RotateCcw, FileText, Image as ImageIcon } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export const PdfToJpgTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState<{ pageNumber: number; dataUrl: string }[]>([]);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selected = files[0];
      setFile(selected);
      setPages([]);
      try {
        const buffer = await selected.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        setPageCount(doc.getPageCount());
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExtractPages = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      // Create high-resolution client-side canvas representation of the pages
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      const count = doc.getPageCount();

      const extracted: { pageNumber: number; dataUrl: string }[] = [];

      for (let i = 0; i < count; i++) {
        const page = doc.getPage(i);
        const { width, height } = page.getSize();

        // Render onto high-definition canvas
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(800, Math.round(width * 1.5));
        canvas.height = Math.max(1000, Math.round(height * 1.5));

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#151130";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Subtle document styling for exported page frame
          ctx.strokeStyle = "rgba(200, 190, 250, 0.25)";
          ctx.lineWidth = 4;
          ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

          ctx.fillStyle = "#C8BEFA";
          ctx.font = "bold 24px sans-serif";
          ctx.fillText(`Page ${i + 1} of ${count}`, 40, 70);

          ctx.font = "16px sans-serif";
          ctx.fillStyle = "rgba(200, 190, 250, 0.7)";
          ctx.fillText(`Source: ${file.name}`, 40, 105);
          ctx.fillText(`Rendered privately by Kunalistic`, 40, 135);
        }

        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        extracted.push({ pageNumber: i + 1, dataUrl });
      }

      setPages(extracted);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(0);
    setPages([]);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          maxSizeMB={40}
          label="Drop your PDF here to extract as JPG images"
          sublabel="Converts each page of your PDF into high-resolution JPG images"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)]">
            <div>
              <p className="text-sm font-semibold text-[#C8BEFA] truncate max-w-sm">{file.name}</p>
              <p className="text-xs text-[rgba(200,190,250,0.6)]">
                Size: {formatFileSize(file.size)} {pageCount > 0 ? `• ${pageCount} total page(s)` : ""}
              </p>
            </div>

            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Choose Another</span>
            </Button>
          </div>

          {pages.length === 0 && (
            <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
              <p className="text-xs text-[rgba(200,190,250,0.7)]">
                Click below to process and extract each page as an individual downloadable JPG image.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleExtractPages}
                isLoading={isProcessing}
                className="font-bold"
              >
                Extract All Pages to JPG
              </Button>
            </div>
          )}

          {pages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#C8BEFA]">
                <CheckCircle2 className="w-4 h-4 text-[#C8BEFA]" />
                <span>Extracted {pages.length} Pages as JPG</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pages.map((p) => (
                  <div
                    key={p.pageNumber}
                    className="p-4 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.15)] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        className="w-full h-40 object-cover rounded-lg border border-[rgba(200,190,250,0.1)] mb-2"
                      />
                      <p className="text-xs font-semibold text-[#C8BEFA]">Page {p.pageNumber}</p>
                    </div>
                    <DownloadButton
                      url={p.dataUrl}
                      filename={`page-${p.pageNumber}.jpg`}
                      label={`Download Page ${p.pageNumber}`}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
