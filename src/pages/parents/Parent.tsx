import { Link } from "react-router-dom";
import { FunCard, PageTitle, Stat } from "@/components/ui-fun";
import { BarCard } from "@/components/charts";
import { activities, weeklyXp } from "@/data/content";

export default function Parent() {
  return (
    <div className="space-y-6">
      <PageTitle emoji="👋" title="Hello, Rohit!" subtitle="Here's how Aarav is doing this week." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat emoji="⏱️" label="Time this week" value="4h 7m" color="cyan" />
        <Stat emoji="✅" label="Lessons done" value={12} color="green" />
        <Stat emoji="⭐" label="XP earned" value={1240} color="yellow" />
        <Stat emoji="🔥" label="Streak" value="7 days" color="orange" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BarCard title="Minutes learned per day" data={weeklyXp} x="day" y="minutes" />
        <FunCard>
          <div className="mb-3 flex justify-between"><h3 className="text-lg">Recent activity</h3><Link to="/parent/activities" className="text-sm font-bold text-primary">All →</Link></div>
          <ul className="space-y-3">{activities.slice(0, 5).map((a) => <li key={a.text} className="flex gap-3"><span className="text-xl">{a.emoji}</span><div><div className="font-semibold">{a.text}</div><div className="text-xs text-muted-foreground">{a.when}</div></div></li>)}</ul>
        </FunCard>
      </div>
    </div>
  );
}
