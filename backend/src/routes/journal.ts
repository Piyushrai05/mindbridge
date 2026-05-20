import { Router, Request, Response } from "express";
import prisma from "../models/schema";
import { detectEmotion } from "../services/emotionAnalyzer";
import { detectCrisis } from "../services/crisisDetector";
import { getAIResponse } from "../services/openai";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, text } = req.body;
    if (!session_id || !text) {
      res.status(400).json({ error: "session_id and text are required" });
      return;
    }

    const detectedEmotion = detectEmotion(text);
    const { riskLevel, isCrisis } = detectCrisis(text);
    const { response: aiResponse, usedFallback } = await getAIResponse(text, detectedEmotion);

    const entry = await prisma.journalEntry.create({
      data: {
        sessionId: session_id,
        text,
        detectedEmotion,
        riskLevel,
        aiResponse,
      },
    });

    if (isCrisis) {
      await prisma.crisisAlert.create({
        data: {
          sessionId: session_id,
          triggerText: "[REDACTED FOR PRIVACY]",
          riskLevel,
          status: "pending",
        },
      });
    }

    res.json({
      id: entry.id,
      detected_emotion: detectedEmotion,
      risk_level: riskLevel,
      ai_response: aiResponse,
      is_crisis: isCrisis,
      used_fallback: usedFallback,
    });
  } catch (error) {
    console.error("Error processing journal:", error);
    res.status(500).json({ error: "Failed to process journal entry" });
  }
});

export default router;
