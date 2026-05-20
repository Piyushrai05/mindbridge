import type { MoodOption } from "../types";

export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: "\u{1F60A}", label: "Happy", color: "#48BB78", value: "happy" },
  { emoji: "\u{1F60C}", label: "Calm", color: "#4ECDC4", value: "calm" },
  { emoji: "\u{1F610}", label: "Neutral", color: "#A0AEC0", value: "neutral" },
  { emoji: "\u{1F61F}", label: "Anxious", color: "#ECC94B", value: "anxious" },
  { emoji: "\u{1F622}", label: "Sad", color: "#63B3ED", value: "sad" },
  { emoji: "\u{1F620}", label: "Angry", color: "#FC8181", value: "angry" },
  { emoji: "\u{1F630}", label: "Stressed", color: "#F6AD55", value: "stressed" },
  { emoji: "\u{1F61E}", label: "Hopeless", color: "#E53E3E", value: "hopeless" },
];

export const HELPLINES = [
  { name: "iCall", number: "9152987821", description: "Psychosocial helpline by TISS" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", description: "24/7 mental health support" },
  { name: "AASRA", number: "9820466726", description: "Crisis intervention centre" },
];

export const DISCLAIMER = "MindBridge is a hackathon prototype. It is not a substitute for professional mental health care.";
