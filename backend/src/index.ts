import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sessionRouter from "./routes/session";
import checkinRouter from "./routes/checkin";
import journalRouter from "./routes/journal";
import crisisRouter from "./routes/crisis";
import adminRouter from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/session", sessionRouter);
app.use("/api/checkin", checkinRouter);
app.use("/api/journal", journalRouter);
app.use("/api/crisis-alert", crisisRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`MindBridge API running on port ${PORT}`);
});

export default app;
