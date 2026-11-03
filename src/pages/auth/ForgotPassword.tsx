import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Phone,
    ShieldCheck,
    LockKeyhole,
    Loader2,
    Eye,
    EyeOff,
} from "lucide-react";

type Step = "mobile" | "otp" | "password";

export default function ForgotPassword() {
    const [step, setStep] = useState<Step>("mobile");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        setLoading(true);

        try {
            // TODO: Connect your backend API.
            // await axios.post("/api/auth/forgot-password/send-otp", { mobile });

            throw new Error("API_NOT_CONNECTED");
        } catch {
            setError("OTP service is not connected yet. Please connect your backend API.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter the 6-digit OTP.");
            return;
        }

        setLoading(true);

        try {
            // TODO: Verify OTP with your backend.
            // await axios.post("/api/auth/forgot-password/verify-otp", {
            //   mobile,
            //   otp,
            // });

            throw new Error("API_NOT_CONNECTED");
        } catch {
            setError("OTP verification API is not connected yet.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            // TODO: Reset password using the verified OTP/session.
            // await axios.post("/api/auth/forgot-password/reset", {
            //   mobile,
            //   otp,
            //   password,
            // });

            throw new Error("API_NOT_CONNECTED");
        } catch {
            setError("Password reset API is not connected yet.");
        } finally {
            setLoading(false);
        }
    };

    const titles = {
        mobile: "Forgot password?",
        otp: "Verify your number",
        password: "Create new password",
    };

    const descriptions = {
        mobile: "Enter your registered mobile number to receive a verification code.",
        otp: `Enter the 6 - digit OTP sent to + 91 ${mobile}.`,
        password: "Choose a strong password to secure your account.",
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-7 shadow-xl sm:p-10">
                <div className="mx-auto max-w-[90%]">
                    <Link
                        to="/login"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                    >
                        <ArrowLeft size={18} />
                        Back to login
                    </Link>

                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                        {step === "mobile" && <Phone size={30} />}
                        {step === "otp" && <ShieldCheck size={30} />}
                        {step === "password" && <LockKeyhole size={30} />}
                    </div>

                    <div className="mb-7">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            {titles[step]}
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {descriptions[step]}
                        </p>
                    </div>

                    {step === "mobile" && (
                        <form onSubmit={handleSendOtp} className="space-y-5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Mobile number
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                                <span className="flex items-center border-r border-gray-200 px-4 font-semibold text-gray-600">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel-national"
                                    maxLength={10}
                                    placeholder="9876543210"
                                    value={mobile}
                                    onChange={(e) =>
                                        setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                                    }
                                    className="w-full bg-transparent px-4 py-3 outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {step === "otp" && (
                        <form onSubmit={handleVerifyOtp} className="space-y-5">
                            <label className="block text-sm font-semibold text-gray-700">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                placeholder="000000"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOtp("");
                                    setError("");
                                    setStep("mobile");
                                }}
                                className="w-full text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Change mobile number
                            </button>
                        </form>
                    )}

                    {step === "password" && (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    New password
                                </label>

                                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 pr-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="At least 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent px-4 py-3 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {loading ? "Updating..." : "Reset password"}
                            </button>
                        </form>
                    )}

                    {error && (
                        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                            {message}
                        </p>
                    )}

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}