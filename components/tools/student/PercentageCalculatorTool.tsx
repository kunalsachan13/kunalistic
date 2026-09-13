"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/FormControls";
import { CopyButton } from "@/components/tool-shell/ActionButtons";

export const PercentageCalculatorTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"whatIs" | "isWhatPercent" | "change" | "add" | "subtract">("whatIs");

  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<number>(15);
  const [m1Y, setM1Y] = useState<number>(200);

  // Mode 2: X is what percent of Y?
  const [m2X, setM2X] = useState<number>(25);
  const [m2Y, setM2Y] = useState<number>(100);

  // Mode 3: Percentage increase/decrease from X to Y
  const [m3X, setM3X] = useState<number>(50);
  const [m3Y, setM3Y] = useState<number>(75);

  // Mode 4: Add X% to Y
  const [m4X, setM4X] = useState<number>(18);
  const [m4Y, setM4Y] = useState<number>(500);

  // Mode 5: Subtract X% from Y
  const [m5X, setM5X] = useState<number>(20);
  const [m5Y, setM5Y] = useState<number>(150);

  const tabs = [
    { id: "whatIs", label: "X% of Y" },
    { id: "isWhatPercent", label: "X is what % of Y" },
    { id: "change", label: "% Change (X to Y)" },
    { id: "add", label: "Add X% to Y" },
    { id: "subtract", label: "Subtract X% from Y" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#C8BEFA] text-[#151130] shadow-[0_0_12px_rgba(200,190,250,0.2)]"
                : "text-[rgba(200,190,250,0.65)] hover:text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.06)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1: What is X% of Y? */}
      {activeTab === "whatIs" && (() => {
        const res = (m1X / 100) * m1Y;
        return (
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">What is {m1X}% of {m1Y}?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Percentage (X%)"
                type="number"
                value={m1X}
                onChange={(e) => setM1X(Number(e.target.value))}
              />
              <Input
                label="Total Value (Y)"
                type="number"
                value={m1Y}
                onChange={(e) => setM1Y(Number(e.target.value))}
              />
            </div>

            <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Calculated Result</p>
                <p className="text-3xl font-bold text-[#C8BEFA] mt-1">{parseFloat(res.toFixed(4))}</p>
                <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">Formula: ({m1X} ÷ 100) × {m1Y} = {res}</p>
              </div>
              <CopyButton text={res.toString()} size="sm" />
            </div>
          </div>
        );
      })()}

      {/* Mode 2: X is what percent of Y? */}
      {activeTab === "isWhatPercent" && (() => {
        const res = m2Y !== 0 ? (m2X / m2Y) * 100 : 0;
        return (
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">{m2X} is what percent of {m2Y}?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Part Value (X)"
                type="number"
                value={m2X}
                onChange={(e) => setM2X(Number(e.target.value))}
              />
              <Input
                label="Whole Value (Y)"
                type="number"
                value={m2Y}
                onChange={(e) => setM2Y(Number(e.target.value))}
              />
            </div>

            <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Calculated Percentage</p>
                <p className="text-3xl font-bold text-[#C8BEFA] mt-1">{parseFloat(res.toFixed(2))}%</p>
                <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">Formula: ({m2X} ÷ {m2Y}) × 100 = {res.toFixed(2)}%</p>
              </div>
              <CopyButton text={`${parseFloat(res.toFixed(2))}%`} size="sm" />
            </div>
          </div>
        );
      })()}

      {/* Mode 3: % Change (X to Y) */}
      {activeTab === "change" && (() => {
        const diff = m3Y - m3X;
        const pctChange = m3X !== 0 ? (diff / m3X) * 100 : 0;
        const isIncrease = diff >= 0;
        return (
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">Percentage Change from {m3X} to {m3Y}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Initial Value (X)"
                type="number"
                value={m3X}
                onChange={(e) => setM3X(Number(e.target.value))}
              />
              <Input
                label="Final Value (Y)"
                type="number"
                value={m3Y}
                onChange={(e) => setM3Y(Number(e.target.value))}
              />
            </div>

            <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">
                  {isIncrease ? "Percentage Increase" : "Percentage Decrease"}
                </p>
                <p className="text-3xl font-bold text-[#C8BEFA] mt-1">
                  {isIncrease ? "+" : ""}{parseFloat(pctChange.toFixed(2))}%
                </p>
                <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">
                  Formula: (({m3Y} - {m3X}) ÷ {m3X}) × 100
                </p>
              </div>
              <CopyButton text={`${parseFloat(pctChange.toFixed(2))}%`} size="sm" />
            </div>
          </div>
        );
      })()}

      {/* Mode 4: Add X% to Y */}
      {activeTab === "add" && (() => {
        const addedAmount = (m4X / 100) * m4Y;
        const total = m4Y + addedAmount;
        return (
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">Add {m4X}% to {m4Y}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Percentage to Add (X%)"
                type="number"
                value={m4X}
                onChange={(e) => setM4X(Number(e.target.value))}
              />
              <Input
                label="Base Value (Y)"
                type="number"
                value={m4Y}
                onChange={(e) => setM4Y(Number(e.target.value))}
              />
            </div>

            <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Total After Addition</p>
                <p className="text-3xl font-bold text-[#C8BEFA] mt-1">{parseFloat(total.toFixed(4))}</p>
                <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">
                  Added Amount: {parseFloat(addedAmount.toFixed(4))}
                </p>
              </div>
              <CopyButton text={total.toString()} size="sm" />
            </div>
          </div>
        );
      })()}

      {/* Mode 5: Subtract X% from Y */}
      {activeTab === "subtract" && (() => {
        const discountedAmount = (m5X / 100) * m5Y;
        const finalVal = m5Y - discountedAmount;
        return (
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
            <h3 className="text-sm font-semibold text-[#C8BEFA]">Subtract {m5X}% from {m5Y} (Discount)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Percentage to Subtract (X%)"
                type="number"
                value={m5X}
                onChange={(e) => setM5X(Number(e.target.value))}
              />
              <Input
                label="Base Value (Y)"
                type="number"
                value={m5Y}
                onChange={(e) => setM5Y(Number(e.target.value))}
              />
            </div>

            <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Discounted Final Value</p>
                <p className="text-3xl font-bold text-[#C8BEFA] mt-1">{parseFloat(finalVal.toFixed(4))}</p>
                <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">
                  Discount Amount: {parseFloat(discountedAmount.toFixed(4))}
                </p>
              </div>
              <CopyButton text={finalVal.toString()} size="sm" />
            </div>
          </div>
        );
      })()}
    </div>
  );
};
