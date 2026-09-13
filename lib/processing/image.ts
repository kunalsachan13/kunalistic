export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error("Failed to load image: " + err));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(new Error("Failed to read file: " + err));
    reader.readAsDataURL(file);
  });
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export async function convertImage(
  file: File,
  targetMimeType: string,
  quality: number = 0.92,
  backgroundColor?: string
): Promise<{ blob: Blob; url: string; size: number }> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not acquire 2D canvas context");

  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Conversion resulted in an empty blob"));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({ blob, url, size: blob.size });
      },
      targetMimeType,
      quality
    );
  });
}

export async function compressImage(
  file: File,
  qualityPercent: number,
  targetFormat?: string
): Promise<{ blob: Blob; url: string; originalSize: number; compressedSize: number; savedPercentage: number }> {
  const quality = Math.max(0.05, Math.min(1.0, qualityPercent / 100));
  const format = targetFormat || file.type || "image/jpeg";
  const result = await convertImage(file, format, quality);
  
  const originalSize = file.size;
  const compressedSize = result.size;
  const savedPercentage = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

  return {
    blob: result.blob,
    url: result.url,
    originalSize,
    compressedSize,
    savedPercentage
  };
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  targetFormat?: string,
  quality: number = 0.92
): Promise<{ blob: Blob; url: string; width: number; height: number; size: number }> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not acquire 2D canvas context");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const format = targetFormat || file.type || "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to resize image to blob"));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({
          blob,
          url,
          width: targetWidth,
          height: targetHeight,
          size: blob.size
        });
      },
      format,
      quality
    );
  });
}
