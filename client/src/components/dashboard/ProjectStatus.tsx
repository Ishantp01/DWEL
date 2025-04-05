
import { cn } from "@/lib/utils";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const data = [
  { name: "Completed", value: 35, color: "#0EA5E9" },
  { name: "In Progress", value: 45, color: "#9b87f5" },
  { name: "Not Started", value: 20, color: "#D946EF" },
];

const ProjectStatus = () => {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Project Status</h3>
        <button className="text-sm font-medium text-primary hover:underline">View All Projects</button>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1F2C",
                  border: "1px solid #33334d",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          {data.map((status) => (
            <div key={status.name} className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
                <span className="text-sm">{status.name}</span>
              </div>
              <span className="text-lg font-semibold">{status.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
