import { NextRequest, NextResponse } from 'next/server';
import { sql, parseJsonField } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { AppItem } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = (await sql(
      'SELECT * FROM apps WHERE id = $1 OR slug = $1 LIMIT 1',
      [id]
    )) as Record<string, unknown>[];

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'App not found' }, { status: 404 });
    }

    const row = rows[0];

    // Increment view count asynchronously
    await sql('UPDATE apps SET views_count = views_count + 1 WHERE id = $1', [String(row.id)]);

    const app: AppItem = {
      id: String(row.id),
      title: String(row.title),
      slug: String(row.slug),
      tagline: String(row.tagline || ''),
      description: String(row.description || ''),
      category: String(row.category || 'Web App'),
      tags: parseJsonField<string[]>(row.tags, []),
      thumbnail_url: String(row.thumbnail_url || ''),
      live_url: String(row.live_url || ''),
      github_url: String(row.github_url || ''),
      features: parseJsonField<string[]>(row.features, []),
      tech_stack: parseJsonField<string[]>(row.tech_stack, []),
      featured: Boolean(row.featured),
      status: (row.status as AppItem['status']) || 'live',
      views_count: Number(row.views_count || 0) + 1,
      likes_count: Number(row.likes_count || 0),
      created_at: row.created_at ? new Date(row.created_at as string).toISOString() : undefined,
      updated_at: row.updated_at ? new Date(row.updated_at as string).toISOString() : undefined,
    };

    return NextResponse.json({ success: true, data: app });
  } catch (error: unknown) {
    console.error('Error fetching single app:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch app' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      tagline,
      description,
      category,
      tags,
      thumbnail_url,
      live_url,
      github_url,
      features,
      tech_stack,
      featured,
      status,
    } = body;

    await sql(
      `UPDATE apps SET
        title = COALESCE($2, title),
        slug = COALESCE($3, slug),
        tagline = COALESCE($4, tagline),
        description = COALESCE($5, description),
        category = COALESCE($6, category),
        tags = CASE WHEN $7::text IS NOT NULL THEN $7::jsonb ELSE tags END,
        thumbnail_url = COALESCE($8, thumbnail_url),
        live_url = COALESCE($9, live_url),
        github_url = COALESCE($10, github_url),
        features = CASE WHEN $11::text IS NOT NULL THEN $11::jsonb ELSE features END,
        tech_stack = CASE WHEN $12::text IS NOT NULL THEN $12::jsonb ELSE tech_stack END,
        featured = COALESCE($13, featured),
        status = COALESCE($14, status),
        updated_at = NOW()
      WHERE id = $1`,
      [
        id,
        title ?? null,
        slug ?? null,
        tagline ?? null,
        description ?? null,
        category ?? null,
        tags ? JSON.stringify(tags) : null,
        thumbnail_url ?? null,
        live_url ?? null,
        github_url ?? null,
        features ? JSON.stringify(features) : null,
        tech_stack ? JSON.stringify(tech_stack) : null,
        typeof featured === 'boolean' ? featured : null,
        status ?? null,
      ]
    );

    return NextResponse.json({ success: true, message: 'App updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating app:', error);
    return NextResponse.json({ success: false, error: 'Failed to update app' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await sql('DELETE FROM apps WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'App deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting app:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete app' }, { status: 500 });
  }
}
