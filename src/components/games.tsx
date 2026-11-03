import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "./ui-fun";

export function BinaryGame() {
  const [target, setTarget] = useState(13);
  useEffect(() => setTarget(1 + Math.floor(Math.random() * 31)), []);
  const [bits, setBits] = useState([0, 0, 0, 0, 0]);
  const vals = [16, 8, 4, 2, 1];
  const value = bits.reduce((s, b, i) => s + b * vals[i], 0);
  const win = value === target;
  return (
    <div className="text-center">
      <p className="font-semibold">Turn the bulbs on to make <span className="font-display text-2xl font-black text-primary">{target}</span></p>
      <div className="mt-4 flex justify-center gap-2">
        {bits.map((b, i) => (
          <button key={i} onClick={() => setBits(bits.map((x, j) => (j === i ? 1 - x : x)))} className={cn("flex h-20 w-14 flex-col items-center justify-center rounded-2xl border-2 font-display transition", b ? "border-fun-yellow bg-fun-yellow shadow-pop" : "bg-muted")}>
            <span className="text-2xl">{b ? "💡" : "⚫"}</span><span className="text-lg font-black">{b}</span><span className="text-[10px]">{vals[i]}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 font-bold">Your number: {value} {win && "— 🎉 You did it!"}</p>
      {win && <GradientButton className="mt-3" onClick={() => { setTarget(1 + Math.floor(Math.random() * 31)); setBits([0, 0, 0, 0, 0]); }}>New number</GradientButton>}
    </div>
  );
}

const correctOrder = ["🟢 Start", "🍞 Take two slices of bread", "🧈 Spread butter", "🔷 Want jam? → Add jam", "🥪 Put slices together", "🔴 End"];

export function FlowchartGame() {
  const [items, setItems] = useState([correctOrder[2], correctOrder[0], correctOrder[4], correctOrder[1], correctOrder[5], correctOrder[3]]);
  useEffect(() => setItems([...correctOrder].sort(() => Math.random() - 0.5)), []);
  const move = (i: number, d: number) => {
    const j = i + d; if (j < 0 || j >= items.length) return;
    const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; setItems(n);
  };
  const win = items.every((x, i) => x === correctOrder[i]);
  return (
    <div>
      <p className="mb-3 font-semibold">Put the flowchart for making a sandwich in the right order:</p>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={it} className={cn("flex items-center gap-2 rounded-2xl border-2 bg-card p-3 font-semibold", win && "border-fun-green")}>
            <span className="flex-1">{it}</span>
            <button onClick={() => move(i, -1)} className="rounded-lg bg-muted p-1" aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
            <button onClick={() => move(i, 1)} className="rounded-lg bg-muted p-1" aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      {win && <p className="mt-3 text-center font-bold">🎉 Perfect flowchart!</p>}
    </div>
  );
}
