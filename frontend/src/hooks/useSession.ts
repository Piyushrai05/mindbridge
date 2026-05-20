import { useState, useEffect, useCallback } from "react";
import { createSession } from "../services/api";

const SESSION_KEY = "mindbridge_session_id";

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setSessionId(stored);
      setLoading(false);
    } else {
      createSession()
        .then((data) => {
          sessionStorage.setItem(SESSION_KEY, data.session_id);
          setSessionId(data.session_id);
        })
        .catch((err) => console.error("Failed to create session:", err))
        .finally(() => setLoading(false));
    }
  }, []);

  const resetSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    createSession()
      .then((data) => {
        sessionStorage.setItem(SESSION_KEY, data.session_id);
        setSessionId(data.session_id);
      })
      .catch((err) => console.error("Failed to reset session:", err));
  }, []);

  return { sessionId, loading, resetSession };
}
