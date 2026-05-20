import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down";
  color?: string;
  alert?: boolean;
}

export default function StatCard({ title, value, icon, trend, color = "#6C63FF", alert }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-5 shadow-sm border ${alert ? "border-crisis/30" : "border-gray-100"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-secondary text-sm">{title}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend === "up" ? "text-accent" : "text-success"}`}>
            {trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          </span>
        )}
      </div>
    </motion.div>
  );
}
