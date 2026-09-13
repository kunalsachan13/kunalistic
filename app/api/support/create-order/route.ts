import { NextRequest, NextResponse } from "next/server";
import { SimulatorPaymentProvider } from "@/lib/payments/simulator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount = 99, currency = "INR", supporterName, supporterMessage, showOnWall = false } = body;

    const provider = new SimulatorPaymentProvider();
    const order = await provider.createPayment({
      amount: Number(amount),
      currency,
      supporterName,
      supporterMessage,
      showOnWall,
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create support order";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
