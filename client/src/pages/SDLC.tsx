import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SDLCPhases from "@/components/sdlc/SDLCPhases";
import SDLCContent from "@/components/sdlc/SDLCContent";
import SDLCTickets from "@/components/sdlc/SDLCTickets";
import SDLCGemini from "@/components/sdlc/SDLCGemini";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export type SDLCPhase = "requirements" | "design" | "implementation" | "verification" | "deploy";

const SDLC = () => {
  const [currentPhase, setCurrentPhase] = useState<SDLCPhase>("requirements");
  const [completedPhases, setCompletedPhases] = useState<SDLCPhase[]>([]);
  const [tasks, setTasks] = useState<any[]>([]); // Store all tasks

  useEffect(() => {
    document.title = "SynergyOS | SDLC Management";
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/my-tasks");
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ New function to update task status when phase is completed
  const updateTaskStatusForPhase = async (phase: SDLCPhase) => {
    try {
      await axios.patch("http://localhost:5000/api/tasks/update-status", {
        phase,
        status: "completed",
      });
      fetchTasks(); // Refresh tasks after updating
    } catch (error) {
      console.error("Error updating task statuses:", error);
    }
  };

  const completePhase = (phase: SDLCPhase) => {
    if (!completedPhases.includes(phase)) {
      setCompletedPhases((prev) => [...prev, phase]);
      updateTaskStatusForPhase(phase); // 🔥 Call API to update task status
    }
  };

  const canAccessPhase = (phase: SDLCPhase): boolean => {
    const phases: SDLCPhase[] = ["requirements", "design", "implementation", "verification", "deploy"];
    const phaseIndex = phases.indexOf(phase);
    const currentPhaseIndex = phases.indexOf(currentPhase);

    if (phase === currentPhase || completedPhases.includes(phase)) {
      return true;
    }

    if (phaseIndex === currentPhaseIndex + 1 && completedPhases.includes(currentPhase)) {
      return true;
    }

    return false;
  };

  // Filter tasks for the current phase
  const tasksForCurrentPhase = tasks.filter(
    (task) => task.currentPhase?.name?.toLowerCase() === currentPhase
  );

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">SDLC Management</h1>
        <p className="text-muted-foreground">
          Track and manage software development lifecycle phases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <SDLCPhases 
                currentPhase={currentPhase} 
                setCurrentPhase={setCurrentPhase} 
                completedPhases={completedPhases}
                canAccessPhase={canAccessPhase}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Phase Content</TabsTrigger>
                  <TabsTrigger value="tickets">Related Tickets</TabsTrigger>
                </TabsList>
                <TabsContent value="content">
                  <SDLCContent 
                    currentPhase={currentPhase} 
                    completePhase={completePhase} 
                    isCompleted={completedPhases.includes(currentPhase)}
                  />
                </TabsContent>
                <TabsContent value="tickets">
                  <SDLCTickets currentPhase={currentPhase} tasks={tasksForCurrentPhase} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <SDLCGemini currentPhase={currentPhase} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SDLC;
