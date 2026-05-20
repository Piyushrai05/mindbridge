import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BreathingCircle from "../components/BreathingCircle";

type Phase = "inhale" | "hold" | "exhale";
const PHASE_DURATION = 4000;
const TOTAL_CYCLES = 4;

export default function Breathe() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("inhale");
  const [cycle, setCycle] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const runCycle = useCallback(() => {
    setIsRunning(true);
    setPhase("inhale");

    let currentCycle = 1;
    setCycle(1);

    const phases: Phase[] = ["inhale", "hold", "exhale"];
    let phaseIndex = 0;

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex >= phases.length) {
        phaseIndex = 0;
        currentCycle++;
        if (currentCycle > TOTAL_CYCLES) {
          clearInterval(interval);
          setIsRunning(false);
          setCompleted(true);
          return;
        }
        setCycle(currentCycle);
      }
      setPhase(phases[phaseIndex]);
    }, PHASE_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRunning && !completed) {
      const cleanup = runCycle();
      return cleanup;
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #E0F7F5 0%, #EDE9FE 50%, #E0F7F5 100%)",
      }}
    >
      {!completed ? (
        <>
          <BreathingCircle phase={phase} />
          <motion.p
            key={`${cycle}-${phase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-text-secondary text-lg"
          >
            Cycle {cycle} of {TOTAL_CYCLES}
          </motion.p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <span className="text-5xl mb-4 block">✨</span>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Great job!</h2>
          <p className="text-text-secondary mb-8">How do you feel now?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/checkin")}
              className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Re-check My Mood
            </button>
            <button
              onClick={() => navigate("/journal")}
              className="px-8 py-3 border-2 border-primary/30 text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
            >
              Back to Journal
            </button>
            <button
              onClick={() => { setCompleted(false); runCycle(); }}
              className="px-8 py-3 text-text-secondary hover:text-primary transition-colors"
            >
              Do it again
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
