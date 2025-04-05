
import { ArrowLeft, Award, CheckCircle, ExternalLink, Mail, Phone, Star, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Project {
  id: number;
  name: string;
  role: string;
  duration: string;
  rating: number;
  feedback: string;
}

export interface DetailedTeamMember {
  id: number;
  name: string;
  role: string;
  skills: string[];
  avatar: string | null;
  email: string;
  phone: string;
  availability: number;
  bio: string;
  joinedDate: string;
  rating: number;
  rank: "broken-egg" | "egg" | "silver-egg" | "golden-egg";
  completedProjects: number;
  projects: Project[];
  strengths: string[];
  areasToImprove: string[];
  domains: string[];
}

export const getRankLabel = (rank: DetailedTeamMember["rank"]) => {
  switch (rank) {
    case "broken-egg":
      return "Broken Egg";
    case "egg":
      return "Egg";
    case "silver-egg":
      return "Silver Egg";
    case "golden-egg":
      return "Golden Egg";
    default:
      return "Unranked";
  }
};

export const getRankColor = (rank: DetailedTeamMember["rank"]) => {
  switch (rank) {
    case "broken-egg":
      return "bg-red-500/20 text-red-400";
    case "egg":
      return "bg-amber-500/20 text-amber-400";
    case "silver-egg":
      return "bg-slate-300/30 text-slate-300";
    case "golden-egg":
      return "bg-purple-500/20 text-purple-400";
    default:
      return "bg-secondary text-muted-foreground";
  }
};

interface TeamMemberProfileProps {
  member: DetailedTeamMember;
  onBack: () => void;
}

const TeamMemberProfile = ({ member, onBack }: TeamMemberProfileProps) => {
  const calculateAverageRating = (projects: Project[]) => {
    if (projects.length === 0) return 0;
    const sum = projects.reduce((total, project) => total + project.rating, 0);
    return sum / projects.length;
  };

  const averageRating = calculateAverageRating(member.projects);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs font-medium hover:bg-secondary"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to Team
        </button>
        <h1 className="text-2xl font-bold">Team Member Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <User className="h-12 w-12 text-foreground" />
            </div>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-muted-foreground">{member.role}</p>
            
            <div className="mt-2 flex items-center justify-center">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                  getRankColor(member.rank)
                )}
              >
                <Award className="mr-1 h-4 w-4" />
                {getRankLabel(member.rank)}
              </span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-5 w-5",
                      star <= averageRating ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm font-medium">{averageRating.toFixed(1)} Average Rating</p>
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{member.phone}</span>
              </div>
              <div className="mt-2">
                <p className="mb-1 text-sm text-muted-foreground">Availability</p>
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

            <div className="mt-4 w-full">
              <p className="mb-1 text-sm font-medium">Joined</p>
              <p className="text-sm text-muted-foreground">{member.joinedDate}</p>
            </div>

            <div className="mt-4 w-full">
              <p className="mb-1 text-sm font-medium">Completed Projects</p>
              <p className="text-xl font-bold">{member.completedProjects}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <h3 className="mb-4 text-lg font-medium">About</h3>
            <p className="text-muted-foreground">{member.bio}</p>
            
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Domains</h4>
              <div className="flex flex-wrap gap-2">
                {member.domains.map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-medium">Strengths</h4>
                <ul className="space-y-1">
                  {member.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium">Areas to Improve</h4>
                <ul className="space-y-1">
                  {member.areasToImprove.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="mb-4 text-lg font-medium">Project History</h3>
            <div className="space-y-4">
              {member.projects.map((project) => (
                <Card key={project.id} className="border-border bg-secondary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-3.5 w-3.5",
                              star <= project.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription className="flex items-center justify-between">
                      <span>{project.role}</span>
                      <span>{project.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">{project.feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfile;
