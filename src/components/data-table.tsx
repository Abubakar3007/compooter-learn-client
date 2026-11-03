import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Empty, GradientButton } from "./ui-fun";

type Row = Record<string, string | number> & { id: string };

export function DataTable({ rows: initial, columns, noun }: { rows: Row[]; columns: { key: string; label: string }[]; noun: string }) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<Row | null>(null);
  const list = rows.filter((r) => Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()));
  const save = (form: FormData) => {
    if (!edit) return;
    const next = { ...edit } as Row;
    columns.forEach((c) => { const v = String(form.get(c.key) ?? ""); (next as Record<string, string | number>)[c.key] = typeof edit[c.key] === "number" ? Number(v) || 0 : v; });
    setRows(rows.some((r) => r.id === next.id) ? rows.map((r) => (r.id === next.id ? next : r)) : [next, ...rows]);
    setEdit(null);
    toast.success(`${noun} saved`);
  };
  return (
    <div className="rounded-3xl border bg-card p-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${noun.toLowerCase()}s…`} className="h-10 rounded-xl pl-9" /></div>
        <GradientButton className="py-2" onClick={() => setEdit(Object.fromEntries([["id", `new-${Date.now()}`], ...columns.map((c) => [c.key, typeof initial[0]?.[c.key] === "number" ? 0 : ""])]) as Row)}><Plus className="h-4 w-4" /> Add {noun}</GradientButton>
      </div>
      {list.length === 0 ? <Empty emoji="🔍" title="Nothing found" text="Try a different search." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground">{columns.map((c) => <th key={c.key} className="px-3 py-2 font-bold">{c.label}</th>)}<th /></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/50">
                  {columns.map((c) => <td key={c.key} className="px-3 py-3 font-medium">{r[c.key]}</td>)}
                  <td className="whitespace-nowrap px-3 text-right">
                    <button onClick={() => setEdit(r)} className="rounded-lg p-1.5 hover:bg-secondary" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { setRows(rows.filter((x) => x.id !== r.id)); toast(`${noun} removed`); }} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>{edit && rows.some((r) => r.id === edit.id) ? "Edit" : "Add"} {noun}</DialogTitle></DialogHeader>
          {edit && (
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); save(new FormData(e.currentTarget)); }}>
              {columns.map((c) => <label key={c.key} className="block text-sm font-bold">{c.label}<Input name={c.key} defaultValue={String(edit[c.key] ?? "")} className="mt-1 h-10 rounded-xl" /></label>)}
              <GradientButton type="submit" className="w-full">Save</GradientButton>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
