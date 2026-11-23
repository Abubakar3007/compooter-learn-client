
import { useMemo, useState } from "react";
import {
    Trophy,
    Flame,
    Zap,
    Crown,
    Medal,
    TrendingUp,
    Users,
    ChevronDown,
    Star,
} from "lucide-react";

interface Student {
    id: number;
    name: string;
    avatar: string;
    xp: number;
    streak: number;
    rank: number;
    isCurrentUser?: boolean;
}

const students: Student[] = [
    { id: 1, name: "Rahul", avatar: "👦🏻", xp: 2140, streak: 36, rank: 1 },
    { id: 2, name: "Sakshi", avatar: "👧🏻", xp: 1900, streak: 28, rank: 2 },
    { id: 3, name: "Pallavi", avatar: "👩🏻", xp: 1810, streak: 27, rank: 3 },
    { id: 4, name: "Ananya", avatar: "👧🏼", xp: 1820, streak: 27, rank: 4 },
    { id: 5, name: "Gayathri", avatar: "👩🏻", xp: 1810, streak: 27, rank: 5 },
    { id: 6, name: "Ronika", avatar: "👧🏻", xp: 1780, streak: 26, rank: 6 },
    { id: 7, name: "Arjun", avatar: "👦🏽", xp: 1650, streak: 22, rank: 7 },
    { id: 8, name: "Aarav", avatar: "👦🏻", xp: 1540, streak: 18, rank: 8 },
    { id: 9, name: "Meera", avatar: "👩🏼", xp: 1430, streak: 15, rank: 9 },
    {
        id: 10,
        name: "You",
        avatar: "🧑🏻",
        xp: 1320,
        streak: 9,
        rank: 10,
        isCurrentUser: true,
    },
];

type Period = "Weekly" | "Monthly" | "All Time";

const podiumStyles = [
    {
        height: "h-36",
        color: "bg-gradient-to-b from-amber-400 to-orange-500",
        crown: "text-amber-500",
        rank: "2",
    },
    {
        height: "h-44",
        color: "bg-gradient-to-b from-orange-500 to-amber-500",
        crown: "text-yellow-500",
        rank: "1",
    },
    {
        height: "h-32",
        color: "bg-gradient-to-b from-yellow-400 to-amber-500",
        crown: "text-yellow-500",
        rank: "3",
    },
];

export default function Leaderboard() {
    const [period, setPeriod] = useState<Period>("Weekly");
    const [showAll, setShowAll] = useState(false);

    const rankedStudents = useMemo(() => {
        const multiplier =
            period === "Weekly" ? 1 : period === "Monthly" ? 1.7 : 2.4;

        return students
            .map((student) => ({
                ...student,
                xp: Math.round(student.xp * multiplier),
            }))
            .sort((a, b) => b.xp - a.xp)
            .map((student, index) => ({
                ...student,
                rank: index + 1,
            }));
    }, [period]);

    const topThree = [
        rankedStudents[1],
        rankedStudents[0],
        rankedStudents[2],
    ];

    const remainingStudents = rankedStudents.slice(3);
    const displayedStudents = showAll
        ? remainingStudents
        : remainingStudents.slice(0, 3);

    const currentStudent = rankedStudents.find(
        (student) => student.isCurrentUser
    );

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 pb-10">

            {/* HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                            <Trophy size={22} />
                        </div>
                        <span className="text-sm font-bold text-violet-600">
                            CODEQUEST COMMUNITY
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Leaderboard 🏆
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Compete with friends and become a learning champion!
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                    <Users size={17} />
                    {students.length} Learners
                </div>
            </div>

            {/* MAIN LEADERBOARD */}
            <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-lg md:p-7">

                {/* TOP DECORATION */}
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-100/70 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 top-32 h-48 w-48 rounded-full bg-violet-100/70 blur-3xl" />

                <div className="relative z-10">

                    {/* TITLE + FILTER */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900">
                                Top Learners
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                This week's top performers
                            </p>
                        </div>

                        <div className="relative">
                            <select
                                value={period}
                                onChange={(e) =>
                                    setPeriod(e.target.value as Period)
                                }
                                className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-500"
                            >
                                <option value="Weekly">This Week</option>
                                <option value="Monthly">This Month</option>
                                <option value="All Time">All Time</option>
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                        </div>
                    </div>

                    {/* PODIUM */}
                    <div className="mx-auto mt-10 flex max-w-xl items-end justify-center gap-2 sm:gap-5">

                        {topThree.map((student, index) => {
                            const style = podiumStyles[index];

                            return (
                                <div
                                    key={student.id}
                                    className="flex min-w-0 flex-1 flex-col items-center"
                                >
                                    {/* AVATAR */}
                                    <div className="relative mb-3">
                                        {index === 1 && (
                                            <Crown
                                                size={29}
                                                className="absolute -top-7 left-1/2 -translate-x-1/2 text-amber-500"
                                                fill="currentColor"
                                            />
                                        )}

                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] bg-white text-3xl shadow-md sm:h-16 sm:w-16 ${index === 1
                                                    ? "border-amber-400"
                                                    : index === 0
                                                        ? "border-slate-300"
                                                        : "border-orange-300"
                                                }`}
                                        >
                                            {student.avatar}
                                        </div>

                                        <span className="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-xs font-extrabold text-white">
                                            {student.rank}
                                        </span>
                                    </div>

                                    <p className="max-w-full truncate text-sm font-extrabold text-slate-900">
                                        {student.name}
                                    </p>

                                    <div className="mb-2 mt-1 flex items-center gap-1 text-xs font-bold text-amber-600">
                                        <Trophy size={12} fill="currentColor" />
                                        {student.xp.toLocaleString()} XP
                                    </div>

                                    {/* PODIUM BLOCK */}
                                    <div
                                        className={`${style.height} ${style.color} flex w-full flex-col items-center justify-center rounded-t-2xl px-1 pt-3 text-white shadow-lg`}
                                    >
                                        <span className="text-4xl font-black opacity-90">
                                            {student.rank}
                                        </span>

                                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold sm:text-xs">
                                            <Flame size={13} fill="currentColor" />
                                            {student.streak} Days
                                        </div>

                                        {index === 1 && (
                                            <span className="mt-2 rounded-full bg-white/25 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide">
                                                Champion
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RANKING LIST */}
                    <div className="mt-7 space-y-2">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="font-extrabold text-slate-800">
                                Other Rankings
                            </h3>
                            <span className="text-xs font-semibold text-slate-400">
                                XP & Streak
                            </span>
                        </div>

                        {displayedStudents.map((student) => (
                            <div
                                key={student.id}
                                className={`flex items-center gap-3 rounded-2xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md sm:gap-4 ${student.isCurrentUser
                                        ? "border-slate-800 bg-slate-900 text-white shadow-lg"
                                        : "border-slate-200 bg-white hover:border-violet-200"
                                    }`}
                            >
                                {/* RANK */}
                                <div
                                    className={`w-7 shrink-0 text-center text-sm font-extrabold ${student.isCurrentUser
                                            ? "text-white"
                                            : "text-slate-500"
                                        }`}
                                >
                                    {student.rank}
                                </div>

                                {/* AVATAR */}
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl ${student.isCurrentUser
                                            ? "bg-white/15"
                                            : "bg-violet-50"
                                        }`}
                                >
                                    {student.avatar}
                                </div>

                                {/* NAME */}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-extrabold">
                                        {student.name}
                                        {student.isCurrentUser && (
                                            <span className="ml-2 rounded-full bg-violet-500 px-2 py-0.5 text-[9px] font-bold text-white">
                                                YOU
                                            </span>
                                        )}
                                    </p>
                                    <p
                                        className={`mt-0.5 text-[10px] ${student.isCurrentUser
                                                ? "text-slate-300"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        Learning champion
                                    </p>
                                </div>

                                {/* STREAK */}
                                <div className="flex shrink-0 items-center gap-1 text-xs font-bold">
                                    <Flame
                                        size={15}
                                        className="text-orange-500"
                                        fill="currentColor"
                                    />
                                    <span>{student.streak}</span>
                                    <span className="hidden text-[10px] font-medium opacity-60 sm:inline">
                                        days
                                    </span>
                                </div>

                                {/* XP */}
                                <div className="flex shrink-0 items-center gap-1 text-xs font-extrabold">
                                    <Zap
                                        size={15}
                                        className="text-amber-400"
                                        fill="currentColor"
                                    />
                                    {student.xp.toLocaleString()}
                                    <span className="hidden opacity-60 sm:inline">XP</span>
                                </div>
                            </div>
                        ))}

                        {remainingStudents.length > 3 && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
                            >
                                {showAll ? "Show Less" : "View All Rankings"}
                                <ChevronDown
                                    size={17}
                                    className={`transition-transform ${showAll ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* YOUR RANK CARD */}
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 p-5 text-white shadow-lg md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
                            {currentStudent?.avatar}
                        </div>

                        <div>
                            <p className="text-sm font-medium text-white/75">
                                Your Current Position
                            </p>
                            <h2 className="mt-1 text-2xl font-extrabold">
                                Rank #{currentStudent?.rank}
                            </h2>
                            <p className="text-xs text-white/80">
                                Keep learning and climb higher!
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div>
                            <p className="text-2xl font-extrabold">
                                {currentStudent?.xp.toLocaleString()}
                            </p>
                            <p className="text-xs text-white/75">Total XP</p>
                        </div>

                        <div>
                            <p className="flex items-center gap-1 text-2xl font-extrabold">
                                <Flame size={20} className="text-yellow-300" />
                                {currentStudent?.streak}
                            </p>
                            <p className="text-xs text-white/75">Day streak</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/25">
                    <div
                        className="h-full rounded-full bg-yellow-300 transition-all"
                        style={{
                            width: `${Math.min(
                                100,
                                ((currentStudent?.xp ?? 0) /
                                    (rankedStudents[0]?.xp || 1)) *
                                100
                            )}%`,
                        }}
                    />
                </div>

                <p className="mt-2 text-xs text-white/80">
                    Keep earning XP to reach the top!
                </p>
            </section>

            {/* MOTIVATION CARD */}
            <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Star size={25} fill="currentColor" />
                </div>

                <div>
                    <h3 className="text-sm font-extrabold text-slate-800">
                        Every lesson takes you higher!
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Complete lessons, solve challenges and collect more XP.
                    </p>
                </div>

                <TrendingUp className="ml-auto shrink-0 text-amber-500" size={25} />
            </div>
        </div>
    );
}
