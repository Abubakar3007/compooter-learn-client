import { EmojiTile, FunCard } from "./ui-fun";
import type { careers } from "@/data/content";

export function CareerCard({ c }: { c: (typeof careers)[number] }) {
  return (
    <FunCard>
      <div className="flex items-center gap-3"><EmojiTile emoji={c.emoji} color={c.color} size="lg" /><div><h3 className="text-xl">{c.title}</h3><div className="text-xs font-bold text-primary">{c.salary}</div></div></div>
      <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
      <div className="mt-3 text-xs font-bold">Skills</div>
      <div className="mt-1 flex flex-wrap gap-1">{c.skills.map((s) => <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{s}</span>)}</div>
      <div className="mt-2 text-xs font-bold">Tools</div>
      <div className="mt-1 flex flex-wrap gap-1">{c.tools.map((s) => <span key={s} className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">{s}</span>)}</div>
      <div className="mt-2 text-xs text-muted-foreground">Subjects: {c.subjects.join(", ")}</div>
    </FunCard>
  );
}
