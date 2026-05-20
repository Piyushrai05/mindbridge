import { Router, Request, Response } from "express";
import prisma from "../models/schema";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, mood, intensity } = req.body;
    if (!session_id || !mood || intensity === undefined) {
      res.status(400).json({ error: "session_id, mood, and intensity are required" });
      return;
    }

    const checkin = await prisma.moodCheckin.create({
      data: {
        sessionId: session_id,
        mood,
        intensity: Number(intensity),
      },
    });

    res.json({ id: checkin.id, mood: checkin.mood, intensity: checkin.intensity });
  } catch (error) {
    console.error("Error saving checkin:", error);
    res.status(500).json({ error: "Failed to save check-in" });
  }
});

export default router;
