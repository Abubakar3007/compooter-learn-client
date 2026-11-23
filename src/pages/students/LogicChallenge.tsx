
import { useState } from "react";
import {
    Trophy,
    Zap,
    Flame,
    Clock,
    Lightbulb,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Target,
    Brain,
    Star,
    Award,
    MoveRight,
} from "lucide-react";
import Leaderboard from "@/components/Leaderboard";
import { Link } from "react-router-dom";
import OtherChallenge from "@/components/OtherChallenge";

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
    hint: string;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Power Unit",
            "Control Print Unit",
        ],
        answer: "Central Processing Unit",
        hint: "It is called the brain of the computer.",
        explanation:
            "CPU stands for Central Processing Unit. It processes instructions and performs calculations.",
    },
    {
        id: 2,
        question: "Which device is used to enter text into a computer?",
        options: ["Monitor", "Keyboard", "Speaker", "Printer"],
        answer: "Keyboard",
        hint: "You use it to type letters and numbers.",
        explanation:
            "A keyboard is an input device used to enter text, numbers and commands.",
    },
    {
        id: 3,
        question: "Which of these is an output device?",
        options: ["Mouse", "Keyboard", "Monitor", "Scanner"],
        answer: "Monitor",
        hint: "It displays pictures, videos and text.",
        explanation:
            "A monitor is an output device that displays information from a computer.",
    },
    {
        id: 4,
        question: "Which part of a computer is used for temporary memory?",
        options: ["ROM", "RAM", "Hard Disk", "DVD"],
        answer: "RAM",
        hint: "Its full form is Random Access Memory.",
        explanation:
            "RAM temporarily stores data and programs that the computer is currently using.",
    },
    {
        id: 5,
        question: "Which language is commonly used to create web pages?",
        options: ["HTML", "SQL", "C", "Python"],
        answer: "HTML",
        hint: "It stands for HyperText Markup Language.",
        explanation:
            "HTML is the standard markup language used to structure web pages.",
    },
    {
        id: 6,
        question: "What does WWW stand for?",
        options: [
            "World Wide Web",
            "World Web Window",
            "Wide World Website",
            "Web World Work",
        ],
        answer: "World Wide Web",
        hint: "It is the system of connected web pages on the internet.",
        explanation:
            "WWW stands for World Wide Web, a collection of interconnected web pages.",
    },
];

const XP_PER_QUESTION = 20;

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [finished, setFinished] = useState(false);

    const question = questions[currentQuestion];
    const totalQuestions = questions.length;

    const progress = finished
        ? 100
        : Math.round(
            ((currentQuestion + (submitted ? 1 : 0)) /
                totalQuestions) *
            100
        );

    const isCorrect = selectedAnswer === question.answer;

    const earnedXP = score * XP_PER_QUESTION;

    const handleSubmit = () => {
        if (!selectedAnswer || submitted) return;

        setSubmitted(true);

        if (selectedAnswer === question.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion === totalQuestions - 1) {
            setFinished(true);
            return;
        }

        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setSubmitted(false);
        setShowHint(false);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setSubmitted(false);
        setScore(0);
        setShowHint(false);
        setFinished(false);
    };

    const getOptionStyle = (option: string) => {
        if (!submitted) {
            return selectedAnswer === option
                ? "border-violet-500 bg-violet-50 text-violet-800 ring-2 ring-violet-100"
                : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50";
        }

        if (option === question.answer) {
            return "border-green-500 bg-green-50 text-green-800";
        }

        if (option === selectedAnswer) {
            return "border-red-400 bg-red-50 text-red-700";
        }

        return "border-slate-200 bg-white opacity-60";
    };

    // FINAL RESULT SCREEN
    if (finished) {
        const percentage = Math.round(
            (score / totalQuestions) * 100
        );

        return (
            <div className="flex gap-10 w-full">
                <div>
                    <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl">
                        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 px-6 py-12 text-center text-white">
                            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
                                <Trophy size={54} />
                            </div>

                            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                                Quiz Completed
                            </p>

                            <h1 className="mt-2 text-4xl font-extrabold">
                                Amazing Work! 🎉
                            </h1>

                            <p className="mt-3 text-white/85">
                                You have completed today's Daily Quiz.
                            </p>
                        </div>

                        <div className="p-6 md:p-10">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-violet-50 p-5 text-center">
                                    <Target className="mx-auto text-violet-600" size={30} />
                                    <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                                        {percentage}%
                                    </h3>
                                    <p className="text-sm text-slate-500">Accuracy</p>
                                </div>

                                <div className="rounded-2xl bg-green-50 p-5 text-center">
                                    <CheckCircle2 className="mx-auto text-green-600" size={30} />
                                    <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                                        {score}/{totalQuestions}
                                    </h3>
                                    <p className="text-sm text-slate-500">Correct answers</p>
                                </div>

                                <div className="col-span-2 rounded-2xl bg-amber-50 p-5 text-center sm:col-span-1">
                                    <Zap className="mx-auto text-amber-500" size={30} />
                                    <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                                        {earnedXP}
                                    </h3>
                                    <p className="text-sm text-slate-500">XP Earned</p>
                                </div>
                            </div>

                            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-center">
                                <Award className="mx-auto text-amber-500" size={36} />

                                <h3 className="mt-2 text-xl font-bold text-slate-900">
                                    {percentage >= 80
                                        ? "Logic Master! 🏆"
                                        : percentage >= 50
                                            ? "Great Effort! 🌟"
                                            : "Keep Practicing! 💪"}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {percentage >= 80
                                        ? "Excellent! You have a strong understanding of these concepts."
                                        : percentage >= 50
                                            ? "Good job! Keep learning and improve your score."
                                            : "Every attempt makes you better. Try again!"}
                                </p>
                            </div>

                            <button
                                onClick={handleRestart}
                                className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <RotateCcw size={19} />
                                Play Again
                            </button>
                        </div>
                    </div>

                    {/* other challenges */}
                    <OtherChallenge />
                </div>

                <div className="">
                    <Leaderboard />
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-10 w-full">
            <div className="space-y-7 py-5 w-full">

                {/* HERO SECTION */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl md:p-9">

                    <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-pink-300/20 blur-2xl" />

                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                                ✨ Daily Challenge
                            </span>

                            <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                <Zap size={17} className="text-yellow-300" />
                                <span className="text-sm font-bold">
                                    {totalQuestions * XP_PER_QUESTION} XP Available
                                </span>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-col items-center justify-between gap-5 sm:flex-row">
                            <div>
                                <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
                                    Test Your Brain!
                                    <br />
                                    <span className="text-yellow-300">
                                        Become a Champion.
                                    </span>
                                </h1>

                                <p className="mt-3 max-w-lg text-sm leading-6 text-white/85 md:text-base">
                                    Challenge yourself with fun questions, improve your knowledge
                                    and earn exciting rewards.
                                </p>
                            </div>

                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-inner md:h-24 md:w-24">
                                <Brain size={50} className="text-white" />
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-3">
                            <div className="rounded-2xl border border-white/15 bg-white/15 p-3 text-center">
                                <Clock className="mx-auto mb-2 text-yellow-300" size={22} />
                                <h3 className="text-xl font-extrabold">
                                    06
                                </h3>
                                <p className="text-xs text-white/75">Questions</p>
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/15 p-3 text-center">
                                <Zap className="mx-auto mb-2 text-yellow-300" size={22} />
                                <h3 className="text-xl font-extrabold">
                                    20 XP
                                </h3>
                                <p className="text-xs text-white/75">Per question</p>
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/15 p-3 text-center">
                                <Flame className="mx-auto mb-2 text-yellow-300" size={22} />
                                <h3 className="text-xl font-extrabold">
                                    Daily
                                </h3>
                                <p className="text-xs text-white/75">New challenge</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* QUIZ PROGRESS */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Your Quiz Progress
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Keep going, you're doing great!
                            </p>
                        </div>

                        <span className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                            {currentQuestion + 1} / {totalQuestions}
                        </span>
                    </div>

                    <div className="mt-5 flex gap-2">
                        {questions.map((item, index) => (
                            <div
                                key={item.id}
                                className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${index < currentQuestion
                                    ? "bg-green-500"
                                    : index === currentQuestion
                                        ? "bg-violet-600"
                                        : "bg-slate-100"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                        <span>Start</span>
                        <span>{progress}% completed</span>
                        <span>Finish</span>
                    </div>
                </section>

                {/* QUESTION CARD */}
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">

                    <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 md:px-8">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700">
                                    QUESTION {currentQuestion + 1}
                                </span>

                                <span className="text-xs font-medium text-slate-500">
                                    General Knowledge
                                </span>
                            </div>

                            <span className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                                <Star size={17} fill="currentColor" />
                                +{XP_PER_QUESTION} XP
                            </span>
                        </div>
                    </div>

                    <div className="p-5 md:p-8">
                        <div className="mb-7">
                            <p className="mb-3 text-sm font-medium text-slate-400">
                                Choose the correct answer
                            </p>

                            <h2 className="text-2xl font-extrabold leading-snug text-slate-900 md:text-3xl">
                                {question.question}
                            </h2>
                        </div>

                        {/* OPTIONS */}
                        <div className="space-y-3">
                            {question.options.map((option, index) => {
                                const selected = selectedAnswer === option;
                                const correct = question.answer === option;

                                return (
                                    <button
                                        key={option}
                                        disabled={submitted}
                                        onClick={() => setSelectedAnswer(option)}
                                        className={`group flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${getOptionStyle(option)} ${!submitted
                                            ? "cursor-pointer hover:-translate-y-0.5"
                                            : "cursor-default"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition ${selected
                                                ? "bg-violet-600 text-white"
                                                : submitted && correct
                                                    ? "bg-green-500 text-white"
                                                    : submitted && selected
                                                        ? "bg-red-500 text-white"
                                                        : "bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-700"
                                                }`}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        <span className="flex-1 text-sm font-semibold md:text-base">
                                            {option}
                                        </span>

                                        {submitted && correct && (
                                            <CheckCircle2 className="shrink-0 text-green-600" size={23} />
                                        )}

                                        {submitted && selected && !correct && (
                                            <XCircle className="shrink-0 text-red-500" size={23} />
                                        )}

                                        {!submitted && selected && (
                                            <CheckCircle2 className="shrink-0 text-violet-600" size={23} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* HINT */}
                        {!submitted && (
                            <div className="mt-5">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="flex items-center cursor-pointer gap-2 text-sm font-bold text-amber-600 transition hover:text-amber-700"
                                >
                                    <Lightbulb size={19} />
                                    {showHint ? "Hide Hint" : "Need a Hint?"}
                                </button>

                                {showHint && (
                                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                                        <strong>💡 Hint:</strong> {question.hint}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ANSWER FEEDBACK */}
                        {submitted && (
                            <div
                                className={`mt-6 rounded-2xl border p-4 ${isCorrect
                                    ? "border-green-200 bg-green-50"
                                    : "border-red-200 bg-red-50"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isCorrect ? (
                                        <CheckCircle2 className="text-green-600" size={23} />
                                    ) : (
                                        <XCircle className="text-red-600" size={23} />
                                    )}

                                    <h3
                                        className={`font-extrabold ${isCorrect ? "text-green-700" : "text-red-700"
                                            }`}
                                    >
                                        {isCorrect ? "Excellent! Correct Answer 🎉" : "Not quite! Keep learning."}
                                    </h3>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {question.explanation}
                                </p>

                                {isCorrect && (
                                    <p className="mt-3 font-bold text-green-700">
                                        +{XP_PER_QUESTION} XP earned! ⚡
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ACTIONS */}
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                onClick={() => {
                                    setSelectedAnswer(null);
                                    setShowHint(false);
                                }}
                                disabled={submitted || !selectedAnswer}
                                className="flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <RotateCcw size={16} />
                                Reset Answer
                            </button>

                            {!submitted ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 cursor-pointer to-purple-600 px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Submit Answer
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 cursor-pointer to-pink-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                                >
                                    {currentQuestion === totalQuestions - 1
                                        ? "View Results"
                                        : "Next Question"}
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Other challenge */}
                <OtherChallenge />

                {/* FOOTER INFO */}
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <Brain size={22} />
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-slate-800">
                                Keep your brain active!
                            </h4>
                            <p className="text-xs text-slate-500">
                                Every question is a new learning opportunity.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-violet-600">
                        <Flame size={17} />
                        Keep your learning streak alive
                    </div>
                </div>

            </div>
            {/* dashboard of logic */}
            <div className="">
                <Leaderboard />
            </div>
        </div>
    );
}
