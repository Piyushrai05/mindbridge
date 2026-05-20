import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Heart, MessageCircle } from "lucide-react";
import { HELPLINES, DISCLAIMER } from "../utils/constants";

export default function Crisis() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connecting) {
      const timer = setTimeout(() => {
        setConnecting(false);
        setConnected(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [connecting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto px-4 py-8 sm:py-12"
    >
      {!connecting && !connected && (
        <>
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-4"
            >
              <Heart size={36} className="text-secondary" />
            </motion.div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">We're Here For You</h1>
            <p className="text-text-secondary leading-relaxed">
              It seems like you might be going through a really tough time.
              You don't have to face this alone.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {HELPLINES.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number.replace(/-/g, "")}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{h.name}</p>
                  <p className="text-xs text-text-secondary">{h.description}</p>
                </div>
                <span className="text-primary font-bold text-sm">{h.number}</span>
              </a>
            ))}
          </div>

          <button
            onClick={() => setConnecting(true)}
            className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Connect with a Counselor
          </button>
        </>
      )}

      {connecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6"
          >
            <MessageCircle size={40} className="text-primary" />
          </motion.div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Finding an available counselor...</h2>
          <p className="text-text-secondary">Please hold on, we're connecting you.</p>
        </motion.div>
      )}

      {connected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-success/10 text-success text-sm font-medium px-4 py-2 rounded-full text-center">
            Connected to Counselor Priya (Simulated)
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg">
                👩‍⚕️
              </div>
              <div>
                <p className="font-medium text-text-primary">Counselor Priya</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-start">
                <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                  <p className="text-sm text-text-primary leading-relaxed">
                    Hi, I'm here to listen. Take your time — there's no rush.
                    Whatever you're going through, you don't have to face it alone.
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                  <p className="text-sm text-text-primary leading-relaxed">
                    Whenever you're ready, you can share what's on your mind.
                    I'm right here with you. 💛
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
            <p className="text-sm text-yellow-800">
              This is a hackathon demo. In a production version, this connects to verified mental health professionals.
            </p>
          </div>
        </motion.div>
      )}

      <p className="text-center text-xs text-text-secondary mt-8">{DISCLAIMER}</p>
    </motion.div>
  );
}
