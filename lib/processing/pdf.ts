import { PDFDocument } from "pdf-lib";

export async function imagesToPdf(files: File[]): Promise<{ blob: Blob; url: string; pageCount: number }> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let embeddedImage;
    if (file.type === "image/png") {
      embeddedImage = await pdfDoc.embedPng(bytes);
    } else {
      // JPG or fallback
      embeddedImage = await pdfDoc.embedJpg(bytes);
    }

    const { width, height } = embeddedImage.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return { blob, url, pageCount: files.length };
}

export async function mergePdfs(files: File[]): Promise<{ blob: Blob; url: string; totalPages: number }> {
  const mergedPdf = await PDFDocument.create();
  let totalPages = 0;

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(arrayBuffer);
    const pageIndices = doc.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(doc, pageIndices);
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    totalPages += pageIndices.length;
  }

  const pdfBytes = await mergedPdf.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return { blob, url, totalPages };
}

export async function splitPdf(
  file: File,
  rangeExpression: string
): Promise<{ blob: Blob; url: string; extractedPagesCount: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer);
  const totalAvailablePages = srcDoc.getPageCount();

  // Parse ranges like "1-3, 5, 8-10"
  const targetPageIndices = new Set<number>();
  const parts = rangeExpression.split(",").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          if (i >= 1 && i <= totalAvailablePages) {
            targetPageIndices.add(i - 1); // 0-indexed
          }
        }
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalAvailablePages) {
        targetPageIndices.add(pageNum - 1);
      }
    }
  }

  if (targetPageIndices.size === 0) {
    throw new Error(`No valid pages selected. The document contains ${totalAvailablePages} page(s).`);
  }

  const sortedIndices = Array.from(targetPageIndices).sort((a, b) => a - b);
  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcDoc, sortedIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const pdfBytes = await newDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return { blob, url, extractedPagesCount: sortedIndices.length };
}
