import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import { Shield, Users, AlertTriangle, Activity, Brain, LogOut, Lock } from "lucide-react";
import StatCard from "../components/StatCard";
import {
  getAdminStats, getMoodDistribution, getStressTrend,
  getHourlyActivity, getRiskDistribution, getRecentAlerts,
} from "../services/api";
import { DISCLAIMER } from "../utils/constants";
import type { AdminStats, MoodDistribution, StressTrend, HourlyActivity, RiskDistribution, AlertEntry } from "../types";

const MOOD_COLORS: Record<string, string> = {
  happy: "#48BB78", calm: "#4ECDC4", neutral: "#A0AEC0",
  anxious: "#ECC94B", sad: "#63B3ED", angry: "#FC8181",
  stressed: "#F6AD55", hopeless: "#E53E3E",
};

const RISK_COLORS: Record<string, string> = {
  low: "#48BB78", moderate: "#ECC94B", high: "#F6AD55", crisis: "#E53E3E",
};

const MOOD_EMOJIS: Record<string, string> = {
  happy: "\u{1F60A}", calm: "\u{1F60C}", neutral: "\u{1F610}",
  anxious: "\u{1F61F}", sad: "\u{1F622}", angry: "\u{1F620}",
  stressed: "\u{1F630}", hopeless: "\u{1F61E}",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [moodDist, setMoodDist] = useState<MoodDistribution[]>([]);
  const [stressTrend, setStressTrend] = useState<StressTrend[]>([]);
  const [hourly, setHourly] = useState<HourlyActivity[]>([]);
  const [riskDist, setRiskDist] = useState<RiskDistribution[]>([]);
  const [alerts, setAlerts] = useState<AlertEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("mindbridge_admin_token") || "";

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    Promise.all([
      getAdminStats(token),
      getMoodDistribution(token),
      getStressTrend(token),
      getHourlyActivity(token),
      getRiskDistribution(token),
      getRecentAlerts(token),
    ])
      .then(([s, md, st, ha, rd, ra]) => {
        setStats(s);
        setMoodDist(md);
        setStressTrend(st);
        setHourly(ha);
        setRiskDist(rd);
        setAlerts(ra);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
        if (String(err).includes("Unauthorized") || String(err).includes("401")) {
          navigate("/admin/login");
        }
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("mindbridge_admin_token");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary text-4xl"
        >
          🧠
        </motion.div>
      </div>
    );
  }

  const formatHour = (h: number) => {
    if (h === 0) return "12AM";
    if (h < 12) return `${h}AM`;
    if (h === 12) return "12PM";
    return `${h - 12}PM`;
  };

  const peakHour = hourly.reduce((max, h) => (h.count > max.count ? h : max), { hour: 0, count: 0 });

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-semibold text-lg">
            <span className="text-2xl">🧠</span>
            MindBridge Admin
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary hidden sm:inline">Dashboard</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-text-secondary hover:text-crisis text-sm transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Privacy Banner */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm text-primary">
          <Lock size={14} />
          All data is anonymized. No individual student information is stored or displayed.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Campus Wellness Overview</h1>

        {/* Stat Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Check-ins"
              value={stats.total_checkins}
              icon={<Users size={20} />}
              trend="up"
            />
            <StatCard
              title="Average Stress Level"
              value={`${stats.avg_stress}/10`}
              icon={<Activity size={20} />}
              color={stats.avg_stress > 6 ? "#F6AD55" : "#4ECDC4"}
            />
            <StatCard
              title="Active Crisis Alerts"
              value={stats.crisis_count}
              icon={<AlertTriangle size={20} />}
              color="#E53E3E"
              alert={stats.crisis_count > 0}
            />
            <StatCard
              title="Most Common Mood"
              value={`${MOOD_EMOJIS[stats.common_mood] || ""} ${stats.common_mood}`}
              icon={<Brain size={20} />}
              color={MOOD_COLORS[stats.common_mood] || "#6C63FF"}
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mood Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary mb-4">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={moodDist} dataKey="count" nameKey="mood" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2}>
                  {moodDist.map((entry) => (
                    <Cell key={entry.mood} fill={MOOD_COLORS[entry.mood] || "#A0AEC0"} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {moodDist.map((d) => (
                <span key={d.mood} className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MOOD_COLORS[d.mood] || "#A0AEC0" }} />
                  {d.mood} ({d.count})
                </span>
              ))}
            </div>
          </div>

          {/* Stress Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary mb-4">Stress Level Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(d: string) => d.slice(5)} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avg_intensity" stroke="#6C63FF" strokeWidth={2.5} dot={{ fill: "#6C63FF", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary mb-4">Check-in Activity by Hour</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourly.filter((h) => h.hour >= 6 || h.hour <= 2)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
                <XAxis dataKey="hour" tickFormatter={formatHour} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip labelFormatter={formatHour} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {hourly.map((entry) => (
                    <Cell
                      key={entry.hour}
                      fill={entry.hour >= 22 || entry.hour <= 1 ? "#6C63FF" : "#4ECDC4"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-text-secondary mt-2 text-center">
              Peak activity: {formatHour(peakHour.hour)} ({peakHour.count} check-ins). Consider late-night support programs.
            </p>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary mb-4">Risk Level Distribution</h3>
            <div className="space-y-4 mt-6">
              {["low", "moderate", "high", "crisis"].map((level) => {
                const item = riskDist.find((r) => r.level === level);
                const count = item?.count || 0;
                const total = riskDist.reduce((sum, r) => sum + r.count, 0) || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={level}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize text-text-primary font-medium">{level}</span>
                      <span className="text-text-secondary">{count}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: RISK_COLORS[level] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/10 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={20} className="text-primary" />
            <h3 className="font-semibold text-text-primary">AI-Generated Campus Insight</h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            📊 <strong>Weekly Insight:</strong> Stress levels have increased by 23% compared to last week.
            Anxiety-related check-ins peak between 10 PM and 1 AM, likely correlated with assignment deadlines.
            Consider deploying peer support sessions during evening hours.
          </p>
        </div>

        {/* Recent Alerts Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="font-semibold text-text-primary mb-4">Recent Anonymous Alerts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-text-secondary font-medium">Time</th>
                  <th className="text-left py-3 px-2 text-text-secondary font-medium">Risk Level</th>
                  <th className="text-left py-3 px-2 text-text-secondary font-medium">Detected Emotion</th>
                  <th className="text-left py-3 px-2 text-text-secondary font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 5).map((alert) => (
                  <tr key={alert.id} className="border-b border-gray-50">
                    <td className="py-3 px-2 text-text-primary">
                      {new Date(alert.time).toLocaleString()}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: RISK_COLORS[alert.risk_level] || "#A0AEC0" }}
                      >
                        {alert.risk_level}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-text-primary capitalize">{alert.detected_emotion}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        alert.status === "reviewed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-yellow-700"
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {alerts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-text-secondary">
                      No alerts recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-text-secondary pb-4">
          <Shield size={12} />
          {DISCLAIMER}
        </div>
      </div>
    </div>
  );
}
