"use client";

import React from "react";
import { ImageCompressorTool } from "./image/ImageCompressorTool";
import { ImageConverterTool } from "./image/ImageConverterTool";
import { ImageResizerTool } from "./image/ImageResizerTool";
import { JpgToPngTool } from "./image/JpgToPngTool";
import { PngToJpgTool } from "./image/PngToJpgTool";
import { JpgToPdfTool } from "./pdf/JpgToPdfTool";
import { PdfToJpgTool } from "./pdf/PdfToJpgTool";
import { MergePdfTool } from "./pdf/MergePdfTool";
import { SplitPdfTool } from "./pdf/SplitPdfTool";
import { JsonFormatterTool } from "./developer/JsonFormatterTool";
import { JsonValidatorTool } from "./developer/JsonValidatorTool";
import { WordCounterTool } from "./text/WordCounterTool";
import { CharacterCounterTool } from "./text/CharacterCounterTool";
import { PercentageCalculatorTool } from "./student/PercentageCalculatorTool";
import { AgeCalculatorTool } from "./student/AgeCalculatorTool";
import { UnitConverterTool } from "./student/UnitConverterTool";
import { ViralReelIdeaTool } from "./creator/ViralReelIdeaTool";
import { ViralHookTool } from "./creator/ViralHookTool";
import { CaptionGeneratorTool } from "./creator/CaptionGeneratorTool";

interface ToolDispatcherProps {
  slug: string;
}

export const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ slug }) => {
  switch (slug) {
    case "image-compressor":
      return <ImageCompressorTool />;
    case "image-converter":
      return <ImageConverterTool />;
    case "image-resizer":
      return <ImageResizerTool />;
    case "jpg-to-png":
      return <JpgToPngTool />;
    case "png-to-jpg":
      return <PngToJpgTool />;
    case "jpg-to-pdf":
      return <JpgToPdfTool />;
    case "pdf-to-jpg":
      return <PdfToJpgTool />;
    case "merge-pdf":
      return <MergePdfTool />;
    case "split-pdf":
      return <SplitPdfTool />;
    case "json-formatter":
      return <JsonFormatterTool />;
    case "json-validator":
      return <JsonValidatorTool />;
    case "word-counter":
      return <WordCounterTool />;
    case "character-counter":
      return <CharacterCounterTool />;
    case "percentage-calculator":
      return <PercentageCalculatorTool />;
    case "age-calculator":
      return <AgeCalculatorTool />;
    case "unit-converter":
      return <UnitConverterTool />;
    case "viral-reel-idea-generator":
      return <ViralReelIdeaTool />;
    case "viral-hook-generator":
      return <ViralHookTool />;
    case "caption-generator":
      return <CaptionGeneratorTool />;
    default:
      return null;
  }
};
