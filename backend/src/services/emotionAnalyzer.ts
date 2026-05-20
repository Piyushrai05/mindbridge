const EMOTION_KEYWORDS: Record<string, string[]> = {
  happy: ["happy", "great", "wonderful", "excited", "joy", "amazing", "fantastic", "grateful", "blessed", "proud"],
  calm: ["calm", "peaceful", "relaxed", "serene", "content", "tranquil", "chill", "good"],
  neutral: ["okay", "fine", "alright", "normal", "so-so", "meh"],
  anxious: ["anxious", "worried", "nervous", "uneasy", "restless", "tense", "scared", "fear", "dread"],
  sad: ["sad", "unhappy", "down", "depressed", "miserable", "heartbroken", "crying", "tears", "grief", "loss"],
  angry: ["angry", "furious", "mad", "irritated", "frustrated", "rage", "annoyed", "pissed", "hate"],
  stressed: ["stressed", "overwhelmed", "pressure", "burnout", "exhausted", "overworked", "deadline", "too much"],
  hopeless: ["hopeless", "helpless", "worthless", "empty", "numb", "pointless", "meaningless", "dark", "void"],
};

export function detectEmotion(text: string): string {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    scores[emotion] = 0;
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[emotion]++;
      }
    }
  }

  let maxScore = 0;
  let detectedEmotion = "neutral";
  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedEmotion = emotion;
    }
  }

  return detectedEmotion;
}
