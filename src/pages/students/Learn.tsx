import { Link } from "react-router-dom";
import { Bar, EmojiTile, FunCard, PageTitle } from "@/components/ui-fun";
import { totalCourses } from "@/data/content";
import { ArrowRight } from "lucide-react";

const prog = [68, 40, 15, 5, 0, 0, 0, 0, 0, 0];

export default function Learn() {
  return (
    <div>
      <PageTitle emoji="📚" title="Learn" subtitle="Pick a course and keep growing." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {totalCourses.map((c, i) => (
          <Link key={c.id} to={`/student/learn/${c.slug}`}>
            <FunCard className="h-full">
              <div className="flex items-center gap-3">
                <EmojiTile emoji={c.emoji} color={c.color} size="lg" />
                <div>
                  <div className="text-xs font-bold text-primary">{c.level}</div>
                  <h3 className="text-xl">{c.topic}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex justify-between text-xs font-bold">
                <span>{c.topics.length} lessons</span>
                <span>{prog[i]}%</span>
              </div>
              <Bar value={prog[i]} className="mt-1 mb-4" />
              <div className="font-semibold text-primary text-sm flex justify-end items-center gap-1">
                <span>Continue</span>
                <ArrowRight className="inline-block mt-1" size={16} />
              </div>
            </FunCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
