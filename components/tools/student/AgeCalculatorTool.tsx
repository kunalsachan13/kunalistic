"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/FormControls";
import { CopyButton } from "@/components/tool-shell/ActionButtons";
import { Calendar, Sparkles, Clock } from "lucide-react";

export const AgeCalculatorTool: React.FC = () => {
  const [birthDateStr, setBirthDateStr] = useState<string>("2000-01-01");
  const [targetDateStr, setTargetDateStr] = useState<string>(new Date().toISOString().split("T")[0]);

  const calculateAge = () => {
    const birth = new Date(birthDateStr);
    const target = new Date(targetDateStr);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday countdown
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Day of birth
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDayName = daysOfWeek[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysUntilNextBday,
      bornDayName,
    };
  };

  const ageData = calculateAge();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          value={birthDateStr}
          onChange={(e) => setBirthDateStr(e.target.value)}
        />
        <Input
          label="Age as of Date"
          type="date"
          value={targetDateStr}
          onChange={(e) => setTargetDateStr(e.target.value)}
        />
      </div>

      {ageData && (
        <div className="space-y-6">
          {/* Main Chronological Result */}
          <div className="p-6 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[rgba(200,190,250,0.6)]">Your Exact Age</p>
              <p className="text-3xl font-extrabold text-[#C8BEFA] mt-1">
                {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
              </p>
              <p className="text-xs text-[rgba(200,190,250,0.6)] mt-1">
                Born on a <span className="font-semibold text-[#C8BEFA]">{ageData.bornDayName}</span>
              </p>
            </div>
            <CopyButton
              text={`${ageData.years} Years, ${ageData.months} Months, ${ageData.days} Days`}
              size="sm"
            />
          </div>

          {/* Next Birthday & Life Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C8BEFA]">
                <Calendar className="w-4 h-4 text-[#C8BEFA]" />
                <span>Next Birthday Countdown</span>
              </div>
              <p className="text-2xl font-bold text-[#C8BEFA] mt-2">
                {ageData.daysUntilNextBday === 0 ? "Today is your Birthday! 🎉" : `${ageData.daysUntilNextBday} Days Left`}
              </p>
              <p className="text-xs text-[rgba(200,190,250,0.5)]">Mark your calendar for the upcoming milestone.</p>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C8BEFA]">
                <Clock className="w-4 h-4 text-[#C8BEFA]" />
                <span>Lifetime Milestones</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[rgba(200,190,250,0.7)] pt-1">
                <div>Total Days: <span className="font-bold text-[#C8BEFA]">{ageData.totalDays.toLocaleString()}</span></div>
                <div>Total Weeks: <span className="font-bold text-[#C8BEFA]">{ageData.totalWeeks.toLocaleString()}</span></div>
                <div>Total Hours: <span className="font-bold text-[#C8BEFA]">{ageData.totalHours.toLocaleString()}</span></div>
                <div>Total Minutes: <span className="font-bold text-[#C8BEFA]">{ageData.totalMinutes.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
