export interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  value: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface JournalResponse {
  id: string;
  detected_emotion: string;
  risk_level: "low" | "moderate" | "high" | "crisis";
  ai_response: string;
  is_crisis: boolean;
  used_fallback: boolean;
}

export interface AdminStats {
  total_checkins: number;
  avg_stress: number;
  crisis_count: number;
  common_mood: string;
}

export interface MoodDistribution {
  mood: string;
  count: number;
}

export interface StressTrend {
  date: string;
  avg_intensity: number;
}

export interface HourlyActivity {
  hour: number;
  count: number;
}

export interface RiskDistribution {
  level: string;
  count: number;
}

export interface AlertEntry {
  id: string;
  time: string;
  risk_level: string;
  detected_emotion: string;
  status: string;
}
