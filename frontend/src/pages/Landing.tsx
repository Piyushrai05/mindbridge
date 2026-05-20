import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Shield } from "lucide-react";
import { DISCLAIMER } from "../utils/constants";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background: "linear-gradient(135deg, #F8F9FE 0%, #EDE9FE 30%, #E0F7F5 60%, #F8F9FE 100%)",
      }}
    >
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-40 h-40 bg-accent/3 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-6xl">🧠</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-3 tracking-tight">
            Mind<span className="text-primary">Bridge</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg sm:text-xl text-text-primary/80 mb-2 font-medium"
        >
          Your safe space to breathe, reflect, and find support.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-secondary mb-8"
        >
          Anonymous. AI-powered. Built for students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <button
            onClick={() => navigate("/checkin")}
            className="px-8 py-3.5 bg-primary text-white rounded-full font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all"
          >
            Start Your Check-in
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="px-8 py-3.5 border-2 border-primary/30 text-primary rounded-full font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            I'm an Admin
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-2 text-text-secondary text-sm"
        >
          <Lock size={14} />
          <span>No sign-up required. 100% anonymous.</span>
          <Shield size={14} />
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 text-center text-xs text-text-secondary/70"
      >
        <p>Built for Far Away Hackathon 2026 | Team MindBridge</p>
        <p className="mt-1">{DISCLAIMER}</p>
      </motion.footer>
    </div>
  );
}
