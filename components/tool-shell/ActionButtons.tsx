"use client";

import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = "Copy",
  className = "",
  size = "sm",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={handleCopy}
      className={`transition-all ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#C8BEFA]" />
          <span>Copied ✓</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#C8BEFA]" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
};

interface DownloadButtonProps {
  url: string;
  filename: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  filename,
  label = "Download",
  className = "",
  size = "md",
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <Button
      variant="primary"
      size={size}
      onClick={handleDownload}
      className={`transition-all ${className}`}
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-[#151130]" />
          <span>Downloaded ✓</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-[#151130]" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
};
