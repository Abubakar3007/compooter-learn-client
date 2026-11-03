import { Bar, FunCard, PageTitle } from "@/components/ui-fun";
import { AreaCard } from "@/components/charts";
import { courses, weeklyXp } from "@/data/content";

const prog = [68, 40, 15, 5];

export default function ParentProgress() {
  return (
    <div className="space-y-6">
      <PageTitle emoji="📈" title="Progress" />
      <AreaCard title="XP earned this week" data={weeklyXp} x="day" ys={["xp"]} />
      <FunCard className="space-y-4">
        {courses.slice(0, 4).map((c, i) => <div key={c.id}><div className="flex justify-between font-bold"><span>{c.emoji} {c.title}</span><span>{prog[i]}%</span></div><Bar value={prog[i]} className="mt-1" /></div>)}
      </FunCard>
    </div>
  );
}
