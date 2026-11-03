import { PageTitle } from "@/components/ui-fun";
import { ReportList } from "@/components/reports";
import { classes } from "@/data/content";

export default function Reports() {
  return <div><PageTitle emoji="📊" title="Reports" /><ReportList items={classes.map((c) => ({ t: `${c.name} — October report`, d: `${c.students} students · avg ${c.avgProgress}% · ${c.course}` }))} /></div>;
}
