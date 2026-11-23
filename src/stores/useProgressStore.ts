import { create } from "zustand";
const API_URL = `${import.meta.env.VITE_API_URL}/api/progress`;

interface ProgressStore {
    completedLessons: string[];
    fetchProgress: (courseId: string) => Promise<void>;
    completeLesson: (courseId: string, lessonId: string) => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set) => ({
    completedLessons: [],

    fetchProgress: async (courseId) => {
        try {
            const response = await fetch(`${API_URL}/${courseId}`, {
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok || !result.success) return;

            set({
                completedLessons: result.progress.map((item: { lessonId: string }) => item.lessonId),
            });
        } catch (error) {
            console.error("Fetch Progress Error:", error);
        }
    },

    completeLesson: async (courseId, lessonId) => {
        const response = await fetch(`${API_URL}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ courseId, lessonId }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Unable to complete lesson");
        }

        set((state) => ({
            completedLessons: state.completedLessons.includes(lessonId) ? state.completedLessons : [...state.completedLessons, lessonId],
        }));
    },
}));