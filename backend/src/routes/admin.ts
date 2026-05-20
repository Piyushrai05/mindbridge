import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../models/schema";
import { adminAuth, AuthRequest } from "../middleware/auth";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "mindbridge-demo-secret-2026";

const ADMIN_EMAIL = "admin@mindbridge.edu";
const ADMIN_PASSWORD = "demo2026";

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.get("/stats", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const totalCheckins = await prisma.moodCheckin.count();
    const avgStressResult = await prisma.moodCheckin.aggregate({
      _avg: { intensity: true },
    });
    const crisisCount = await prisma.crisisAlert.count({
      where: { status: "pending" },
    });

    const moodCounts = await prisma.moodCheckin.groupBy({
      by: ["mood"],
      _count: { mood: true },
      orderBy: { _count: { mood: "desc" } },
      take: 1,
    });

    res.json({
      total_checkins: totalCheckins,
      avg_stress: Math.round((avgStressResult._avg.intensity || 0) * 10) / 10,
      crisis_count: crisisCount,
      common_mood: moodCounts[0]?.mood || "neutral",
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/mood-distribution", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const distribution = await prisma.moodCheckin.groupBy({
      by: ["mood"],
      _count: { mood: true },
    });
    res.json(distribution.map((d) => ({ mood: d.mood, count: d._count.mood })));
  } catch (error) {
    console.error("Error fetching mood distribution:", error);
    res.status(500).json({ error: "Failed to fetch mood distribution" });
  }
});

router.get("/stress-trend", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const checkins = await prisma.moodCheckin.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { intensity: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const dailyAvg: Record<string, { total: number; count: number }> = {};
    for (const c of checkins) {
      const date = c.createdAt.toISOString().split("T")[0];
      if (!dailyAvg[date]) dailyAvg[date] = { total: 0, count: 0 };
      dailyAvg[date].total += c.intensity;
      dailyAvg[date].count++;
    }

    const trend = Object.entries(dailyAvg).map(([date, data]) => ({
      date,
      avg_intensity: Math.round((data.total / data.count) * 10) / 10,
    }));

    res.json(trend);
  } catch (error) {
    console.error("Error fetching stress trend:", error);
    res.status(500).json({ error: "Failed to fetch stress trend" });
  }
});

router.get("/hourly-activity", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const checkins = await prisma.moodCheckin.findMany({
      select: { createdAt: true },
    });

    const hourly: Record<number, number> = {};
    for (let h = 0; h < 24; h++) hourly[h] = 0;
    for (const c of checkins) {
      const hour = c.createdAt.getHours();
      hourly[hour]++;
    }

    const result = Object.entries(hourly).map(([hour, count]) => ({
      hour: Number(hour),
      count,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching hourly activity:", error);
    res.status(500).json({ error: "Failed to fetch hourly activity" });
  }
});

router.get("/risk-distribution", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const distribution = await prisma.journalEntry.groupBy({
      by: ["riskLevel"],
      _count: { riskLevel: true },
    });
    res.json(
      distribution.map((d) => ({
        level: d.riskLevel,
        count: d._count.riskLevel,
      }))
    );
  } catch (error) {
    console.error("Error fetching risk distribution:", error);
    res.status(500).json({ error: "Failed to fetch risk distribution" });
  }
});

router.get("/recent-alerts", adminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const alerts = await prisma.crisisAlert.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        riskLevel: true,
        status: true,
        createdAt: true,
      },
    });

    const result = alerts.map((a) => ({
      id: a.id,
      time: a.createdAt.toISOString(),
      risk_level: a.riskLevel,
      detected_emotion: "distress",
      status: a.status,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching recent alerts:", error);
    res.status(500).json({ error: "Failed to fetch recent alerts" });
  }
});

export default router;
