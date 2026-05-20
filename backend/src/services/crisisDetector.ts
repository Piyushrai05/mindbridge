const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "don't want to live", "want to die",
  "self-harm", "cutting", "hurting myself", "no reason to live", "better off dead",
  "can't go on", "ending it all",
];

const HIGH_STRESS_KEYWORDS = [
  "panic", "can't breathe", "panic attack", "breaking down", "falling apart",
  "can't take it", "too much pressure", "failing everything",
];

const MODERATE_STRESS_KEYWORDS = [
  "stressed", "anxious", "worried", "overwhelmed", "burnout", "exhausted",
  "can't sleep", "lonely", "isolated",
];

export type RiskLevel = "low" | "moderate" | "high" | "crisis";

export function detectCrisis(text: string): { riskLevel: RiskLevel; isCrisis: boolean } {
  const lower = text.toLowerCase();

  for (const keyword of CRISIS_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { riskLevel: "crisis", isCrisis: true };
    }
  }

  for (const keyword of HIGH_STRESS_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { riskLevel: "high", isCrisis: false };
    }
  }

  for (const keyword of MODERATE_STRESS_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { riskLevel: "moderate", isCrisis: false };
    }
  }

  return { riskLevel: "low", isCrisis: false };
}
