
import React, { useEffect, useState } from "react";
import {
    Trophy,
    Users,
    Clock,
    Medal,
    Award,
    CalendarDays,
    Zap,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Download,
    Copy,
    Crown,
    Target,
    Radio,
    BookOpen,
} from "lucide-react";
import { SiteLayout } from "@/components/site";

type Phase = "lobby" | "quiz" | "result" | "certificate";
import Leaderboard from "@/components/Leaderboard";

const quizQuestions = [
    {
        id: 1,
        question: "Which component is known as the brain of a computer?",
        options: ["RAM", "CPU", "Monitor", "Keyboard"],
        answer: 1,
        explanation: "The CPU processes instructions and controls computer operations.",
    },
    {
        id: 2,
        question: "Which of these is an example of an operating system?",
        options: ["Google Chrome", "MS Word", "Windows", "HTML"],
        answer: 2,
        explanation: "Windows is an operating system that manages computer hardware and software.",
    },
    {
        id: 3,
        question: "What is the binary representation of decimal 5?",
        options: ["101", "110", "100", "111"],
        answer: 0,
        explanation: "5 = 4 + 1, which is represented as 101 in binary.",
    },
    {
        id: 4,
        question: "Which language is used to structure web pages?",
        options: ["Python", "C++", "HTML", "SQL"],
        answer: 2,
        explanation: "HTML defines the structure and content of web pages.",
    },
    {
        id: 5,
        question: "What does URL stand for?",
        options: [
            "Uniform Resource Locator",
            "Universal Reading Link",
            "United Resource Location",
            "Uniform Reference Language",
        ],
        answer: 0,
        explanation: "URL stands for Uniform Resource Locator.",
    },
];

const initialLeaderboard = [
    { name: "Aarav Sharma", score: 100, time: "02:45", avatar: "A" },
    { name: "Priya Verma", score: 100, time: "03:10", avatar: "P" },
    { name: "Rahul Kumar", score: 80, time: "03:25", avatar: "R" },
    { name: "Ananya Singh", score: 80, time: "04:02", avatar: "A" },
    { name: "Kabir Khan", score: 60, time: "04:30", avatar: "K" },
];

const TOTAL_TIME = 300;
const PASS_PERCENTAGE = 60;

export default function Quiz() {
    const [phase, setPhase] = useState<Phase>("lobby");
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [remaining, setRemaining] = useState(TOTAL_TIME);
    const [showExplanation, setShowExplanation] = useState(false);
    const [studentName] = useState("Sahil Ahmad");
    const [certificateId] = useState("CQ-2026-8X29K");
    const [leaderboard] = useState(initialLeaderboard);

    const score = quizQuestions.reduce(
        (total, question) =>
            total + (answers[question.id] === question.answer ? 1 : 0),
        0
    );

    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= PASS_PERCENTAGE;
    const answered = Object.keys(answers).length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (phase !== "quiz") return;

        if (remaining <= 0) {
            setPhase("result");
            return;
        }

        const timer = setTimeout(() => {
            setRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [phase, remaining]);

    const startQuiz = () => {
        setCurrent(0);
        setAnswers({});
        setRemaining(TOTAL_TIME);
        setShowExplanation(false);
        setPhase("quiz");
    };

    const selectAnswer = (optionIndex: number) => {
        if (answers[quizQuestions[current].id] !== undefined) return;

        setAnswers((prev) => ({
            ...prev,
            [quizQuestions[current].id]: optionIndex,
        }));

        setShowExplanation(true);
    };

    const nextQuestion = () => {
        setShowExplanation(false);

        if (current === quizQuestions.length - 1) {
            setPhase("result");
        } else {
            setCurrent((prev) => prev + 1);
        }
    };

    const printCertificate = () => {
        window.print();
    };

    const copyCertificateId = async () => {
        try {
            await navigator.clipboard.writeText(certificateId);
            alert("Certificate ID copied!");
        } catch {
            alert("Please copy your certificate ID manually: " + certificateId);
        }
    };

    return (
        <SiteLayout>
            <div className="min-h-screen bg-[#fffaf1] p-4 md:p-8">
                <div className="mx-auto max-w-7xl px-4">

                    {/* Header */}
                    <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 text-white">
                                    <Trophy size={23} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900">
                                        CodeQuest <span className="text-purple-600">Arena</span>
                                    </h1>
                                    <p className="text-xs text-slate-500">Universal Quiz Competition</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                            <ShieldCheck size={18} />
                            Official Competition
                        </div>
                    </header>

                    {/* Competition Hero */}
                    <section className="mb-7 overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-7 text-white shadow-xl md:p-10">
                        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                                    <Radio size={16} />
                                    UNIVERSAL QUIZ SERIES
                                </div>

                                <h2 className="mt-5 text-3xl font-black md:text-5xl">
                                    One Quiz. One Community.
                                    <br />
                                    One Champion.
                                </h2>

                                <p className="mt-4 max-w-xl leading-7 text-white/85">
                                    Participate with students from everywhere, test your
                                    knowledge, compete on the leaderboard and earn your
                                    achievement certificate.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                                    <span className="rounded-full bg-white/20 px-4 py-2">
                                        <Users className="mr-1 inline" size={15} />
                                        Everyone Can Participate
                                    </span>
                                    <span className="rounded-full bg-white/20 px-4 py-2">
                                        <Award className="mr-1 inline" size={15} />
                                        Certificate Available
                                    </span>
                                </div>
                            </div>

                            <div className="flex h-32 w-32 items-center justify-center self-center rounded-3xl bg-white/20 md:h-40 md:w-40">
                                <Trophy size={90} strokeWidth={1.4} />
                            </div>
                        </div>
                    </section>

                    {/* Competition Stats */}
                    <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Stat
                            icon={<Users />}
                            label="Participants"
                            value="2,450"
                            color="bg-purple-100 text-purple-600"
                        />
                        <Stat
                            icon={<BookOpen />}
                            label="Questions"
                            value="05"
                            color="bg-blue-100 text-blue-600"
                        />
                        <Stat
                            icon={<Clock />}
                            label="Duration"
                            value="05 Min"
                            color="bg-orange-100 text-orange-600"
                        />
                        <Stat
                            icon={<Award />}
                            label="Certificate"
                            value="Included"
                            color="bg-green-100 text-green-600"
                        />
                    </div>

                    {/* LOBBY */}
                    {phase === "lobby" && (
                        <div className="grid items-start gap-6 lg:grid-cols-[1fr_420px]">
                            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                                        REGISTRATION OPEN
                                    </span>
                                    <span className="text-sm font-bold text-purple-600">
                                        Competition #CQ001
                                    </span>
                                </div>

                                <h2 className="mt-6 text-3xl font-black text-slate-900">
                                    Computer Knowledge Championship
                                </h2>

                                <p className="mt-3 leading-7 text-slate-500">
                                    A knowledge competition covering computer fundamentals,
                                    programming, number systems, internet and technology.
                                </p>

                                <div className="my-7 grid gap-4 sm:grid-cols-2">
                                    <Info
                                        icon={<CalendarDays />}
                                        label="Competition Date"
                                        value="Demo Event"
                                    />
                                    <Info
                                        icon={<Clock />}
                                        label="Quiz Duration"
                                        value="5 Minutes"
                                    />
                                    <Info
                                        icon={<Target />}
                                        label="Passing Score"
                                        value="60%"
                                    />
                                    <Info
                                        icon={<Award />}
                                        label="Reward"
                                        value="Digital Certificate"
                                    />
                                </div>

                                <div className="rounded-2xl bg-purple-50 p-5">
                                    <h3 className="font-black text-purple-900">
                                        Competition Rules
                                    </h3>
                                    <ul className="mt-3 space-y-3 text-sm text-purple-800">
                                        <li>✓ Every participant receives the same questions.</li>
                                        <li>✓ Each question has one correct answer.</li>
                                        <li>✓ You have five minutes to complete the quiz.</li>
                                        <li>✓ A minimum score of 60% is required for the certificate.</li>
                                        <li>✓ Leaderboard ranking uses score and completion time.</li>
                                    </ul>
                                </div>

                                <button
                                    onClick={startQuiz}
                                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 font-black text-white shadow-lg transition hover:scale-[1.01]"
                                >
                                    Participate in Quiz
                                    <ArrowRight size={20} />
                                </button>

                                <p className="mt-3 text-center text-xs text-slate-400">
                                    Demo mode: this button starts a local preview, not a shared live event.
                                </p>
                            </div>

                            {/* Leaderboard Preview */}
                            <Leaderboard />
                        </div>
                    )}

                    {/* LIVE QUIZ */}
                    {phase === "quiz" && (
                        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
                            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                                    <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
                                        QUESTION {current + 1} / {quizQuestions.length}
                                    </span>

                                    <div className={`flex items-center gap-2 rounded-xl px-4 py-3 font-black ${remaining <= 30
                                        ? "bg-red-50 text-red-600"
                                        : "bg-blue-50 text-blue-600"
                                        }`}>
                                        <Clock size={19} />
                                        {formatTime(remaining)}
                                    </div>
                                </div>

                                <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                                        style={{
                                            width: `${((current + 1) / quizQuestions.length) * 100}%`,
                                        }}
                                    />
                                </div>

                                <p className="text-sm font-bold text-purple-600">
                                    COMPUTER KNOWLEDGE
                                </p>

                                <h2 className="mt-3 text-2xl font-black leading-relaxed text-slate-900 md:text-3xl">
                                    {quizQuestions[current].question}
                                </h2>

                                <div className="mt-8 space-y-3">
                                    {quizQuestions[current].options.map((option, index) => {
                                        const selected = answers[quizQuestions[current].id] === index;
                                        const correct = quizQuestions[current].answer === index;

                                        let style =
                                            "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50";

                                        if (showExplanation && correct) {
                                            style = "border-green-500 bg-green-50 text-green-800";
                                        } else if (showExplanation && selected && !correct) {
                                            style = "border-red-400 bg-red-50 text-red-800";
                                        } else if (selected) {
                                            style = "border-purple-500 bg-purple-50 text-purple-800";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                disabled={showExplanation}
                                                onClick={() => selectAnswer(index)}
                                                className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left font-semibold transition ${style}`}
                                            >
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-600">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span className="flex-1">{option}</span>
                                                {showExplanation && correct && (
                                                    <CheckCircle2 className="text-green-600" />
                                                )}
                                                {showExplanation && selected && !correct && (
                                                    <XCircle className="text-red-600" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {showExplanation && (
                                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                                        <p className="font-bold text-blue-800">Explanation</p>
                                        <p className="mt-2 text-sm leading-6 text-blue-700">
                                            {quizQuestions[current].explanation}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={nextQuestion}
                                        disabled={!showExplanation}
                                        className="flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {current === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="font-black text-slate-900">Your Progress</h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Answered {answered} of {quizQuestions.length}
                                </p>

                                <div className="mt-5 grid grid-cols-3 gap-3">
                                    {quizQuestions.map((q, index) => (
                                        <div
                                            key={q.id}
                                            className={`flex h-12 items-center justify-center rounded-xl font-bold ${current === index
                                                ? "bg-purple-600 text-white"
                                                : answers[q.id] !== undefined
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 rounded-xl bg-orange-50 p-4">
                                    <Clock className="text-orange-600" />
                                    <p className="mt-2 font-bold text-orange-800">
                                        Time Management
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-orange-700">
                                        Complete all questions before the timer reaches zero.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RESULTS */}
                    {phase === "result" && (
                        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
                            <div className="rounded-[26px] border border-slate-200 bg-white p-7 text-center shadow-sm md:p-10">
                                <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${passed
                                    ? "bg-gradient-to-br from-green-400 to-emerald-600"
                                    : "bg-gradient-to-br from-orange-400 to-pink-500"
                                    } text-white`}>
                                    {passed ? <Trophy size={48} /> : <Target size={48} />}
                                </div>

                                <h2 className="mt-6 text-3xl font-black text-slate-900">
                                    {passed ? "Congratulations!" : "Keep Practicing!"}
                                </h2>

                                <p className="mt-3 text-slate-500">
                                    {passed
                                        ? "You achieved the passing score in this quiz."
                                        : "You did not reach the passing score this time. Practice and try again."}
                                </p>

                                <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <ResultStat label="Your Score" value={`${percentage}%`} />
                                    <ResultStat label="Correct" value={`${score}/${quizQuestions.length}`} />
                                    <ResultStat label="Time Left" value={formatTime(remaining)} />
                                </div>

                                <div className={`rounded-xl p-5 ${passed ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800"
                                    }`}>
                                    <p className="font-bold">
                                        {passed
                                            ? "You are eligible for a certificate!"
                                            : `You need at least ${PASS_PERCENTAGE}% to qualify for the certificate.`}
                                    </p>
                                </div>

                                {passed && (
                                    <button
                                        onClick={() => setPhase("certificate")}
                                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 font-black text-white shadow-lg transition hover:scale-[1.01]"
                                    >
                                        <Award size={20} />
                                        View My Certificate
                                    </button>
                                )}

                                <button
                                    onClick={() => setPhase("lobby")}
                                    className="mt-4 text-sm font-bold text-purple-600 hover:underline"
                                >
                                    Back to Competition
                                </button>
                            </div>

                            <Leaderboard rows={leaderboard} />
                        </div>
                    )}

                    {/* CERTIFICATE */}
                    {phase === "certificate" && passed && (
                        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">
                                        Your Achievement Certificate
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Your competition completion preview.
                                    </p>
                                </div>

                                <button
                                    onClick={printCertificate}
                                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-700"
                                >
                                    <Download size={18} />
                                    Print / Save PDF
                                </button>
                            </div>

                            <div
                                id="certificate"
                                className="relative overflow-hidden border-[10px] border-double border-purple-300 bg-gradient-to-br from-white via-purple-50 to-orange-50 p-7 text-center md:p-14"
                            >
                                <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-purple-100/70 blur-2xl" />
                                <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-pink-100/70 blur-2xl" />

                                <div className="relative">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                                        <Trophy size={34} />
                                    </div>

                                    <h2 className="mt-5 text-2xl font-black tracking-widest text-purple-700 md:text-4xl">
                                        CODEQUEST
                                    </h2>

                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                                        Certificate of Achievement
                                    </p>

                                    <div className="mx-auto my-7 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

                                    <p className="text-sm text-slate-500">
                                        This certificate is proudly presented to
                                    </p>

                                    <h3 className="my-5 text-3xl font-black text-slate-900 md:text-5xl">
                                        {studentName}
                                    </h3>

                                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                                        For successfully participating in the CodeQuest Universal
                                        Quiz Competition and demonstrating knowledge of computer
                                        fundamentals, programming and technology.
                                    </p>

                                    <div className="mx-auto my-8 grid max-w-xl grid-cols-2 gap-5">
                                        <div>
                                            <p className="text-3xl font-black text-purple-700">{percentage}%</p>
                                            <p className="text-xs font-bold text-slate-500">FINAL SCORE</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-purple-700">{score}/5</p>
                                            <p className="text-xs font-bold text-slate-500">CORRECT ANSWERS</p>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-wrap items-end justify-between gap-5 text-left">
                                        <div>
                                            <p className="font-mono text-xs text-slate-500">
                                                CERTIFICATE ID
                                            </p>
                                            <p className="mt-1 font-bold text-slate-800">
                                                {certificateId}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <div className="mb-2 border-b border-slate-400 px-5 pb-2 font-serif text-lg italic text-purple-700">
                                                CodeQuest
                                            </div>
                                            <p className="text-xs font-bold text-slate-500">
                                                AUTHORIZED SIGNATURE
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-green-700">
                                        <ShieldCheck size={16} />
                                        Certificate verification ID: {certificateId}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-purple-50 p-4">
                                <div>
                                    <p className="font-bold text-purple-900">Certificate ID</p>
                                    <p className="text-sm text-purple-700">{certificateId}</p>
                                </div>

                                <button
                                    onClick={copyCertificateId}
                                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-purple-700 shadow-sm"
                                >
                                    <Copy size={16} />
                                    Copy ID
                                </button>
                            </div>
                        </div>
                    )}

                    <p className="mt-8 text-center text-xs text-slate-400">
                        CodeQuest Arena · Learn Together. Compete Together. Grow Together.
                    </p>
                </div>

                <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #certificate, #certificate * {
            visibility: visible !important;
          }
          #certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border-width: 8px;
          }
        }
      `}</style>
            </div>
        </SiteLayout>
    );
}

function Stat({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
            <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-lg font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function Info({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="rounded-lg bg-white p-3 text-purple-600 shadow-sm">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function ResultStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-purple-50 p-5">
            <p className="text-2xl font-black text-purple-700">{value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
        </div>
    );
}
