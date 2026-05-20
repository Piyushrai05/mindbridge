import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const MOODS = ["happy", "calm", "neutral", "anxious", "sad", "angry", "stressed", "hopeless"];
const MOOD_WEIGHTS = [0.05, 0.10, 0.10, 0.30, 0.15, 0.05, 0.20, 0.05];
const RISK_LEVELS = ["low", "moderate", "high", "crisis"];

function weightedRandom(items: string[], weights: number[]): string {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i];
    if (r <= cumulative) return items[i];
  }
  return items[items.length - 1];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysBack: number): Date {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  const d = new Date(randomTime);
  const hour = weightedHour();
  d.setHours(hour, randomInt(0, 59), randomInt(0, 59));
  return d;
}

function weightedHour(): number {
  const r = Math.random();
  if (r < 0.35) return randomInt(22, 25) % 24; // 10PM-1AM peak
  if (r < 0.55) return randomInt(18, 21); // evening
  if (r < 0.75) return randomInt(9, 14); // morning/afternoon
  return randomInt(6, 23);
}

function intensityForMood(mood: string, dayIndex: number): number {
  const base: Record<string, number> = {
    happy: 3, calm: 3, neutral: 4, anxious: 6, sad: 6, angry: 6, stressed: 7, hopeless: 8,
  };
  const trendBoost = dayIndex * 0.15;
  const val = (base[mood] || 5) + trendBoost + (Math.random() * 2 - 1);
  return Math.min(10, Math.max(1, Math.round(val)));
}

async function seed() {
  console.log("Clearing existing data...");
  await prisma.crisisAlert.deleteMany();
  await prisma.journalEntry.deleteMany();
  await prisma.moodCheckin.deleteMany();
  await prisma.session.deleteMany();

  console.log("Seeding sessions and check-ins...");
  const sessionIds: string[] = [];
  for (let i = 0; i < 60; i++) {
    const session = await prisma.session.create({ data: { id: uuidv4() } });
    sessionIds.push(session.id);
  }

  const checkins: Array<{
    id: string;
    sessionId: string;
    mood: string;
    intensity: number;
    createdAt: Date;
  }> = [];

  for (let i = 0; i < 230; i++) {
    const mood = weightedRandom(MOODS, MOOD_WEIGHTS);
    const daysBack = randomInt(0, 6);
    const dayIndex = 7 - daysBack;
    checkins.push({
      id: uuidv4(),
      sessionId: sessionIds[randomInt(0, sessionIds.length - 1)],
      mood,
      intensity: intensityForMood(mood, dayIndex),
      createdAt: randomDate(7),
    });
  }

  for (const c of checkins) {
    await prisma.moodCheckin.create({ data: c });
  }

  console.log(`Created ${checkins.length} mood check-ins`);

  const journalTexts: Record<string, string[]> = {
    anxious: [
      "I have exams coming up and I can't stop worrying about everything.",
      "My heart keeps racing for no reason. I feel so anxious all the time.",
      "I'm worried I'll fail this semester. The pressure is too much.",
    ],
    stressed: [
      "Three assignments due tomorrow and I haven't started any of them.",
      "I feel so overwhelmed with everything going on in college right now.",
      "The workload this semester is crushing me.",
    ],
    sad: [
      "I miss home. Being so far away from family is really hard.",
      "I've been feeling down lately, nothing seems to make me happy anymore.",
    ],
    hopeless: [
      "Everything feels pointless. I don't see things getting better.",
      "I feel like I'm stuck and nothing I do matters.",
    ],
    happy: ["Had a great day today! Finally aced my presentation."],
    calm: ["Feeling peaceful after morning meditation."],
    neutral: ["Just another regular day. Nothing special happened."],
    angry: ["My roommate is so inconsiderate. I'm so frustrated."],
  };

  const riskForMood: Record<string, string> = {
    happy: "low", calm: "low", neutral: "low",
    anxious: "moderate", stressed: "moderate",
    sad: "moderate", angry: "moderate", hopeless: "high",
  };

  const aiResponses: Record<string, string> = {
    anxious: "It sounds like anxiety is weighing on you right now. That takes real courage to acknowledge. Try this: Name 5 things you can see around you right now.",
    stressed: "Academic pressure can feel relentless sometimes. You're not weak for feeling this — you're human. Write down the ONE most important task for tomorrow.",
    sad: "Sadness is your mind telling you something matters to you deeply. Thank you for sharing that. Think of one person who made you smile this week.",
    hopeless: "When everything feels dark, it's hard to imagine things changing. But reaching out shows incredible strength. Can you do one kind thing for yourself today?",
    happy: "That's wonderful to hear! It's so important to recognize and savor these moments. Take a mental snapshot of how you feel right now.",
    calm: "It's great that you're feeling at peace right now. Take a moment to notice what helped you reach this calm.",
    neutral: "Thank you for checking in — even on neutral days, showing up for yourself matters. What's one small thing you could do today to make it better?",
    angry: "Anger often shows up when something feels deeply unfair. Your feelings are valid. Take 3 slow, deep breaths.",
  };

  console.log("Seeding journal entries...");
  let journalCount = 0;
  for (let i = 0; i < 80; i++) {
    const mood = weightedRandom(MOODS, MOOD_WEIGHTS);
    const texts = journalTexts[mood] || journalTexts.neutral;
    const text = texts[randomInt(0, texts.length - 1)];
    await prisma.journalEntry.create({
      data: {
        id: uuidv4(),
        sessionId: sessionIds[randomInt(0, sessionIds.length - 1)],
        text,
        detectedEmotion: mood,
        riskLevel: riskForMood[mood] || "low",
        aiResponse: aiResponses[mood] || aiResponses.neutral,
        createdAt: randomDate(7),
      },
    });
    journalCount++;
  }
  console.log(`Created ${journalCount} journal entries`);

  console.log("Seeding crisis alerts...");
  const crisisStatuses = ["pending", "pending", "reviewed", "reviewed"];
  for (let i = 0; i < 4; i++) {
    await prisma.crisisAlert.create({
      data: {
        id: uuidv4(),
        sessionId: sessionIds[randomInt(0, sessionIds.length - 1)],
        triggerText: "[REDACTED FOR PRIVACY]",
        riskLevel: "crisis",
        status: crisisStatuses[i],
        createdAt: randomDate(3),
      },
    });
  }
  console.log("Created 4 crisis alerts");

  console.log("Seed complete!");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
