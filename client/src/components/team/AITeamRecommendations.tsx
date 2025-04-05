
import { BrainCircuit, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRankColor, getRankLabel, DetailedTeamMember } from "./TeamMemberProfile";

interface AIRecommendation {
  memberId: number;
  skillMatch: number;
  domainMatch: number;
  availabilityMatch: number;
  overallMatch: number;
  reasoning: string;
}

interface AITeamRecommendationsProps {
  task: string;
  domain: string;
  skillsRequired: string[];
  recommendations: AIRecommendation[];
  teamMembers: DetailedTeamMember[];
  onAssign: (memberId: number) => void;
}

const AITeamRecommendations = ({
  task,
  domain,
  skillsRequired,
  recommendations,
  teamMembers,
  onAssign,
}: AITeamRecommendationsProps) => {
  const getMemberById = (id: number) => {
    return teamMembers.find((member) => member.id === id);
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <BrainCircuit className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold">AI Team Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            For task: <span className="font-medium text-foreground">{task}</span>
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs">
          <span className="mr-1 text-muted-foreground">Domain:</span>
          <span className="font-medium">{domain}</span>
        </div>
        {skillsRequired.map((skill) => (
          <div key={skill} className="rounded-md bg-secondary/50 px-2 py-1 text-xs">
            <span className="mr-1 text-muted-foreground">Skill:</span>
            <span className="font-medium">{skill}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {recommendations.map((recommendation) => {
          const member = getMemberById(recommendation.memberId);
          if (!member) return null;

          return (
            <div
              key={recommendation.memberId}
              className="rounded-lg border border-border bg-secondary/10 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                    <User className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{member.name}</h3>
                      <span
                        className={cn(
                          "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                          getRankColor(member.rank)
                        )}
                      >
                        {getRankLabel(member.rank)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => onAssign(member.id)}
                  className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white hover:opacity-90"
                >
                  Assign
                </button>
              </div>

              <div className="mb-3 grid gap-2 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Skill Match</p>
                  <div className="mt-1 flex items-center">
                    <div className="mr-2 h-1.5 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-blue-400"
                        style={{ width: `${recommendation.skillMatch}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{recommendation.skillMatch}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Domain Match</p>
                  <div className="mt-1 flex items-center">
                    <div className="mr-2 h-1.5 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-purple-400"
                        style={{ width: `${recommendation.domainMatch}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{recommendation.domainMatch}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Availability</p>
                  <div className="mt-1 flex items-center">
                    <div className="mr-2 h-1.5 w-full rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          member.availability > 70
                            ? "bg-green-500"
                            : member.availability > 40
                            ? "bg-amber-500"
                            : "bg-red-500"
                        )}
                        style={{ width: `${recommendation.availabilityMatch}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{recommendation.availabilityMatch}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-secondary/30 p-2">
                <p className="text-xs">
                  <span className="font-medium text-primary">AI reasoning:</span> {recommendation.reasoning}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AITeamRecommendations;
