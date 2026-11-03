import { Outlet } from "react-router-dom";
import { Award, BookOpen, Code2, Compass, FolderKanban, Home, ListChecks, Settings, Target, User, ScrollText, School } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/student/dashboard", label: "Home", icon: Home },
  { to: "/student/learn", label: "Learn", icon: BookOpen, exact: false },
  { to: "/paths", label: "Courses", icon: School, exact: false },
  { to: "/student/code", label: "Code", icon: Code2 },
  { to: "/student/projects", label: "Projects", icon: FolderKanban, exact: false },
  { to: "/student/quiz", label: "Quiz", icon: ListChecks },
  { to: "/student/achievements", label: "Achievements", icon: Award },
  { to: "/student/career-explorer", label: "Careers", icon: Compass },
  { to: "/student/skill-assessment", label: "Career Quiz", icon: Target },
  { to: "/student/certificates", label: "Certificates", icon: ScrollText },
  { to: "/student/profile", label: "Profile", icon: User },
  { to: "/student/settings", label: "Settings", icon: Settings },
];

export default function StudentLayout() {
  return <AppShell nav={nav} role="🎒 Student" user="Aarav"><Outlet /></AppShell>;
}
