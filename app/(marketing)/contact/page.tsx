"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/FormControls";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setIsSent(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-8">
        <Mail className="w-10 h-10 text-[#C8BEFA] mx-auto mb-3" />
        <h1 className="text-3xl font-extrabold text-[#C8BEFA] tracking-tight">
          Feedback & Suggestions
        </h1>
        <p className="text-xs sm:text-sm text-[rgba(200,190,250,0.7)] mt-2">
          Want a specific tool added to Kunalistic? Share your request directly with Kunal.
        </p>
      </div>

      {!isSent ? (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.14)] space-y-4"
        >
          <Input
            label="Your Name"
            placeholder="Kunal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address (Optional)"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hint="Only needed if you'd like a personal reply."
          />
          <Textarea
            label="Tool Idea / Suggestion"
            placeholder="Describe the tool or workflow you would love to see..."
            rows={4}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="lg" className="w-full font-bold">
            Send Suggestion
          </Button>
        </form>
      ) : (
        <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.25)] text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#C8BEFA] mx-auto" />
          <h2 className="text-xl font-bold text-[#C8BEFA]">Thank You for Your Feedback!</h2>
          <p className="text-xs text-[rgba(200,190,250,0.7)]">
            We evaluate tool suggestions regularly to keep expanding the Kunalistic toolbox.
          </p>
          <Button variant="secondary" size="sm" onClick={() => { setIsSent(false); setSuggestion(""); }}>
            Send Another Note
          </Button>
        </div>
      )}
    </div>
  );
}
