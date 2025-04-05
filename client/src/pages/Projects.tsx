
import { useEffect, useState } from "react";
import { ChevronDown, ListFilter } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import KanbanBoard from "@/components/projects/KanbanBoard";

const Projects = () => {
  useEffect(() => {
    document.title = "SynergyOS | Projects";
  }, []);

  const [viewMode, setViewMode] = useState<"kanban" | "gantt">("kanban");

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <p className="text-muted-foreground">Manage and track your projects</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm hover:bg-secondary/30">
              <span>All Projects</span>
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </button>
          </div>
          <button className="flex h-9 items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm hover:bg-secondary/30">
            <ListFilter className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex rounded-md border border-input p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                viewMode === "kanban"
                  ? "bg-primary text-white"
                  : "bg-transparent hover:bg-secondary/30"
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode("gantt")}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                viewMode === "gantt"
                  ? "bg-primary text-white"
                  : "bg-transparent hover:bg-secondary/30"
              }`}
            >
              Gantt
            </button>
          </div>
          <button className="ml-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            New Project
          </button>
        </div>
      </div>

      {viewMode === "kanban" ? (
        <KanbanBoard />
      ) : (
        <div className="glass rounded-xl p-6 text-center">
          <h3 className="text-lg font-medium">Gantt View</h3>
          <p className="mt-2 text-muted-foreground">
            Gantt chart view will be implemented in the next version.
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default Projects;
