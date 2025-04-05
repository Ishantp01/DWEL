
import { cn } from "@/lib/utils";

const tasks = [
  {
    id: 1,
    title: "Redesign dashboard layout",
    due: "Today",
    priority: "high",
    assignee: "Alex Johnson",
    progress: 75,
  },
  {
    id: 2,
    title: "Implement authentication logic",
    due: "Tomorrow",
    priority: "medium",
    assignee: "Sam Williams",
    progress: 45,
  },
  {
    id: 3,
    title: "Create API documentation",
    due: "3 days",
    priority: "low",
    assignee: "Taylor Chen",
    progress: 20,
  },
  {
    id: 4,
    title: "Fix pagination issues",
    due: "Today",
    priority: "high",
    assignee: "Jamie Smith",
    progress: 90,
  },
];

const TaskOverview = () => {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Task Overview</h3>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-lg border border-border bg-secondary/20 p-3 hover:bg-secondary/40">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">{task.title}</h4>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  task.priority === "high" && "bg-red-500/20 text-red-400",
                  task.priority === "medium" && "bg-amber-500/20 text-amber-400",
                  task.priority === "low" && "bg-green-500/20 text-green-400"
                )}
              >
                {task.priority}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>Due: {task.due}</span>
              <span>Assignee: {task.assignee}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  "h-full rounded-full",
                  task.progress >= 70 ? "bg-green-500" : task.progress >= 40 ? "bg-amber-500" : "bg-red-500"
                )}
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <div className="mt-1 text-right text-xs text-muted-foreground">{task.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOverview;
