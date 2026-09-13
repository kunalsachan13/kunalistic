import React from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Suite — Kunalistic",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(200,190,250,0.12)]">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C8BEFA]" />
            <h1 className="text-2xl font-bold text-[#C8BEFA] tracking-tight">
              Platform Administration
            </h1>
          </div>
          <p className="text-xs text-[rgba(200,190,250,0.65)] mt-1">
            Manage tool registry statuses, voluntary contributions, supporter wall moderation, and ecosystem settings.
          </p>
        </div>
      </div>

      <AdminNav />

      <div>{children}</div>
    </div>
  );
}
