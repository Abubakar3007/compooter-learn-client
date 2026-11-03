import { PageTitle } from "@/components/ui-fun";
import { DataTable } from "@/components/data-table";
import { students } from "@/data/content";

export default function Students() {
  return (
    <div><PageTitle emoji="👩‍🎓" title="Students" />
      <DataTable noun="Student" rows={students} columns={[{ key: "name", label: "Name" }, { key: "className", label: "Class" }, { key: "xp", label: "XP" }, { key: "progress", label: "Progress %" }, { key: "lastActive", label: "Last active" }]} />
    </div>
  );
}
