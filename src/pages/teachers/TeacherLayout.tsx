import { Outlet } from "react-router-dom";
import { ClipboardList, FileText, Home, School, Users } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/teacher", label: "Overview", icon: Home },
  { to: "/teacher/students", label: "Students", icon: Users },
  { to: "/teacher/classes", label: "Classes", icon: School },
  { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/teacher/reports", label: "Reports", icon: FileText },
];

export default function TeacherLayout() {
  return <AppShell nav={nav} role="🍎 Teacher" user="Kapoor"><Outlet /></AppShell>;
}
