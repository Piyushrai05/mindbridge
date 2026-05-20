const FALLBACK: Record<string, string[]> = {
  anxious: [
    "It sounds like anxiety is weighing on you right now. That takes real courage to acknowledge. Try this: Name 5 things you can see around you right now. This simple grounding exercise can help bring you back to the present moment.",
  ],
  stressed: [
    "Academic pressure can feel relentless sometimes. You're not weak for feeling this \u2014 you're human. Here's one thing that might help: Write down the ONE most important task for tomorrow. Just one. Let the rest wait.",
  ],
  sad: [
    "Sadness is your mind telling you something matters to you deeply. Thank you for sharing that. Try this: Think of one person who made you smile this week, and if you can, send them a short message. Connection heals.",
  ],
  hopeless: [
    "When everything feels dark, it's hard to imagine things changing. But reaching out \u2014 even here \u2014 shows incredible strength. Please know: this feeling is temporary, even when it doesn't feel like it. Can you do one kind thing for yourself today? Even something tiny, like a warm drink or a short walk.",
  ],
  angry: [
    "Anger often shows up when something feels deeply unfair. Your feelings are valid. Before doing anything with that energy, try this: Take 3 slow, deep breaths. Then ask yourself \u2014 what do I actually need right now?",
  ],
  happy: [
    "That's wonderful to hear! It's so important to recognize and savor these moments. Try this: Take a mental snapshot of how you feel right now. On harder days, you can come back to this memory.",
  ],
  calm: [
    "It's great that you're feeling at peace right now. Take a moment to notice what helped you reach this calm. Was it rest, nature, music, or something else? Knowing your calm triggers is powerful.",
  ],
  neutral: [
    "Thank you for checking in \u2014 even on neutral days, showing up for yourself matters. Here's a gentle prompt: What's one small thing you could do today that would make it just slightly better?",
  ],
};

export function getFallbackResponse(emotion: string): string {
  const responses = FALLBACK[emotion] || FALLBACK.neutral;
  return responses[Math.floor(Math.random() * responses.length)];
}
