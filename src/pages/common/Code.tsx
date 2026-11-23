import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { GradientButton, PageTitle } from "@/components/ui-fun";
import { cn } from "@/lib/utils";

const starter = {
  html: `<h1>Hello, CodeQuest! 🚀</h1>\n<button id="btn">Click me</button>\n<p id="out"></p>`,
  css: `body { font-family: sans-serif; text-align: center; padding: 30px; background: #fdf6ff; }\nh1 { color: #7c3aed; }\nbutton { font-size: 18px; padding: 10px 20px; border-radius: 12px; border: none; background: #ec4899; color: white; }`,
  js: `let clicks = 0;\ndocument.getElementById("btn").onclick = () => {\n  clicks++;\n  document.getElementById("out").textContent = "You clicked " + clicks + " times! ⭐";\n};`,
};
type Tab = keyof typeof starter;

export default function Code() {
  const [code, setCode] = useState(starter);
  const [tab, setTab] = useState<Tab>("html");
  const [doc, setDoc] = useState("");
  const run = () => { setDoc(`<html><style>${code.css}</style><body>${code.html}<script>${code.js}<\/script></body></html>`); toast.success("Code ran! +10 XP"); };
  return (
    <div>
      <PageTitle emoji="💻" title="Code Playground" subtitle="Edit the code, press Run, and watch it come alive." />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="flex items-center gap-1 border-b p-2">
            {(Object.keys(starter) as Tab[]).map((t) => <button key={t} onClick={() => setTab(t)} className={cn("rounded-xl px-4 py-1.5 text-sm font-bold uppercase", tab === t ? "bg-gradient-hero text-on-fun" : "text-muted-foreground")}>{t}</button>)}
            <button onClick={() => setCode(starter)} className="ml-auto rounded-xl p-2 text-muted-foreground hover:bg-muted" aria-label="Reset"><RotateCcw className="h-4 w-4" /></button>
          </div>
          <textarea value={code[tab]} onChange={(e) => setCode({ ...code, [tab]: e.target.value })} spellCheck={false} className="h-96 w-full resize-none bg-foreground p-4 font-mono text-sm text-background outline-none" />
        </div>
        <div className="flex flex-col overflow-hidden rounded-3xl border bg-card">
          <div className="flex items-center justify-between border-b p-2">
            <span className="px-2 font-bold">Output</span>
            <GradientButton onClick={run} className="py-2">
              <Play className="h-4 w-4" /> Run</GradientButton>
          </div>
          {doc ? <iframe title="Output" sandbox="allow-scripts" srcDoc={doc} className="h-96 w-full flex-1 bg-card" /> : <div className="grid h-96 place-items-center text-muted-foreground">Press ▶ Run to see your code!</div>}
        </div>
      </div>
    </div>
  );
}
