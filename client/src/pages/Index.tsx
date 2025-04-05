
import { useEffect } from "react";
import { Rocket, Target, Sparkles, Zap, BarChart3 } from "lucide-react";
import TaskOverview from "@/components/dashboard/TaskOverview";
import TeamWorkload from "@/components/dashboard/TeamWorkload";
import ProjectStatus from "@/components/dashboard/ProjectStatus";
import AIProjectInsights from "@/components/dashboard/AIProjectInsights";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  useEffect(() => {
    document.title = "SynergyOS | Dashboard";
  }, []);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Welcome to SynergyOS</h1>
        <p className="text-muted-foreground">Your futuristic business operations platform</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="bg-gradient-to-br from-synergy-purple/20 to-transparent border-synergy-purple/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">Current Sprint</h3>
                <p className="text-muted-foreground">Sprint 23: AI Integration</p>
                <div className="mt-4 flex items-center">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-synergy-purple rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-synergy-purple/20">
                <Rocket className="h-6 w-6 text-synergy-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-synergy-blue/20 to-transparent border-synergy-blue/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">Team Efficiency</h3>
                <p className="text-muted-foreground">4% increase this week</p>
                <div className="mt-4 flex items-center">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-synergy-blue rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">82%</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-synergy-blue/20">
                <Zap className="h-6 w-6 text-synergy-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/20 to-transparent border-amber-500/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">Weekly Goals</h3>
                <p className="text-muted-foreground">3 of 5 completed</p>
                <div className="mt-4 flex items-center">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">60%</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-amber-500/20">
                <Target className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TaskOverview />
        <TeamWorkload />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProjectStatus />
        <div className="lg:col-span-2">
          <AIProjectInsights />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
