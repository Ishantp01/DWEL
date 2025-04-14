import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

type Project = {
  id: string;
  name: string;
  client: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: "planning" | "development" | "testing" | "deployment" | "completed";
};

const Projects = () => {
  const navigate = useNavigate();
  
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      client: "Acme Corp",
      description: "Complete redesign of company website",
      progress: 75,
      startDate: "2023-06-01",
      endDate: "2023-09-30",
      status: "development"
    },
    // ... more projects
  ]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/sdlc/${projectId}`);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Client Projects</h1>
        <p className="text-muted-foreground">View and manage all your assigned projects</p>
      </div>

      <div className="mb-6 flex justify-end">
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          New Project
        </button>
      </div>

      {/* Projects Grid - now complete */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="group cursor-pointer rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Project card content */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary">
                  {project.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {project.client}
                </p>
              </div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                project.status === 'planning' ? 'bg-purple-100 text-purple-800' :
                project.status === 'development' ? 'bg-blue-100 text-blue-800' :
                project.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                project.status === 'deployment' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                {project.status}
              </span>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
              {project.description}
            </p>

            <div className="text-xs text-gray-500 mb-2">
              {project.startDate} - {project.endDate}
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">Completion</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div 
                  className={`h-2 rounded-full ${
                    project.progress < 30 ? 'bg-red-500' :
                    project.progress < 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Projects;