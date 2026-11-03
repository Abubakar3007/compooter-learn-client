import { PageTitle } from "@/components/ui-fun";
import { SettingsForm } from "@/components/settings-form";

export default function Settings() {
  return <div><PageTitle emoji="⚙️" title="Settings" /><SettingsForm name="Rohit Sharma" toggles={["Weekly email report", "Badge notifications", "Daily screen-time limit (1 hour)", "Allow sharing projects with class"]} /></div>;
}
