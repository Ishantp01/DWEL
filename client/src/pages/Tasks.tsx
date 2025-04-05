
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AITaskAllocation from "@/components/tasks/AITaskAllocation";
import { DetailedTeamMember } from "@/components/team/TeamMemberProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Send } from "lucide-react";

// Mock data for detailed team members - we'll use the same data from the Team page
const detailedTeamMembers: DetailedTeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    skills: ["UI/UX", "React", "TypeScript", "TailwindCSS", "Figma"],
    avatar: null,
    email: "alex.j@synergyos.com",
    phone: "+1 (555) 123-4567",
    availability: 85,
    bio: "Experienced frontend developer with a passion for creating beautiful and functional user interfaces. Skilled in React and TypeScript with an eye for design.",
    joinedDate: "Jan 2021",
    rating: 4.8,
    rank: "golden-egg",
    completedProjects: 23,
    projects: [
      {
        id: 1,
        name: "E-commerce Redesign",
        role: "Lead Frontend Developer",
        duration: "3 months",
        rating: 5,
        feedback: "Alex delivered outstanding UI components and led the team effectively through the redesign process."
      },
      {
        id: 2,
        name: "Mobile Banking App",
        role: "UI Developer",
        duration: "4 months",
        rating: 5,
        feedback: "Created exceptional user interfaces with great attention to detail and performance."
      },
      {
        id: 3,
        name: "CRM Dashboard",
        role: "Frontend Developer",
        duration: "2 months",
        rating: 4,
        feedback: "Good work on complex data visualization components, met all deadlines."
      }
    ],
    strengths: [
      "Component architecture",
      "UI animations and transitions",
      "Performance optimization",
      "Team collaboration"
    ],
    areasToImprove: [
      "Backend integration knowledge",
      "Testing coverage"
    ],
    domains: ["E-commerce", "FinTech", "SaaS", "Healthcare"]
  },
  {
    id: 2,
    name: "Sam Williams",
    role: "Backend Developer",
    skills: ["Node.js", "API Design", "Security", "AWS", "MongoDB", "PostgreSQL"],
    avatar: null,
    email: "sam.w@synergyos.com",
    phone: "+1 (555) 234-5678",
    availability: 60,
    bio: "Backend developer with extensive experience in building secure and scalable APIs. Focused on creating robust server-side applications with a strong emphasis on security.",
    joinedDate: "Mar 2022",
    rating: 4.2,
    rank: "silver-egg",
    completedProjects: 15,
    projects: [
      {
        id: 4,
        name: "Payment Processing System",
        role: "Backend Developer",
        duration: "5 months",
        rating: 4,
        feedback: "Built a secure and reliable payment processing backend. Good attention to security details."
      },
      {
        id: 5,
        name: "Inventory Management API",
        role: "API Designer",
        duration: "3 months",
        rating: 5,
        feedback: "Excellent API design with comprehensive documentation and robust error handling."
      },
      {
        id: 6,
        name: "Authentication Service",
        role: "Security Specialist",
        duration: "2 months",
        rating: 4,
        feedback: "Created a solid authentication system with good security practices."
      }
    ],
    strengths: [
      "API architecture",
      "Security implementation",
      "Database design",
      "Documentation"
    ],
    areasToImprove: [
      "Frontend knowledge",
      "Communication with non-technical stakeholders",
      "Microservice architecture"
    ],
    domains: ["FinTech", "E-commerce", "Enterprise"]
  },
  {
    id: 3,
    name: "Taylor Chen",
    role: "Product Designer",
    skills: ["UI/UX", "Figma", "Design Systems", "Prototyping", "User Research"],
    avatar: null,
    email: "taylor.c@synergyos.com",
    phone: "+1 (555) 345-6789",
    availability: 90,
    bio: "Creative product designer with a strong focus on user experience and accessibility. Creates beautiful interfaces that are both functional and intuitive.",
    joinedDate: "Dec 2020",
    rating: 4.9,
    rank: "golden-egg",
    completedProjects: 27,
    projects: [
      {
        id: 7,
        name: "Healthcare Dashboard",
        role: "Lead Designer",
        duration: "4 months",
        rating: 5,
        feedback: "Exceptional design work that greatly improved user experience for healthcare professionals."
      },
      {
        id: 8,
        name: "E-learning Platform",
        role: "UI/UX Designer",
        duration: "6 months",
        rating: 5,
        feedback: "Created an intuitive and engaging learning interface that received outstanding user feedback."
      },
      {
        id: 9,
        name: "Fitness App Redesign",
        role: "Product Designer",
        duration: "3 months",
        rating: 5,
        feedback: "Transformed the user experience with innovative design solutions that increased user engagement by 40%."
      }
    ],
    strengths: [
      "User-centered design",
      "Design systems",
      "Accessibility",
      "Visual design",
      "Prototyping"
    ],
    areasToImprove: [
      "Frontend development skills",
      "Animation design"
    ],
    domains: ["Healthcare", "Education", "Fitness", "E-commerce"]
  },
  {
    id: 4,
    name: "Jamie Smith",
    role: "Project Manager",
    skills: ["Agile", "JIRA", "Team Leadership", "Risk Management", "Stakeholder Management"],
    avatar: null,
    email: "jamie.s@synergyos.com",
    phone: "+1 (555) 456-7890",
    availability: 75,
    bio: "Experienced project manager with a track record of delivering complex projects on time and within budget. Skilled in Agile methodologies and team coordination.",
    joinedDate: "Jul 2021",
    rating: 3.7,
    rank: "egg",
    completedProjects: 12,
    projects: [
      {
        id: 10,
        name: "Financial Platform Migration",
        role: "Project Manager",
        duration: "7 months",
        rating: 4,
        feedback: "Efficiently managed a complex migration project with multiple stakeholders."
      },
      {
        id: 11,
        name: "Mobile App Launch",
        role: "Product Owner",
        duration: "5 months",
        rating: 3,
        feedback: "Project completed with some delays, but overall coordination was satisfactory."
      },
      {
        id: 12,
        name: "E-commerce Platform",
        role: "Project Manager",
        duration: "8 months",
        rating: 4,
        feedback: "Good stakeholder management and resource allocation throughout the project."
      }
    ],
    strengths: [
      "Risk management",
      "Resource allocation",
      "Stakeholder communication",
      "Problem solving"
    ],
    areasToImprove: [
      "Technical knowledge",
      "Delivery timelines",
      "Team motivation"
    ],
    domains: ["FinTech", "Retail", "Media"]
  },
  {
    id: 5,
    name: "Riley Parker",
    role: "Marketing Specialist",
    skills: ["Content Creation", "SEO", "Analytics", "Social Media", "Email Marketing"],
    avatar: null,
    email: "riley.p@synergyos.com",
    phone: "+1 (555) 567-8901",
    availability: 80,
    bio: "Digital marketing specialist with expertise in content creation, SEO, and analytics. Focuses on data-driven marketing strategies to maximize ROI.",
    joinedDate: "Apr 2022",
    rating: 4.1,
    rank: "silver-egg",
    completedProjects: 18,
    projects: [
      {
        id: 13,
        name: "Product Launch Campaign",
        role: "Marketing Lead",
        duration: "2 months",
        rating: 5,
        feedback: "Excellent campaign execution that exceeded target acquisition goals by 30%."
      },
      {
        id: 14,
        name: "SEO Optimization",
        role: "SEO Specialist",
        duration: "3 months",
        rating: 4,
        feedback: "Good improvement in organic traffic and search rankings."
      },
      {
        id: 15,
        name: "Content Strategy",
        role: "Content Strategist",
        duration: "4 months",
        rating: 3,
        feedback: "Some good content ideas but execution could be more consistent."
      }
    ],
    strengths: [
      "Campaign planning",
      "Data analysis",
      "SEO optimization",
      "Creative content"
    ],
    areasToImprove: [
      "Project management",
      "Long-term strategy development",
      "Technical marketing"
    ],
    domains: ["E-commerce", "SaaS", "B2B"]
  },
  {
    id: 6,
    name: "Morgan Lee",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "AWS", "DevOps", "TypeScript"],
    avatar: null,
    email: "morgan.l@synergyos.com",
    phone: "+1 (555) 678-9012",
    availability: 40,
    bio: "Versatile full stack developer with experience across the entire development lifecycle. Skilled in both frontend and backend technologies with a focus on creating scalable applications.",
    joinedDate: "Feb 2021",
    rating: 2.8,
    rank: "broken-egg",
    completedProjects: 16,
    projects: [
      {
        id: 16,
        name: "SaaS Platform",
        role: "Full Stack Developer",
        duration: "6 months",
        rating: 3,
        feedback: "Delivered required functionality but with several quality issues that needed fixing."
      },
      {
        id: 17,
        name: "CRM Integration",
        role: "Backend Developer",
        duration: "4 months",
        rating: 2,
        feedback: "Multiple delays and technical issues throughout the project."
      },
      {
        id: 18,
        name: "Analytics Dashboard",
        role: "Frontend Developer",
        duration: "3 months",
        rating: 3,
        feedback: "UI implementation was adequate but had performance issues that needed to be addressed."
      }
    ],
    strengths: [
      "Versatility",
      "Technology breadth",
      "Problem solving"
    ],
    areasToImprove: [
      "Code quality",
      "Testing practices",
      "Time management",
      "Documentation",
      "Communication"
    ],
    domains: ["SaaS", "Analytics", "Internal Tools"]
  }
];

const Tasks = () => {
  const [projectDetails, setProjectDetails] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState<any | null>(null);

  useEffect(() => {
    document.title = "SynergyOS | AI Task Allocation";
  }, []);

  const handleGenerateRecommendations = () => {
    // In a real application, this would send the project details to an API
    // For now, we'll simulate an AI response
    if (projectDetails.trim() === "") return;

    const mockAiResponse = {
      task: projectDetails,
      domain: projectDetails.toLowerCase().includes("healthcare") ? "Healthcare" : 
              projectDetails.toLowerCase().includes("finance") ? "FinTech" : 
              projectDetails.toLowerCase().includes("e-commerce") ? "E-commerce" : "General",
      skillsRequired: ["React", "UI/UX", "API Design"],
      recommendations: [
        {
          memberId: 1,
          skillMatch: 90,
          domainMatch: 75,
          availabilityMatch: 85,
          overallMatch: 85,
          reasoning: "Alex has strong React and UI/UX skills matching the requirements, plus good availability. Their Golden Egg ranking indicates consistent high performance on similar projects."
        },
        {
          memberId: 3,
          skillMatch: 95,
          domainMatch: 70,
          availabilityMatch: 90,
          overallMatch: 85,
          reasoning: "Taylor has exceptional UI/UX skills and design capabilities. Their Golden Egg ranking and availability make them a strong candidate for this task."
        },
        {
          memberId: 2,
          skillMatch: 75,
          domainMatch: 60,
          availabilityMatch: 60,
          overallMatch: 65,
          reasoning: "Sam has relevant API design skills but limited frontend experience. Their Silver Egg ranking indicates good quality work but might need additional support for UI components."
        }
      ]
    };

    setAiRecommendations(mockAiResponse);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">AI Task Allocation</h1>
        <p className="text-muted-foreground">
          Assign tasks based on team member skills and availability
        </p>
      </div>

      <div className="mb-8 glass rounded-xl p-5">
        <div className="mb-4 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <BrainCircuit className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Project Task Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Enter project details for AI to analyze and recommend team members
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input 
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            placeholder="Describe the project task in detail (e.g., Build a responsive healthcare dashboard with patient data visualization)"
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleGenerateRecommendations}
            className="shrink-0"
          >
            <Send className="mr-2 h-4 w-4" />
            Analyze
          </Button>
        </div>
      </div>

      {aiRecommendations && (
        <AITaskAllocation 
          projectDetails={aiRecommendations}
          teamMembers={detailedTeamMembers}
        />
      )}
    </AppLayout>
  );
};

export default Tasks;
