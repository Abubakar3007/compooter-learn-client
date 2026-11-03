import { PageTitle } from "@/components/ui-fun";
import { SettingsForm } from "@/components/settings-form";

export default function Settings() {
  return (
    <div>
      <PageTitle emoji="⚙️" title="Settings" />
      <SettingsForm name="Aarav" toggles={["Sound effects", "Daily reminder", "Dark code editor", "Show me on class leaderboard"]} />
    </div>
  );
}