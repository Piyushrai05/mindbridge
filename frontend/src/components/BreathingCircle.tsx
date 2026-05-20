import { motion } from "framer-motion";

interface BreathingCircleProps {
  phase: "inhale" | "hold" | "exhale";
}

const COLORS: Record<string, string> = {
  inhale: "#4ECDC4",
  hold: "#6C63FF",
  exhale: "#4ECDC4",
};

export default function BreathingCircle({ phase }: BreathingCircleProps) {
  const scaleMap = { inhale: 1.5, hold: 1.5, exhale: 1 };
  const label = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out" };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        animate={{ scale: scaleMap[phase] }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-40 h-40 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${COLORS[phase]}20`, border: `3px solid ${COLORS[phase]}` }}
      >
        <motion.div
          animate={{ scale: scaleMap[phase] * 0.6 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full"
          style={{ backgroundColor: `${COLORS[phase]}40` }}
        />
      </motion.div>
      <motion.p
        key={phase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-semibold text-text-primary"
      >
        {label[phase]}
      </motion.p>
    </div>
  );
}
