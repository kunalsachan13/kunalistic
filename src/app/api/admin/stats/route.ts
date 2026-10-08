import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { DashboardStats } from '@/types';

export async function GET() {
  try {
    const appStatsRows = (await sql(`
      SELECT 
        COUNT(*)::int as total_apps,
        COUNT(*) FILTER (WHERE featured = true)::int as featured_apps,
        COALESCE(SUM(views_count), 0)::int as total_views,
        COALESCE(SUM(likes_count), 0)::int as total_likes
      FROM apps
    `)) as Record<string, unknown>[];

    const reqStatsRows = (await sql(`
      SELECT 
        COUNT(*)::int as total_requests,
        COUNT(*) FILTER (WHERE status = 'pending')::int as pending_requests,
        COUNT(*) FILTER (WHERE status = 'in_progress')::int as in_progress_requests,
        COUNT(*) FILTER (WHERE status = 'completed')::int as completed_requests
      FROM app_requests
    `)) as Record<string, unknown>[];

    const appStats = appStatsRows[0] || {};
    const reqStats = reqStatsRows[0] || {};

    const stats: DashboardStats = {
      totalApps: Number(appStats.total_apps || 0),
      featuredApps: Number(appStats.featured_apps || 0),
      totalViews: Number(appStats.total_views || 0),
      totalLikes: Number(appStats.total_likes || 0),
      totalRequests: Number(reqStats.total_requests || 0),
      pendingRequests: Number(reqStats.pending_requests || 0),
      inProgressRequests: Number(reqStats.in_progress_requests || 0),
      completedRequests: Number(reqStats.completed_requests || 0),
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error: unknown) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
