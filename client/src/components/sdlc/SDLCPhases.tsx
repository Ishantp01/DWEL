
import { Check, CircleDot, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SDLCPhase } from "@/pages/SDLC";

interface SDLCPhasesProps {
  currentPhase: SDLCPhase;
  setCurrentPhase: (phase: SDLCPhase) => void;
  completedPhases: SDLCPhase[];
  canAccessPhase: (phase: SDLCPhase) => boolean;
}

const SDLCPhases = ({ 
  currentPhase, 
  setCurrentPhase, 
  completedPhases,
  canAccessPhase 
}: SDLCPhasesProps) => {
  
  const phases: { id: SDLCPhase; title: string }[] = [
    { id: "requirements", title: "Requirements" },
    { id: "design", title: "Design" },
    { id: "implementation", title: "Implementation" },
    { id: "verification", title: "Verification" },
    { id: "deploy", title: "Deploy" }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">SDLC Phases</h2>
      <div className="flex flex-wrap md:flex-nowrap justify-between mb-2">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex flex-col items-center mb-4 w-full md:w-auto">
            <button
              onClick={() => canAccessPhase(phase.id) && setCurrentPhase(phase.id)}
              disabled={!canAccessPhase(phase.id)}
              className={cn(
                "relative w-14 h-14 flex items-center justify-center rounded-full mb-2 transition-all",
                currentPhase === phase.id 
                  ? "bg-synergy-purple text-white ring-4 ring-synergy-purple/30" 
                  : completedPhases.includes(phase.id)
                    ? "bg-green-500 text-white"
                    : canAccessPhase(phase.id)
                      ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {completedPhases.includes(phase.id) ? (
                <Check className="h-6 w-6" />
              ) : currentPhase === phase.id ? (
                <CircleDot className="h-6 w-6" />
              ) : !canAccessPhase(phase.id) ? (
                <Lock className="h-5 w-5" />
              ) : null}
              
              {/* Green indicator light for current active phase */}
              {currentPhase === phase.id && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/30 animate-pulse" />
              )}
            </button>
            
            <span className={cn(
              "text-sm font-medium",
              currentPhase === phase.id ? "text-primary" : "text-muted-foreground"
            )}>
              {phase.title}
            </span>
            
            {index < phases.length - 1 && (
              <div className="hidden md:block w-16 h-0.5 bg-border self-center mt-7 -ml-8 -mr-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SDLCPhases;
