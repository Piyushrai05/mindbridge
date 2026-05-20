import { Router, Request, Response } from "express";
import prisma from "../models/schema";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, trigger_text, risk_level } = req.body;
    if (!session_id || !risk_level) {
      res.status(400).json({ error: "session_id and risk_level are required" });
      return;
    }

    const alert = await prisma.crisisAlert.create({
      data: {
        sessionId: session_id,
        triggerText: trigger_text || "[REDACTED]",
        riskLevel: risk_level,
        status: "pending",
      },
    });

    res.json({ id: alert.id, status: alert.status });
  } catch (error) {
    console.error("Error creating crisis alert:", error);
    res.status(500).json({ error: "Failed to create crisis alert" });
  }
});

export default router;
