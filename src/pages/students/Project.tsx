import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Bar, FunCard, GradientButton } from "@/components/ui-fun";
import { projects } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const p = projects.find((p) => p.id === id);
  if (!p) return <div className="p-10 text-center text-xl">🙈 Project not found. <Link to="/student/projects" className="text-primary">Back</Link></div>;
  const { addXp } = useProgress();
  const [done, setDone] = useState<number[]>([]);
  const pct = (done.length / p.steps.length) * 100;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-[2rem] bg-gradient-hero p-8 text-on-fun shadow-pop"><div className="text-6xl">{p.emoji}</div><h1 className="mt-2 text-4xl">{p.title}</h1><p className="opacity-90">{p.desc}</p><div className="mt-2 text-sm font-bold">{p.difficulty} · {p.path} · ⭐ {p.xp} XP</div></div>
      <FunCard>
        <div className="mb-3 flex justify-between font-bold"><span>Build steps</span><span>{Math.round(pct)}%</span></div>
        <Bar value={pct} />
        <ol className="mt-4 space-y-2">
          {p.steps.map((s, i) => (
            <li key={s}><button onClick={() => setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i])} className={cn("flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left font-semibold", done.includes(i) && "border-fun-green bg-fun-green/10")}>
              <span className={cn("grid h-7 w-7 place-items-center rounded-full", done.includes(i) ? "bg-fun-green text-on-fun" : "bg-muted")}>{done.includes(i) ? <Check className="h-4 w-4" /> : i + 1}</span>{s}
            </button></li>
          ))}
        </ol>
      </FunCard>
      <div className="flex gap-3">
        <GradientButton disabled={pct < 100} onClick={() => { addXp(p.xp, `project-${p.id}`); toast.success(`Project complete! +${p.xp} XP 🏆`); }}>Submit project</GradientButton>
        <Link to="/code" className="rounded-2xl border-2 px-5 py-3 font-display font-extrabold">Open Playground</Link>
      </div>
    </div>
  );
}
