import { Link } from "react-router-dom";
import { Hero, SiteLayout } from "@/components/site";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import { totalCourses } from "@/data/content";
import { ArrowRight } from "lucide-react";

export default function Paths() {
  return (
    <SiteLayout>
      <Hero emoji="🧭" title="Learning Paths" subtitle="Four core levels, then pick the adventures you love." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 md:grid-cols-2">
        {totalCourses.map((data, i) => (
          <FunCard key={i} className="p-6">
            <div className="flex items-center gap-4">
              <EmojiTile emoji={data.emoji} color={data?.color} size="lg" />
              <div>
                <div className="text-xs font-bold uppercase text-primary">{data.level} · {data.classes}</div>
                <h2 className="text-2xl my-1">{data.topic}</h2>
                <p className="text-sm text-muted-foreground">{data.description}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 ml-16">
              {
                data.topics.slice(0, 6).map((t, j) => (
                  <span key={j} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{t?.heading}</span>
                ))
              }
            </div>
            <div className="mt-12 flex items-end justify-end">
              <Link to={`/student/learn/${data.slug}`} className="text-sm text-primary font-semibold flex items-center gap-1">
                Learn now
                <ArrowRight size={14} className="mt-1" />
              </Link>
            </div>
          </FunCard>
        ))}
      </div>
    </SiteLayout>
  );
}
