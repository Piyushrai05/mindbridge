import { motion } from "framer-motion";
import { Phone, Heart } from "lucide-react";
import { HELPLINES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

interface CrisisOverlayProps {
  onDismiss: () => void;
}

export default function CrisisOverlay({ onDismiss }: CrisisOverlayProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4"
          >
            <Heart className="text-accent" size={32} />
          </motion.div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">We care about you.</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            It sounds like you might be going through something really difficult.
            Please reach out to someone who can help:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {HELPLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <Phone size={18} className="text-primary" />
              <div>
                <p className="font-medium text-text-primary text-sm">{h.name}</p>
                <p className="text-primary font-semibold">{h.number}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="space-y-2">
          <button
            onClick={() => navigate("/crisis")}
            className="w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Talk to Someone Now
          </button>
          <button
            onClick={onDismiss}
            className="w-full py-3 text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            I'm okay, continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
