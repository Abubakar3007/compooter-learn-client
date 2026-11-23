
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Code2,
    Clock,
    Trophy,
    Zap,
    Lightbulb,
    Play,
    RotateCcw,
    CheckCircle2,
    Terminal,
    FileCode2,
    ChevronDown,
    BookOpen,
    Target,
} from "lucide-react";

const starterCode: Record<string, string> = {
    javascript: `// Write a function to add two numbers

function addNumbers(a, b) {
  // Write your code here

}

// Test your function
console.log(addNumbers(10, 20));`,
    python: `# Write a function to add two numbers

def add_numbers(a, b):
    # Write your code here
    pass

# Test your function
print(add_numbers(10, 20))`,
    java: `public class Main {
    public static int addNumbers(int a, int b) {
        // Write your code here

        return 0;
    }

    public static void main(String[] args) {
        System.out.println(addNumbers(10, 20));
    }
}`,
};

const languageLabels: Record<string, string> = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
};

export default function CodingChallenge() {
    const navigate = useNavigate();

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(starterCode.javascript);
    const [time, setTime] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [output, setOutput] = useState("");
    const [runStatus, setRunStatus] = useState<"idle" | "success" | "error">("idle");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (completed) return;

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [completed]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        setCode(starterCode[value]);
        setOutput("");
        setRunStatus("idle");
    };

    // Demo-only output. This does not execute the submitted code.
    const handleRunCode = () => {
        setOutput("Code execution is not connected yet.\nConnect your backend code runner to execute this solution.");
        setRunStatus("idle");
    };

    const handleReset = () => {
        setCode(starterCode[language]);
        setOutput("");
        setRunStatus("idle");
        setCompleted(false);
    };

    const handleSubmit = () => {
        setOutput("Submission service is not connected yet. Connect your backend judge to verify test cases.");
        setRunStatus("idle");
    };

    const handleCompleteDemo = () => {
        setCompleted(true);
        setOutput("Demo completed! Backend verification is not enabled.");
    };

    if (completed) {
        return (
            <div className="min-h-screen bg-[#fffaf1] p-5 md:p-8">
                <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-[30px] border border-purple-100 bg-white p-8 text-center shadow-xl md:p-12">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                            <Trophy size={48} />
                        </div>

                        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-purple-600">
                            Coding Challenge
                        </p>

                        <h1 className="mt-2 text-3xl font-black text-slate-800">
                            Demo Completed!
                        </h1>

                        <p className="mt-3 text-slate-500">
                            This is a UI preview. Your code has not been evaluated.
                        </p>

                        <div className="my-8 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-purple-50 p-5">
                                <Clock className="mx-auto text-purple-600" />
                                <h2 className="mt-2 text-3xl font-black text-purple-700">
                                    {formatTime(time)}
                                </h2>
                                <p className="text-sm text-slate-500">Time Taken</p>
                            </div>

                            <div className="rounded-2xl bg-yellow-50 p-5">
                                <Zap className="mx-auto text-yellow-600" />
                                <h2 className="mt-2 text-3xl font-black text-yellow-700">
                                    +30
                                </h2>
                                <p className="text-sm text-slate-500">Demo XP</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/student/dashboard")}
                            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffaf1] p-4 md:p-7">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => navigate("/student/dashboard")}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-600 shadow-sm hover:bg-purple-50"
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </button>

                    <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 font-bold text-blue-600">
                        <Code2 size={20} />
                        Coding Challenge
                    </div>
                </div>

                {/* Hero */}
                <div className="mb-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-7 text-white shadow-xl md:p-9">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                        <div>
                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                                LEVEL 1 · PROGRAMMING BASICS
                            </span>

                            <h1 className="mt-5 text-3xl font-black md:text-5xl">
                                Coding Challenge
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-base">
                                Think logically, write code and solve real programming
                                problems. Practice every day to become a coding expert!
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                                <span className="rounded-full bg-white/20 px-4 py-2">
                                    Easy Level
                                </span>
                                <span className="rounded-full bg-white/20 px-4 py-2">
                                    +30 XP
                                </span>
                                <span className="rounded-full bg-white/20 px-4 py-2">
                                    1 Problem
                                </span>
                            </div>
                        </div>

                        <div className="flex h-28 w-28 items-center justify-center self-center rounded-3xl bg-white/20 md:h-36 md:w-36">
                            <Code2 size={85} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                        icon={<Target />}
                        title="Difficulty"
                        value="Easy"
                        color="bg-green-100 text-green-600"
                    />
                    <StatCard
                        icon={<Clock />}
                        title="Time Taken"
                        value={formatTime(time)}
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        icon={<Trophy />}
                        title="Reward"
                        value="30 XP"
                        color="bg-yellow-100 text-yellow-600"
                    />
                    <StatCard
                        icon={<CheckCircle2 />}
                        title="Test Cases"
                        value="3"
                        color="bg-purple-100 text-purple-600"
                    />
                </div>

                {/* Main Grid */}
                <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">

                    {/* Problem Panel */}
                    <div className="space-y-5">

                        <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                                    EASY
                                </span>

                                <span className="text-sm font-bold text-purple-600">
                                    Problem #001
                                </span>
                            </div>

                            <h2 className="text-2xl font-black text-slate-800">
                                Add Two Numbers
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                Write a function that takes two numbers as input and returns
                                their sum.
                            </p>

                            <div className="mt-6">
                                <h3 className="mb-3 font-black text-slate-800">
                                    Example 1
                                </h3>

                                <div className="rounded-xl bg-slate-900 p-4 font-mono text-sm">
                                    <p className="text-slate-400">Input</p>
                                    <p className="mt-1 text-green-400">a = 10, b = 20</p>
                                    <p className="mt-4 text-slate-400">Output</p>
                                    <p className="mt-1 text-yellow-300">30</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h3 className="mb-3 font-black text-slate-800">
                                    Example 2
                                </h3>

                                <div className="rounded-xl bg-slate-900 p-4 font-mono text-sm">
                                    <p className="text-slate-400">Input</p>
                                    <p className="mt-1 text-green-400">a = 5, b = 7</p>
                                    <p className="mt-4 text-slate-400">Output</p>
                                    <p className="mt-1 text-yellow-300">12</p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <h3 className="flex items-center gap-2 font-bold text-blue-700">
                                    <BookOpen size={18} />
                                    Your Task
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-blue-800">
                                    Create a function named <strong>addNumbers</strong> that
                                    accepts two parameters and returns their sum. Do not print
                                    the answer inside the function.
                                </p>
                            </div>

                            {showHint && (
                                <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                                    <p className="flex items-center gap-2 font-bold text-yellow-800">
                                        <Lightbulb size={18} />
                                        Hint
                                    </p>
                                    <p className="mt-2 text-sm text-yellow-800">
                                        Use the addition operator (+) to combine the two
                                        parameters and return the result.
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => setShowHint((prev) => !prev)}
                                className="mt-5 flex items-center gap-2 font-bold text-yellow-600 hover:text-yellow-700"
                            >
                                <Lightbulb size={18} />
                                {showHint ? "Hide Hint" : "Show Hint"}
                            </button>
                        </div>

                        {/* Test Cases */}
                        <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-5 flex items-center gap-2 font-black text-slate-800">
                                <Target className="text-purple-600" />
                                Sample Test Cases
                            </h3>

                            {[
                                ["10, 20", "30"],
                                ["5, 7", "12"],
                                ["-5, 5", "0"],
                            ].map(([input, result], index) => (
                                <div
                                    key={index}
                                    className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 p-4 last:mb-0"
                                >
                                    <div>
                                        <p className="text-xs font-bold text-slate-400">
                                            TEST CASE {index + 1}
                                        </p>
                                        <p className="mt-1 font-mono font-bold text-slate-700">
                                            Input: {input}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400">
                                            EXPECTED
                                        </p>
                                        <p className="mt-1 font-mono font-black text-green-600">
                                            {result}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editor Panel */}
                    <div className="overflow-hidden rounded-[25px] border border-slate-700 bg-[#151923] shadow-xl">

                        {/* Editor Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-[#202633] p-4">
                            <div className="flex items-center gap-2 text-white">
                                <FileCode2 size={20} className="text-blue-400" />
                                <span className="font-bold">Code Editor</span>
                            </div>

                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className="appearance-none rounded-lg border border-slate-600 bg-[#151923] py-2 pl-3 pr-9 text-sm font-semibold text-white outline-none focus:border-purple-400"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                                <ChevronDown
                                    size={15}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="relative p-3 md:p-5">
                            <div className="mb-3 flex items-center justify-between px-2">
                                <span className="text-xs font-semibold text-slate-400">
                                    main.{language === "javascript" ? "js" : language === "python" ? "py" : "java"}
                                </span>

                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white"
                                >
                                    <RotateCcw size={13} />
                                    Reset
                                </button>
                            </div>

                            <textarea
                                spellCheck={false}
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    setOutput("");
                                    setRunStatus("idle");
                                }}
                                className="min-h-[400px] w-full resize-y rounded-xl border border-slate-700 bg-[#0e131c] p-5 font-mono text-sm leading-7 text-green-300 outline-none transition focus:border-purple-500"
                                placeholder="Write your code here..."
                            />

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-xs text-slate-500">
                                    {languageLabels[language]} · Editable
                                </p>

                                <button
                                    onClick={handleRunCode}
                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
                                >
                                    <Play size={17} />
                                    Run Code
                                </button>
                            </div>
                        </div>

                        {/* Console */}
                        <div className="border-t border-slate-700 bg-[#202633] p-5">
                            <div className="mb-4 flex items-center gap-2 text-white">
                                <Terminal size={18} className="text-green-400" />
                                <span className="font-bold">Output Console</span>
                            </div>

                            <div className="min-h-[100px] rounded-xl bg-[#0e131c] p-4 font-mono text-sm">
                                {output ? (
                                    <pre className="whitespace-pre-wrap text-yellow-300">
                                        {output}
                                    </pre>
                                ) : (
                                    <p className="text-slate-500">
                                        Click Run Code to execute your program...
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 flex flex-wrap justify-end gap-3">
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105"
                                >
                                    Submit Solution
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    onClick={handleCompleteDemo}
                                    className="rounded-xl border border-slate-600 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                                >
                                    Preview Completion
                                </button>
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
            <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
            <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-500">{title}</p>
                <p className="text-xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}
