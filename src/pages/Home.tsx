import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/site";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import { careers, courses, steps, type Fun } from "@/data/content";

const pillars: { e: string; t: string; d: string; c: Fun }[] = [
  { e: "🧠", t: "Learn", d: "Build strong computer and programming fundamentals.", c: "blue" },
  { e: "🎮", t: "Play", d: "Learn through games, challenges and interactive activities.", c: "pink" },
  { e: "🚀", t: "Build", d: "Create real projects instead of only watching videos.", c: "orange" },
  { e: "🎯", t: "Discover", d: "Explore technology careers and find areas of interest.", c: "green" },
];

export default function Home() {
  return (
    <SiteLayout>
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-pop">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground"><Sparkles className="h-4 w-4" /> For Class 5 – 12</span>
          <h1 className="mt-5 text-5xl leading-tight md:text-6xl">Turn Curiosity Into <span className="text-gradient">Skills.</span></h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">An interactive learning platform where students learn computers, coding, technology and discover the career paths they love.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-6 py-3.5 font-display text-lg font-extrabold text-on-fun shadow-pop transition hover:scale-105">Start Learning Free <ArrowRight className="h-5 w-5" /></Link>
            <Link to="/paths" className="rounded-2xl border-2 bg-card px-6 py-3.5 font-display text-lg font-extrabold transition hover:bg-secondary">Explore Learning Paths</Link>
          </div>
          <div className="mt-8 flex gap-6 text-sm font-semibold text-muted-foreground">
            <span>⭐ 50,000+ students</span><span>🏆 200+ lessons</span><span>🛡️ Kid-safe</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-6 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
          <img src={heroImg} alt="Happy student coding on a laptop with a friendly robot" width={1200} height={1008} className="relative rounded-[2rem]" />
          <div className="glass absolute -left-2 top-8 animate-float rounded-2xl border px-4 py-2 font-display font-extrabold shadow-pop">⭐ +50 XP</div>
          <div className="glass absolute -right-2 top-1/3 animate-float rounded-2xl border px-4 py-2 font-display font-extrabold shadow-pop" style={{ animationDelay: "1.2s" }}>🔥 7 day streak</div>
          <div className="glass absolute bottom-6 left-10 animate-float rounded-2xl border px-4 py-2 font-display font-extrabold shadow-pop" style={{ animationDelay: "2s" }}>🏅 Badge unlocked!</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-center text-3xl md:text-4xl">Learning That Grows With Your Child</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <FunCard key={p.t} className="text-center">
              <div className="mx-auto w-fit"><EmojiTile emoji={p.e} color={p.c} size="lg" /></div>
              <h3 className="mt-4 text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </FunCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-center text-3xl md:text-4xl">How It Works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-card p-6 shadow-sm">
              <div className="font-display text-5xl font-black text-gradient">{s.n}</div>
              <h3 className="mt-2 text-xl">{s.e} {s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between"><h2 className="text-3xl">Popular Learning Paths</h2><Link to="/paths" className="font-bold text-primary">See all →</Link></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 8).map((c) => (
            <FunCard key={c.id} className="flex items-center gap-3"><EmojiTile emoji={c.emoji} color={c.color} /><div><div className="font-display font-extrabold">{c.title}</div><div className="text-xs text-muted-foreground">{c.level} · {c.classes}</div></div></FunCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between"><h2 className="text-3xl">Explore Careers</h2><Link to="/careers" className="font-bold text-primary">See all →</Link></div>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {careers.map((c) => (
            <div key={c.id} className="min-w-52 rounded-3xl bg-card p-5 shadow-sm"><EmojiTile emoji={c.emoji} color={c.color} /><div className="mt-3 font-display font-extrabold">{c.title}</div><div className="text-xs text-muted-foreground">{c.desc}</div></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[2rem] bg-gradient-hero p-10 text-center text-on-fun shadow-pop">
          <h2 className="text-3xl md:text-4xl">Ready for your coding adventure?</h2>
          <p className="mt-2 opacity-90">Join free in under a minute. No credit card needed.</p>
          <Link to="/register" className="mt-6 inline-block rounded-2xl bg-card px-6 py-3 font-display font-extrabold text-primary">Start Learning Free</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
