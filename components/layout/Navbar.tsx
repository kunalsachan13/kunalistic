"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, LayoutGrid, Menu, X, Sparkles, User, Box } from "lucide-react";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Tools", href: "/tools" },
    { label: "Categories", href: "/categories" },
    { label: "Creator", href: "/categories/creator" },
    { label: "AI", href: "/categories/ai" },
    { label: "Support", href: "/support", highlight: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[rgba(200,190,250,0.12)] bg-[#151130]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[rgba(200,190,250,0.1)] border border-[rgba(200,190,250,0.25)] flex items-center justify-center text-[#C8BEFA] group-hover:bg-[#C8BEFA] group-hover:text-[#151130] transition-all">
                <Box className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-[#C8BEFA]">
                  KUNALISTIC
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[rgba(200,190,250,0.5)] -mt-1 hidden sm:block">
                  Digital Toolbox
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? "text-[#C8BEFA] bg-[rgba(200,190,250,0.1)]"
                        : link.highlight
                        ? "text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] font-semibold flex items-center gap-1.5"
                        : "text-[rgba(200,190,250,0.65)] hover:text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.05)]"
                    }`}
                  >
                    {link.highlight && <Heart className="w-3 h-3 text-[#C8BEFA]" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[rgba(200,190,250,0.05)] border border-[rgba(200,190,250,0.15)] text-xs text-[rgba(200,190,250,0.55)] hover:text-[#C8BEFA] hover:border-[rgba(200,190,250,0.3)] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search tools...</span>
              </div>
              <kbd className="hidden sm:inline-flex text-[10px] bg-[rgba(200,190,250,0.08)] px-1.5 py-0.5 rounded border border-[rgba(200,190,250,0.12)] font-mono text-[#C8BEFA]">
                Ctrl K
              </kbd>
            </button>

            {/* User Dashboard Link */}
            <Link
              href="/dashboard"
              className="p-2 rounded-lg text-[rgba(200,190,250,0.7)] hover:text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.14)] transition-all"
              title="Dashboard & Favorites"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-[rgba(200,190,250,0.7)] hover:text-[#C8BEFA]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(200,190,250,0.1)] bg-[#151130] px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[rgba(200,190,250,0.8)] hover:bg-[rgba(200,190,250,0.08)]"
            >
              Dashboard & Saved
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[rgba(200,190,250,0.5)] hover:bg-[rgba(200,190,250,0.08)]"
            >
              Admin Suite
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
