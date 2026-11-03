import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Hero, SiteLayout } from "@/components/site";
import { cn } from "@/lib/utils";
import { funBg, pricing } from "@/data/content";

export default function Pricing() {
  return (
    <SiteLayout>
      <Hero emoji="💎" title="Simple, Family-Friendly Pricing" subtitle="Start free forever. Upgrade when you're ready." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {pricing.map((p) => (
          <div key={p.name} className={cn("relative flex flex-col rounded-3xl border bg-card p-6 shadow-sm", p.popular && "border-2 border-primary shadow-pop")}>
            {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-hero px-3 py-1 text-xs font-bold text-on-fun">Most popular</span>}
            <span className={cn("h-2 w-12 rounded-full", funBg[p.color])} />
            <h2 className="mt-4 text-2xl">{p.name}</h2>
            <div className="mt-2 font-display text-4xl font-black">{p.price}<span className="text-base font-semibold text-muted-foreground">{p.period}</span></div>
            <ul className="mt-5 flex-1 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-fun-green" />{f}</li>)}</ul>
            <Link to={p.name === "School" ? "/contact" : "/register"} className={cn("mt-6 rounded-2xl px-4 py-3 text-center font-display font-extrabold", p.popular ? "bg-gradient-hero text-on-fun" : "bg-secondary text-secondary-foreground")}>{p.cta}</Link>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
