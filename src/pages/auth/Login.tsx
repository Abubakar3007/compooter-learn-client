
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/site";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";

export default function Login() {
  const navigate = useNavigate();

  const { login, isLoading } = useAuthStore();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");

      const identifier = formData.identifier.trim();

      // Detect email or mobile number
      const isEmail = identifier.includes("@");

      await login({
        ...(isEmail
          ? { email: identifier }
          : { mobileNumber: identifier }),
        password: formData.password,
      });

      // Redirect after successful login
      navigate("/student/dashboard");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <SiteLayout className="min-h-screen bg-gradient-to-b from-secondary to-background px-4 py-8">
      <div className="mx-auto mt-8 max-w-xl animate-pop rounded-[2rem] bg-card px-4 py-16 p-6 text-center shadow-pop md:p-10">

        <h1 className="text-4xl">
          Welcome back! 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Login to continue your learning adventure.
        </p>

        <div className="mx-auto mt-6 max-w-[90%]">

          <h2 className="text-2xl font-bold">
            Login to your account
          </h2>

          <form
            onSubmit={handleLogin}
            className="mt-6 space-y-4 text-left"
          >

            {/* Email or Mobile Number */}
            <div>
              <label htmlFor="identifier">
                Email or Mobile Number
              </label>

              <input
                type="text"
                id="identifier"
                placeholder="Enter your email or mobile number"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({
                    ...formData, identifier: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password">
                Password
              </label>

              <div className="relative">

                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 pr-12 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setPasswordVisible(!passwordVisible)
                  }
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {passwordVisible ? (
                    <Eye size={17} />
                  ) : (
                    <EyeOff size={17} />
                  )}
                </button>

              </div>

              {/* Remember & Forgot Password */}
              <div className="mt-2 mb-4 flex items-center justify-between">

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-[6px] mt-[2px] h-4 w-4 cursor-pointer"
                  />

                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Error Message */}
              {error && (
                <p className="mb-3 text-sm text-red-500">
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer rounded-md bg-primary p-3 text-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

            </div>

            {/* OR */}
            <div className="flex items-center gap-1">
              <span className="block h-[1px] w-1/2 bg-slate-200" />
              <span>OR</span>
              <span className="block h-[1px] w-1/2 bg-slate-200" />
            </div>

            {/* Social Login */}
            <div className="flex items-center justify-center gap-4">

              {/* Google */}
              <button type="button" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="40"
                >
                  <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15z" />
                  <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.2A20 20 0 0 0 24 44z" />
                  <path fill="#FBBC05" d="M12.7 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18z" />
                  <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15l6.9 5.2c1.6-4.7 6.1-8.1 11.3-8.1z" />
                </svg>
              </button>

              {/* Facebook */}
              <button type="button" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="40"
                >
                  <circle cx="24" cy="24" r="21" fill="#1877F2" />
                  <path fill="#FFFFFF" d="M26.5 39V25.5h4.6l.7-5.3h-5.3v-3.4c0-1.5.4-2.5 2.6-2.5H32V9.6c-.5-.1-2.1-.2-4-.2-4 0-6.8 2.4-6.8 7v3.8h-4.6v5.3h4.6V39z" />
                </svg>
              </button>

              {/* Apple */}
              <button type="button" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="40"
                  height="40"
                >
                  <path fill="#000000" d="M33.4 25.4c0-5.1 4.2-7.5 4.4-7.6-2.4-3.5-6.1-4-7.4-4.1-3.1-.3-6.1 1.8-7.7 1.8-1.6 0-4.1-1.8-6.7-1.7-3.4.1-6.5 2-8.2 5.1-3.5 6.1-.9 15.2 2.5 20.2 1.7 2.5 3.7 5.3 6.3 5.2 2.5-.1 3.5-1.6 6.6-1.6 3.1 0 4 1.6 6.7 1.5 2.8-.1 4.5-2.5 6.1-5.1 1.9-2.9 2.7-5.8 2.7-6-.1 0-5.3-2-5.3-7.7zM28.3 10.3c1.4-1.7 2.1-4 2.1-6.3-2 .1-4.5 1.4-5.9 3.1-1.3 1.5-2.4 3.9-2.1 6.1 2.2.2 4.5-1.1 5.9-2.9z" />
                </svg>
              </button>

            </div>

          </form>
        </div>

        <p className="mt-8 text-sm">
          New here?{" "}
          <Link
            to="/register"
            className="font-bold text-primary"
          >
            Create a free account
          </Link>
        </p>

      </div>
    </SiteLayout>
  );
}
