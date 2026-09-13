import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, getAllTools } from "@/lib/registry";
import { ToolShell } from "@/components/tool-shell/ToolShell";
import { ToolDispatcher } from "@/components/tools/ToolDispatcher";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found — Kunalistic",
    };
  }

  const url = `https://kunalistic.io/tools/${tool.slug}`;

  return {
    title: `${tool.name} — Kunalistic`,
    description: tool.seo?.description || tool.shortDescription,
    keywords: tool.seo?.keywords || tool.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.name} | Kunalistic Digital Toolbox`,
      description: tool.shortDescription,
      url,
      siteName: "Kunalistic",
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Structured JSON-LD Schema for SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell tool={tool}>
        <ToolDispatcher slug={tool.slug} />
      </ToolShell>
    </>
  );
}
