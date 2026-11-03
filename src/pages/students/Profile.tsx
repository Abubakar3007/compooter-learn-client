// import { FunCard, PageTitle, Stat } from "@/components/ui-fun";
// import { useProgress } from "@/lib/progress";

// export default function Profile() {
//   const { progress } = useProgress();
//   return (
//     <div className="mx-auto max-w-3xl">
//       <PageTitle title="My Profile" />
//       <FunCard className="flex items-center gap-5">
//         <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-candy font-display text-4xl font-black text-on-fun">{progress.name[0]}</div>
//         <div><h2 className="text-3xl">{progress.name}</h2><p className="text-muted-foreground">{progress.className} · Level {Math.floor(progress.xp / 500) + 1} Coder</p>
//           <div className="mt-2 flex flex-wrap gap-1">{(progress.interests.length ? progress.interests : ["🎮 Games", "🤖 Robots", "🌐 Websites"]).map((i) => <span key={i} className="rounded-full bg-secondary px-3 py-0.5 text-xs font-bold">{i}</span>)}</div></div>
//       </FunCard>
//       <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
//         <Stat emoji="⭐" label="Total XP" value={progress.xp} color="yellow" />
//         <Stat emoji="✅" label="Lessons done" value={12 + progress.completed.length} color="green" />
//         <Stat emoji="🛠️" label="Projects" value={3} color="orange" />
//         <Stat emoji="🔥" label="Best streak" value={14} color="pink" />
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const AVATARS = ["🦊", "🐼", "🐯", "🦁", "🐸", "🐵", "🦄", "🐧", "🤖", "👾"];

const initialProgress = {
  name: "",
  lastName: "",
  nickname: "",
  email: "",
  avatar: "🦊",
  newsletter: false,
  showProfile: true,
  showCerts: true,
  showSpaces: true,
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("codequest-progress");
    return saved ? { ...initialProgress, ...JSON.parse(saved) } : initialProgress;
  });

  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const updateField = (key: any, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const dirty = JSON.stringify(form) !== JSON.stringify(profile);

  const valid =
    form.name.trim() &&
    form.lastName.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.nickname.trim();

  const profileLink = `https://codequest.app/u/${form.nickname || "me"}`;

  const saveProfile = () => {
    if (!valid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setProfile(form);
    localStorage.setItem("codequest-progress", JSON.stringify(form));
    toast.success("Profile saved");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
      toast.success("Link copied");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const resetPassword = () => {
    toast.info("Connect your password reset API to send a reset link.");
  };

  const deleteAccount = () => {
    const confirmed = window.confirm(
      "Delete your account? All saved profile data will be erased. This cannot be undone."
    );

    if (!confirmed) return;

    [
      "codequest-progress",
      "cq-attempts",
      "cq-challenges",
      "cq-practice",
      "cq-practice-drafts",
      "cq-snippets",
      "cq-certs",
      "cq-exams",
      "cq-days",
    ].forEach((key) => localStorage.removeItem(key));

    setProfile(initialProgress);
    setForm(initialProgress);

    toast.success("Account data deleted");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-500";

  return (
    <div className="max-w-[996px] p-4">
      <Toaster position="top-right" />

      <div className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-wrap items-start gap-4">
          <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gray-100 text-6xl">
            {form.avatar}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">
              {form.name} {form.lastName}
              <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                Free
              </span>
            </h1>

            <p className="text-sm text-gray-500">
              @{form.nickname || "nickname"}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="break-all text-gray-500">{profileLink}</span>
              <button
                onClick={copyLink}
                className="rounded border px-2 py-1 font-semibold"
              >
                Copy link
              </button>
            </div>

            {/* Avatar Selection */}
            <div className="mt-3 flex flex-wrap gap-2">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => updateField("avatar", avatar)}
                  className={`rounded-lg border px-2 py-1 text-xl ${form.avatar === avatar
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                    }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!dirty}
            onClick={saveProfile}
            className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white disabled:opacity-40"
          >
            Save changes
          </button>
        </div>

        {/* Upgrade */}
        <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-purple-500 p-4">
          <div>
            <h2 className="font-bold text-purple-600">Upgrade</h2>
            <p className="text-xs text-gray-500">
              Ad-free, focused, and packed with extras.
            </p>
          </div>

          <a
            href="/pricing"
            className="rounded-xl bg-purple-600 px-4 py-2 font-bold text-white"
          >
            Upgrade Now
          </a>
        </div>

        {/* Basic Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Basic information</h2>

          <label className="block text-sm font-semibold">Nickname *</label>
          <input
            className={inputClass}
            value={form.nickname}
            onChange={(e) =>
              updateField("nickname", e.target.value.replace(/\s/g, ""))
            }
            placeholder="Enter nickname"
          />

          <p className="text-xs text-gray-500">
            Your nickname will appear on the League and be visible to others.
          </p>

          {[
            {
              key: "showProfile",
              label: "Show profile",
              description: "Let classmates see your public profile.",
            },
            {
              key: "showCerts",
              label: "Show Certificates in Profile",
              description: "Show the certificates you've earned.",
            },
            {
              key: "showSpaces",
              label: "Show Spaces in Profile",
              description: "Show the coding spaces you've created.",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
            >
              <input
                type="checkbox"
                checked={form[item.key]}
                onChange={(e) => updateField(item.key, e.target.checked)}
              />

              <span>
                <span className="block text-sm font-bold">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500">
                  {item.description}
                </span>
              </span>
            </label>
          ))}
        </section>

        {/* Account Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Account information</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">
                First Name *
              </label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="First name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">
                Last Name *
              </label>
              <input
                className={inputClass}
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Your name will appear on your certificates.
          </p>

          <label className="block text-sm font-semibold">Email *</label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Enter email"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) =>
                updateField("newsletter", e.target.checked)
              }
            />
            Email me with news and updates
          </label>
        </section>

        {/* Password */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Password</h2>

          <button
            onClick={resetPassword}
            className="rounded-xl border px-4 py-2 text-sm font-bold"
          >
            Reset password
          </button>
        </section>

        {/* Delete Account */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-600">
            Delete Account
          </h2>

          <button
            onClick={deleteAccount}
            className="rounded-xl border border-red-500 px-4 py-2 text-sm font-bold text-red-600"
          >
            Delete My Account
          </button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
