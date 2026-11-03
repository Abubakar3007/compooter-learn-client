import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui-fun";

const links = [
  { to: "/home", label: "Home" },
  { to: "/paths", label: "Learning Paths" },
  { to: "/careers", label: "Careers" },
  { to: "/code-editor", label: "Code Editor" },
  { to: "/pricing", label: "Pricing" },
  { to: "/challenges", label: "Challenges" },
  { to: "/quiz", label: "Quiz" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-secondary-foreground">{l.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-bold hover:bg-secondary">Log in</Link>
            <Link to="/register" className="rounded-xl bg-gradient-hero px-4 py-2 text-sm font-bold text-on-fun shadow-pop">Start Free</Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="grid gap-1 border-t px-4 py-3 lg:hidden">
            {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 font-semibold hover:bg-secondary">{l.label}</Link>)}
            <Link to="/login" className="rounded-xl px-3 py-2 font-semibold">Log in</Link>
            <Link to="/register" className="rounded-xl bg-gradient-hero px-3 py-2 text-center font-bold text-on-fun">Start Free</Link>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">Learn. Build. Explore. Discover Your Future.</p>
          <p className="text-xs text-muted-foreground">© 2026 CodeQuest · Safe for kids</p>
        </div>
      </footer>
    </div>
  );
}

export function Hero({ title, subtitle, emoji }: { title: string; subtitle: string; emoji: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero px-4 py-16 text-center text-on-fun">
      <div className="absolute left-10 top-6 animate-float text-4xl opacity-80">⭐</div>
      <div className="absolute bottom-6 right-12 animate-float text-4xl opacity-80" style={{ animationDelay: "1s" }}>🚀</div>
      <div className="text-5xl">{emoji}</div>
      <h1 className="mx-auto mt-3 max-w-3xl text-4xl md:text-5xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-2xl text-lg opacity-90">{subtitle}</p>
    </section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — CodeQuest` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — CodeQuest` },
    { property: "og:description", content: description },
  ],
});
