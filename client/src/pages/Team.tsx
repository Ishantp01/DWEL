
import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import TeamMemberProfile from "@/components/team/TeamMemberProfile";
import { DetailedTeamMember } from "@/components/team/TeamMemberProfile";
import AITeamRecommendations from "@/components/team/AITeamRecommendations";

// Mock data for detailed team members
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

// Mock data for AI recommendations
const aiRecommendationTask = {
  task: "Build a responsive dashboard for healthcare analytics",
  domain: "Healthcare",
  skillsRequired: ["UI/UX", "React", "Data Visualization", "Responsive Design"],
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
      domainMatch: 100,
      availabilityMatch: 90,
      overallMatch: 95,
      reasoning: "Taylor has exceptional UI/UX skills and direct experience in healthcare domain. Their Golden Egg ranking and availability make them the ideal candidate for this task."
    },
    {
      memberId: 6,
      skillMatch: 80,
      domainMatch: 60,
      availabilityMatch: 40,
      overallMatch: 60,
      reasoning: "Morgan has relevant technical skills but limited healthcare domain experience and low availability. Their Broken Egg ranking suggests potential quality issues that could impact the project."
    }
  ]
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<DetailedTeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "SynergyOS | Team Management";
  }, []);

  const handleMemberClick = (member: DetailedTeamMember) => {
    setSelectedMember(member);
    window.scrollTo(0, 0);
  };

  const handleBackToTeam = () => {
    setSelectedMember(null);
  };

  const handleAssignTask = (memberId: number) => {
    console.log(`Assigned task to member with ID: ${memberId}`);
    // In a real application, this would make an API call to assign the task
  };

  const filteredMembers = detailedTeamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout>
      {selectedMember ? (
        <TeamMemberProfile member={selectedMember} onBack={handleBackToTeam} />
      ) : (
        <>
          <div className="mb-6 flex flex-col space-y-1">
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              View and manage team members based on their skills and performance ratings
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Search team members..."
                className="h-9 rounded-md border border-input bg-background pl-3 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              Add Team Member
            </button>
          </div>

          <div className="mb-8">
            <AITeamRecommendations 
              task={aiRecommendationTask.task}
              domain={aiRecommendationTask.domain}
              skillsRequired={aiRecommendationTask.skillsRequired}
              recommendations={aiRecommendationTask.recommendations}
              teamMembers={detailedTeamMembers}
              onAssign={handleAssignTask}
            />
          </div>

          <div className="mb-3 flex items-center">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <div className="ml-3 flex gap-3">
              <div className="flex items-center text-xs">
                <span className="mr-1 h-2 w-2 rounded-full bg-red-400"></span>
                Broken Egg
              </div>
              <div className="flex items-center text-xs">
                <span className="mr-1 h-2 w-2 rounded-full bg-amber-400"></span>
                Egg
              </div>
              <div className="flex items-center text-xs">
                <span className="mr-1 h-2 w-2 rounded-full bg-slate-300"></span>
                Silver Egg
              </div>
              <div className="flex items-center text-xs">
                <span className="mr-1 h-2 w-2 rounded-full bg-purple-400"></span>
                Golden Egg
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default Team;
