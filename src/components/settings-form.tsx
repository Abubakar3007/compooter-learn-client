import { toast } from "sonner";
import { FunCard, GradientButton } from "./ui-fun";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function SettingsForm({ name, toggles }: { name: string; toggles: string[] }) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <FunCard className="space-y-3">
        <h2 className="text-xl">Account</h2>
        <Input defaultValue={name} className="h-11 rounded-xl" aria-label="Name" />
        <Input defaultValue={`${name.toLowerCase().replace(/\W+/g, ".")}@example.com`} className="h-11 rounded-xl" aria-label="Email" />
      </FunCard>
      <FunCard className="space-y-4">
        <h2 className="text-xl">Preferences</h2>
        {toggles.map((t, i) => <label key={t} className="flex items-center justify-between font-semibold">{t}<Switch defaultChecked={i !== 2} /></label>)}
      </FunCard>
      <GradientButton onClick={() => toast.success("Settings saved ✨")}>Save changes</GradientButton>
    </div>
  );
}
