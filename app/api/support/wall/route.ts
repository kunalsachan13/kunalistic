import { NextResponse } from "next/server";
import { getPublicSupporters } from "@/lib/payments/ledger";

export async function GET() {
  const supporters = getPublicSupporters();
  return NextResponse.json({
    success: true,
    data: supporters,
  });
}
