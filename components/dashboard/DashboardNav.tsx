"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Heart, Bookmark, History } from "lucide-react";

export const DashboardNav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "Saved Outputs", href: "/dashboard/saved", icon: Bookmark },
    { label: "Recent History", href: "/dashboard/history", icon: History },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] overflow-x-auto no-scrollbar mb-8">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? "bg-[#C8BEFA] text-[#151130] shadow-[0_0_12px_rgba(200,190,250,0.2)]"
                : "text-[rgba(200,190,250,0.65)] hover:text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.06)]"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
