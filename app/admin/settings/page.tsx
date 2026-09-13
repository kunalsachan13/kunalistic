"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { Sliders, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("KUNALISTIC");
  const [primaryDomain, setPrimaryDomain] = useState("https://kunalistic.io");
  const [primaryTagline, setPrimaryTagline] = useState("One place. Every little tool.");
  const [secondaryTagline, setSecondaryTagline] = useState("Your digital toolbox.");
  const [supportPresets, setSupportPresets] = useState("49, 99, 199, 499");
  const [supportMessage, setSupportMessage] = useState(
    "Kunalistic is built to keep useful tools in one place and make them freely accessible. If something here saved you time or helped you get something done, you can support the project."
  );
  const [contactEmail, setContactEmail] = useState("support@kunalistic.io");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#C8BEFA]">Global System Settings</h2>
        <p className="text-xs text-[rgba(200,190,250,0.6)] mt-0.5">
          Configure branding, support copy, preset amounts, and domain references.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] space-y-4">
        <Input
          label="Platform Name"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />

        <Input
          label="Canonical Domain"
          value={primaryDomain}
          onChange={(e) => setPrimaryDomain(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Primary Tagline"
            value={primaryTagline}
            onChange={(e) => setPrimaryTagline(e.target.value)}
          />
          <Input
            label="Secondary Positioning"
            value={secondaryTagline}
            onChange={(e) => setSecondaryTagline(e.target.value)}
          />
        </div>

        <Input
          label="Voluntary Support Presets (Comma-separated INR)"
          value={supportPresets}
          onChange={(e) => setSupportPresets(e.target.value)}
          hint="Default options shown on /support and tool shells."
        />

        <Textarea
          label="Support Philosophy Statement"
          rows={3}
          value={supportMessage}
          onChange={(e) => setSupportMessage(e.target.value)}
        />

        <Input
          label="Contact & Administrative Email"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <div className="pt-2 flex items-center gap-3">
          <Button type="submit" variant="primary" size="md" className="font-bold gap-1.5">
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </Button>

          {saved && (
            <span className="text-xs font-semibold text-[#C8BEFA] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully</span>
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
