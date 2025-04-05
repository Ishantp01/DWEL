
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award } from "lucide-react";

const data = [
  {
    name: "Alex J.",
    tasks: 12,
    overdue: 1,
    rank: "golden-egg"
  },
  {
    name: "Sam W.",
    tasks: 8,
    overdue: 0,
    rank: "silver-egg"
  },
  {
    name: "Taylor C.",
    tasks: 15,
    overdue: 3,
    rank: "golden-egg"
  },
  {
    name: "Jamie S.",
    tasks: 9,
    overdue: 2,
    rank: "egg"
  },
  {
    name: "Riley P.",
    tasks: 6,
    overdue: 0,
    rank: "silver-egg"
  },
  {
    name: "Morgan L.",
    tasks: 14,
    overdue: 4,
    rank: "broken-egg"
  },
];

const rankColors = {
  "broken-egg": "#F87171", // red-400
  "egg": "#FBBF24", // amber-400
  "silver-egg": "#94A3B8", // slate-400
  "golden-egg": "#A78BFA", // purple-400
};

const rankLabels = {
  "broken-egg": "Broken Egg",
  "egg": "Egg",
  "silver-egg": "Silver Egg",
  "golden-egg": "Golden Egg",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const member = data.find((d) => d.name === label);
    const rank = member?.rank || "egg";
    
    return (
      <div className="rounded-md border border-border bg-background p-2 text-sm shadow-md">
        <p className="mb-1 font-medium">{label}</p>
        <div className="mb-1 flex items-center">
          <Award className="mr-1 h-3 w-3" style={{ color: rankColors[rank as keyof typeof rankColors] }} />
          <span style={{ color: rankColors[rank as keyof typeof rankColors] }}>
            {rankLabels[rank as keyof typeof rankLabels]}
          </span>
        </div>
        <p className="text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: "#33C3F0" }}></span>
          Tasks: {payload[0].value}
        </p>
        <p className="text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{ backgroundColor: "#D946EF" }}></span>
          Overdue: {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const TeamWorkload = () => {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Workload</h3>
        <button className="text-sm font-medium text-primary hover:underline">View Details</button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#33334d" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#33334d" }} />
            <YAxis tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#33334d" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="tasks" fill="#33C3F0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="overdue" fill="#D946EF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex justify-center gap-4">
        {Object.entries(rankLabels).map(([key, label]) => (
          <div key={key} className="flex items-center">
            <Award 
              className="mr-1 h-4 w-4" 
              style={{ color: rankColors[key as keyof typeof rankColors] }} 
            />
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamWorkload;
