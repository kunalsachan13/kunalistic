import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { isAdminAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required to upload files.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded. Please select an image.' },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Only JPG, PNG, WebP, GIF, SVG, and AVIF are permitted.' },
        { status: 400 }
      );
    }

    // 10MB file limit
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const sanitizedOriginal = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/-+/g, '-');
    const ext = path.extname(sanitizedOriginal) || '.png';
    const baseName = path.basename(sanitizedOriginal, ext);
    const uniqueFilename = `thumb_${Date.now()}_${baseName}${ext}`;

    let publicUrl = `/uploads/${uniqueFilename}`;

    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadsDir, { recursive: true });
      const destinationPath = path.join(uploadsDir, uniqueFilename);
      await writeFile(destinationPath, buffer);
    } catch {
      // Cloudflare Workers / Serverless edge environment with read-only disk
      publicUrl = `data:${file.type || 'image/png'};base64,${buffer.toString('base64')}`;
    }

    return NextResponse.json({
      success: true,
      message: 'Thumbnail processed successfully',
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
    });
  } catch (error: unknown) {
    console.error('Error handling thumbnail upload:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process file upload.' },
      { status: 500 }
    );
  }
}
