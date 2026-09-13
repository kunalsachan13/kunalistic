import { NextRequest, NextResponse } from "next/server";
import { SimulatorPaymentProvider } from "@/lib/payments/simulator";
import { addSupporterEntry } from "@/lib/payments/ledger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      paymentId,
      signature,
      supporterName,
      supporterMessage,
      showOnWall = false,
      amount = 99,
      currency = "INR",
    } = body;

    const provider = new SimulatorPaymentProvider();
    const result = await provider.verifyPayment({
      orderId,
      paymentId,
      signature,
      supporterName,
      supporterMessage,
      showOnWall,
    });

    if (result.success) {
      // If user explicitly opted-in to show on supporter wall, store public fields only
      if (showOnWall) {
        addSupporterEntry({
          displayName: supporterName?.trim() || "Kind Supporter",
          message: supporterMessage?.trim() || undefined,
          amount: Number(amount),
          currency,
        });
      }

      return NextResponse.json({
        success: true,
        transactionId: result.transactionId,
        status: "completed",
        message: "Thank you for supporting Kunalistic!",
      });
    } else {
      return NextResponse.json(
        { success: false, status: "failed", error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Verification error";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
