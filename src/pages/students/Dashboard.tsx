import { Link } from "react-router-dom";
import { Check, Circle, ArrowRight } from "lucide-react";
import { EmojiTile, FunCard, Stat } from "@/components/ui-fun";
import { useProgress } from "@/lib/progress";
import { badges, careers, type Fun } from "@/data/content";
import { cn } from "@/lib/utils";
import { totalCourses } from "@/data/content";

const challenges: { e: string; t: string; c: Fun; to: string }[] = [
  { e: "🧠", t: "Logic Challenge", c: "purple", to: "/student/quiz" },
  { e: "🎯", t: "Binary Challenge", c: "cyan", to: "/student/lesson/data-digital--5" },
  { e: "💻", t: "Coding Challenge", c: "blue", to: "/student/code" },
  { e: "🏆", t: "Daily Quiz", c: "orange", to: "/student/quiz" },
];
const journey = [["Computer Basics", 1], ["Hardware & Software", 1], ["Binary Numbers", 1], ["Algorithms", 1], ["Flowcharts", 0.5], ["Programming Basics", 0]] as const;

export default function Dashboard() {
  const { progress } = useProgress();
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  return (
    <div className="space-y-8">
      <div className="animate-pop">
        <h1 className="text-3xl md:text-4xl">{greet}, {progress.name}! 👋</h1>
        <p className="text-muted-foreground">Ready for today's coding adventure?</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat emoji="🔥" label="Day Streak" value={7} color="orange" />
        <Stat emoji="⭐" label="XP" value={progress.xp.toLocaleString()} color="yellow" />
        <Stat emoji="🏆" label="Badges" value={badges.filter((b) => b.earned).length} color="purple" />
        <Stat emoji="📚" label="Progress" value="68%" color="cyan" />
      </div>

      <section>
        <h2 className="mb-3 text-2xl">Continue Learning</h2>
        <div className="flex flex-col gap-5 rounded-[2rem] bg-gradient-hero p-6 text-on-fun shadow-pop md:flex-row md:items-center">
          <div className="text-6xl">🖥️</div>
          <div className="flex-1">
            <div className="text-sm font-bold opacity-80">Level 1</div>
            <h3 className="text-3xl">Computer Fundamentals</h3>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-card/30"><div className="h-full w-[68%] rounded-full bg-card" /></div>
            <div className="mt-1 text-sm font-bold">68% complete</div>
          </div>
          <Link to="/learn/$courseId" params={{ courseId: "computer-fundamentals" }} className="inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 font-display font-extrabold text-primary">Continue Learning <ArrowRight className="h-4 w-4" /></Link>
        </div>
        
      </section>

      <section>
        <h2 className="mb-3 text-2xl">Today's Challenges</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {challenges.map((c) => (
            <Link key={c.t} to={c.to as never}><FunCard className="text-center"><div className="mx-auto w-fit"><EmojiTile emoji={c.e} color={c.c} size="lg" /></div><div className="mt-3 font-display font-extrabold">{c.t}</div><div className="text-xs font-bold text-primary">+30 XP</div></FunCard></Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl">My Learning Journey</h2>
          <FunCard>
            <ol className="space-y-3">
              {journey.map(([t, s]) => (
                <li key={t} className="flex items-center gap-3">
                  <span className={cn("grid h-8 w-8 place-items-center rounded-full", s === 1 ? "bg-fun-green text-on-fun" : s ? "bg-gradient-hero text-on-fun animate-pulse" : "bg-muted text-muted-foreground")}>
                    {s === 1 ? <Check className="h-4 w-4" /> : s ? <ArrowRight className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                  </span>
                  <span className={cn("font-semibold", !s && "text-muted-foreground")}>{t}</span>
                </li>
              ))}
            </ol>
          </FunCard>
        </section>
        <section>
          <h2 className="mb-3 text-2xl">Recent Achievements</h2>
          <FunCard className="grid grid-cols-4 gap-3">
            {badges.filter((b) => b.earned).map((b) => (
              <div key={b.id} className="text-center"><div className="mx-auto w-fit animate-float" ><EmojiTile emoji={b.emoji} color={b.color} /></div><div className="mt-1 text-[11px] font-bold">{b.title}</div></div>
            ))}
          </FunCard>
        </section>
      </div>

      <div>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl">Explore Courses</h2>
          <Link to="/career-explorer" className="text-sm font-bold text-primary">See all →</Link>
        </div>

        <div className="grid gap-5 pt-4 md:grid-cols-2">
          {totalCourses.slice(0,4).map((data, i) => (
            <FunCard key={data.id} className="p-6">
              <div className="flex items-center gap-4">
                <EmojiTile emoji={data.emoji} color={data?.color} size="lg" />
                <div>
                  <div className="text-xs font-bold uppercase text-primary">{data.level} · {data.classes}</div>
                  <h2 className="text-2xl my-1">{data.topic}</h2>
                  <p className="text-sm text-muted-foreground">{data.description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 ml-16">
                {data.topics.map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{t}</span>)}
              </div>
              <div className="mt-12 flex items-end justify-end">
                <Link to={`learn/${data.slug}`} className="text-sm text-primary font-semibold flex items-center gap-1">
                  Learn now
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FunCard>
          ))}
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl">Explore Careers</h2>
          <Link to="/career-explorer" className="text-sm font-bold text-primary">See all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {careers.slice(0, 6).map((c) => <FunCard key={c.id} className="p-4 text-center"><div className="mx-auto w-fit"><EmojiTile emoji={c.emoji} color={c.color} /></div><div className="mt-2 text-sm font-bold">{c.title}</div></FunCard>)}
        </div>
      </section>

    </div>
  );
}
