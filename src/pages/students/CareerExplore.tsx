import { Link } from "react-router-dom";
import { PageTitle } from "@/components/ui-fun";
import { CareerCard } from "@/components/career-card";
import { careers } from "@/data/content";

export default function CareerExplorer() {
  return (
    <div>
      <PageTitle emoji="🧭" title="Career Explorer" subtitle="What could you become?" />
      <Link to="/student/skill-assessment" className="mb-6 block rounded-3xl bg-gradient-candy p-5 font-display text-xl font-extrabold text-on-fun shadow-pop">🎯 Not sure? Take the Career Discovery Quiz →</Link>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{careers.map((c) => <CareerCard key={c.id} c={c} />)}</div>
    </div>
  );
}
