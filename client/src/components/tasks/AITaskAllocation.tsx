
import { BrainCircuit, RefreshCcw, User, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { DetailedTeamMember, getRankColor, getRankLabel } from "../team/TeamMemberProfile";
import { useState } from "react";
import { toast } from "sonner";

interface AIRecommendation {
  memberId: number;
  skillMatch: number;
  domainMatch: number;
  availabilityMatch: number;
  overallMatch: number;
  reasoning: string;
}

interface AITaskAllocationProps {
  projectDetails: {
    task: string;
    domain: string;
    skillsRequired: string[];
    recommendations: AIRecommendation[];
  };
  teamMembers: DetailedTeamMember[];
}

const rankIcons = {
  "broken-egg": "💔",
  "egg": "🥚",
  "silver-egg": "🥈",
  "golden-egg": "🏆",
};

const AITaskAllocation = ({ projectDetails, teamMembers }: AITaskAllocationProps) => {
  const [assignedMemberId, setAssignedMemberId] = useState<number | null>(null);

  const getMemberById = (id: number) => {
    return teamMembers.find((member) => member.id === id);
  };

  const handleAssign = (memberId: number) => {
    setAssignedMemberId(memberId);
    const member = getMemberById(memberId);
    if (member) {
      toast.success(`Task assigned to ${member.name}`, {
        description: `Successfully assigned "${projectDetails.task}" to ${member.name}`,
      });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Task Allocation</h2>
            <p className="text-sm text-muted-foreground">
              Team members are ranked based on skills, domain knowledge, and availability
            </p>
          </div>
        </div>
        <button className="flex items-center rounded-md bg-secondary px-3 py-2 text-sm hover:bg-secondary/80">
          <RefreshCcw className="mr-2 h-4 w-4" /> Recalculate Matches
        </button>
      </div>

      <div className="glass rounded-xl p-5 mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Task Analysis</h3>
          <p className="text-synergy-purple font-medium mt-1">{projectDetails.task}</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs">
            <span className="mr-1 text-muted-foreground">Domain:</span>
            <span className="font-medium">{projectDetails.domain}</span>
          </div>
          {projectDetails.skillsRequired.map((skill) => (
            <div key={skill} className="rounded-md bg-secondary/50 px-2 py-1 text-xs">
              <span className="mr-1 text-muted-foreground">Required Skill:</span>
              <span className="font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {projectDetails.recommendations.map((recommendation, index) => {
          const member = getMemberById(recommendation.memberId);
          if (!member) return null;

          const isAssigned = assignedMemberId === member.id;
          const isTopMatch = index === 0;

          return (
            <div
              key={recommendation.memberId}
              className={cn(
                "glass rounded-xl p-5 transition-all",
                isTopMatch && !isAssigned && "border border-primary/30",
                isAssigned && "border border-green-500/50 bg-green-500/5"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                    <User className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{member.name}</h3>
                      <div className={cn(
                        "ml-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium gap-1",
                        getRankColor(member.rank)
                      )}>
                        <span className="text-lg">{rankIcons[member.rank as keyof typeof rankIcons]}</span>
                        <span>{getRankLabel(member.rank)}</span>
                      </div>
                      {isTopMatch && !isAssigned && (
                        <div className="ml-2 flex items-center text-amber-400 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Top Match
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                {isAssigned ? (
                  <div className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white">
                    Assigned
                  </div>
                ) : (
                  <button
                    onClick={() => handleAssign(member.id)}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Assign Task
                  </button>
                )}
              </div>

              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="mb-1 text-sm font-medium">Skill Match</p>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${recommendation.skillMatch}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{recommendation.skillMatch}%</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium">Domain Knowledge</p>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{ width: `${recommendation.domainMatch}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{recommendation.domainMatch}%</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium">Availability</p>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-full rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          member.availability > 70
                            ? "bg-green-500"
                            : member.availability > 40
                            ? "bg-amber-500"
                            : "bg-red-500"
                        )}
                        style={{ width: `${member.availability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{member.availability}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">AI Reasoning</p>
                <div className="rounded-md bg-secondary/30 p-3">
                  <p className="text-sm">
                    {recommendation.reasoning}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        projectDetails.skillsRequired.includes(skill) 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AITaskAllocation;
