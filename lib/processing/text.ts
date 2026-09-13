export interface TextAnalysisResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  topKeywords: { word: string; count: number }[];
}

export function analyzeText(text: string): TextAnalysisResult {
  if (!text || text.trim() === "") {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      topKeywords: []
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const rawWords = text.trim().match(/\b[\w'-]+\b/g) || [];
  const words = rawWords.length;

  const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (text.trim() ? 1 : 0);
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

  // Average reading speed: 225 wpm, speaking: 130 wpm
  const readingTimeMinutes = parseFloat((words / 225).toFixed(1));
  const speakingTimeMinutes = parseFloat((words / 130).toFixed(1));

  // Top keywords excluding common stop words
  const stopWords = new Set([
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with",
    "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her",
    "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up",
    "out", "if", "about", "who", "get", "which", "go", "me", "is", "are", "was", "were"
  ]);

  const wordCounts: Record<string, number> = {};
  rawWords.forEach((w) => {
    const cleaned = w.toLowerCase();
    if (cleaned.length > 2 && !stopWords.has(cleaned)) {
      wordCounts[cleaned] = (wordCounts[cleaned] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    topKeywords
  };
}

export interface SocialPlatformLimit {
  name: string;
  current: number;
  max: number;
  remaining: number;
  percentage: number;
  isOverLimit: boolean;
}

export function checkSocialLimits(text: string): SocialPlatformLimit[] {
  const charCount = text.length;

  const platforms = [
    { name: "Twitter / X Post", max: 280 },
    { name: "Instagram Caption", max: 2200 },
    { name: "LinkedIn Post", max: 3000 },
    { name: "SEO Meta Description", max: 160 },
    { name: "TikTok Caption", max: 2200 }
  ];

  return platforms.map((p) => {
    const remaining = p.max - charCount;
    const percentage = Math.min(100, Math.round((charCount / p.max) * 100));
    return {
      name: p.name,
      current: charCount,
      max: p.max,
      remaining,
      percentage,
      isOverLimit: remaining < 0
    };
  });
}
