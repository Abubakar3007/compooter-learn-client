import { Bar, FunCard, PageTitle, Stat } from "@/components/ui-fun";
import { BarCard } from "@/components/charts";
import { classes, students } from "@/data/content";

export default function Teacher() {
  return (
    <div className="space-y-6">
      <PageTitle emoji="🍎" title="Good day, Mrs. Kapoor!" subtitle="Your classes are making great progress." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat emoji="👩‍🎓" label="Students" value={119} color="purple" />
        <Stat emoji="🏫" label="Classes" value={classes.length} color="blue" />
        <Stat emoji="📝" label="Open assignments" value={3} color="orange" />
        <Stat emoji="📈" label="Avg progress" value="68%" color="green" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BarCard title="Average progress by class" data={classes} x="name" y="avgProgress" />
        <FunCard>
          <h3 className="mb-3 text-lg">🏆 Top students</h3>
          <div className="space-y-3">{students.slice(0, 5).map((s, i) => <div key={s.id}><div className="flex justify-between text-sm font-bold"><span>{i + 1}. {s.name}</span><span>{s.xp} XP</span></div><Bar value={s.progress} className="mt-1 h-2" /></div>)}</div>
        </FunCard>
      </div>
    </div>
  );
}
