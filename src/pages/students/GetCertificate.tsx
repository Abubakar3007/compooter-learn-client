
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Award, Lock, Printer } from "lucide-react";
import { certCourses } from "@/data/practice";

interface Attempt {
    quizId: string;
    score: number;
    total: number;
}

interface IssuedCert {
    id: string;
    courseId: string;
    title: string;
    name: string;
    date: string;
    score: number;
}

interface Progress {
    name: string;
    xp: number;
}

function GetCertificate() {
    const [progress] = useState<Progress>(() => {
        try {
            const saved = localStorage.getItem("codequest-progress");
            return saved
                ? JSON.parse(saved) as Progress
                : { name: "Student", xp: 0 };
        } catch {
            return { name: "Student", xp: 0 };
        }
    });

    const [attempts] = useState<Attempt[]>(() => {
        try {
            return JSON.parse(
                localStorage.getItem("cq-attempts") || "[]"
            ) as Attempt[];
        } catch {
            return [];
        }
    });

    const [certs, setCerts] = useState<IssuedCert[]>(() => {
        try {
            return JSON.parse(
                localStorage.getItem("cq-certs") || "[]"
            ) as IssuedCert[];
        } catch {
            return [];
        }
    });

    const [name, setName] = useState("");
    const [view, setView] = useState<IssuedCert | null>(null);

    const bestPct = (id: string): number => {
        const courseAttempts = attempts.filter(
            (attempt) => attempt.quizId === id
        );

        if (!courseAttempts.length) return 0;

        return Math.max(
            ...courseAttempts.map((attempt) =>
                attempt.total > 0
                    ? Math.round((attempt.score / attempt.total) * 100)
                    : 0
            )
        );
    };

    const claimCertificate = (
        course: (typeof certCourses)[number]
    ): void => {
        const certificate: IssuedCert = {
            id: `CQ-${Date.now().toString(36).toUpperCase()}`,
            courseId: course.id,
            title: course.title,
            name: name.trim() || progress.name || "Student",
            date: new Date().toLocaleDateString(undefined, {
                dateStyle: "long",
            }),
            score: bestPct(course.id),
        };

        const updated = [
            certificate,
            ...certs.filter((cert) => cert.courseId !== course.id),
        ];

        setCerts(updated);
        localStorage.setItem("cq-certs", JSON.stringify(updated));

        setView(certificate);
        toast.success("Certificate issued! 🎉");
    };

    return (
        <div className="max-w-[996px] p-4">
            <Toaster position="top-right" />

            {/* Certificate Courses */}
            <div className="print:hidden">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold">
                        🎓 Get Certificate
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Reach the XP goal and pass the course quiz (60%+) to unlock a certificate.
                    </p>
                </div>

                {/* Student Name */}
                <div className="mb-5 rounded-2xl border bg-white p-5">
                    <label className="text-sm font-bold">
                        Name on certificate
                    </label>

                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={progress.name || "Enter your name"}
                        className="mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:border-purple-500"
                    />
                </div>

                {/* Course List */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {certCourses.map((course) => {
                        const pct = bestPct(course.id);
                        const xpOk = progress.xp >= course.needXp;
                        const quizOk = pct >= 60;
                        const eligible = xpOk && quizOk;

                        const issued = certs.find(
                            (cert) => cert.courseId === course.id
                        );

                        const xpProgress = course.needXp > 0
                            ? Math.min(
                                (progress.xp / course.needXp) * 100,
                                100
                            )
                            : 100;

                        return (
                            <div
                                key={course.id}
                                className="rounded-2xl border bg-white p-5 shadow-sm"
                            >
                                {/* Course Header */}
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-lg font-bold">
                                        {course.title}
                                    </h2>

                                    {eligible ? (
                                        <Award className="h-6 w-6 shrink-0 text-purple-600" />
                                    ) : (
                                        <Lock className="h-5 w-5 shrink-0 text-gray-400" />
                                    )}
                                </div>

                                {/* XP Progress */}
                                <div className="mt-4 text-xs font-bold">
                                    XP {Math.min(progress.xp, course.needXp)}/
                                    {course.needXp}
                                </div>

                                <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-green-500 transition-all"
                                        style={{ width: `${xpProgress}%` }}
                                    />
                                </div>

                                {/* Quiz Score */}
                                <div className="mt-3 text-sm font-semibold">
                                    Quiz best: {pct}%
                                    {quizOk ? (
                                        <span className="ml-1 text-green-600">✅</span>
                                    ) : (
                                        <span className="ml-1 text-gray-500">
                                            (need 60%)
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {issued ? (
                                        <button
                                            type="button"
                                            onClick={() => setView(issued)}
                                            className="rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700"
                                        >
                                            View certificate
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={!eligible}
                                            onClick={() => claimCertificate(course)}
                                            className="rounded-xl bg-purple-600 px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Claim certificate
                                        </button>
                                    )}

                                    {!quizOk && (
                                        <Link
                                            to="/quizzes/$quizId"
                                            params={{ quizId: course.id }}
                                            className="text-sm font-bold text-purple-600"
                                        >
                                            Take quiz →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Certificate Preview */}
            {view && (
                <div className="mt-8 print:mt-0">
                    <div className="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 p-2 shadow-lg print:rounded-none print:bg-none print:p-0 print:shadow-none">
                        <div className="rounded-[1.5rem] border-4 border-white bg-white p-6 text-center sm:p-10 print:rounded-none print:border-4 print:border-purple-700">
                            <div className="text-3xl font-black tracking-wide text-purple-700">
                                CODEQUEST
                            </div>

                            <div className="mt-6 text-sm font-bold uppercase tracking-widest text-gray-500">
                                Certificate of Completion
                            </div>

                            <p className="mt-6 text-gray-600">
                                This certifies that
                            </p>

                            <h2 className="mt-3 break-words text-3xl font-black text-purple-700 sm:text-4xl">
                                {view.name}
                            </h2>

                            <p className="mt-5 text-gray-600">
                                has successfully completed
                            </p>

                            <h3 className="mt-3 text-2xl font-extrabold">
                                {view.title}
                            </h3>

                            <p className="mt-3 text-sm text-gray-600">
                                with a quiz score of {view.score}%
                            </p>

                            <div className="mt-8 flex flex-wrap justify-between gap-3 border-t pt-4 text-xs text-gray-500">
                                <span>{view.date}</span>
                                <span>ID: {view.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="mt-6 text-center print:hidden">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-700"
                        >
                            <Printer className="h-4 w-4" />
                            Print / Save PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GetCertificate;
