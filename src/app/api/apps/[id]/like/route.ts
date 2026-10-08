import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const likeId = `${id}_${ip.replace(/[^a-zA-Z0-9]/g, '_')}`;

    // Insert like record if not already liked by this ip
    try {
      await sql(
        'INSERT INTO app_likes (id, app_id, visitor_ip) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
        [likeId, id, ip]
      );
    } catch {
      // Ignore if table has no conflict constraint or error
    }

    // Increment like count on the app
    const updated = (await sql(
      'UPDATE apps SET likes_count = likes_count + 1 WHERE id = $1 RETURNING likes_count',
      [id]
    )) as { likes_count: number }[];

    const newLikesCount = updated[0]?.likes_count ?? 1;

    return NextResponse.json({ success: true, likes_count: newLikesCount });
  } catch (error: unknown) {
    console.error('Error liking app:', error);
    return NextResponse.json({ success: false, error: 'Failed to record like' }, { status: 500 });
  }
}
