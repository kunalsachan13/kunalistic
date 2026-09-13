"use client";

import React, { useState } from "react";
import { getAllSupportersForAdmin, updateSupporterStatus, SupporterWallEntry } from "@/lib/payments/ledger";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeartHandshake, Check, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminSupportPage() {
  const [entries, setEntries] = useState<SupporterWallEntry[]>(getAllSupportersForAdmin());

  const handleStatusChange = (id: string, status: "approved" | "pending" | "hidden") => {
    updateSupporterStatus(id, status);
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const totalRaised = entries.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#C8BEFA]">Support Ledger & Moderation</h2>
          <p className="text-xs text-[rgba(200,190,250,0.6)] mt-0.5">
            Voluntary contributions and public supporter wall messages.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.2)] text-xs text-[#C8BEFA]">
          Total Contributions: <strong className="text-base text-[#C8BEFA]">₹{totalRaised}</strong>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(200,190,250,0.14)] bg-[rgba(200,190,250,0.02)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[rgba(200,190,250,0.05)] border-b border-[rgba(200,190,250,0.1)] text-[rgba(200,190,250,0.6)] uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Supporter</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Message</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Wall Status</th>
              <th className="p-3.5 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(200,190,250,0.06)]">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-[rgba(200,190,250,0.03)] transition-colors">
                <td className="p-3.5 font-bold text-[#C8BEFA]">
                  {entry.displayName}
                </td>
                <td className="p-3.5 font-mono text-[#C8BEFA]">
                  ₹{entry.amount || 0}
                </td>
                <td className="p-3.5 text-[rgba(200,190,250,0.8)] max-w-xs italic">
                  {entry.message ? `"${entry.message}"` : "—"}
                </td>
                <td className="p-3.5 text-[rgba(200,190,250,0.5)]">
                  {entry.date}
                </td>
                <td className="p-3.5">
                  <Badge variant={entry.status === "approved" ? "active" : "subtle"}>
                    {entry.status}
                  </Badge>
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {entry.status !== "approved" && (
                      <button
                        onClick={() => handleStatusChange(entry.id, "approved")}
                        className="px-2 py-1 rounded bg-[rgba(200,190,250,0.1)] hover:bg-[#C8BEFA] hover:text-[#151130] text-[#C8BEFA] transition-colors"
                        title="Approve to Wall"
                      >
                        Approve
                      </button>
                    )}
                    {entry.status !== "hidden" && (
                      <button
                        onClick={() => handleStatusChange(entry.id, "hidden")}
                        className="px-2 py-1 rounded border border-[rgba(200,190,250,0.2)] text-[rgba(200,190,250,0.5)] hover:text-[#C8BEFA] transition-colors"
                        title="Hide from Wall"
                      >
                        Hide
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
