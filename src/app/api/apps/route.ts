import { NextRequest, NextResponse } from 'next/server';
import { sql, parseJsonField } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { AppItem } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featuredOnly = searchParams.get('featured') === 'true';

    let query = 'SELECT * FROM apps WHERE 1=1';
    const params: (string | boolean)[] = [];

    if (category && category !== 'All') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (featuredOnly) {
      params.push(true);
      query += ` AND featured = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(description) LIKE $${params.length} OR LOWER(tagline) LIKE $${params.length})`;
    }

    query += ' ORDER BY featured DESC, views_count DESC, created_at DESC';

    const rows = (await sql(query, params)) as Record<string, unknown>[];

    const apps: AppItem[] = rows.map((row) => ({
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
      views_count: Number(row.views_count || 0),
      likes_count: Number(row.likes_count || 0),
      created_at: row.created_at ? new Date(row.created_at as string).toISOString() : undefined,
      updated_at: row.updated_at ? new Date(row.updated_at as string).toISOString() : undefined,
    }));

    return NextResponse.json({ success: true, data: apps });
  } catch (error: unknown) {
    console.error('Error fetching apps:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apps from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      tagline,
      description,
      category = 'Web App',
      tags = [],
      thumbnail_url = '',
      live_url = '',
      github_url = '',
      features = [],
      tech_stack = [],
      featured = false,
      status = 'live',
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'App title is required' },
        { status: 400 }
      );
    }

    const cleanTitle = title.trim();
    const finalSlug = (slug || cleanTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `app-${Date.now()}`;
    const finalTagline = (tagline && tagline.trim()) || cleanTitle;
    const finalDescription = (description && description.trim()) || finalTagline;

    const id = `app_${Date.now()}`;

    await sql(
      `INSERT INTO apps (
        id, title, slug, tagline, description, category, tags, thumbnail_url,
        live_url, github_url, features, tech_stack, featured, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10, $11::jsonb, $12::jsonb, $13, $14
      )`,
      [
        id,
        cleanTitle,
        finalSlug,
        finalTagline,
        finalDescription,
        category || 'Web Design',
        JSON.stringify(tags || []),
        thumbnail_url || '',
        live_url || '',
        github_url || '',
        JSON.stringify(features),
        JSON.stringify(tech_stack),
        Boolean(featured),
        status,
      ]
    );

    return NextResponse.json({ success: true, message: 'App created successfully', id });
  } catch (error: unknown) {
    console.error('Error creating app:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create app' },
      { status: 500 }
    );
  }
}
