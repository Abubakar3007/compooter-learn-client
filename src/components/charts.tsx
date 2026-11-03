import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FunCard } from "./ui-fun";

export function BarCard({ title, data, x, y }: { title: string; data: Record<string, unknown>[]; x: string; y: string }) {
  return (
    <FunCard>
      <h3 className="mb-3 text-lg">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer>
          <BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey={x} fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey={y} fill="var(--fun-purple)" radius={[10, 10, 0, 0]} /></BarChart>
        </ResponsiveContainer>
      </div>
    </FunCard>
  );
}

export function AreaCard({ title, data, x, ys }: { title: string; data: Record<string, unknown>[]; x: string; ys: string[] }) {
  const colors = ["var(--fun-cyan)", "var(--fun-pink)"];
  return (
    <FunCard>
      <h3 className="mb-3 text-lg">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer>
          <AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey={x} fontSize={12} /><YAxis fontSize={12} /><Tooltip />
            {ys.map((k, i) => <Area key={k} dataKey={k} stroke={colors[i]} fill={colors[i]} fillOpacity={0.25} strokeWidth={3} type="monotone" />)}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </FunCard>
  );
}
