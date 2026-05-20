import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Wind, Eye, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HELPLINES } from "../utils/constants";

export default function Resources() {
  const navigate = useNavigate();
  const [expandedGrounding, setExpandedGrounding] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8 sm:py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">You're Not Alone</h1>
        <p className="text-text-secondary">Here are resources available to you anytime.</p>
      </div>

      {/* Emergency Helplines */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Emergency Helplines</h2>
        </div>
        <div className="space-y-3">
          {HELPLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="flex items-center justify-between p-4 rounded-xl bg-background hover:bg-primary/5 transition-colors group"
            >
              <div>
                <p className="font-medium text-text-primary">{h.name}</p>
                <p className="text-sm text-text-secondary">{h.description}</p>
              </div>
              <span className="text-primary font-bold group-hover:underline">{h.number}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Self-Help Techniques */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={20} className="text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Self-Help Techniques</h2>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/breathe")}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-background hover:bg-secondary/10 transition-colors text-left"
          >
            <Wind size={20} className="text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Box Breathing</p>
              <p className="text-sm text-text-secondary">A guided breathing exercise to calm your mind</p>
            </div>
          </button>

          <button
            onClick={() => setExpandedGrounding(!expandedGrounding)}
            className="w-full p-4 rounded-xl bg-background hover:bg-secondary/10 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Eye size={20} className="text-secondary" />
              <div className="flex-1">
                <p className="font-medium text-text-primary">5-4-3-2-1 Grounding Technique</p>
                <p className="text-sm text-text-secondary">A sensory-based exercise for anxiety</p>
              </div>
              {expandedGrounding ? <ChevronUp size={18} className="text-text-secondary" /> : <ChevronDown size={18} className="text-text-secondary" />}
            </div>
            {expandedGrounding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 ml-8 text-sm text-text-secondary space-y-2"
              >
                <p><strong className="text-text-primary">5</strong> — Name 5 things you can <strong>see</strong></p>
                <p><strong className="text-text-primary">4</strong> — Name 4 things you can <strong>touch</strong></p>
                <p><strong className="text-text-primary">3</strong> — Name 3 things you can <strong>hear</strong></p>
                <p><strong className="text-text-primary">2</strong> — Name 2 things you can <strong>smell</strong></p>
                <p><strong className="text-text-primary">1</strong> — Name 1 thing you can <strong>taste</strong></p>
              </motion.div>
            )}
          </button>

          <div className="p-4 rounded-xl bg-background">
            <div className="flex items-center gap-3 mb-3">
              <Sparkle />
              <p className="font-medium text-text-primary">Gratitude Journaling Prompts</p>
            </div>
            <ul className="ml-8 text-sm text-text-secondary space-y-2 list-disc">
              <li>What is one small thing that made you smile today?</li>
              <li>Who is someone you're grateful to have in your life?</li>
              <li>What is one thing about yourself that you appreciate?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* When to Seek Help */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-text-primary mb-4">When to Seek Professional Help</h2>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
            Persistent sadness or hopelessness lasting more than 2 weeks
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
            Difficulty performing daily activities or attending classes
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
            Changes in sleep or appetite that won't go away
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
            Thoughts of self-harm or suicide — please reach out immediately
          </li>
        </ul>
        <p className="mt-4 text-sm text-text-secondary">
          Your campus counseling center is a great first step. Most colleges offer free sessions.
        </p>
      </div>
    </motion.div>
  );
}

function Sparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
