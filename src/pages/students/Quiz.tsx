import { useState } from "react";
import { Bar, FunCard, GradientButton, PageTitle } from "@/components/ui-fun";
import { quizQuestions } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const { addXp } = useProgress();
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= quizQuestions.length;
  const q = quizQuestions[i];
  const next = () => { const s = score + (pick === q.answer ? 1 : 0); setScore(s); setPick(null); setI(i + 1); if (i + 1 === quizQuestions.length) addXp(s * 20, `quiz-${new Date().toDateString()}`); };
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle emoji="🏆" title="Daily Quiz" subtitle="6 questions · 20 XP each" />
      {done ? (
        <FunCard className="text-center"><div className="text-6xl">{score >= 5 ? "🥇" : score >= 3 ? "🥈" : "💪"}</div><h2 className="mt-3 text-3xl">You scored {score}/{quizQuestions.length}</h2><p className="text-muted-foreground">+{score * 20} XP earned</p><GradientButton className="mt-5" onClick={() => { setI(0); setScore(0); }}>Play again</GradientButton></FunCard>
      ) : (
        <FunCard>
          <div className="mb-2 text-sm font-bold text-muted-foreground">Question {i + 1} of {quizQuestions.length}</div>
          <Bar value={(i / quizQuestions.length) * 100} />
          <h2 className="mt-5 text-2xl">{q.q}</h2>
          <div className="mt-4 grid gap-3">
            {q.options.map((o, k) => (
              <button key={o} disabled={pick !== null} onClick={() => setPick(k)} className={cn("rounded-2xl border-2 p-4 text-left font-semibold transition", pick !== null && k === q.answer && "border-fun-green bg-fun-green/15", pick === k && k !== q.answer && "border-destructive bg-destructive/10")}>{o}</button>
            ))}
          </div>
          {pick !== null && <div className="mt-4 flex items-center justify-between"><span className="font-bold">{pick === q.answer ? "🎉 Correct!" : "😅 Oops!"}</span><GradientButton onClick={next}>Next</GradientButton></div>}
        </FunCard>
      )}
    </div>
  );
}
