import { Router, Request, Response } from "express";
import prisma from "../models/schema";

const router = Router();

router.post("/", async (_req: Request, res: Response) => {
  try {
    const session = await prisma.session.create({ data: {} });
    res.json({ session_id: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
