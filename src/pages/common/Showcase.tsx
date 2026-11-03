import { Hero, SiteLayout } from "@/components/site";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import { projects } from "@/data/content";

export default function Showcase() {
  return (
    <SiteLayout>
      <Hero emoji="🛠️" title="Build Real Projects" subtitle="Students don't just watch — they create games, apps, websites and robots." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <FunCard key={p.id}>
            <EmojiTile emoji={p.emoji} color={p.color} size="lg" />
            <h3 className="mt-3 text-xl">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-3 flex gap-2 text-xs font-bold"><span className="rounded-full bg-secondary px-2 py-0.5">{p.difficulty}</span><span className="rounded-full bg-accent px-2 py-0.5">{p.path}</span><span className="rounded-full bg-muted px-2 py-0.5">⭐ {p.xp} XP</span></div>
          </FunCard>
        ))}
      </div>
    </SiteLayout>
  );
}
