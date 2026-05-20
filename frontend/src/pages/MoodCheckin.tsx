import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MoodCard from "../components/MoodCard";
import { MOOD_OPTIONS } from "../utils/constants";
import { useSession } from "../hooks/useSession";
import { submitCheckin } from "../services/api";

export default function MoodCheckin() {
  const navigate = useNavigate();
  const { sessionId } = useSession();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedMood || !sessionId) return;
    setSubmitting(true);
    try {
      await submitCheckin(sessionId, selectedMood, intensity);
      sessionStorage.setItem("mindbridge_mood", selectedMood);
      sessionStorage.setItem("mindbridge_intensity", String(intensity));
      navigate("/journal");
    } catch (err) {
      console.error("Check-in failed:", err);
      navigate("/journal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8 sm:py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          How are you feeling right now?
        </h1>
        <p className="text-text-secondary">
          There's no right or wrong answer. Just be honest with yourself.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {MOOD_OPTIONS.map((mood) => (
          <MoodCard
            key={mood.value}
            mood={mood}
            selected={selectedMood === mood.value}
            onClick={() => setSelectedMood(mood.value)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-text-primary mb-4">
                How intense is this feeling?
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-text-secondary">
                  <span>1 — Barely there</span>
                  <span className="text-lg font-bold text-primary">{intensity}</span>
                  <span>10 — Overwhelming</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              disabled={submitting}
              className="px-10 py-3.5 bg-primary text-white rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-primary/90 transition-all disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Continue to Journal"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
