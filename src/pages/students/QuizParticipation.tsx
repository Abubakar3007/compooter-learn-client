
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

interface Attempt {
    title: string;
    score: number;
    total: number;
    seconds: number;
    date: string | number;
}

interface Progress {
    name: string;
}

const classmates = [
    ["Diya", 23],
    ["Kabir", 21],
    ["Ananya", 19],
    ["Rohan", 16],
    ["Isha", 14],
] as const;

function QuizParticipation() {
    const [attempts, setAttempts] = useState<Attempt[]>(() => {
        try {
            return JSON.parse(
                localStorage.getItem("cq-attempts") || "[]"
            ) as Attempt[];
        } catch {
            return [];
        }
    });

    const [progress] = useState<Progress>(() => {
        try {
            const saved = localStorage.getItem("codequest-progress");
            return saved ? JSON.parse(saved) as Progress : { name: "Student" };
        } catch {
            return { name: "Student" };
        }
    });

    const total = attempts.reduce((sum, attempt) => sum + attempt.score, 0);

    const avg = attempts.length
        ? Math.round(
            (attempts.reduce(
                (sum, attempt) =>
                    sum + (attempt.total > 0 ? attempt.score / attempt.total : 0),
                0
            ) /
                attempts.length) *
            100
        )
        : 0;

    const board = [
        ...classmates.map(([name, score]) => ({
            name,
            score,
        })),
        {
            name: `${progress.name} (you)`,
            score: total,
        },
    ].sort((a, b) => b.score - a.score);

    const clearHistory = () => {
        if (!window.confirm("Are you sure you want to clear quiz history?")) {
            return;
        }

        setAttempts([]);
        localStorage.setItem("cq-attempts", "[]");
        toast.success("Quiz history cleared");
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-4">
            <Toaster position="top-right" />

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-extrabold">
                    📊 Quiz Participation
                </h1>
                <p className="mt-1 text-gray-500">
                    Every quiz you've taken, in one place.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    emoji="📝"
                    label="Quizzes taken"
                    value={attempts.length}
                    color="bg-blue-100"
                />

                <StatCard
                    emoji="🎯"
                    label="Average score"
                    value={`${avg}%`}
                    color="bg-green-100"
                />

                <StatCard
                    emoji="✅"
                    label="Correct answers"
                    value={total}
                    color="bg-purple-100"
                />
            </div>

            {/* History and Leaderboard */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Quiz History */}
                <div className="rounded-2xl border bg-white p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Quiz History</h2>

                        {attempts.length > 0 && (
                            <button
                                type="button"
                                onClick={clearHistory}
                                className="text-sm font-bold text-red-500 hover:text-red-700"
                            >
                                Clear history
                            </button>
                        )}
                    </div>

                    {attempts.length === 0 ? (
                        <div className="py-10 text-center">
                            <div className="mb-3 text-5xl">📝</div>
                            <h3 className="text-lg font-bold">No quizzes yet</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Take your first quiz to see it here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b text-gray-500">
                                        <th className="py-3 pr-3">Quiz</th>
                                        <th className="py-3 pr-3">Score</th>
                                        <th className="py-3 pr-3">Time</th>
                                        <th className="py-3">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {attempts.map((attempt, index) => (
                                        <tr key={`${attempt.date}-${index}`} className="border-b last:border-0">
                                            <td className="py-3 pr-3 font-semibold">
                                                {attempt.title}
                                            </td>

                                            <td className="py-3 pr-3">
                                                {attempt.score}/{attempt.total}
                                            </td>

                                            <td className="whitespace-nowrap py-3 pr-3">
                                                {Math.floor(attempt.seconds / 60)}m{" "}
                                                {attempt.seconds % 60}s
                                            </td>

                                            <td className="whitespace-nowrap py-3">
                                                {new Date(attempt.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <Link
                        to="/quizzes"
                        className="mt-5 inline-block font-bold text-purple-600 hover:text-purple-800"
                    >
                        Take a quiz →
                    </Link>
                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl border bg-white p-5">
                    <h2 className="mb-4 text-xl font-bold">
                        🏆 Class Leaderboard
                    </h2>

                    <ol className="space-y-2">
                        {board.map((student, index) => {
                            const isYou = student.name.includes("(you)");

                            return (
                                <li
                                    key={student.name}
                                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-3 ${isYou
                                        ? "bg-purple-100 font-bold text-purple-800"
                                        : "bg-gray-50"
                                        }`}
                                >
                                    <span className="min-w-0 truncate">
                                        {["🥇", "🥈", "🥉"][index] ?? `${index + 1}.`}{" "}
                                        {student.name}
                                    </span>

                                    <span className="shrink-0">
                                        {student.score} XP
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    emoji: string;
    label: string;
    value: string | number;
    color: string;
}

function StatCard({ emoji, label, value, color }: StatCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${color}`}>
                {emoji}
            </div>

            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-extrabold">{value}</p>
            </div>
        </div>
    );
}

export default QuizParticipation;