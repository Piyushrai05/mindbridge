import { motion } from "framer-motion";
import type { ChatMessage } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isAI = message.role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} mb-3`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAI
            ? "bg-white text-text-primary border border-gray-100 rounded-tl-sm"
            : "bg-primary text-white rounded-tr-sm"
        }`}
      >
        {isAI && <span className="text-xs text-text-secondary block mb-1">MindBridge AI</span>}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}
