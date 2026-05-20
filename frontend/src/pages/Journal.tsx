import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ChatBubble from "../components/ChatBubble";
import CrisisOverlay from "../components/CrisisOverlay";
import AlertBanner from "../components/AlertBanner";
import { useSession } from "../hooks/useSession";
import { submitJournal, submitCrisisAlert } from "../services/api";
import { detectCrisisClient } from "../services/emotionDetector";
import type { ChatMessage } from "../types";
import { useNavigate } from "react-router-dom";

export default function Journal() {
  const { sessionId } = useSession();
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mood = sessionStorage.getItem("mindbridge_mood") || "neutral";
  const intensity = Number(sessionStorage.getItem("mindbridge_intensity") || "5");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!journalText.trim() || !sessionId) return;
    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: journalText.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const isCrisisLocal = detectCrisisClient(journalText);

    try {
      const res = await submitJournal(sessionId, journalText.trim());
      const aiMsg: ChatMessage = {
        id: uuidv4(),
        role: "ai",
        content: res.ai_response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setUsedFallback(res.used_fallback);

      if (res.is_crisis || isCrisisLocal) {
        setShowCrisis(true);
        await submitCrisisAlert(sessionId, "[REDACTED]", "crisis").catch(() => {});
      }
    } catch (err) {
      console.error("Journal submission failed:", err);
      const errMsg: ChatMessage = {
        id: uuidv4(),
        role: "ai",
        content: "I'm having trouble connecting right now. Please try again in a moment. If you're in crisis, please call iCall at 9152987821.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);

      if (isCrisisLocal) {
        setShowCrisis(true);
      }
    } finally {
      setJournalText("");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 py-6 sm:py-8"
    >
      {(mood === "hopeless" || intensity >= 8) && (
        <AlertBanner
          message="Remember, you're not alone. Help is always available."
          type="warning"
          actionLabel="Talk to Someone"
          onAction={() => navigate("/crisis")}
        />
      )}

      {usedFallback && (
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs rounded-full">
            <Sparkles size={12} />
            Running in demo mode. Production version uses GPT-4o.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-220px)]">
        {/* Journal Input */}
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">What's on your mind?</h2>
          <p className="text-sm text-text-secondary mb-4">
            Write freely. No one will see this except you.
          </p>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I've been feeling... / Today was... / I'm worried about..."
            className="flex-1 resize-none border border-gray-200 rounded-xl p-4 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 min-h-[150px]"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-text-secondary">{journalText.length} characters</span>
            <button
              onClick={handleSubmit}
              disabled={!journalText.trim() || loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              <Send size={14} />
              {loading ? "Thinking..." : "Share with AI Assistant"}
            </button>
          </div>
        </div>

        {/* Chat */}
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧠</span>
            <h2 className="text-lg font-semibold text-text-primary">AI Companion</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-1">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-text-secondary text-sm text-center px-4">
                <p>Share your thoughts, and I'll respond with care and support. Everything stays anonymous.</p>
              </div>
            )}
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {showCrisis && <CrisisOverlay onDismiss={() => setShowCrisis(false)} />}
    </motion.div>
  );
}
