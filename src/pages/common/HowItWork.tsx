import { Link } from "react-router-dom";
import { Hero, SiteLayout } from "@/components/site";
import { EmojiTile } from "@/components/ui-fun";
import { steps } from "@/data/content";

export default function HowItWorks() {
  return (
    <SiteLayout>
      <Hero emoji="🗺️" title="Your Learning Adventure in 4 Steps" subtitle="From first click to first project — every student follows a journey made just for them." />
      <div className="mx-auto max-w-3xl px-4 py-14">
        <ol className="relative border-l-4 border-dashed border-primary/30 pl-10">
          {steps.map((s) => (
            <li key={s.n} className="mb-12 animate-pop">
              <span className="absolute -left-7"><EmojiTile emoji={s.e} color={s.c} /></span>
              <div className="font-display text-sm font-black text-primary">STEP {s.n}</div>
              <h2 className="text-2xl">{s.t}</h2>
              <p className="mt-1 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="text-center"><Link to="/register" className="rounded-2xl bg-gradient-hero px-6 py-3 font-display font-extrabold text-on-fun shadow-pop">Start Step 1</Link></div>
      </div>
    </SiteLayout>
  );
}
