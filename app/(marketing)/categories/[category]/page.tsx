import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/registry/categories";
import { getToolsByCategory } from "@/lib/registry";
import { ToolCategory } from "@/lib/registry/types";
import { ToolCard } from "@/components/tool-shell/ToolCard";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return { title: "Category Not Found — Kunalistic" };
  }

  return {
    title: `${cat.name} — Free In-Browser Utilities | Kunalistic`,
    description: cat.description,
  };
}

export default async function SpecificCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const tools = getToolsByCategory(cat.id as ToolCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[rgba(200,190,250,0.5)] mb-6">
        <Link href="/" className="hover:text-[#C8BEFA] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/categories" className="hover:text-[#C8BEFA] transition-colors">Categories</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#C8BEFA] font-medium">{cat.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-10 pb-6 border-b border-[rgba(200,190,250,0.12)]">
        <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.2)] flex items-center justify-center text-[#C8BEFA] shrink-0">
          <DynamicIcon name={cat.icon} className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
            {cat.name}
          </h1>
          <p className="text-sm text-[rgba(200,190,250,0.65)] mt-1.5 leading-relaxed max-w-2xl">
            {cat.description}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)]">
          <p className="text-sm text-[#C8BEFA]">Utilities coming soon to this category</p>
        </div>
      )}
    </div>
  );
}
