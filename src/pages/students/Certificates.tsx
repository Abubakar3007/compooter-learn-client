import { useState } from "react";
import { Printer } from "lucide-react";
import { GradientButton, PageTitle, Logo } from "@/components/ui-fun";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const certs = [{ t: "Computer Basics", d: "Sep 18, 2026" }, { t: "Binary Numbers", d: "Oct 2, 2026" }];

export default function Certificates() {
  const { progress } = useProgress();
  const [sel, setSel] = useState(0);
  return (
    <div>
      <PageTitle emoji="📜" title="Certificates" subtitle="You earned these!" />
      <div className="mb-5 flex gap-2 print:hidden">{certs.map((c, i) => <button key={c.t} onClick={() => setSel(i)} className={cn("rounded-full border px-4 py-1.5 text-sm font-bold", sel === i && "bg-gradient-hero text-on-fun")}>{c.t}</button>)}</div>
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-gradient-hero p-2 shadow-pop">
        <div className="rounded-[1.6rem] bg-card p-10 text-center">
          <div className="flex justify-center"><Logo /></div>
          <div className="mt-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">Certificate of Completion</div>
          <p className="mt-6">This certifies that</p>
          <div className="mt-2 font-display text-4xl font-black text-gradient">{progress.name}</div>
          <p className="mt-4">has successfully completed</p>
          <div className="mt-2 font-display text-2xl font-extrabold">{certs[sel].t}</div>
          <p className="mt-6 text-sm text-muted-foreground">{certs[sel].d} · 🏅</p>
        </div>
      </div>
      <div className="mt-6 text-center print:hidden"><GradientButton onClick={() => window.print()}><Printer className="h-4 w-4" /> Print / Save PDF</GradientButton></div>
    </div>
  );
}
