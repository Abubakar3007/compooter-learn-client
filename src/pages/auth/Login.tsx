import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/site";
import { EmojiTile } from "@/components/ui-fun";
import type { Fun } from "@/data/content";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const roles: { e: string; t: string; d: string; c: Fun; to: string }[] = [
  { e: "🎒", t: "Student", d: "Continue your adventure", c: "purple", to: "/student/dashboard" },
  { e: "👨‍👩‍👧", t: "Parent", d: "See your child's progress", c: "orange", to: "/parent" },
  { e: "🍎", t: "Teacher", d: "Manage classes", c: "green", to: "/teacher" },
  { e: "🛠️", t: "Admin", d: "Run the platform", c: "blue", to: "/admin" },
];

export default function Login() {
  const nav = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background px-4 py-8">
      <div className="mx-auto max-w-xl px-4 py-16 text-center mt-8 animate-pop rounded-[2rem] bg-card p-6 shadow-pop md:p-10">
        <h1 className="text-4xl">Welcome back! 👋</h1>
        <p className="mt-2 text-muted-foreground">Demo mode — pick who you are to jump in.</p>
        <div className="mt-6 max-w-[90%] mx-auto">
          <h2 className="text-2xl font-bold">Login to your account</h2>
          <form className="mt-6 space-y-4 text-left">
            {/* email or mobile number */}
            <div>
              <label htmlFor="email">Email or Mobile Number</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email or mobile number"
                className="mt-1 block w-full rounded-md px-4 py-3 border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="email">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your email or mobile number"
                  className="mt-1 block w-full cursor-pointer rounded-md px-4 py-3 border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
              </div>
              <div className="mt-2 mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-[6px] mt-[2px] cursor-pointer w-4 h-4" />
                  <label htmlFor="remember" className="text-sm cursor-pointer">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary font-semibold hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" className="bg-primary text-white p-3 rounded-md w-full text-lg cursor-pointer">Login</button>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1/2 h-[1px] bg-slate-200 block"></span>
              <span>OR</span>
              <span className="w-1/2 h-[1px] bg-slate-200 block"></span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40" height="40">
                  <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15z" />
                  <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.2A20 20 0 0 0 24 44z" />
                  <path fill="#FBBC05" d="M12.7 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18z" />
                  <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15l6.9 5.2c1.6-4.7 6.1-8.1 11.3-8.1z" />
                </svg>
              </button>
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40" height="40">
                  <circle cx="24" cy="24" r="21" fill="#1877F2" />
                  <path fill="#FFFFFF" d="M26.5 39V25.5h4.6l.7-5.3h-5.3v-3.4c0-1.5.4-2.5 2.6-2.5H32V9.6c-.5-.1-2.1-.2-4-.2-4 0-6.8 2.4-6.8 7v3.8h-4.6v5.3h4.6V39z" />
                </svg>
              </button>
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40" height="40">
                  <path fill="#000000" d="M33.4 25.4c0-5.1 4.2-7.5 4.4-7.6-2.4-3.5-6.1-4-7.4-4.1-3.1-.3-6.1 1.8-7.7 1.8-1.6 0-4.1-1.8-6.7-1.7-3.4.1-6.5 2-8.2 5.1-3.5 6.1-.9 15.2 2.5 20.2 1.7 2.5 3.7 5.3 6.3 5.2 2.5-.1 3.5-1.6 6.6-1.6 3.1 0 4 1.6 6.7 1.5 2.8-.1 4.5-2.5 6.1-5.1 1.9-2.9 2.7-5.8 2.7-6-.1 0-5.3-2-5.3-7.7zM28.3 10.3c1.4-1.7 2.3-4 2.1-6.3-2 .1-4.5 1.4-5.9 3.1-1.3 1.5-2.4 3.9-2.1 6.1 2.2.2 4.5-1.1 5.9-2.9z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <p className="mt-8 text-sm">New here? <Link to="/register" className="font-bold text-primary">Create a free account</Link></p>
      </div>
    </div>
  );
}
