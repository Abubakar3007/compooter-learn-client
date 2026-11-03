import { Hero, SiteLayout } from "@/components/site";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import type { Fun } from "@/data/content";

const values: { e: string; t: string; d: string; c: Fun }[] = [
  { e: "🛡️", t: "Safe First", d: "No ads, no public chat, moderated content and privacy by design.", c: "green" },
  { e: "🎉", t: "Joyful Learning", d: "Games, XP and badges make practice feel like play.", c: "pink" },
  { e: "🧩", t: "Real Skills", d: "Projects and problem solving, not just memorising.", c: "blue" },
  { e: "🌱", t: "Grows With You", d: "Content that adapts from Class 5 all the way to Class 12.", c: "yellow" },
];

export default function About() {
  return (
    <SiteLayout>
      <Hero emoji="💜" title="We Believe Every Kid Can Code" subtitle="CodeQuest was built by teachers, engineers and parents who want technology learning to feel like an adventure." />
      <div className="mx-auto max-w-5xl px-4 py-14">
        <p className="text-center text-lg text-muted-foreground">Our mission is simple: give students from Class 5 to Class 12 a fun, safe place to understand computers, write real code, build projects and discover careers — so they can choose their future with confidence.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => <FunCard key={v.t} className="flex gap-4"><EmojiTile emoji={v.e} color={v.c} /><div><h3 className="text-xl">{v.t}</h3><p className="text-sm text-muted-foreground">{v.d}</p></div></FunCard>)}
        </div>
      </div>
    </SiteLayout>
  );
}
