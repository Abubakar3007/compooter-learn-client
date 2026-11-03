import { PageTitle } from "@/components/ui-fun";
import { ReportList } from "@/components/reports";

export default function Reports() {
  return (
    <div><PageTitle emoji="📊" title="Reports" />
      <ReportList items={[{ t: "Weekly Report — Oct 1–7", d: "4h 7m learned · 12 lessons · 3 badges" }, { t: "Monthly Report — September", d: "16h learned · 34 lessons · 1 project" }, { t: "Career Interest Report", d: "Top matches: AI, Game Dev, Software" }]} />
    </div>
  );
}
