
import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Binary,
    Clock,
    Flame,
    Lightbulb,
    Trophy,
    Zap,
    CheckCircle2,
    XCircle,
    RotateCcw,
    BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
    decimal: number;
    difficulty: "Easy" | "Medium" | "Hard";
    xp: number;
    hint: string;
    explanation: string;
}

const challenges: Challenge[] = [
    {
        decimal: 5,
        difficulty: "Easy",
        xp: 10,
        hint: "4 + 1 = 5. Think about the binary place values.",
        explanation: "5 = 4 + 1, so its binary representation is 00000101.",
    },
    {
        decimal: 10,
        difficulty: "Easy",
        xp: 10,
        hint: "8 + 2 = 10.",
        explanation: "10 = 8 + 2, so its binary representation is 00001010.",
    },
    {
        decimal: 15,
        difficulty: "Easy",
        xp: 15,
        hint: "8 + 4 + 2 + 1 = 15.",
        explanation: "15 = 8 + 4 + 2 + 1, so its binary representation is 00001111.",
    },
    {
        decimal: 25,
        difficulty: "Medium",
        xp: 20,
        hint: "16 + 8 + 1 = 25.",
        explanation: "25 = 16 + 8 + 1, so its binary representation is 00011001.",
    },
    {
        decimal: 42,
        difficulty: "Medium",
        xp: 25,
        hint: "32 + 8 + 2 = 42.",
        explanation: "42 = 32 + 8 + 2, so its binary representation is 00101010.",
    },
    {
        decimal: 100,
        difficulty: "Hard",
        xp: 30,
        hint: "64 + 32 + 4 = 100.",
        explanation: "100 = 64 + 32 + 4, so its binary representation is 01100100.",
    },
];

const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];

export default function BinaryChallenge() {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [bits, setBits] = useState<number[]>(Array(8).fill(0));
    const [submitted, setSubmitted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [earnedXP, setEarnedXP] = useState(0);
    const [time, setTime] = useState(0);
    const [finished, setFinished] = useState(false);

    const current = challenges[currentIndex];

    const userAnswer = bits.join("");
    const correctAnswer = current.decimal.toString(2).padStart(8, "0");

    const isCorrect = userAnswer === correctAnswer;

    useEffect(() => {
        if (finished) return;

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [finished]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const toggleBit = (index: number) => {
        if (submitted) return;

        setBits((prev) =>
            prev.map((bit, i) => (i === index ? (bit === 0 ? 1 : 0) : bit))
        );
    };

    const handleSubmit = () => {
        if (submitted) return;

        setSubmitted(true);

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
            setEarnedXP((prev) => prev + current.xp);
        }
    };

    const nextChallenge = () => {
        if (currentIndex === challenges.length - 1) {
            setFinished(true);
            return;
        }

        setCurrentIndex((prev) => prev + 1);
        setBits(Array(8).fill(0));
        setSubmitted(false);
        setShowHint(false);
    };

    const restartChallenge = () => {
        setCurrentIndex(0);
        setBits(Array(8).fill(0));
        setSubmitted(false);
        setShowHint(false);
        setCorrectCount(0);
        setEarnedXP(0);
        setTime(0);
        setFinished(false);
    };

    const progress = finished
        ? 100
        : ((currentIndex + (submitted ? 1 : 0)) / challenges.length) * 100;

    if (finished) {
        return (
            <div className="min-h-screen bg-[#fffaf1] p-5 md:p-8">
                <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-[32px] border border-purple-100 bg-white p-8 text-center shadow-xl md:p-12">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            <Trophy size={48} />
                        </div>

                        <h1 className="text-3xl font-black text-slate-800 md:text-4xl">
                            Challenge Completed!
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Great job! You completed your Binary Challenge.
                        </p>

                        <div className="my-8 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-purple-50 p-5">
                                <Zap className="mx-auto text-purple-600" />
                                <h2 className="mt-2 text-3xl font-black text-purple-700">
                                    {earnedXP}
                                </h2>
                                <p className="text-sm text-slate-500">XP Earned</p>
                            </div>

                            <div className="rounded-2xl bg-orange-50 p-5">
                                <Trophy className="mx-auto text-orange-500" />
                                <h2 className="mt-2 text-3xl font-black text-orange-600">
                                    {correctCount}/{challenges.length}
                                </h2>
                                <p className="text-sm text-slate-500">Correct Answers</p>
                            </div>
                        </div>

                        <p className="mb-7 text-sm text-slate-500">
                            Total time: {formatTime(time)}
                        </p>

                        <button
                            onClick={restartChallenge}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                        >
                            <RotateCcw size={18} />
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffaf1] p-4 md:p-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => navigate("/student/dashboard")}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-600 shadow-sm transition hover:bg-purple-50"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-orange-600">
                            <Flame size={20} />
                            <span className="font-bold">Daily Challenge</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-purple-700">
                            <Zap size={20} />
                            <span className="font-bold">{earnedXP} XP</span>
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-7 text-white shadow-xl md:p-10">
                    <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                                LEVEL 1 · COMPUTER FUNDAMENTALS
                            </span>

                            <h1 className="mt-5 text-3xl font-black md:text-5xl">
                                Binary Challenge
                            </h1>

                            <p className="mt-3 max-w-xl text-sm text-white/85 md:text-base">
                                Become a Binary Master! Convert decimal numbers into binary
                                using interactive bits.
                            </p>
                        </div>

                        <div className="flex h-28 w-28 items-center justify-center self-center rounded-3xl bg-white/20 md:h-36 md:w-36">
                            <Binary size={85} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                        icon={<Binary />}
                        title="Challenge"
                        value={`${currentIndex + 1}/${challenges.length}`}
                        color="bg-purple-100 text-purple-600"
                    />
                    <StatCard
                        icon={<Clock />}
                        title="Time Taken"
                        value={formatTime(time)}
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        icon={<Trophy />}
                        title="Correct"
                        value={String(correctCount)}
                        color="bg-yellow-100 text-yellow-600"
                    />
                    <StatCard
                        icon={<Zap />}
                        title="XP Earned"
                        value={String(earnedXP)}
                        color="bg-orange-100 text-orange-600"
                    />
                </div>

                {/* Progress */}
                <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex justify-between text-sm font-bold text-slate-600">
                        <span>Your Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main Challenge */}
                <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md md:p-8">

                        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-bold text-purple-600">
                                    QUESTION {currentIndex + 1}
                                </p>
                                <h2 className="mt-1 text-2xl font-black text-slate-800">
                                    Convert Decimal to Binary
                                </h2>
                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-bold ${current.difficulty === "Easy"
                                        ? "bg-green-100 text-green-700"
                                        : current.difficulty === "Medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {current.difficulty}
                            </span>
                        </div>

                        {/* Decimal Number */}
                        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-7 text-center">
                            <p className="text-sm font-semibold text-slate-500">
                                Convert this decimal number
                            </p>

                            <h2 className="my-3 text-6xl font-black text-purple-700">
                                {current.decimal}
                            </h2>

                            <p className="text-sm font-medium text-slate-500">
                                Decimal Number (Base 10)
                            </p>
                        </div>

                        {/* Bit Values */}
                        <div className="mb-3 flex justify-between">
                            <h3 className="font-bold text-slate-700">
                                Select your binary bits
                            </h3>
                            <span className="text-xs font-semibold text-slate-400">
                                8-BIT SYSTEM
                            </span>
                        </div>

                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                            {bits.map((bit, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleBit(index)}
                                    disabled={submitted}
                                    className={`rounded-2xl border-2 p-3 text-center transition-all sm:p-4 ${bit === 1
                                            ? "border-purple-500 bg-purple-600 text-white shadow-lg shadow-purple-200"
                                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-purple-300"
                                        } ${submitted ? "cursor-not-allowed" : "hover:-translate-y-1"}`}
                                >
                                    <span className="block text-xs font-bold opacity-70">
                                        {bitValues[index]}
                                    </span>
                                    <span className="mt-2 block text-2xl font-black">
                                        {bit}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Binary Answer */}
                        <div className="mt-5 rounded-xl bg-slate-900 p-5 text-center">
                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                Your Binary Answer
                            </p>
                            <p className="font-mono text-3xl font-black tracking-[0.2em] text-green-400">
                                {userAnswer}
                            </p>
                        </div>

                        {/* Hint */}
                        {showHint && (
                            <div className="mt-5 flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                                <Lightbulb className="shrink-0" />
                                <p>{current.hint}</p>
                            </div>
                        )}

                        {/* Feedback */}
                        {submitted && (
                            <div
                                className={`mt-5 rounded-xl p-5 ${isCorrect
                                        ? "border border-green-200 bg-green-50"
                                        : "border border-red-200 bg-red-50"
                                    }`}
                            >
                                <div className="flex items-center gap-2 font-bold">
                                    {isCorrect ? (
                                        <CheckCircle2 className="text-green-600" />
                                    ) : (
                                        <XCircle className="text-red-600" />
                                    )}

                                    <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                                        {isCorrect ? `Correct! +${current.xp} XP` : "Not quite! Try the next one."}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-slate-600">
                                    {current.explanation}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-7 flex flex-wrap justify-between gap-3">
                            <button
                                onClick={() => setShowHint((prev) => !prev)}
                                disabled={submitted}
                                className="flex items-center gap-2 rounded-xl border border-yellow-300 bg-yellow-50 px-5 py-3 font-bold text-yellow-700 transition hover:bg-yellow-100 disabled:opacity-50"
                            >
                                <Lightbulb size={18} />
                                {showHint ? "Hide Hint" : "Get Hint"}
                            </button>

                            {!submitted ? (
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3 font-bold text-white shadow-lg transition hover:scale-105"
                                >
                                    Check Answer
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={nextChallenge}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3 font-bold text-white shadow-lg transition hover:scale-105"
                                >
                                    {currentIndex === challenges.length - 1
                                        ? "Finish Challenge"
                                        : "Next Challenge"}
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Learning Sidebar */}
                    <div className="space-y-5">
                        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                                    <BookOpen size={23} />
                                </div>
                                <h3 className="font-black text-slate-800">
                                    Quick Learning
                                </h3>
                            </div>

                            <p className="mb-4 text-sm leading-6 text-slate-500">
                                Binary numbers use only two digits: 0 and 1. Each position
                                represents a power of 2.
                            </p>

                            <div className="space-y-2">
                                {[128, 64, 32, 16, 8, 4, 2, 1].map((value, index) => (
                                    <div
                                        key={value}
                                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                                    >
                                        <span className="font-semibold text-slate-500">
                                            Bit {8 - index}
                                        </span>
                                        <span className="font-black text-purple-700">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[24px] bg-gradient-to-br from-orange-400 to-pink-500 p-6 text-white shadow-lg">
                            <Trophy size={32} />
                            <h3 className="mt-4 text-xl font-black">
                                Earn Rewards!
                            </h3>
                            <p className="mt-2 text-sm text-white/90">
                                Complete all challenges and collect XP to unlock your next achievement.
                            </p>
                            <div className="mt-5 rounded-xl bg-white/20 p-3 text-center font-bold">
                                Up to 110 XP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className={`rounded-xl p-3 ${color}`}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-500">{title}</p>
                <p className="text-xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}
