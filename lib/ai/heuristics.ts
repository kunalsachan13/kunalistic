import { ViralReelIdea, ViralHook, CaptionOutput } from "./prompts";

export function generateLocalReelIdeas(params: {
  niche: string;
  audience: string;
  platform: string;
  style: string;
  goal: string;
  tone: string;
  topic?: string;
  variation?: "default" | "controversial" | "emotional" | "concise" | "expanded";
}): ViralReelIdea[] {
  const { niche, audience, platform, style, goal, tone, topic, variation = "default" } = params;
  const subject = topic && topic.trim() ? topic.trim() : `${niche} mastery`;

  let hookPrefix = "";
  if (variation === "controversial") {
    hookPrefix = "Stop doing what 99% of creators tell you about ";
  } else if (variation === "emotional") {
    hookPrefix = "I almost gave up on this, until I discovered ";
  } else if (variation === "concise") {
    hookPrefix = "The 5-second rule for ";
  } else {
    hookPrefix = "The counter-intuitive secret to ";
  }

  const idea1: ViralReelIdea = {
    id: `idea-${Date.now()}-1`,
    title: `${style} Blueprint: ${subject}`,
    viralHook: `${hookPrefix}${subject} that nobody in ${niche} talks about.`,
    coreConcept: `Demystifying a widespread misconception about ${subject} specifically tailored for ${audience}.`,
    opening: `Fast snap-zoom onto the screen with bold uppercase subtitle while delivering the hook in under 2 seconds.`,
    sceneStructure: [
      {
        timestamp: "0:00 - 0:02",
        visual: `High-contrast opening frame showing direct eye contact or unexpected prop related to ${niche}.`,
        audio: `Direct spoken punchline: "${hookPrefix}${subject}."`,
        note: `Critical hook window. No intro logos or greeting.`
      },
      {
        timestamp: "0:02 - 0:08",
        visual: `B-roll montage or dynamic screen screen-recording illustrating the common pitfall.`,
        audio: `Voiceover: "Most people target ${goal} by doing the exact opposite of what actually scales."`,
        note: `Agitate the pain point.`
      },
      {
        timestamp: "0:08 - 0:22",
        visual: `Clear 3-step breakdown shown on screen with kinetic typography and minimal sound effects.`,
        audio: `Voiceover: "Step 1: Focus on the high-leverage constraint. Step 2: Automate the friction. Step 3: Iterate relentlessly."`,
        note: `Deliver tangible, immediate value.`
      },
      {
        timestamp: "0:22 - 0:30",
        visual: `Loop anchor visual tying back seamlessly to the first frame.`,
        audio: `Punchy outro: "Save this for your next session, and tell me your thoughts in the comments."`,
        note: `Seamless loop to maximize replay rate on ${platform}.`
      }
    ],
    retentionMechanism: `Visual pattern interrupt at second 4 and loop transition at second 28 that connects the closing sentence with the opening hook.`,
    emotionalTrigger: variation === "controversial" ? "Challenged conventional wisdom and cognitive dissonance" : "Aha-moment of sudden clarity and actionable relief",
    cta: `Comment "${niche.toUpperCase()}" below and I'll send you the complete step-by-step breakdown.`,
    caption: `Most people approaching ${subject} fall into the exact same trap.\n\nHere is what separates sustainable ${goal} from wasted effort:\n\n1. Identify the single highest friction bottleneck\n2. Eliminate redundant steps\n3. Protect consistency above short-term bursts\n\nIf you found this useful, save this reel and follow for more actionable ${niche} breakdowns.`,
    hashtags: [
      `#${niche.toLowerCase().replace(/\s+/g, "")}`,
      `#${platform.toLowerCase().replace(/\s+/g, "")}`,
      `#creatorgrowth`,
      `#${goal.toLowerCase().replace(/\s+/g, "")}`,
      `#contentstrategy`,
      `#productivity`
    ],
    whyItWorks: `Starts with an immediate pattern interrupt, avoids fluffy self-introductions, uses a 3-part micro-cadence, and closes with a loop trigger designed for high algorithmic completion scores.`
  };

  const idea2: ViralReelIdea = {
    id: `idea-${Date.now()}-2`,
    title: `The 30-Second Audit: ${subject}`,
    viralHook: `If you want to achieve ${goal} in ${niche}, you need to stop making this single mistake today.`,
    coreConcept: `A sharp side-by-side comparison illustrating the amateur approach versus the high-leverage method for ${audience}.`,
    opening: `Split screen: 'What amateurs do' vs 'What pros do' with an instant dramatic sound swoosh.`,
    sceneStructure: [
      {
        timestamp: "0:00 - 0:03",
        visual: `Split screen highlighting a common catastrophic blunder in ${niche}.`,
        audio: `Voiceover: "This one error is killing your momentum."`,
        note: `Immediate stakes establishment.`
      },
      {
        timestamp: "0:03 - 0:15",
        visual: `Close-up demonstration showing the effortless pro technique.`,
        audio: `Voiceover: "Instead of overcomplicating, use this streamlined protocol."`,
        note: `Visual proof and contrast.`
      },
      {
        timestamp: "0:15 - 0:25",
        visual: `Checklist graphic overlay suitable for screenshots.`,
        audio: `Voiceover: "Screenshot this checklist so you don't forget when executing."`,
        note: `Screenshot trigger creates high 'Save' signals.`
      }
    ],
    retentionMechanism: `Screen-shot incentive and fast pacing (sub-25 seconds total run time).`,
    emotionalTrigger: `FOMO (Fear Of Missing Out) and the desire for efficiency.`,
    cta: `Save this post so you have the reference handy when you work on ${subject}.`,
    caption: `Amateurs focus on complexity. Top performers focus on constraints.\n\nHere's the 30-second breakdown on ${subject} every ${audience} member needs to see.\n\nTag someone who needs to see this!`,
    hashtags: [
      `#${niche.toLowerCase().replace(/\s+/g, "")}`,
      `#tipsandtricks`,
      `#workflow`,
      `#viralreels`,
      `#learnontiktok`
    ],
    whyItWorks: `High contrast comparisons trigger immediate curiosity, while the screenshot-worthy checklist drives bookmarks—one of the highest weighted signals in modern discovery algorithms.`
  };

  return [idea1, idea2];
}

export function generateLocalHooks(topic: string, niche: string): ViralHook[] {
  const cleanTopic = topic.trim() || "creating content";
  const cleanNiche = niche.trim() || "creators";

  return [
    {
      id: "hook-1",
      framework: "Curiosity Gap",
      hook: `Most people in ${cleanNiche} will never realize why this one trick works so well for ${cleanTopic}.`,
      psychologyExplanation: "Creates an informational void in the viewer's mind that can only be resolved by watching the video.",
      exampleDelivery: "Deliver with a quiet, confident whisper and a slight lean into the camera."
    },
    {
      id: "hook-2",
      framework: "Negative / Contrarian",
      hook: `Stop doing ${cleanTopic} like this. You are actively sabotaging your results.`,
      psychologyExplanation: "Loss aversion is 2x more psychologically compelling than gain seeking.",
      exampleDelivery: "Firm tone, hand gesture stopping the screen, serious facial expression."
    },
    {
      id: "hook-3",
      framework: "Relatable Story",
      hook: `I spent 6 months struggling with ${cleanTopic} until I made this embarrassing realization.`,
      psychologyExplanation: "Vulnerability builds instant trust and empathy with the viewer.",
      exampleDelivery: "Conversational, eye-level camera, genuine candid tone."
    },
    {
      id: "hook-4",
      framework: "Bold Claim",
      hook: `This 2-minute method for ${cleanTopic} replaced 3 hours of my daily work.`,
      psychologyExplanation: "Extreme leverage and speed appeal directly to our inherent desire for efficiency.",
      exampleDelivery: "Fast walk-and-talk shot with energetic pacing."
    },
    {
      id: "hook-5",
      framework: "Secret / Insider Hack",
      hook: `Here is the unspoken rule about ${cleanTopic} that top ${cleanNiche} professionals don't share publicly.`,
      psychologyExplanation: "Implies exclusive access to privileged insider knowledge.",
      exampleDelivery: "Conspiratorial delivery, direct gaze, minimal background noise."
    }
  ];
}

export function generateLocalCaption(params: {
  topic: string;
  tone: string;
  platform: string;
  includeEmojis?: boolean;
}): CaptionOutput {
  const { topic, tone, platform, includeEmojis = true } = params;
  const e = includeEmojis;

  const headline = `${e ? "⚡ " : ""}The honest truth about ${topic}:`;
  const body = `If you're serious about mastering this, you need to understand what actually drives results versus what just looks productive.\n\n${e ? "🔹 " : "• "}Focus on the fundamentals before seeking shortcuts\n${e ? "🔹 " : "• "}Build a routine that survives low-motivation days\n${e ? "🔹 " : "• "}Track tangible outputs, not vanity indicators\n\nConsistency isn't flashy, but it's the only variable you fully control.`;
  const cta = `${e ? "👇 " : ""}What's the biggest obstacle you've faced with this? Drop your perspective below!`;
  const hashtags = ["#growth", "#mindset", "#productivity", "#dailyhabits", `#${topic.toLowerCase().replace(/[^a-z0-9]/g, "")}`];

  const fullFormatted = `${headline}\n\n${body}\n\n${cta}\n\n${hashtags.join(" ")}`;

  return {
    id: `caption-${Date.now()}`,
    tone,
    headline,
    body,
    cta,
    hashtags,
    fullFormatted
  };
}
