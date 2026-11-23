
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    Trophy,
    Zap,
    Brain,
    Lightbulb,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Target,
    Award,
} from "lucide-react";

interface Question {
    id: number;
    category: string;
    question: string;
    options: string[];
    answer: number;
    hint: string;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        category: "Computer Fundamentals",
        question: "What is the brain of a computer?",
        options: ["Monitor", "CPU", "Keyboard", "Mouse"],
        answer: 1,
        hint: "It processes instructions and controls computer operations.",
        explanation:
            "CPU (Central Processing Unit) is called the brain of a computer because it processes instructions and performs calculations.",
    },
    {
        id: 2,
        category: "Computer Memory",
        question: "Which memory is temporary and loses data when power is turned off?",
        options: ["ROM", "Hard Disk", "RAM", "DVD"],
        answer: 2,
        hint: "It is also known as volatile memory.",
        explanation:
            "RAM is volatile memory. Its stored data is lost when the computer is switched off.",
    },
    {
        id: 3,
        category: "Programming",
        question: "Which language is primarily used to structure web pages?",
        options: ["Python", "HTML", "C++", "SQL"],
        answer: 1,
        hint: "It stands for HyperText Markup Language.",
        explanation:
            "HTML defines the structure and content of web pages using elements and tags.",
    },
    {
        id: 4,
        category: "Internet",
        question: "What does URL stand for?",
        options: [
            "Universal Resource Link",
            "Uniform Resource Locator",
            "United Reference Location",
            "Uniform Reading Link",
        ],
        answer: 1,
        hint: "It is the address used to locate a resource on the internet.",
        explanation:
            "URL stands for Uniform Resource Locator. It identifies the address of a resource on the web.",
    },
    {
        id: 5,
        category: "Number System",
        question: "What is the binary representation of decimal number 10?",
        options: ["1010", "1001", "1100", "1110"],
        answer: 0,
        hint: "10 = 8 + 2. Think about binary place values.",
        explanation:
            "10 in decimal is 1010 in binary because 8 + 2 = 10.",
    },
    {
        id: 6,
        category: "Cyber Security",
        question: "Which of these is the strongest password?",
        options: ["12345678", "password123", "Abc123", "T9#mK2!pQ8"],
        answer: 3,
        hint: "Look for a combination of uppercase, lowercase, numbers and symbols.",
        explanation:
            "A strong password should be long and combine uppercase and lowercase letters, numbers and special characters.",
    },
];

const XP_PER_QUESTION = 5;

export default function DailyQuiz() {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        Record<number, number>
    >({});
    const [submitted, setSubmitted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [time, setTime] = useState(0);
    const [finished, setFinished] = useState(false);

    const current = questions[currentIndex];
    const selectedAnswer = selectedAnswers[current.id];
    const isCorrect = selectedAnswer === current.answer;

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

    const correctCount = questions.filter(
        (q) => selectedAnswers[q.id] === q.answer
    ).length;

    const earnedXP = correctCount * XP_PER_QUESTION;
    const progress = ((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (index: number) => {
        if (submitted) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [current.id]: index,
        }));
    };

    const handleSubmit = () => {
        if (selectedAnswer === undefined || submitted) return;
        setSubmitted(true);
    };

    const handleNext = () => {
        if (currentIndex === questions.length - 1) {
            setFinished(true);
            return;
        }

        setCurrentIndex((prev) => prev + 1);
        setSubmitted(false);
        setShowHint(false);
    };

    const restartQuiz = () => {
        setCurrentIndex(0);
        setSelectedAnswers({});
        setSubmitted(false);
        setShowHint(false);
        setTime(0);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="min-h-screen bg-[#fffaf1] p-5 md:p-8">
                <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-[30px] border border-purple-100 bg-white p-8 text-center shadow-xl md:p-12">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-lg">
                            <Trophy size={48} />
                        </div>

                        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-purple-600">
                            Daily Quiz Completed
                        </p>

                        <h1 className="mt-2 text-3xl font-black text-slate-800 md:text-4xl">
                            {correctCount >= 5
                                ? "Amazing Performance!"
                                : correctCount >= 3
                                    ? "Good Job!"
                                    : "Keep Practicing!"}
                        </h1>

                        <p className="mt-3 text-slate-500">
                            You have completed today's quiz. Keep learning every day!
                        </p>

                        <div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                            <ResultCard
                                icon={<Target />}
                                value={`${correctCount}/${questions.length}`}
                                label="Correct Answers"
                                color="bg-purple-50 text-purple-600"
                            />

                            <ResultCard
                                icon={<Zap />}
                                value={String(earnedXP)}
                                label="XP Earned"
                                color="bg-yellow-50 text-yellow-600"
                            />

                            <ResultCard
                                icon={<Clock />}
                                value={formatTime(time)}
                                label="Time Taken"
                                color="bg-blue-50 text-blue-600"
                            />
                        </div>

                        <div className="mb-7 rounded-2xl bg-slate-50 p-5">
                            <div className="mb-3 flex justify-between text-sm font-bold text-slate-600">
                                <span>Your Score</span>
                                <span>{Math.round((correctCount / questions.length) * 100)}%</span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    style={{
                                        width: `${(correctCount / questions.length) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={restartQuiz}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:scale-105"
                            >
                                <RotateCcw size={18} />
                                Try Again
                            </button>

                            <button
                                onClick={() => navigate("/student/dashboard")}
                                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                                Dashboard
                            </button>
                        </div>
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

                    <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 font-bold text-orange-600">
                        <Award size={20} />
                        Daily Quiz
                    </div>
                </div>

                {/* Hero */}
                <div className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-7 text-white shadow-xl md:p-10">
                    <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                                DAILY LEARNING · LEVEL 1
                            </span>

                            <h1 className="mt-5 text-3xl font-black md:text-5xl">
                                Daily Quiz Challenge
                            </h1>

                            <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                                Test your knowledge, improve your skills and earn XP with
                                today's exciting quiz!
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                                <span className="rounded-full bg-white/20 px-4 py-2">
                                    {questions.length} Questions
                                </span>
                                <span className="rounded-full bg-white/20 px-4 py-2">
                                    +{questions.length * XP_PER_QUESTION} XP Available
                                </span>
                            </div>
                        </div>

                        <div className="flex h-28 w-28 items-center justify-center self-center rounded-3xl bg-white/20 md:h-36 md:w-36">
                            <Brain size={85} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                        icon={<Target />}
                        title="Question"
                        value={`${currentIndex + 1}/${questions.length}`}
                        color="bg-purple-100 text-purple-600"
                    />

                    <StatCard
                        icon={<Clock />}
                        title="Time Taken"
                        value={formatTime(time)}
                        color="bg-blue-100 text-blue-600"
                    />

                    <StatCard
                        icon={<CheckCircle2 />}
                        title="Correct"
                        value={String(correctCount)}
                        color="bg-green-100 text-green-600"
                    />

                    <StatCard
                        icon={<Zap />}
                        title="XP Earned"
                        value={String(earnedXP)}
                        color="bg-yellow-100 text-yellow-600"
                    />
                </div>

                {/* Progress */}
                <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex justify-between text-sm font-bold text-slate-600">
                        <span>Quiz Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

                    {/* Question */}
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md md:p-8">
                        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-bold text-purple-600">
                                    QUESTION {currentIndex + 1}
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-800">
                                    Choose the Correct Answer
                                </h2>
                            </div>

                            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
                                {current.category}
                            </span>
                        </div>

                        <div className="mb-7 rounded-2xl bg-gradient-to-r from-orange-50 to-purple-50 p-6 md:p-8">
                            <p className="text-sm font-semibold text-slate-500">
                                Question {currentIndex + 1} of {questions.length}
                            </p>

                            <h3 className="mt-3 text-xl font-black leading-relaxed text-slate-800 md:text-2xl">
                                {current.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {current.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isAnswer = current.answer === index;

                                let optionStyle =
                                    "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50";

                                if (submitted && isAnswer) {
                                    optionStyle = "border-green-500 bg-green-50 text-green-800";
                                } else if (submitted && isSelected && !isAnswer) {
                                    optionStyle = "border-red-400 bg-red-50 text-red-800";
                                } else if (isSelected) {
                                    optionStyle = "border-purple-500 bg-purple-50 text-purple-800";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleSelect(index)}
                                        disabled={submitted}
                                        className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${optionStyle} ${submitted ? "cursor-default" : "hover:-translate-y-0.5"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black ${submitted && isAnswer
                                                    ? "bg-green-500 text-white"
                                                    : submitted && isSelected
                                                        ? "bg-red-500 text-white"
                                                        : isSelected
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        <span className="flex-1 font-semibold">
                                            {option}
                                        </span>

                                        {submitted && isAnswer && (
                                            <CheckCircle2 className="text-green-600" />
                                        )}

                                        {submitted && isSelected && !isAnswer && (
                                            <XCircle className="text-red-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Hint */}
                        {showHint && (
                            <div className="mt-5 flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                                <Lightbulb className="shrink-0" size={20} />
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
                                        {isCorrect ? `Correct Answer! +${XP_PER_QUESTION} XP` : "Incorrect Answer"}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
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
                                    disabled={selectedAnswer === undefined}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3 font-bold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Submit Answer
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3 font-bold text-white shadow-lg transition hover:scale-105"
                                >
                                    {currentIndex === questions.length - 1
                                        ? "View Results"
                                        : "Next Question"}
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-5 font-black text-slate-800">
                                Question Navigator
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                {questions.map((question, index) => {
                                    const answered = selectedAnswers[question.id] !== undefined;
                                    const isCurrent = currentIndex === index;

                                    return (
                                        <button
                                            key={question.id}
                                            onClick={() => {
                                                if (submitted || index === currentIndex) return;
                                                setCurrentIndex(index);
                                                setShowHint(false);
                                            }}
                                            disabled={submitted}
                                            className={`h-12 rounded-xl font-bold transition ${isCurrent
                                                    ? "bg-purple-600 text-white shadow-lg"
                                                    : answered
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-100 text-slate-500 hover:bg-purple-50"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-5 space-y-3 text-xs font-semibold text-slate-500">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-purple-600" />
                                    Current Question
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-green-200" />
                                    Answered
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded bg-slate-200" />
                                    Not Answered
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-500 p-6 text-white shadow-lg">
                            <Trophy size={32} />

                            <h3 className="mt-4 text-xl font-black">
                                Earn Daily XP!
                            </h3>

                            <p className="mt-2 text-sm text-white/85">
                                Answer questions correctly to earn XP and improve your daily score.
                            </p>

                            <div className="mt-5 flex items-center justify-between rounded-xl bg-white/20 p-3">
                                <span className="text-sm font-semibold">Reward per question</span>
                                <span className="font-black">+{XP_PER_QUESTION} XP</span>
                            </div>
                        </div>

                        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                                    <Brain size={23} />
                                </div>
                                <h3 className="font-black text-slate-800">
                                    Quiz Tip
                                </h3>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Read every question carefully. Use hints when needed and
                                understand the explanation after each answer.
                            </p>
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
            <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
            <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-500">{title}</p>
                <p className="text-xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function ResultCard({
    icon,
    value,
    label,
    color,
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}) {
    return (
        <div className={`rounded-2xl p-5 ${color}`}>
            <div className="flex justify-center">{icon}</div>
            <h3 className="mt-2 text-2xl font-black">{value}</h3>
            <p className="mt-1 text-xs font-semibold opacity-75">{label}</p>
        </div>
    );
}
