import { PageTitle, Stat } from "./ui-fun";
import { AreaCard, BarCard } from "./charts";
import { courses, growth, weeklyXp } from "@/data/content";

export function AdminOverview({ title = "Admin Dashboard" }: { title?: string }) {
  return (
    <div className="space-y-6">
      <PageTitle emoji="🛠️" title={title} subtitle="Platform health at a glance." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat emoji="👩‍🎓" label="Students" value="4,400" color="purple" />
        <Stat emoji="🍎" label="Teachers" value={128} color="green" />
        <Stat emoji="📚" label="Courses" value={courses.length} color="blue" />
        <Stat emoji="⚡" label="Daily active" value="3,120" color="orange" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaCard title="Student growth" data={growth} x="month" ys={["students", "active"]} />
        <BarCard title="XP earned (all students, this week, ×100)" data={weeklyXp} x="day" y="xp" />
      </div>
    </div>
  );
}
