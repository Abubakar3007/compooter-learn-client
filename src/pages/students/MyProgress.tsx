import { useMemo, useState } from "react";
import { ChevronRight, BookOpen, Trophy, Dumbbell, Brain, Target, Star } from "lucide-react";
import { Link } from "react-router-dom";

type SortType = "most" | "least" | "az";

interface Course {
    id: string;
    title: string;
    emoji: string;
    color: string;
}

interface CourseProgress {
    course: Course;
    pct: number;
    done: number;
    total: number;
}

interface Stats {
    xp: number;
    lessons: number;
    exercises: number;
    quizzes: number;
    challenges: number;
    exams: number;
    courseProgress: CourseProgress[];
}

const defaultStats: Stats = {
    xp: 0,
    lessons: 0,
    exercises: 0,
    quizzes: 0,
    challenges: 0,
    exams: 0,
    courseProgress: [],
};

function getStats(): Stats {
    try {
        const saved = localStorage.getItem("codequest-stats");

        if (saved) {
            return { ...defaultStats, ...JSON.parse(saved) };
        }
    } catch (error) {
        console.error("Failed to load progress:", error);
    }

    return defaultStats;
}

const statItems = [
    { label: "Total XP", key: "xp" as const, icon: Star },
    { label: "Lessons", key: "lessons" as const, icon: BookOpen },
    { label: "Exercises", key: "exercises" as const, icon: Dumbbell },
    { label: "Quizzes", key: "quizzes" as const, icon: Brain },
    { label: "Challenges", key: "challenges" as const, icon: Target },
    { label: "Exams", key: "exams" as const, icon: Trophy },
];

export default function MyProgress() {
    const [sort, setSort] = useState<SortType>("most");

    const stats = useMemo(() => getStats(), []);

    const list = useMemo(() => {
        return [...stats.courseProgress].sort((a, b) => {
            if (sort === "az") {
                return a.course.title.localeCompare(b.course.title);
            }

            if (sort === "most") {
                return b.pct - a.pct;
            }

            return a.pct - b.pct;
        });
    }, [stats.courseProgress, sort]);

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            {/* Progress Summary */}
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
                <h1 className="text-2xl font-extrabold text-gray-900">
                    My Progress
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Track your progress across different courses.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
                    {statItems.map(({ label, key, icon: Icon }) => (
                        <div key={label}>
                            <div className="mb-2 flex items-center gap-2 text-gray-500">
                                <Icon size={16} />
                                <span className="text-xs">{label}</span>
                            </div>

                            <p className="text-xl font-extrabold text-gray-900">
                                {stats[key].toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sorting */}
            <div className="flex items-center justify-end gap-2 text-sm">
                <label htmlFor="progress-sort" className="font-semibold">
                    Sort by:
                </label>

                <select
                    id="progress-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortType)}
                    className="rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="most">Most progress</option>
                    <option value="least">Least progress</option>
                    <option value="az">A–Z</option>
                </select>
            </div>

            {/* Course Progress */}
            {list.length > 0 ? (
                <div className="space-y-3">
                    {list.map(({ course, pct, done, total }) => (
                        <Link
                            key={course.id}
                            to="/learn/$courseId"
                            params={{ courseId: course.id }}
                            className="block"
                        >
                            <div className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div
                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
                                    style={{ backgroundColor: course.color }}
                                >
                                    {course.emoji}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3 text-sm font-bold">
                                        <span className="truncate text-gray-900">
                                            {course.title}
                                        </span>

                                        <span className="shrink-0 text-gray-600">
                                            {pct}% · {done}/{total}
                                        </span>
                                    </div>

                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-green-500 transition-all"
                                            style={{
                                                width: `${Math.min(100, Math.max(0, pct))}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <ChevronRight
                                    size={20}
                                    className="shrink-0 text-gray-400"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed bg-white px-5 py-12 text-center">
                    <BookOpen size={40} className="mx-auto text-gray-400" />

                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                        No progress yet
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Start learning a course to see your progress here.
                    </p>
                </div>
            )}
        </div>
    );
}