import { Link } from "react-router-dom";
import { useState } from "react";
import { Bar, FunCard, GradientButton, PageTitle } from "@/components/ui-fun";
import { assessmentQuestions, fieldInfo } from "@/data/content";

export default function SkillAssessment() {
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const done = i >= assessmentQuestions.length;
  const scores = Object.entries(picks.reduce<Record<string, number>>((a, f) => ({ ...a, [f]: (a[f] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle emoji="🎯" title="Career Discovery Quiz" subtitle="No right or wrong answers — just you!" />
      {done ? (
        <FunCard>
          <h2 className="text-center text-3xl">Your top matches 🎉</h2>
          <div className="mt-6 space-y-4">
            {scores.slice(0, 3).map(([f, n], k) => (
              <div key={f}><div className="flex justify-between font-display text-lg font-extrabold"><span>{k + 1}. {fieldInfo[f].emoji} {fieldInfo[f].title}</span><span>{Math.round((n / picks.length) * 100)}%</span></div><Bar value={(n / picks.length) * 100} className="mt-1" /></div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3"><Link to="/student/career-explorer" className="rounded-2xl bg-gradient-hero px-5 py-3 font-display font-extrabold text-on-fun">Explore these careers</Link><GradientButton className="bg-none bg-secondary text-secondary-foreground shadow-none" onClick={() => { setI(0); setPicks([]); }}>Retake</GradientButton></div>
        </FunCard>
      ) : (
        <FunCard>
          <Bar value={(i / assessmentQuestions.length) * 100} />
          <h2 className="mt-5 text-2xl">{assessmentQuestions[i].q}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {assessmentQuestions[i].options.map((o) => <button key={o.label} onClick={() => { setPicks([...picks, o.field]); setI(i + 1); }} className="rounded-2xl border-2 p-4 text-left font-semibold transition hover:border-primary hover:bg-secondary">{o.label}</button>)}
          </div>
        </FunCard>
      )}
    </div>
  );
}
