const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }
  return res.json();
}

export function createSession(): Promise<{ session_id: string }> {
  return request("/session", { method: "POST" });
}

export function submitCheckin(session_id: string, mood: string, intensity: number) {
  return request("/checkin", {
    method: "POST",
    body: JSON.stringify({ session_id, mood, intensity }),
  });
}

export function submitJournal(session_id: string, text: string) {
  return request<{
    id: string;
    detected_emotion: string;
    risk_level: string;
    ai_response: string;
    is_crisis: boolean;
    used_fallback: boolean;
  }>("/journal", {
    method: "POST",
    body: JSON.stringify({ session_id, text }),
  });
}

export function submitCrisisAlert(session_id: string, trigger_text: string, risk_level: string) {
  return request("/crisis-alert", {
    method: "POST",
    body: JSON.stringify({ session_id, trigger_text, risk_level }),
  });
}

export function adminLogin(email: string, password: string): Promise<{ token: string }> {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function getAdminStats(token: string) {
  return request<{ total_checkins: number; avg_stress: number; crisis_count: number; common_mood: string }>(
    "/admin/stats",
    { headers: authHeaders(token) }
  );
}

export function getMoodDistribution(token: string) {
  return request<Array<{ mood: string; count: number }>>("/admin/mood-distribution", {
    headers: authHeaders(token),
  });
}

export function getStressTrend(token: string) {
  return request<Array<{ date: string; avg_intensity: number }>>("/admin/stress-trend", {
    headers: authHeaders(token),
  });
}

export function getHourlyActivity(token: string) {
  return request<Array<{ hour: number; count: number }>>("/admin/hourly-activity", {
    headers: authHeaders(token),
  });
}

export function getRiskDistribution(token: string) {
  return request<Array<{ level: string; count: number }>>("/admin/risk-distribution", {
    headers: authHeaders(token),
  });
}

export function getRecentAlerts(token: string) {
  return request<Array<{ id: string; time: string; risk_level: string; detected_emotion: string; status: string }>>(
    "/admin/recent-alerts",
    { headers: authHeaders(token) }
  );
}
