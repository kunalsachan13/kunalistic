"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File, AlertCircle } from "lucide-react";
import { formatFileSize } from "@/lib/processing/image";

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  accept = "image/*",
  multiple = false,
  maxSizeMB = 25,
  label = "Drop your file here, or browse",
  sublabel,
  onFilesSelected,
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateAndEmit = (incomingFiles: FileList | File[]) => {
    setErrorMessage(null);
    const valid: File[] = [];

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds the maximum allowed size of ${maxSizeMB} MB.`);
        return;
      }
      valid.push(file);
      if (!multiple) break;
    }

    if (valid.length > 0) {
      onFilesSelected(valid);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || !e.dataTransfer.files) return;
    validateAndEmit(e.dataTransfer.files);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer select-none ${
          isDragOver
            ? "border-[#C8BEFA] bg-[rgba(200,190,250,0.12)] scale-[1.01]"
            : "border-[rgba(200,190,250,0.22)] bg-[rgba(200,190,250,0.02)] hover:border-[rgba(200,190,250,0.4)] hover:bg-[rgba(200,190,250,0.05)]"
        } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && validateAndEmit(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.2)] flex items-center justify-center text-[#C8BEFA] mb-3 transition-transform group-hover:scale-105">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-[#C8BEFA]">
            {label}
          </p>

          <p className="text-xs text-[rgba(200,190,250,0.55)] mt-1 max-w-sm">
            {sublabel || (
              <>
                Supported: <span className="font-mono text-[rgba(200,190,250,0.7)]">{accept}</span> • Max size: {maxSizeMB} MB
                {multiple ? " • Multiple files supported" : ""}
              </>
            )}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-2.5 flex items-center gap-2 p-3 rounded-lg bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.3)] text-xs text-[#C8BEFA]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
