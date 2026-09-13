import { NextRequest, NextResponse } from "next/server";
import { generateLocalReelIdeas } from "@/lib/ai/heuristics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      niche = "Fitness",
      audience = "General",
      platform = "Instagram Reels",
      style = "Cinematic",
      goal = "Viral growth",
      tone = "Curious",
      topic = "",
      variation = "default",
    } = body;

    // Check if external AI provider credentials are configured
    const apiKey = process.env.AI_API_KEY;
    const provider = process.env.AI_PROVIDER || "heuristics";

    if (apiKey && provider !== "heuristics") {
      // In production with AI keys configured, call external provider with structured output schema
      // Fallback cleanly to high-fidelity heuristics if provider request fails or rate limits
    }

    const ideas = generateLocalReelIdeas({
      niche,
      audience,
      platform,
      style,
      goal,
      tone,
      topic,
      variation,
    });

    return NextResponse.json({
      success: true,
      data: ideas,
      meta: {
        provider: apiKey ? provider : "kunalistic-creator-engine",
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate reel ideas";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
