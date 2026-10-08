import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import AppsShowcase from '@/components/AppsShowcase';
import RequestAppSection from '@/components/RequestAppSection';
import Footer from '@/components/Footer';
import { sql, parseJsonField } from '@/lib/db';
import { AppItem } from '@/types';

// Force dynamic or revalidate every 30s
export const revalidate = 30;

async function getInitialData(): Promise<{ apps: AppItem[]; totalViews: number }> {
  try {
    const rows = (await sql(
      'SELECT * FROM apps ORDER BY featured DESC, views_count DESC, created_at DESC'
    )) as Record<string, unknown>[];

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
    }));

    const totalViews = apps.reduce((acc, curr) => acc + (curr.views_count || 0), 0);
    return { apps, totalViews };
  } catch (error) {
    console.error('Error fetching initial apps in page.tsx:', error);
    return {
      apps: [],
      totalViews: 0,
    };
  }
}

export default async function HomePage() {
  const { apps, totalViews } = await getInitialData();

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] flex flex-col selection:bg-white selection:text-black">
      {/* Floating Island Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Antigravity Hero Section */}
        <Hero appsCount={apps.length} totalViews={totalViews} />

        {/* Monochromatic Marquee Ribbon */}
        <MarqueeTicker />

        {/* Web Apps Showcase Section */}
        <AppsShowcase initialApps={apps} />

        {/* Custom App Request Section */}
        <RequestAppSection />
      </main>

      {/* Floating Island Footer */}
      <Footer />
    </div>
  );
}
