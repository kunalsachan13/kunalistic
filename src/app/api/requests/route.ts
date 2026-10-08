import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { AppRequest } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query = 'SELECT * FROM app_requests WHERE 1=1';
    const params: string[] = [];

    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    if (priority && priority !== 'all') {
      params.push(priority);
      query += ` AND priority = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const rows = (await sql(query, params)) as Record<string, unknown>[];

    const requests: AppRequest[] = rows.map((row) => ({
      id: String(row.id),
      client_name: String(row.client_name),
      client_email: String(row.client_email),
      client_company: row.client_company ? String(row.client_company) : undefined,
      project_title: String(row.project_title),
      project_type: String(row.project_type),
      budget_range: String(row.budget_range),
      timeline: row.timeline ? String(row.timeline) : undefined,
      description: String(row.description),
      features_needed: row.features_needed ? String(row.features_needed) : undefined,
      preferred_tech: row.preferred_tech ? String(row.preferred_tech) : undefined,
      reference_links: row.reference_links ? String(row.reference_links) : undefined,
      status: (row.status as AppRequest['status']) || 'pending',
      priority: (row.priority as AppRequest['priority']) || 'normal',
      admin_notes: row.admin_notes ? String(row.admin_notes) : undefined,
      created_at: row.created_at ? new Date(row.created_at as string).toISOString() : undefined,
      updated_at: row.updated_at ? new Date(row.updated_at as string).toISOString() : undefined,
    }));

    return NextResponse.json({ success: true, data: requests });
  } catch (error: unknown) {
    console.error('Error fetching app requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_email,
      client_company,
      project_title,
      project_type,
      budget_range,
      timeline,
      description,
      features_needed,
      preferred_tech,
      reference_links,
      bot_field,
    } = body;

    // Honeypot anti-spam verification: bots fill hidden inputs
    if (bot_field) {
      return NextResponse.json(
        { success: false, error: 'Automated spam submission detected.' },
        { status: 400 }
      );
    }

    if (!client_email || !client_email.trim() || !description || !description.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide your email address and project description.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client_email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const finalClientName = (client_name && client_name.trim()) || 'Prospective Client';
    const finalProjectTitle =
      (project_title && project_title.trim()) ||
      `${project_type || 'Custom'} Project Inquiry`;
    const finalBudgetRange = budget_range || '$1,500 - $5,000';

    const id = `req_${Date.now()}`;

    await sql(
      `INSERT INTO app_requests (
        id, client_name, client_email, client_company, project_title, project_type,
        budget_range, timeline, description, features_needed, preferred_tech, reference_links,
        status, priority
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'pending', 'normal'
      )`,
      [
        id,
        finalClientName,
        client_email.trim(),
        client_company || null,
        finalProjectTitle,
        project_type || 'Web Design',
        finalBudgetRange,
        timeline || 'Flexible',
        description.trim(),
        features_needed || null,
        preferred_tech || null,
        reference_links || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Your custom app request was submitted successfully! Kunal will review it soon.',
      id,
    });
  } catch (error: unknown) {
    console.error('Error submitting app request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
