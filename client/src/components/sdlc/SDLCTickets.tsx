
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { SDLCPhase } from "@/pages/SDLC";
import { cn } from "@/lib/utils";

type TicketPriority = "critical" | "high" | "medium" | "low";
type TicketStatus = "new" | "assigned" | "in-progress" | "resolved";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  phase: SDLCPhase;
  assignedTo: string | null;
}

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "new":
      return "bg-blue-500/20 text-blue-400";
    case "assigned":
      return "bg-amber-500/20 text-amber-400";
    case "in-progress":
      return "bg-purple-500/20 text-purple-400";
    case "resolved":
      return "bg-green-500/20 text-green-400";
  }
};

const getPriorityColor = (priority: TicketPriority) => {
  switch (priority) {
    case "critical":
      return "bg-red-500/20 text-red-400";
    case "high":
      return "bg-orange-500/20 text-orange-400";
    case "medium":
      return "bg-amber-500/20 text-amber-400";
    case "low":
      return "bg-green-500/20 text-green-400";
  }
};

interface SDLCTicketsProps {
  currentPhase: SDLCPhase;
}

const SDLCTickets = ({ currentPhase }: SDLCTicketsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample tickets data
  const allTickets: Ticket[] = [
    {
      id: 2001,
      title: "Define user authentication requirements",
      description: "Document requirements for user roles and permissions",
      priority: "high",
      status: "in-progress",
      phase: "requirements",
      assignedTo: "Alex Johnson",
    },
    {
      id: 2002,
      title: "Create database schema diagram",
      description: "Design the database schema with all required tables and relationships",
      priority: "medium",
      status: "assigned",
      phase: "design",
      assignedTo: "Sam Williams",
    },
    {
      id: 2003,
      title: "Implement user login component",
      description: "Code the user login form with validation",
      priority: "high",
      status: "in-progress",
      phase: "implementation",
      assignedTo: "Jamie Chen",
    },
    {
      id: 2004,
      title: "Test payment processing gateway",
      description: "Verify all payment scenarios including error cases",
      priority: "critical",
      status: "new",
      phase: "verification",
      assignedTo: null,
    },
    {
      id: 2005,
      title: "Set up continuous deployment pipeline",
      description: "Configure CI/CD for automated deployments",
      priority: "high",
      status: "assigned",
      phase: "deploy",
      assignedTo: "Robin Smith",
    },
    {
      id: 2006,
      title: "Document API specifications",
      description: "Create detailed API documentation for front-end team",
      priority: "medium",
      status: "new",
      phase: "requirements",
      assignedTo: null,
    },
    {
      id: 2007,
      title: "Design responsive mobile layouts",
      description: "Create mockups for all screens on mobile devices",
      priority: "high",
      status: "in-progress",
      phase: "design",
      assignedTo: "Taylor Johnson",
    },
  ];

  const filteredTickets = allTickets
    .filter(ticket => ticket.phase === currentPhase)
    .filter(ticket => 
      searchQuery === "" || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">Tickets for {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase</h2>
        
        <div className="flex space-x-2">
          <div className="relative flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors">
            <Search className="my-auto mr-2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search tickets..."
              className="flex h-full w-44 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </button>
        </div>
      </div>
      
      {filteredTickets.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No tickets found for this phase.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="group hover:bg-secondary/20"
                >
                  <td className="whitespace-nowrap px-3 py-4 text-sm">#{ticket.id}</td>
                  <td className="px-3 py-4 text-sm">
                    <div>
                      <div className="font-medium">{ticket.title}</div>
                      <div className="mt-1 truncate text-xs text-muted-foreground max-w-xs">
                        {ticket.description}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        getPriorityColor(ticket.priority)
                      )}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        getStatusColor(ticket.status)
                      )}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {ticket.assignedTo || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SDLCTickets;
