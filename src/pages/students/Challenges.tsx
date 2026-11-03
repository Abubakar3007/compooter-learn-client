
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Check } from "lucide-react";
import { challenges } from "@/data/practice";

type Challenge = (typeof challenges)[number];

type Tab = "All" | "Daily" | "Weekly";

interface ChallengeCardProps {
    challenge: Challenge;
    done: boolean;
    onSolve: () => void;
}

function Challenges() {
    const [solved, setSolved] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem("cq-challenges");
            return saved ? JSON.parse(saved) as string[] : [];
        } catch {
            return [];
        }
    });

    const [tab, setTab] = useState<Tab>("All");

    const list = challenges.filter(
        (challenge) => tab === "All" || challenge.type === tab
    );

    const completedCount = challenges.filter((challenge) =>
        solved.includes(challenge.id)
    ).length;

    const progress = challenges.length
        ? (completedCount / challenges.length) * 100
        : 0;

    const solveChallenge = (id: Challenge["id"], xp: number): void => {
        if (solved.includes(id)) return;

        const updated = [...solved, id];

        setSolved(updated);
        localStorage.setItem("cq-challenges", JSON.stringify(updated));

        // Connect your actual XP update logic here.
        toast.success(`Challenge solved! +${xp} XP 🎉`);
    };

    return (
        <div className="mx-auto max-w-6xl p-4">
            <Toaster position="top-right" />

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold">🎯 Challenges</h1>
                <p className="mt-1 text-gray-500">
                    Solve puzzles, earn bonus XP.
                </p>
            </div>

            {/* Progress */}
            <div className="mb-5 rounded-2xl border bg-white p-5">
                <div className="mb-3 flex justify-between text-sm font-bold">
                    <span>Completed</span>
                    <span>
                        {completedCount}/{challenges.length}
                    </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-green-500 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-5 flex gap-2">
                {(["All", "Daily", "Weekly"] as const).map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setTab(item)}
                        className={`rounded-full border px-5 py-2 text-sm font-bold ${tab === item
                            ? "border-purple-600 bg-purple-600 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Challenge Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                {list.map((challenge) => (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        done={solved.includes(challenge.id)}
                        onSolve={() =>
                            solveChallenge(challenge.id, challenge.xp)
                        }
                    />
                ))}
            </div>

            {list.length === 0 && (
                <p className="py-10 text-center text-gray-500">
                    No challenges available.
                </p>
            )}
        </div>
    );
}

function ChallengeCard({
    challenge,
    done,
    onSolve,
}: ChallengeCardProps) {
    const [value, setValue] = useState("");
    const [showHint, setShowHint] = useState(false);

    const checkAnswer = (): void => {
        if (
            value.trim().toLowerCase() ===
            challenge.answer.toLowerCase()
        ) {
            onSolve();
        } else {
            toast.error("Not quite — try again!");
        }
    };

    return (
        <div
            className={`rounded-2xl border bg-white p-5 shadow-sm ${done ? "border-green-500" : "border-gray-200"
                }`}
        >
            {/* Card Header */}
            <div className="flex items-center gap-3">
                <div
                    className="grid h-14 w-14 place-items-center rounded-2xl text-3xl"
                    style={{
                        backgroundColor: challenge.color || "#f3f4f6",
                    }}
                >
                    {challenge.emoji}
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-bold">{challenge.title}</h2>
                    <p className="text-xs font-semibold text-gray-500">
                        {challenge.type} · +{challenge.xp} XP
                    </p>
                </div>

                {done && (
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-green-500 text-white">
                        <Check size={18} />
                    </span>
                )}
            </div>

            {/* Question */}
            <p className="mt-4 font-semibold">{challenge.prompt}</p>

            {done ? (
                <p className="mt-3 text-sm font-bold text-green-600">
                    Solved! Answer: {challenge.answer}
                </p>
            ) : (
                <div className="mt-3 flex gap-2">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") checkAnswer();
                        }}
                        placeholder="Your answer"
                        className="min-w-0 flex-1 rounded-xl border px-3 py-2 outline-none focus:border-purple-500"
                    />

                    <button
                        type="button"
                        onClick={checkAnswer}
                        className="rounded-xl bg-purple-600 px-5 py-2 font-bold text-white hover:bg-purple-700"
                    >
                        Check
                    </button>
                </div>
            )}

            {/* Hint */}
            {!done && (
                <div className="mt-3">
                    <button
                        type="button"
                        onClick={() => setShowHint((previous) => !previous)}
                        className="text-sm font-bold text-purple-600"
                    >
                        {showHint ? "Hide hint" : "💡 Show hint"}
                    </button>

                    {showHint && (
                        <p className="mt-2 text-sm text-gray-600">
                            💡 {challenge.hint}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Challenges;
