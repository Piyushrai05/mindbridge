import OpenAI from "openai";

const SYSTEM_PROMPT = `You are MindBridge AI, a warm, empathetic mental wellness companion for college students.

RULES YOU MUST FOLLOW:
1. You are NOT a therapist, doctor, or counselor. Never diagnose conditions.
2. Never prescribe medication or medical treatment.
3. Always validate the student's emotions first before offering any advice.
4. Keep responses between 3-5 sentences. Be concise but warm.
5. End every response with ONE small actionable step (breathing exercise, journaling prompt, grounding technique, or gratitude exercise).
6. If the student mentions self-harm, suicide, wanting to die, or hurting themselves:
   - Respond with extreme care and warmth
   - Tell them their feelings matter and they deserve support
   - Strongly encourage them to reach out to: iCall (9152987821), Vandrevala Foundation (1860-2662-345), or a trusted person
   - Do NOT try to counsel them yourself on crisis topics
7. Use simple, warm language. Avoid clinical or academic terms.
8. Never say "I understand how you feel" — instead say "That sounds really difficult" or "Thank you for sharing that with me"
9. If the student seems to be venting, let them vent. Don't rush to fix.
10. Sprinkle in gentle encouragement: "You're showing real courage by expressing this."

Your personality: Warm, patient, non-judgmental, like a kind older sibling who genuinely listens.`;

const FALLBACK_RESPONSES: Record<string, string[]> = {
  anxious: [
    "It sounds like anxiety is weighing on you right now. That takes real courage to acknowledge. Try this: Name 5 things you can see around you right now. This simple grounding exercise can help bring you back to the present moment.",
    "Anxiety can feel like a storm inside, even when everything looks calm outside. You're not alone in this. Here's something that might help: Place your hand on your chest, feel your heartbeat, and take 3 slow breaths. You're here, you're safe.",
  ],
  stressed: [
    "Academic pressure can feel relentless sometimes. You're not weak for feeling this — you're human. Here's one thing that might help: Write down the ONE most important task for tomorrow. Just one. Let the rest wait.",
    "Stress has a way of making everything feel urgent and impossible. But you've handled hard things before. Try this: Take a 5-minute break right now. Step outside, stretch, or just close your eyes. Your work will still be there, but you'll face it with fresh energy.",
  ],
  sad: [
    "Sadness is your mind telling you something matters to you deeply. Thank you for sharing that. Try this: Think of one person who made you smile this week, and if you can, send them a short message. Connection heals.",
    "It's okay to feel sad — it means you care deeply. You don't have to push through this alone. Here's a small step: Write down three things, no matter how small, that brought you a moment of comfort today. A warm drink, a song, a memory.",
  ],
  hopeless: [
    "When everything feels dark, it's hard to imagine things changing. But reaching out — even here — shows incredible strength. Please know: this feeling is temporary, even when it doesn't feel like it. Can you do one kind thing for yourself today? Even something tiny, like a warm drink or a short walk.",
    "That sounds really heavy, and I'm glad you shared it with me. Hopelessness lies to us — it says nothing will change, but that's not true. Right now, just focus on this moment. Take one slow breath. You've already taken a brave step by being here.",
  ],
  angry: [
    "Anger often shows up when something feels deeply unfair. Your feelings are valid. Before doing anything with that energy, try this: Take 3 slow, deep breaths. Then ask yourself — what do I actually need right now?",
    "That frustration makes sense — it sounds like things haven't been fair. It's okay to feel angry. Here's something to try: Write down what you're angry about in raw, unfiltered words. Sometimes getting it out of your head and onto paper takes away some of its power.",
  ],
  happy: [
    "That's wonderful to hear! It's so important to recognize and savor these moments. Try this: Take a mental snapshot of how you feel right now. On harder days, you can come back to this memory and remind yourself that good moments are real and they return.",
    "I'm so glad you're feeling good! Joy is worth celebrating. Here's a small exercise: Write down what contributed to this feeling. When you know what lifts you up, you can seek it out more intentionally.",
  ],
  calm: [
    "It's great that you're feeling at peace right now. That's a wonderful state to be in. Try this: Take a moment to notice what helped you reach this calm. Was it rest, nature, music, or something else? Knowing your calm triggers is powerful.",
    "A calm mind is a gift. Enjoy this moment fully. Here's a small practice: Close your eyes for 30 seconds and just listen to the sounds around you. Mindful moments like these strengthen your inner peace over time.",
  ],
  neutral: [
    "Thank you for checking in — even on neutral days, showing up for yourself matters. Here's a gentle prompt: What's one small thing you could do today that would make it just slightly better? Sometimes a tiny shift makes a big difference.",
    "Feeling neutral is perfectly okay — not every day has to be a rollercoaster. Here's a small exercise: Take a moment to appreciate something simple around you — the light coming through a window, a comfortable chair, the sound of your own breathing.",
  ],
};

export async function getAIResponse(
  journalText: string,
  mood: string
): Promise<{ response: string; usedFallback: boolean }> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey && apiKey !== "your_openai_api_key_here") {
    try {
      const openai = new OpenAI({ apiKey });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `The student is feeling "${mood}" and wrote: "${journalText}"`,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });
      const response = completion.choices[0]?.message?.content;
      if (response) {
        return { response, usedFallback: false };
      }
    } catch (error) {
      console.error("OpenAI API error, falling back:", error);
    }
  }

  const emotionKey = mood in FALLBACK_RESPONSES ? mood : "neutral";
  const responses = FALLBACK_RESPONSES[emotionKey];
  const response = responses[Math.floor(Math.random() * responses.length)];
  return { response, usedFallback: true };
}
