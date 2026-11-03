import { Outlet } from "react-router-dom";
import { BarChart3, BookOpen, Briefcase, FileQuestion, FolderKanban, GraduationCap, Home, Layers, Settings, UserRound, Users } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/parents", label: "Parents", icon: Users },
  { to: "/admin/teachers", label: "Teachers", icon: UserRound },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/lessons", label: "Lessons", icon: Layers },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/quizzes", label: "Quizzes", icon: FileQuestion },
  { to: "/admin/careers", label: "Careers", icon: Briefcase },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  return <AppShell nav={nav} role="🛠️ Admin" user="Admin"><Outlet /></AppShell>;
}
