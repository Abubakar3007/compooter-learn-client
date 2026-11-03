import { useParams } from "react-router-dom";
import { PageTitle } from "@/components/ui-fun";
import { DataTable } from "@/components/data-table";
import { AdminOverview } from "@/components/admin-overview";
import { SettingsForm } from "@/components/settings-form";
import { careers, courses, parents, projects, quizQuestions, students, teachers, getLesson } from "@/data/content";

type Cfg = { title: string; emoji: string; noun: string; rows: () => ({ id: string } & Record<string, string | number>)[]; columns: { key: string; label: string }[] };

const sections: Record<string, Cfg> = {
  students: { title: "Students", emoji: "👩‍🎓", noun: "Student", rows: () => students, columns: [{ key: "name", label: "Name" }, { key: "className", label: "Class" }, { key: "xp", label: "XP" }, { key: "streak", label: "Streak" }, { key: "lastActive", label: "Last active" }] },
  parents: { title: "Parents", emoji: "👨‍👩‍👧", noun: "Parent", rows: () => parents, columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "child", label: "Child" }, { key: "plan", label: "Plan" }] },
  teachers: { title: "Teachers", emoji: "🍎", noun: "Teacher", rows: () => teachers, columns: [{ key: "name", label: "Name" }, { key: "subject", label: "Subject" }, { key: "classes", label: "Classes" }, { key: "students", label: "Students" }] },
  courses: { title: "Courses", emoji: "📚", noun: "Course", rows: () => courses.map((c) => ({ id: c.id, title: `${c.emoji} ${c.title}`, level: c.level, classes: c.classes, lessons: c.topics.length })), columns: [{ key: "title", label: "Title" }, { key: "level", label: "Level" }, { key: "classes", label: "For" }, { key: "lessons", label: "Lessons" }] },
  lessons: { title: "Lessons", emoji: "📖", noun: "Lesson", rows: () => courses.slice(0, 4).flatMap((c) => c.topics.slice(0, 5).map((_, i) => { const l = getLesson(c.id, i); return { id: l.id, title: l.title, course: c.title, xp: l.xp }; })), columns: [{ key: "title", label: "Title" }, { key: "course", label: "Course" }, { key: "xp", label: "XP" }] },
  projects: { title: "Projects", emoji: "🛠️", noun: "Project", rows: () => projects.map((p) => ({ id: p.id, title: `${p.emoji} ${p.title}`, path: p.path, difficulty: p.difficulty, xp: p.xp })), columns: [{ key: "title", label: "Title" }, { key: "path", label: "Path" }, { key: "difficulty", label: "Difficulty" }, { key: "xp", label: "XP" }] },
  quizzes: { title: "Quizzes", emoji: "❓", noun: "Question", rows: () => quizQuestions.map((q, i) => ({ id: `q${i}`, question: q.q, answer: q.options[q.answer], options: q.options.length })), columns: [{ key: "question", label: "Question" }, { key: "answer", label: "Correct answer" }, { key: "options", label: "Options" }] },
  careers: { title: "Careers", emoji: "💼", noun: "Career", rows: () => careers.map((c) => ({ id: c.id, title: `${c.emoji} ${c.title}`, salary: c.salary, skills: c.skills.join(", ") })), columns: [{ key: "title", label: "Title" }, { key: "salary", label: "Salary" }, { key: "skills", label: "Skills" }] },
};
const special = ["dashboard", "analytics", "settings"];

export default function Section() {
  const { section } = useParams<{ section: string }>();
  if (!section || (!sections[section] && !special.includes(section))) return <div className="p-10 text-center text-xl">🙈 This admin page doesn't exist.</div>;
  if (section === "dashboard") return <AdminOverview />;
  if (section === "analytics") return <AdminOverview title="Analytics" />;
  if (section === "settings") return <div><PageTitle emoji="⚙️" title="Platform Settings" /><SettingsForm name="CodeQuest Admin" toggles={["Allow new registrations", "Content moderation", "Maintenance mode", "Email weekly digests"]} /></div>;
  const cfg = sections[section];
  return <div key={section}><PageTitle emoji={cfg.emoji} title={cfg.title} /><DataTable noun={cfg.noun} rows={cfg.rows()} columns={cfg.columns} /></div>;
}
