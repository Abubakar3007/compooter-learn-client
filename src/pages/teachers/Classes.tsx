import { Bar, FunCard, PageTitle } from "@/components/ui-fun";
import { classes } from "@/data/content";

export default function Classes() {
  return (
    <div><PageTitle emoji="🏫" title="Classes" />
      <div className="grid gap-5 sm:grid-cols-2">
        {classes.map((c) => <FunCard key={c.id}><h3 className="text-2xl">{c.name}</h3><p className="text-sm text-muted-foreground">{c.students} students · {c.course}</p><div className="mt-4 flex justify-between text-sm font-bold"><span>Average progress</span><span>{c.avgProgress}%</span></div><Bar value={c.avgProgress} className="mt-1" /></FunCard>)}
      </div>
    </div>
  );
}
