import { Outlet } from "react-router-dom";
import { Activity, BarChart3, FileText, Home, Settings, User } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

const nav: NavItem[] = [
  { to: "/parent", label: "Overview", icon: Home },
  { to: "/parent/student", label: "My Child", icon: User },
  { to: "/parent/progress", label: "Progress", icon: BarChart3 },
  { to: "/parent/activities", label: "Activities", icon: Activity },
  { to: "/parent/reports", label: "Reports", icon: FileText },
  { to: "/parent/settings", label: "Settings", icon: Settings },
];

export default function ParentLayout() {
  return <AppShell nav={nav} role="👨‍👩‍👧 Parent" user="Rohit"><Outlet /></AppShell>;
}
