"use client";

import React, { useState } from "react";
import { TOOL_REGISTRY } from "@/lib/registry";
import { ToolDefinition, ToolStatus } from "@/lib/registry/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Search, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export default function AdminToolsPage() {
  const [tools, setTools] = useState<ToolDefinition[]>(TOOL_REGISTRY);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const toggleFeatured = (id: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t))
    );
  };

  const toggleTrending = (id: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, trending: !t.trending } : t))
    );
  };

  const changeStatus = (id: string, status: ToolStatus) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const filtered = tools.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#C8BEFA]">Tools Registry ({tools.length})</h2>
          <p className="text-xs text-[rgba(200,190,250,0.6)] mt-0.5">Control live statuses, visibility, and discovery tags.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg px-3 py-2 outline-none w-full sm:w-48 placeholder-[rgba(200,190,250,0.38)]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(200,190,250,0.14)] bg-[rgba(200,190,250,0.02)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[rgba(200,190,250,0.05)] border-b border-[rgba(200,190,250,0.1)] text-[rgba(200,190,250,0.6)] uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Tool</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-center">Featured</th>
              <th className="p-3.5 text-center">Trending</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(200,190,250,0.06)]">
            {filtered.map((tool) => (
              <tr key={tool.id} className="hover:bg-[rgba(200,190,250,0.03)] transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.15)] flex items-center justify-center text-[#C8BEFA] shrink-0">
                      <DynamicIcon name={tool.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#C8BEFA] block">{tool.name}</span>
                      <span className="text-[11px] font-mono text-[rgba(200,190,250,0.5)]">/tools/{tool.slug}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3.5 capitalize text-[rgba(200,190,250,0.8)] font-medium">
                  {tool.category}
                </td>
                <td className="p-3.5">
                  <select
                    value={tool.status}
                    onChange={(e) => changeStatus(tool.id, e.target.value as ToolStatus)}
                    className="bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.2)] text-xs text-[#C8BEFA] rounded-md px-2 py-1 outline-none capitalize"
                  >
                    <option value="active" className="bg-[#151130]">active</option>
                    <option value="beta" className="bg-[#151130]">beta</option>
                    <option value="coming-soon" className="bg-[#151130]">coming-soon</option>
                    <option value="maintenance" className="bg-[#151130]">maintenance</option>
                  </select>
                </td>
                <td className="p-3.5 text-center">
                  <button
                    onClick={() => toggleFeatured(tool.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      tool.featured
                        ? "bg-[rgba(200,190,250,0.2)] border-[rgba(200,190,250,0.4)] text-[#C8BEFA]"
                        : "border-[rgba(200,190,250,0.1)] text-[rgba(200,190,250,0.3)] hover:text-[#C8BEFA]"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </td>
                <td className="p-3.5 text-center">
                  <button
                    onClick={() => toggleTrending(tool.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      tool.trending
                        ? "bg-[rgba(200,190,250,0.2)] border-[rgba(200,190,250,0.4)] text-[#C8BEFA]"
                        : "border-[rgba(200,190,250,0.1)] text-[rgba(200,190,250,0.3)] hover:text-[#C8BEFA]"
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                  </button>
                </td>
                <td className="p-3.5 text-right">
                  <a
                    href={`/tools/${tool.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#C8BEFA] hover:underline"
                  >
                    Preview
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
