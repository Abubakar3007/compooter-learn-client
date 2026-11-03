import { useEffect, useState, useCallback } from "react";

type Progress = { name: string; className: string; xp: number; completed: string[]; interests: string[] };
const KEY = "codequest-progress";
const initial: Progress = { name: "Aarav", className: "Class 7", xp: 1240, completed: [], interests: [] };

export function useProgress() {
  const [p, setP] = useState<Progress>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setP({ ...initial, ...JSON.parse(raw) });
    } catch {}
  }, []);
  const update = useCallback((fn: (p: Progress) => Progress) => {
    setP((prev) => {
      const next = fn(prev);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  const addXp = useCallback((n: number, lessonId?: string) =>
    update((prev) => ({
      ...prev,
      xp: prev.xp + (lessonId && prev.completed.includes(lessonId) ? 0 : n),
      completed: lessonId && !prev.completed.includes(lessonId) ? [...prev.completed, lessonId] : prev.completed,
    })), [update]);
  return { progress: p, update, addXp };
}
