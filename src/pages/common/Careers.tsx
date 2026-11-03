import { Link } from "react-router-dom";
import { Hero, SiteLayout } from "@/components/site";
import { CareerCard } from "@/components/career-card";
import { careers } from "@/data/content";

export default function Careers() {
  return (
    <SiteLayout>
      <Hero emoji="🚀" title="Explore Technology Careers" subtitle="What do they do? What skills do they need? Find the future that fits you." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {careers.map((c) => <CareerCard key={c.id} c={c} />)}
      </div>
      <div className="text-center"><Link to="/register" className="rounded-2xl bg-gradient-hero px-6 py-3 font-display font-extrabold text-on-fun shadow-pop">Take the Career Quiz</Link></div>
    </SiteLayout>
  );
}
