import { NextRequest, NextResponse } from "next/server";
import { generateLocalCaption } from "@/lib/ai/heuristics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topic = "focus and deep work",
      tone = "Casual",
      platform = "Instagram",
      includeEmojis = true,
    } = body;

    const result = generateLocalCaption({
      topic,
      tone,
      platform,
      includeEmojis,
    });

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate caption";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
