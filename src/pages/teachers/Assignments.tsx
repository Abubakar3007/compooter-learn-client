import { useState } from "react";
import { toast } from "sonner";
import { Bar, FunCard, GradientButton, PageTitle } from "@/components/ui-fun";
import { Input } from "@/components/ui/input";
import { assignmentsSeed, classes } from "@/data/content";

export default function Assignments() {
  const [list, setList] = useState(assignmentsSeed);
  const [title, setTitle] = useState("");
  const [cls, setCls] = useState(classes[0].name);
  const [due, setDue] = useState("");
  return (
    <div className="space-y-6">
      <PageTitle emoji="📝" title="Assignments" />
      <FunCard>
        <h3 className="mb-3 text-lg">Create assignment</h3>
        <form className="grid gap-3 md:grid-cols-4" onSubmit={(e) => { e.preventDefault(); const total = classes.find((c) => c.name === cls)!.students; setList([{ id: `a${Date.now()}`, title, className: cls, due: due || "Next week", submitted: 0, total }, ...list]); setTitle(""); toast.success("Assignment created 🎉"); }}>
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="h-11 rounded-xl md:col-span-2" />
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="h-11 rounded-xl border bg-card px-3">{classes.map((c) => <option key={c.id}>{c.name}</option>)}</select>
          <Input value={due} onChange={(e) => setDue(e.target.value)} placeholder="Due (e.g. Oct 20)" className="h-11 rounded-xl" />
          <GradientButton type="submit" className="md:col-span-4">Add assignment</GradientButton>
        </form>
      </FunCard>
      <div className="space-y-3">
        {list.map((a) => <FunCard key={a.id} className="p-4"><div className="flex flex-wrap justify-between gap-2"><div><div className="font-display text-lg font-extrabold">{a.title}</div><div className="text-xs text-muted-foreground">{a.className} · Due {a.due}</div></div><div className="text-sm font-bold">{a.submitted}/{a.total} submitted</div></div><Bar value={(a.submitted / a.total) * 100} className="mt-2 h-2" /></FunCard>)}
      </div>
    </div>
  );
}
