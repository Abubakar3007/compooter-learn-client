
import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { totalCourses } from "@/data/content";
import { Logo } from "./ui-fun";
import useAuthStore from "@/stores/useAuthStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

const notes = [
  "🏅 You earned the Binary Master badge!",
  "🔥 Keep your 7-day streak alive today",
  "🆕 New lesson: Flowchart Symbols",
  "🎯 Daily Challenge is ready",
];

export function AppShell({
  nav,
  role,
  username,
  children,
}: {
  nav: NavItem[];
  role: string;
  username: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  const [unread, setUnread] = useState(notes.length);
  const [isOpen, setIsOpen] = useState<number>(-1);
  const [isTrue, setIsTrue] = useState(false);

  const {
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    getMe,
    logout,
  } = useAuthStore();

  // Restore authentication after browser refresh
  useEffect(() => {
    if (!isInitialized) {
      getMe();
    }
  }, [isInitialized, getMe]);

  const handleClick = (idx: number) => {
    setIsOpen((prev) => (prev === idx ? -1 : idx));
  };

  // Actual logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Wait until authentication is checked
  if (!isInitialized || (isLoading && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Protect dashboard
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-sidebar p-4 md:flex">
        <Logo to={nav[0]?.to || "/"} />

        <div className="mt-2 rounded-xl bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
          {role}
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
          {nav.map((n) => (
            <div key={n.to}>
              {n.label === "Courses" ? (
                <button
                  className={`flex w-full items-center cursor-pointer gap-3 rounded-xl px-3 py-2 text-sm relative font-semibold text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground ${isTrue
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-transparent"
                    }`}
                  onClick={() => setIsTrue((prev) => !prev)}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}

                  <div className="absolute right-3">
                    <ChevronDown
                      size={16}
                      className={`transition-all ease-in ${isTrue
                          ? "rotate-180"
                          : "rotate-0"
                        }`}
                    />
                  </div>
                </button>
              ) : (
                <Link
                  to={n.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm relative font-semibold text-muted-foreground transition hover:bg-secondary hover:text-secondary-foreground"
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              )}

              {n.label === "Courses" && (
                <div
                  className={`bg-secondary rounded-md space-y-1 overflow-hidden transition-all ${isTrue
                      ? "max-h-[2000px] opacity-100 ml-3 p-2"
                      : "max-h-0 opacity-0 mt-0 p-0"
                    }`}
                >
                  {totalCourses.map((data, i) => (
                    <div key={data.topic}>
                      <button
                        onClick={() => handleClick(i)}
                        className={`flex justify-between items-center w-full text-left cursor-pointer px-3 text-[13px] rounded-full py-2 transition hover:bg-white font-semibold ${isOpen === i
                            ? "bg-white"
                            : "bg-transparent"
                          }`}
                      >
                        <span className="line-clamp-1">
                          {data.topic}
                        </span>

                        <ChevronDown
                          size={16}
                          className={`transition-all ease-in ${isOpen === i
                              ? "rotate-180"
                              : "rotate-0"
                            }`}
                        />
                      </button>

                      {isOpen === i && (
                        <ul className="my-2 bg-white text-[13px] rounded-md ml-2 p-2">
                          {data.topics.map((t) => (
                            <li key={t.heading}>
                              <Link
                                to=""
                                className="py-1.5 px-3 hover:bg-secondary rounded-full transition-all ease-in flex justify-between items-center"
                              >
                                <span className="line-clamp-1">
                                  {t.heading}
                                </span>

                                <ArrowRight
                                  size={13}
                                  className="flex-shrink-0"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="glass sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 md:px-8">
          <div className="md:hidden">
            <Logo to={nav[0]?.to || "/"} />
          </div>

          <div className="hidden text-sm font-semibold text-muted-foreground md:block">
            Welcome, {user?.fullName || username}
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu
              onOpenChange={(o) => o && setUnread(0)}
            >
              <DropdownMenuTrigger
                className="relative rounded-xl p-2 hover:bg-secondary"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                {unread > 0 && (
                  <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-fun-pink text-[10px] font-bold text-on-fun">
                    {unread}
                  </span>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 rounded-2xl"
              >
                <DropdownMenuLabel>
                  Notifications
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {notes.map((n) => (
                  <DropdownMenuItem
                    key={n}
                    className="rounded-xl py-2"
                  >
                    {n}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-candy font-bold text-on-fun">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-10">
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <nav className="glass fixed inset-x-0 bottom-0 z-40 flex justify-around border-t py-2 md:hidden">
        {nav.slice(0, 5).map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="flex flex-col items-center gap-0.5 px-2 text-[10px] font-semibold text-muted-foreground"
          >
            <n.icon className="h-5 w-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
