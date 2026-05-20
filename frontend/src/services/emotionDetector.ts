const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "don't want to live", "want to die",
  "self-harm", "cutting", "hurting myself", "no reason to live", "better off dead",
  "can't go on", "ending it all",
];

export function detectCrisisClient(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}
