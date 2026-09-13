"use client";

import React, { useState } from "react";
import { UNIT_DOMAINS, UnitDomain, convertUnits } from "@/lib/processing/units";
import { Input } from "@/components/ui/FormControls";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { ArrowRightLeft } from "lucide-react";

export const UnitConverterTool: React.FC = () => {
  const [currentDomainId, setCurrentDomainId] = useState<UnitDomain>("length");
  const currentDomain = UNIT_DOMAINS.find((d) => d.id === currentDomainId) || UNIT_DOMAINS[0];

  const [fromUnit, setFromUnit] = useState<string>(currentDomain.units[0].id);
  const [toUnit, setToUnit] = useState<string>(currentDomain.units[1]?.id || currentDomain.units[0].id);
  const [inputValue, setInputValue] = useState<number>(1);

  const handleDomainChange = (domainId: UnitDomain) => {
    setCurrentDomainId(domainId);
    const domain = UNIT_DOMAINS.find((d) => d.id === domainId) || UNIT_DOMAINS[0];
    setFromUnit(domain.units[0].id);
    setToUnit(domain.units[1]?.id || domain.units[0].id);
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const convertedValue = convertUnits(currentDomainId, inputValue, fromUnit, toUnit);

  const fromUnitObj = currentDomain.units.find((u) => u.id === fromUnit);
  const toUnitObj = currentDomain.units.find((u) => u.id === toUnit);

  return (
    <div className="space-y-6">
      {/* Domain Selection Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.12)] overflow-x-auto no-scrollbar">
        {UNIT_DOMAINS.map((dom) => (
          <button
            key={dom.id}
            onClick={() => handleDomainChange(dom.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              currentDomainId === dom.id
                ? "bg-[#C8BEFA] text-[#151130] shadow-[0_0_12px_rgba(200,190,250,0.2)]"
                : "text-[rgba(200,190,250,0.65)] hover:text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.06)]"
            }`}
          >
            {dom.name}
          </button>
        ))}
      </div>

      {/* Main Conversion Panel */}
      <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
          {/* From Input & Unit */}
          <div className="sm:col-span-2 space-y-2">
            <Input
              label={`From (${fromUnitObj?.symbol || ""})`}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              {currentDomain.units.map((u) => (
                <option key={u.id} value={u.id} className="bg-[#151130] text-[#C8BEFA]">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pb-2">
            <button
              onClick={handleSwapUnits}
              className="p-2.5 rounded-xl bg-[rgba(200,190,250,0.08)] border border-[rgba(200,190,250,0.2)] text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.15)] transition-all cursor-pointer"
              title="Swap Units"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Unit Selector */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)]">
              To ({toUnitObj?.symbol || ""})
            </label>
            <div className="h-[42px] px-3.5 flex items-center rounded-lg bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.2)] font-mono text-sm font-bold text-[#C8BEFA] truncate">
              {convertedValue}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] rounded-lg p-2.5 outline-none"
            >
              {currentDomain.units.map((u) => (
                <option key={u.id} value={u.id} className="bg-[#151130] text-[#C8BEFA]">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Big Conversion Output Result */}
        <div className="p-5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Equal Value</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#C8BEFA] mt-1">
              {inputValue} {fromUnitObj?.symbol} = {convertedValue} {toUnitObj?.symbol}
            </p>
            <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">
              {fromUnitObj?.name} to {toUnitObj?.name}
            </p>
          </div>
          <CopyButton text={`${convertedValue} ${toUnitObj?.symbol}`} size="sm" />
        </div>
      </div>
    </div>
  );
};
