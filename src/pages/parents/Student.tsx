import { EmojiTile, FunCard, PageTitle } from "@/components/ui-fun";
import { badges, careers } from "@/data/content";

export default function Student() {
  return (
    <div className="space-y-6">
      <PageTitle emoji="🎒" title="Aarav Sharma" subtitle="Class 7 · Level 3 Coder · Joined Aug 2026" />
      <FunCard><h3 className="text-lg">Interests</h3><div className="mt-2 flex flex-wrap gap-2">{["🎮 Games", "🤖 Robots", "🌐 Websites", "✨ AI"].map((i) => <span key={i} className="rounded-full bg-secondary px-3 py-1 text-sm font-bold">{i}</span>)}</div></FunCard>
      <FunCard><h3 className="text-lg">Top career matches</h3><div className="mt-3 grid gap-3 sm:grid-cols-3">{careers.slice(1, 4).map((c) => <div key={c.id} className="flex items-center gap-2 rounded-2xl bg-muted p-3"><EmojiTile emoji={c.emoji} color={c.color} size="sm" /><span className="font-bold">{c.title}</span></div>)}</div></FunCard>
      <FunCard><h3 className="text-lg">Badges earned</h3><div className="mt-3 flex flex-wrap gap-3">{badges.filter((b) => b.earned).map((b) => <div key={b.id} className="text-center"><EmojiTile emoji={b.emoji} color={b.color} /><div className="mt-1 text-[11px] font-bold">{b.title}</div></div>)}</div></FunCard>
    </div>
  );
}
