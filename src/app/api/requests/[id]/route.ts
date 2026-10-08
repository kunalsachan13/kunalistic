import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

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
    const { status, priority, admin_notes } = body;

    await sql(
      `UPDATE app_requests SET
        status = COALESCE($2, status),
        priority = COALESCE($3, priority),
        admin_notes = COALESCE($4, admin_notes),
        updated_at = NOW()
      WHERE id = $1`,
      [id, status ?? null, priority ?? null, admin_notes ?? null]
    );

    return NextResponse.json({ success: true, message: 'Request updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating request:', error);
    return NextResponse.json({ success: false, error: 'Failed to update request' }, { status: 500 });
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
    await sql('DELETE FROM app_requests WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Request deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting request:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete request' }, { status: 500 });
  }
}
