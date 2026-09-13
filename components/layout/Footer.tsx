import React from "react";
import Link from "next/link";
import { Box, Heart, Shield, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[rgba(200,190,250,0.12)] bg-[#151130] text-[rgba(200,190,250,0.7)] text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 text-[#C8BEFA] font-bold text-base">
              <div className="w-6 h-6 rounded bg-[rgba(200,190,250,0.1)] border border-[rgba(200,190,250,0.2)] flex items-center justify-center">
                <Box className="w-3.5 h-3.5" />
              </div>
              <span>KUNALISTIC</span>
            </Link>
            <p className="text-xs text-[rgba(200,190,250,0.6)] leading-relaxed">
              One place. Every little tool. A unified digital toolbox running directly in your browser with zero subscriptions.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[rgba(200,190,250,0.5)]">
              <Shield className="w-3.5 h-3.5 text-[#C8BEFA]" />
              <span>Privacy-first, in-browser execution</span>
            </div>
          </div>

          {/* Tools & Categories */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#C8BEFA] mb-3">
              Explore Tools
            </h4>
            <ul className="space-y-2">
              <li><Link href="/categories/image" className="hover:text-[#C8BEFA] transition-colors">Image Tools</Link></li>
              <li><Link href="/categories/pdf" className="hover:text-[#C8BEFA] transition-colors">PDF Tools</Link></li>
              <li><Link href="/categories/creator" className="hover:text-[#C8BEFA] transition-colors">Creator AI Suite</Link></li>
              <li><Link href="/categories/developer" className="hover:text-[#C8BEFA] transition-colors">Developer Tools</Link></li>
              <li><Link href="/categories/text" className="hover:text-[#C8BEFA] transition-colors">Text Utilities</Link></li>
              <li><Link href="/categories/student" className="hover:text-[#C8BEFA] transition-colors">Student Calculators</Link></li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#C8BEFA] mb-3">
              Support & Ethics
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="flex items-center gap-1.5 text-[#C8BEFA] font-medium hover:underline">
                  <Heart className="w-3 h-3" />
                  <span>Support Kunalistic</span>
                </Link>
              </li>
              <li><Link href="/about" className="hover:text-[#C8BEFA] transition-colors">About & Vision</Link></li>
              <li><Link href="/privacy" className="hover:text-[#C8BEFA] transition-colors">Privacy Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-[#C8BEFA] transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-[#C8BEFA] transition-colors">Feedback & Contact</Link></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#C8BEFA] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/tools/image-compressor" className="hover:text-[#C8BEFA] transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/viral-reel-idea-generator" className="hover:text-[#C8BEFA] transition-colors">Viral Reel Generator</Link></li>
              <li><Link href="/tools/merge-pdf" className="hover:text-[#C8BEFA] transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-[#C8BEFA] transition-colors">JSON Formatter</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#C8BEFA] transition-colors">My Toolbox</Link></li>
              <li><Link href="/admin" className="hover:text-[#C8BEFA] transition-colors text-[rgba(200,190,250,0.4)]">Admin Suite</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(200,190,250,0.08)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[rgba(200,190,250,0.5)]">
          <p>© {new Date().getFullYear()} Kunalistic (kunalistic.io). No subscriptions. No artificial lockouts.</p>
          <p className="flex items-center gap-1">
            <span>Built with curiosity by</span>
            <span className="text-[#C8BEFA] font-medium">Kunal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
