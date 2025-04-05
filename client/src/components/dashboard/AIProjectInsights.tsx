
import { BrainCircuit } from "lucide-react";

const insights = [
  {
    id: 1,
    text: "Team productivity peaks on Tuesday and Wednesday",
    type: "trend",
  },
  {
    id: 2,
    text: "Project X is likely to miss deadline by 2 days",
    type: "risk",
  },
  {
    id: 3,
    text: "Alex and Taylor have complementary skills for the upcoming task",
    type: "recommendation",
  },
  {
    id: 4,
    text: "Resource allocation for Project Y is suboptimal",
    type: "optimization",
  },
];

const AIProjectInsights = () => {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">AI Insights</h3>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">Refresh</button>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-lg border border-border bg-secondary/20 p-3 hover:bg-secondary/40"
          >
            <div className="flex items-start">
              <div
                className={`mr-2 mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                  insight.type === "trend"
                    ? "bg-blue-400"
                    : insight.type === "risk"
                    ? "bg-red-400"
                    : insight.type === "recommendation"
                    ? "bg-green-400"
                    : "bg-amber-400"
                }`}
              />
              <div>
                <p className="text-sm">{insight.text}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                    insight.type === "trend"
                      ? "bg-blue-500/20 text-blue-400"
                      : insight.type === "risk"
                      ? "bg-red-500/20 text-red-400"
                      : insight.type === "recommendation"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {insight.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProjectInsights;
