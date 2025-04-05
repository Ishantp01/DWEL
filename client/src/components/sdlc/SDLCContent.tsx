
import { useState } from "react";
import { PlusCircle, FileText, Pencil, Code, CheckCircle, Rocket, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SDLCPhase } from "@/pages/SDLC";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SDLCContentProps {
  currentPhase: SDLCPhase;
  completePhase: (phase: SDLCPhase) => void;
  isCompleted: boolean;
}

interface PhaseItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

const SDLCContent = ({ currentPhase, completePhase, isCompleted }: SDLCContentProps) => {
  const [items, setItems] = useState<Record<SDLCPhase, PhaseItem[]>>({
    requirements: [
      { 
        id: "req-1", 
        title: "Product Specification", 
        description: "Complete product specification document outlining core features", 
        link: "#" 
      },
      { 
        id: "req-2", 
        title: "User Stories", 
        description: "Collection of user stories and acceptance criteria", 
        link: "#" 
      }
    ],
    design: [
      { 
        id: "design-1", 
        title: "UI/UX Mockups", 
        description: "High-fidelity mockups for all application screens", 
        link: "https://figma.com" 
      },
      { 
        id: "design-2", 
        title: "Architecture Diagram", 
        description: "System architecture and component diagram", 
        link: "#" 
      }
    ],
    implementation: [
      { 
        id: "impl-1", 
        title: "Frontend Repository", 
        description: "React application codebase with component structure", 
        link: "https://github.com" 
      },
      { 
        id: "impl-2", 
        title: "Backend Repository", 
        description: "API service implementation with endpoints", 
        link: "https://github.com" 
      }
    ],
    verification: [
      { 
        id: "verify-1", 
        title: "QA Test Plan", 
        description: "Comprehensive test cases for application features", 
        link: "#" 
      },
      { 
        id: "verify-2", 
        title: "Client Feedback", 
        description: "Stakeholder review and feedback document", 
        link: "#" 
      }
    ],
    deploy: [
      { 
        id: "deploy-1", 
        title: "Deployment Plan", 
        description: "Production deployment steps and rollback procedure", 
        link: "#" 
      },
      { 
        id: "deploy-2", 
        title: "Release Notes", 
        description: "Version details and feature changelog", 
        link: "#" 
      }
    ]
  });

  const getPhaseIcon = (phase: SDLCPhase) => {
    switch (phase) {
      case "requirements": return <FileText className="h-5 w-5" />;
      case "design": return <Pencil className="h-5 w-5" />;
      case "implementation": return <Code className="h-5 w-5" />;
      case "verification": return <CheckCircle className="h-5 w-5" />;
      case "deploy": return <Rocket className="h-5 w-5" />; // Changed from RocketLaunch to Rocket
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getPhaseTitle = (phase: SDLCPhase): string => {
    switch (phase) {
      case "requirements": return "Requirements Documentation";
      case "design": return "Design Assets & Specifications";
      case "implementation": return "Implementation Resources";
      case "verification": return "Testing & Validation";
      case "deploy": return "Deployment Resources";
      default: return "";
    }
  };

  const getPhaseDescription = (phase: SDLCPhase): string => {
    switch (phase) {
      case "requirements": return "Requirement documents, specifications, and user stories";
      case "design": return "UI/UX designs, wireframes, and architecture diagrams";
      case "implementation": return "Source code repositories and development resources";
      case "verification": return "Test plans, client feedback, and quality assurance";
      case "deploy": return "Deployment guides, infrastructure, and release notes";
      default: return "";
    }
  };

  const addItem = () => {
    toast.success(`New item can be added to the ${currentPhase} phase`);
    // Implementation would go here in a real application
  };

  const handleCompletePhase = () => {
    completePhase(currentPhase);
    toast.success(`Phase ${currentPhase} marked as completed`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getPhaseIcon(currentPhase)}
          <h2 className="text-lg font-semibold ml-2">
            {getPhaseTitle(currentPhase)}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addItem}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          
          <Button 
            variant={isCompleted ? "outline" : "default"} 
            size="sm" 
            onClick={handleCompletePhase}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Completed
              </>
            ) : (
              "Complete Phase"
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6">
        {getPhaseDescription(currentPhase)}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items[currentPhase].map((item) => (
          <Card key={item.id} className="border-l-4 border-l-synergy-purple">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" size="sm" className="text-synergy-blue" asChild>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Open Link
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SDLCContent;
