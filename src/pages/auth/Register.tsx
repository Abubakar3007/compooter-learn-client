import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, Bar, GradientButton } from "@/components/ui-fun";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/lib/progress";
import { courses } from "@/data/content";
import { useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/site";
import { EmojiTile } from "@/components/ui-fun";
import type { Fun } from "@/data/content";
import { EyeOff, Eye } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";

// register page component
const classes = [5, 6, 7, 8, 9, 10, 11, 12].map((n) => `Class ${n}`);
const interests = ["🎮 Games", "💻 Computers", "🤖 Robots", "🎨 Designing", "🧠 Solving Problems", "📱 Apps", "🌐 Websites", "✨ AI", "🔐 Cybersecurity", "📊 Data"];
const levels = ["Complete Beginner", "I have tried coding", "Beginner", "Intermediate"];
const builds = [["🎮", "Games", "game-dev"], ["🌐", "Websites", "web-dev"], ["📱", "Apps", "app-dev"], ["🤖", "AI", "ai-basics"], ["🦾", "Robots", "python"], ["🎬", "Animations", "web-dev"]] as const;

// choice component
function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl cursor-pointer border-2 bg-card p-4 font-display font-extrabold transition hover:-translate-y-0.5",
        active
          ? "border-primary bg-secondary text-secondary-foreground shadow-pop"
          : "hover:border-primary/40"
      )}
    >
      {children}
    </button>
  );
}

export default function Register() {
  const [name, setName] = useState("");
  const [cls, setCls] = useState("");
  const [likes, setLikes] = useState<string[]>([]);
  const [lvl, setLvl] = useState("");
  const [build, setBuild] = useState<string>("");

  const { update } = useProgress();

  const [step, setStep] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { registerData, updateRegisterData, register, clearRegisterData } = useAuthStore();

  const { fullName, email, mobileNumber, password, className, interests: selectedInterests, codingLevel, buildPreference } = registerData;

  // Validation
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = fullName.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^\d{10}$/.test(mobileNumber) && password.length >= 8 && passwordsMatch;

  // Step validation
  const canNext = [
    isFormValid,
    !!className,
    selectedInterests.length > 0,
    !!codingLevel,
    !!buildPreference,
  ][step];

  // Selected course
  const pathCourse = courses.find((course) => course.id === builds.find((item) => item[1] === buildPreference)?.[2]);

  // Step 0: Account details
  const handleNext = () => {
    if (!isFormValid) return;
    setError("");
    setStep(1);
  };

  // Toggle interests
  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    updateRegisterData({
      interests: updated,
    });
  };

  // Final registration API
  const handleRegister = async () => {
    if (!canNext || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");

      // Send all registration data to backend
      await register();

      // Show success screen
      setStep(5);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Finish registration
  const finish = () => {
    update((previous) => ({
      ...previous,
      name: fullName,
      className,
      interests: selectedInterests,
      xp: previous.xp,
    }));

    clearRegisterData();
  };

  return (
    <>
      <SiteLayout className="min-h-screen bg-gradient-to-b from-secondary to-background px-4 py-8">
        <div className="mx-auto max-w-xl py-16 text-center">
          <div className="flex items-center justify-between">
            <Logo />
            <span className="text-sm font-bold text-muted-foreground">Step {step + 1} of 6</span>
          </div>
          <Bar value={((step + 1) / 6) * 100} className="mt-4" />
          <div key={step} className="mt-8 animate-pop rounded-[2rem] bg-card p-6 shadow-pop md:p-10">
            <h2 className="text-[30px] font-bold">Create your account</h2>

            {/* step 1 */}
            {step === 0 && (
              <div>
                <div className="mt-6 space-y-4 text-left">
                  {/* full name */}
                  <div>
                    <label htmlFor="email">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => updateRegisterData({ fullName: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  {/* email or mobile number */}
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => updateRegisterData({ email: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  {/* mobile number */}
                  <div>
                    <label htmlFor="email">Mobile Number</label>
                    <input
                      type="text"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      value={mobileNumber}
                      onChange={(e) => updateRegisterData({ mobileNumber: e.target.value.replace(/\D/g, "") })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  {/* password */}
                  <div>
                    <label htmlFor="email">Create Password</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => updateRegisterData({ password: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                      />
                      <button
                        type="button"
                        className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <Eye size={17} /> : <EyeOff size={17} />}
                      </button>
                    </div>
                  </div>
                  {/* confirm password */}
                  <div>
                    <label htmlFor="email">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                      />
                      {confirmPassword && !passwordsMatch && (
                        <p className="mt-1 text-sm text-red-500">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>
                  {/* continue button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isFormValid}
                    className={cn(
                      "w-full rounded-md bg-primary p-3 text-lg text-white",
                      !isFormValid &&
                      "cursor-not-allowed opacity-50"
                    )}
                  >
                    Continue
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="w-1/2 h-[1px] bg-slate-200 block"></span>
                    <span>OR</span>
                    <span className="w-1/2 h-[1px] bg-slate-200 block"></span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                        <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15z" />
                        <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.2A20 20 0 0 0 24 44z" />
                        <path fill="#FBBC05" d="M12.7 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18z" />
                        <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15l6.9 5.2c1.6-4.7 6.1-8.1 11.3-8.1z" />
                      </svg>
                    </button>
                    <button className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                        <circle cx="24" cy="24" r="21" fill="#1877F2" />
                        <path fill="#FFFFFF" d="M26.5 39V25.5h4.6l.7-5.3h-5.3v-3.4c0-1.5.4-2.5 2.6-2.5H32V9.6c-.5-.1-2.1-.2-4-.2-4 0-6.8 2.4-6.8 7v3.8h-4.6v5.3h4.6V39z" />
                      </svg>
                    </button>
                    <button className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                        <path fill="#000000" d="M33.4 25.4c0-5.1 4.2-7.5 4.4-7.6-2.4-3.5-6.1-4-7.4-4.1-3.1-.3-6.1 1.8-7.7 1.8-1.6 0-4.1-1.8-6.7-1.7-3.4.1-6.5 2-8.2 5.1-3.5 6.1-.9 15.2 2.5 20.2 1.7 2.5 3.7 5.3 6.3 5.2 2.5-.1 3.5-1.6 6.6-1.6 3.1 0 4 1.6 6.7 1.5 2.8-.1 4.5-2.5 6.1-5.1 1.9-2.9 2.7-5.8 2.7-6-.1 0-5.3-2-5.3-7.7zM28.3 10.3c1.4-1.7 2.3-4 2.1-6.3-2 .1-4.5 1.4-5.9 3.1-1.3 1.5-2.4 3.9-2.1 6.1 2.2.2 4.5-1.1 5.9-2.9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* step 2 */}
            {step === 1 && (
              <div className="mt-8">
                <h2 className="text-xl text-left">What class are you in? 🎒</h2>
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {classes.map((item) => (
                    <Choice
                      key={item}
                      active={className === item}
                      onClick={() => updateRegisterData({ className: item })}
                    >
                      {item}
                    </Choice>
                  ))}
                </div>
              </div>
            )}

            {/* step 3 */}
            {step === 2 && (<div className="mt-8">
              <h1 className="text-xl">What do you enjoy? 💖</h1>
              <p className="text-muted-foreground">Pick as many as you like.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {interests.map((item) => (
                  <Choice
                    key={item}
                    active={selectedInterests.includes(item)}
                    onClick={() => toggleInterest(item)}
                  >
                    {item}
                  </Choice>
                ))}
              </div>
            </div>)}

            {/* step 4 */}
            {step === 3 && (<div className="mt-8">
              <h1 className="text-xl">How much coding do you know? 💻</h1>
              <div className="mt-5 grid gap-3">
                {levels.map((item) => (
                  <Choice
                    key={item}
                    active={codingLevel === item}
                    onClick={() => updateRegisterData({ codingLevel: item })}
                  >
                    {item}
                  </Choice>
                ))}
              </div>
            </div>)}

            {/* step 5 */}
            {step === 4 && (<div className="mt-8">
              <h1 className="text-xl">What would you like to build? 🚀</h1>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {builds.map(([emoji, title]) => (
                  <Choice
                    key={title}
                    active={buildPreference === title}
                    onClick={() => updateRegisterData({ buildPreference: title })}
                  >
                    <div className="text-4xl">{emoji}</div>
                    {title}
                  </Choice>
                ))}
              </div>
            </div>)}

            {/* step 6 */}
            {step === 5 && (
              <div className="text-center">
                <div className="text-6xl">🎉</div>
                <h1 className="mt-3 text-4xl">
                  Welcome, {fullName}!
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Your learning adventure starts here.
                </p>
                <div className="mt-6 space-y-3 text-left">
                  {[
                    courses[0],
                    courses[1],
                    courses[2],
                    pathCourse ?? courses[4],
                  ].map((course, index) => (
                    <div
                      key={course.id + index}
                      className="flex items-center gap-3 rounded-2xl bg-muted p-3"
                    >
                      <span className="font-display text-xl font-black text-primary">
                        {index + 1}
                      </span>

                      <span className="text-2xl">
                        {course.emoji}
                      </span>

                      <span className="font-bold">
                        {course.title}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/student/dashboard"
                  onClick={finish}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-6 py-3 font-display text-lg font-extrabold text-on-fun shadow-pop"
                >
                  Go to my dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}

            {/* API Error */}
            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Navigation */}
            {step > 0 && step < 5 && (
              <div className="mt-8 flex justify-between">

                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep(step - 1);
                  }}
                  className="flex items-center gap-1 rounded-2xl px-4 py-2 font-bold hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {step < 4 ? (
                  <GradientButton
                    disabled={!canNext}
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                ) : (
                  <GradientButton
                    disabled={!canNext || isSubmitting}
                    onClick={handleRegister}
                  >
                    {isSubmitting
                      ? "Creating Account..."
                      : "Complete Registration"}

                    <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                )}
              </div>
            )}

          </div>
          <p className="mt-8 text-sm">Already have an account? <Link to="/login" className="font-bold text-primary">Login here</Link>
          </p>
        </div>
      </SiteLayout>
    </>
  );
}
