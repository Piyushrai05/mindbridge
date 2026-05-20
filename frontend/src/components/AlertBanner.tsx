import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface AlertBannerProps {
  message: string;
  type?: "warning" | "info";
  onAction?: () => void;
  actionLabel?: string;
}

export default function AlertBanner({ message, type = "warning", onAction, actionLabel }: AlertBannerProps) {
  const colors = {
    warning: "bg-warning/10 border-warning/30 text-yellow-800",
    info: "bg-primary/5 border-primary/20 text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors[type]}`}
    >
      <AlertTriangle size={18} />
      <p className="text-sm flex-1">{message}</p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="text-sm font-medium underline hover:no-underline"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
