import { FunCard, PageTitle } from "@/components/ui-fun";
import { activities } from "@/data/content";

export default function Activities() {
  return (
    <div>
      <PageTitle emoji="📋" title="Activities" />
      <div className="space-y-3">{[...activities, ...activities].map((a, i) => <FunCard key={i} className="flex items-center gap-4 p-4"><span className="text-2xl">{a.emoji}</span><div className="flex-1 font-semibold">{a.text}</div><span className="text-xs text-muted-foreground">{a.when}</span></FunCard>)}</div>
    </div>
  );
}