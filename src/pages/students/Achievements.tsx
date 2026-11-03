import { Lock } from "lucide-react";
import { Bar, EmojiTile, FunCard, PageTitle } from "@/components/ui-fun";
import { badges } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function Achievements() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 500) + 1;
  return (
    <div>
      <PageTitle emoji="🏅" title="Achievements" subtitle="Collect them all!" />
      <FunCard className="mb-6 bg-gradient-sunny">
        <div className="flex items-center justify-between font-display font-extrabold"><span className="text-2xl">Level {level}</span><span>{progress.xp} XP</span></div>
        <Bar value={((progress.xp % 500) / 500) * 100} className="mt-3 bg-card/50" />
        <p className="mt-2 text-sm font-semibold">{500 - (progress.xp % 500)} XP to Level {level + 1}</p>
      </FunCard>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <FunCard key={b.id} className={cn("text-center", !b.earned && "opacity-60 grayscale")}>
            <div className={cn("mx-auto w-fit", b.earned && "animate-float")}><EmojiTile emoji={b.earned ? b.emoji : "🔒"} color={b.color} size="lg" /></div>
            <h3 className="mt-3 text-lg">{b.title}</h3>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
            {!b.earned && <Lock className="mx-auto mt-2 h-4 w-4 text-muted-foreground" />}
          </FunCard>
        ))}
      </div>
    </div>
  );
}
