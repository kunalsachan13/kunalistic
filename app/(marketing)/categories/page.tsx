import React from "react";
import Link from "next/link";
import { getCategoriesWithCount } from "@/lib/registry";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowRight, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tool Categories — Kunalistic",
  description: "Browse utility tools by category: Image, PDF, Creator, Developer, Text, and Student utilities.",
};

export default function CategoriesPage() {
  const categories = getCategoriesWithCount();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C8BEFA] tracking-tight">
          Tool Categories
        </h1>
        <p className="text-sm text-[rgba(200,190,250,0.65)] mt-2 leading-relaxed">
          Structured digital utilities engineered for speed, privacy, and frictionless daily work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group p-6 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] hover:bg-[rgba(200,190,250,0.08)] hover:border-[rgba(200,190,250,0.32)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.18)] flex items-center justify-center text-[#C8BEFA] group-hover:bg-[#C8BEFA] group-hover:text-[#151130] transition-all mb-4">
                <DynamicIcon name={cat.icon} className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#C8BEFA] tracking-tight group-hover:underline">
                {cat.name}
              </h2>
              <p className="text-xs text-[rgba(200,190,250,0.62)] mt-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(200,190,250,0.08)] flex items-center justify-between text-xs text-[rgba(200,190,250,0.5)]">
              <span>{cat.itemCount} active utilities</span>
              <span className="text-[#C8BEFA] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
