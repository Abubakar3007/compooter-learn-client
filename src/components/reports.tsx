import { Download } from "lucide-react";
import { toast } from "sonner";
import { FunCard } from "./ui-fun";

export function ReportList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((r) => (
        <FunCard key={r.t} className="flex items-center gap-4 p-4">
          <span className="text-2xl">📄</span>
          <div className="flex-1"><div className="font-display font-extrabold">{r.t}</div><div className="text-xs text-muted-foreground">{r.d}</div></div>
          <button onClick={() => toast.success("Report is downloading…")} className="flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground"><Download className="h-4 w-4" /> PDF</button>
        </FunCard>
      ))}
    </div>
  );
}
