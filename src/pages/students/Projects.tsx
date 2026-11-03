import { Link } from "react-router-dom";
import { useState } from "react";
import { EmojiTile, FunCard, PageTitle, Empty } from "@/components/ui-fun";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";

const levels = ["All", "Easy", "Medium", "Hard"];

export default function Projects() {
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.difficulty === f);
  return (
    <div>
      <PageTitle emoji="🛠️" title="Projects" subtitle="Pick a project and build something awesome." />
      <div className="mb-5 flex gap-2">{levels.map((l) => <button key={l} onClick={() => setF(l)} className={cn("rounded-full px-4 py-1.5 text-sm font-bold", f === l ? "bg-gradient-hero text-on-fun" : "bg-card border")}>{l}</button>)}</div>
      {list.length === 0 ? <Empty emoji="🔍" title="No projects here" text="Try another filter." /> : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((p) => (
            <Link key={p.id} to={`/student/projects/${p.id}`}>
              <FunCard className="h-full"><EmojiTile emoji={p.emoji} color={p.color} size="lg" /><h3 className="mt-3 text-xl">{p.title}</h3><p className="text-sm text-muted-foreground">{p.desc}</p><div className="mt-3 flex gap-2 text-xs font-bold"><span className="rounded-full bg-secondary px-2 py-0.5">{p.difficulty}</span><span className="rounded-full bg-muted px-2 py-0.5">⭐ {p.xp}</span></div></FunCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
