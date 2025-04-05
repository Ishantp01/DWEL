
import { Award, Mail, Phone, User, Star, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { DetailedTeamMember, getRankColor, getRankLabel } from "./TeamMemberProfile";

interface TeamMemberCardProps {
  member: DetailedTeamMember;
  onClick: () => void;
}

const TeamMemberCard = ({ member, onClick }: TeamMemberCardProps) => {
  // Enhanced visual elements for each rank
  const rankVisuals = {
    "broken-egg": { 
      icon: "💔",
      bgGradient: "from-red-500/5 to-red-500/20",
      animation: ""
    },
    "egg": { 
      icon: "🥚",
      bgGradient: "from-amber-500/5 to-amber-500/20",
      animation: ""
    },
    "silver-egg": { 
      icon: "🥈",
      bgGradient: "from-slate-300/10 to-slate-300/30",
      animation: "animate-pulse"
    },
    "golden-egg": { 
      icon: "🏆",
      bgGradient: "from-purple-500/10 to-purple-500/30",
      animation: "animate-pulse"
    }
  };

  const rankVisual = rankVisuals[member.rank as keyof typeof rankVisuals];
  
  // Calculate stars based on rating
  const stars = Math.round(member.rating);

  return (
    <div 
      className={cn(
        "glass rounded-xl p-5 transition-all hover:shadow-md cursor-pointer border border-transparent hover:border-primary/20",
        `bg-gradient-to-br ${rankVisual.bgGradient}`
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <User className="h-7 w-7 text-foreground" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{member.name}</h3>
              <div
                className={cn(
                  "ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium",
                  getRankColor(member.rank),
                  rankVisual.animation
                )}
              >
                <span className="text-lg">{rankVisual.icon}</span>
                <span>{getRankLabel(member.rank)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-4 w-4", 
                i < stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
              )} 
            />
          ))}
        </div>
        <span className="ml-2 text-sm font-medium">{member.rating.toFixed(1)}</span>
        <div className="ml-auto flex items-center text-sm text-muted-foreground">
          <Shield className="mr-1 h-4 w-4" />
          {member.completedProjects} projects
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {member.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </span>
        ))}
        {member.skills.length > 3 && (
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            +{member.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4">
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

      <div className="mt-5 flex justify-between">
        <button className="flex items-center rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
          <Mail className="mr-1.5 h-3.5 w-3.5" />
          Email
        </button>
        <button className="flex items-center rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
          <Phone className="mr-1.5 h-3.5 w-3.5" />
          Call
        </button>
        <button className="flex items-center rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white hover:opacity-90">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Assign
        </button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
