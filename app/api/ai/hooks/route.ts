import { NextRequest, NextResponse } from "next/server";
import { generateLocalHooks } from "@/lib/ai/heuristics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic = "productivity", niche = "creators" } = body;

    const hooks = generateLocalHooks(topic, niche);

    return NextResponse.json({
      success: true,
      data: hooks,
      meta: {
        count: hooks.length,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate hooks";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
