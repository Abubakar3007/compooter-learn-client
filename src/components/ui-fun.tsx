import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { funBg, type Fun } from "@/data/content";
import { Rocket } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-display text-xl font-extrabold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero text-on-fun shadow-pop">
        <Rocket className="h-5 w-5" />
      </span>
      <span>Code<span className="text-gradient">Quest</span></span>
    </Link>
  );
}

export function FunCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-3xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-pop", className)}>{children}</div>;
}

export function EmojiTile({ emoji, color, size = "md" }: { emoji: string; color: Fun; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "h-16 w-16 text-3xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-12 w-12 text-2xl";
  return <span className={cn("grid shrink-0 place-items-center rounded-2xl font-semibold text-white", funBg[color], s)}>{emoji}</span>;
}

export function Bar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-white", className)}>
      <div className="h-full rounded-full bg-gradient-hero transition-all" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function PageTitle({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <div className="mb-6 animate-pop">
      <h1 className="text-3xl md:text-4xl">{emoji && <span className="mr-2">{emoji}</span>}{title}</h1>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Stat({ emoji, label, value, color }: { emoji: string; label: string; value: string | number; color: Fun }) {
  return (
    <FunCard className="flex items-center gap-3 p-4">
      <EmojiTile emoji={emoji} color={color} />
      <div>
        <div className="font-display text-2xl font-extrabold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </FunCard>
  );
}

export function Empty({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl border-2 border-dashed p-10 text-center">
      <div className="text-5xl">{emoji}</div>
      <h3 className="mt-3 text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function GradientButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn("inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-hero px-5 py-3 font-display font-bold cursor-pointer text-on-fun shadow-pop transition hover:scale-[1.03] active:scale-95 disabled:opacity-50", className)}>
      {children}
    </button>
  );
}
