import { motion } from "framer-motion";
import type { MoodOption } from "../types";

interface MoodCardProps {
  mood: MoodOption;
  selected: boolean;
  onClick: () => void;
}

export default function MoodCard({ mood, selected, onClick }: MoodCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      animate={selected ? { scale: 1.05 } : { scale: 1 }}
      className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl cursor-pointer transition-all duration-200 ${
        selected
          ? "ring-2 shadow-lg bg-white"
          : "bg-white/70 hover:bg-white hover:shadow-md"
      }`}
      style={{
        borderColor: selected ? mood.color : "transparent",
        borderWidth: "2px",
        boxShadow: selected ? `0 4px 20px ${mood.color}30` : undefined,
      }}
    >
      <motion.span
        className="text-4xl"
        animate={selected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: selected ? Infinity : 0, repeatDelay: 1 }}
      >
        {mood.emoji}
      </motion.span>
      <span
        className="text-sm font-medium"
        style={{ color: selected ? mood.color : "#718096" }}
      >
        {mood.label}
      </span>
    </motion.button>
  );
}
