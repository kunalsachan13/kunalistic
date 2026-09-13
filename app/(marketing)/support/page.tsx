"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/FormControls";
import { Heart, Shield, CheckCircle2, Sparkles, MessageSquare, Lock, HelpCircle } from "lucide-react";
import { SupporterWallEntry } from "@/lib/payments/ledger";

export default function SupportPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(99);
  const [customAmount, setCustomAmount] = useState<string>("250");
  const [showOnWall, setShowOnWall] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successTxnId, setSuccessTxnId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [supporters, setSupporters] = useState<SupporterWallEntry[]>([]);

  const presetAmounts = [49, 99, 199, 499];

  const currentAmount = selectedAmount === "custom" ? Math.max(10, Number(customAmount) || 0) : selectedAmount;

  // Load public supporter wall
  const loadSupporters = async () => {
    try {
      const res = await fetch("/api/support/wall");
      const json = await res.json();
      if (json.success && json.data) {
        setSupporters(json.data);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadSupporters();
  }, []);

  const handleSupport = async () => {
    if (currentAmount < 10) {
      setErrorMsg("Minimum voluntary support amount is ₹10.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Create order
      const orderRes = await fetch("/api/support/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: currentAmount,
          currency: "INR",
          supporterName: displayName,
          supporterMessage: message,
          showOnWall,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to initiate payment order");
      }

      const order = orderData.data;

      // 2. Client verification request
      const verifyRes = await fetch("/api/support/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.orderId,
          paymentId: `pay_${Date.now()}`,
          signature: "sim_sig_verified_kunalistic",
          amount: currentAmount,
          currency: "INR",
          supporterName: displayName,
          supporterMessage: message,
          showOnWall,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || "Payment verification could not be completed.");
      }

      setIsSuccess(true);
      setSuccessTxnId(verifyData.transactionId);

      // Trigger celebratory confetti in strict Lavender Tonic palette
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C8BEFA", "#151130", "#A89BE0"],
      });

      // Reload supporter wall if opted-in
      loadSupporters();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-2xl bg-[rgba(200,190,250,0.1)] border border-[rgba(200,190,250,0.25)] flex items-center justify-center text-[#C8BEFA] mx-auto mb-4">
          <Heart className="w-6 h-6 fill-[#C8BEFA]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C8BEFA] tracking-tight">
          Support Kunalistic
        </h1>
        <p className="text-sm text-[rgba(200,190,250,0.7)] mt-3 leading-relaxed">
          Kunalistic is built to keep useful tools in one place and make them freely accessible.
          If something here saved you time or helped you get something done, you can voluntarily support the project.
        </p>
        <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.16)] text-xs text-[#C8BEFA] font-medium">
          <Lock className="w-3.5 h-3.5 text-[#C8BEFA]" />
          <span>No subscription • No recurring billing • Completely optional</span>
        </div>
      </div>

      {/* Main Support Contribution Card */}
      {!isSuccess ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.18)] shadow-[0_15px_50px_rgba(0,0,0,0.5)] mb-16 space-y-8">
          {/* Preset Amount Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-3">
              Choose Support Amount
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    selectedAmount === amt
                      ? "bg-[#C8BEFA] text-[#151130] border-[#C8BEFA] shadow-[0_0_15px_rgba(200,190,250,0.25)]"
                      : "bg-[rgba(200,190,250,0.04)] border-[rgba(200,190,250,0.14)] text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)]"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}

              <button
                onClick={() => setSelectedAmount("custom")}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                  selectedAmount === "custom"
                    ? "bg-[#C8BEFA] text-[#151130] border-[#C8BEFA]"
                    : "bg-[rgba(200,190,250,0.04)] border-[rgba(200,190,250,0.14)] text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)]"
                }`}
              >
                Custom
              </button>
            </div>

            {selectedAmount === "custom" && (
              <div className="mt-4 max-w-xs">
                <Input
                  label="Enter Custom Amount (INR)"
                  type="number"
                  min={10}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
            )}
          </div>

          {/* Optional Supporter Wall Message */}
          <div className="pt-6 border-t border-[rgba(200,190,250,0.1)] space-y-4">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="wallOptIn"
                checked={showOnWall}
                onChange={(e) => setShowOnWall(e.target.checked)}
                className="w-4 h-4 rounded accent-[#C8BEFA] cursor-pointer"
              />
              <label htmlFor="wallOptIn" className="text-xs font-semibold text-[#C8BEFA] cursor-pointer">
                Show my name on the supporter wall (Optional)
              </label>
            </div>

            {showOnWall && (
              <div className="space-y-4 pt-2">
                <Input
                  label="Display Name"
                  placeholder="e.g. Kunal or DevFriend (publicly visible)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  hint="We will never publicly display your email, phone, or payment IDs."
                />
                <Textarea
                  label="Optional Encouragement Note"
                  placeholder="Leave a short encouraging message for the community..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={150}
                />
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.35)] text-xs text-[#C8BEFA]">
              {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSupport}
              isLoading={isProcessing}
              className="w-full sm:w-auto font-bold px-8"
            >
              Support ₹{currentAmount}
            </Button>
            <p className="text-xs text-[rgba(200,190,250,0.5)] mt-3">
              Encrypted, verified server-side transaction. No recurring charges ever.
            </p>
          </div>
        </div>
      ) : (
        /* Success Screen */
        <div className="p-8 rounded-2xl bg-[rgba(200,190,250,0.06)] border border-[rgba(200,190,250,0.3)] text-center max-w-lg mx-auto mb-16 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[rgba(200,190,250,0.15)] text-[#C8BEFA] flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#C8BEFA]">Thank You So Much!</h2>
          <p className="text-sm text-[rgba(200,190,250,0.8)] leading-relaxed">
            Your contribution of <strong className="text-[#C8BEFA]">₹{currentAmount}</strong> directly fuels development of free, privacy-first tools on Kunalistic.
          </p>
          <div className="p-3 rounded-lg bg-[rgba(200,190,250,0.05)] text-xs font-mono text-[rgba(200,190,250,0.6)]">
            Reference: {successTxnId}
          </div>
          <div className="pt-2">
            <Button variant="secondary" onClick={() => setIsSuccess(false)}>
              Back to Support
            </Button>
          </div>
        </div>
      )}

      {/* Supporter Wall Section */}
      <div className="space-y-6 mb-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#C8BEFA]">
            Supporter Wall
          </h2>
          <p className="text-xs text-[rgba(200,190,250,0.6)] mt-1">
            People who voluntarily helped keep Kunalistic independent and freely accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supporters.map((sup) => (
            <div
              key={sup.id}
              className="p-4 rounded-xl bg-[rgba(200,190,250,0.03)] border border-[rgba(200,190,250,0.12)] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#C8BEFA]">{sup.displayName}</span>
                {sup.amount && (
                  <span className="text-[11px] font-bold text-[#C8BEFA] bg-[rgba(200,190,250,0.1)] px-2 py-0.5 rounded-full">
                    ₹{sup.amount}
                  </span>
                )}
              </div>
              {sup.message && (
                <p className="text-xs text-[rgba(200,190,250,0.7)] leading-relaxed italic">
                  &ldquo;{sup.message}&rdquo;
                </p>
              )}
              <p className="text-[10px] text-[rgba(200,190,250,0.4)] pt-1">{sup.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent FAQ */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(200,190,250,0.02)] border border-[rgba(200,190,250,0.1)] space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8BEFA] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#C8BEFA]" />
          <span>Support & Business Model FAQs</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[rgba(200,190,250,0.7)] pt-2">
          <div>
            <p className="font-semibold text-[#C8BEFA] mb-1">Is Kunalistic really 100% free?</p>
            <p className="leading-relaxed">Yes. Every single tool—image converters, PDF mergers, developer formatters, calculators, and creator utilities—is freely usable without subscriptions or paywalls.</p>
          </div>
          <div>
            <p className="font-semibold text-[#C8BEFA] mb-1">Will this become a monthly subscription later?</p>
            <p className="leading-relaxed">No. Kunalistic rejects subscription paywalls for everyday micro-utilities. Voluntary creator support keeps the platform sustainable without coercive fees.</p>
          </div>
          <div>
            <p className="font-semibold text-[#C8BEFA] mb-1">What happens to my payment details?</p>
            <p className="leading-relaxed">We never store card numbers, CVVs, or bank logins. Transactions are processed and cryptographically verified server-side with official payment gateways.</p>
          </div>
          <div>
            <p className="font-semibold text-[#C8BEFA] mb-1">Can I keep my support anonymous?</p>
            <p className="leading-relaxed">Absolutely. Showing your name on the supporter wall is 100% optional and disabled by default.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
