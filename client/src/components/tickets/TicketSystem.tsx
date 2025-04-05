
import { useState } from "react";
import { BrainCircuit, Filter, Search, SortAsc } from "lucide-react";
import { cn } from "@/lib/utils";

type TicketPriority = "critical" | "high" | "medium" | "low";
type TicketStatus = "new" | "assigned" | "in-progress" | "resolved";

interface Ticket {
  id: number;
  title: string;
  description: string;
  client: string;
  priority: TicketPriority;
  aiPriority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  assignedTo: string | null;
}

const tickets: Ticket[] = [
  {
    id: 1001,
    title: "Payment processing failure on checkout",
    description: "Customers are unable to complete purchases due to payment failures on the checkout page.",
    client: "Acme Corp",
    priority: "high",
    aiPriority: "critical",
    status: "assigned",
    createdAt: "2 hours ago",
    assignedTo: "Sam Williams",
  },
  {
    id: 1002,
    title: "Login page showing blank screen on mobile",
    description: "The login page displays a blank screen when accessed from mobile devices.",
    client: "TechStart Inc",
    priority: "medium",
    aiPriority: "high",
    status: "in-progress",
    createdAt: "5 hours ago",
    assignedTo: "Alex Johnson",
  },
  {
    id: 1003,
    title: "Product images not loading in catalog",
    description: "Product images fail to load in the catalog section of the website.",
    client: "StyleHub",
    priority: "low",
    aiPriority: "medium",
    status: "new",
    createdAt: "1 day ago",
    assignedTo: null,
  },
  {
    id: 1004,
    title: "Database connection timeout during peak hours",
    description: "The system experiences database connection timeouts during high traffic periods.",
    client: "Global Services Ltd",
    priority: "critical",
    aiPriority: "critical",
    status: "new",
    createdAt: "3 hours ago",
    assignedTo: null,
  },
  {
    id: 1005,
    title: "Email notifications not being sent",
    description: "Automated email notifications are not being sent to users after actions are completed.",
    client: "MediaMax",
    priority: "high",
    aiPriority: "high",
    status: "assigned",
    createdAt: "1 day ago",
    assignedTo: "Taylor Chen",
  },
];

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

const TicketSystem = () => {
  const [useAIPriority, setUseAIPriority] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Support Tickets</h2>
        <div className="flex items-center space-x-2">
          <div className="relative flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors">
            <Search className="my-auto mr-2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search tickets..."
              className="flex h-full w-44 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button className="flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </button>
          <button className="flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary">
            <SortAsc className="mr-2 h-4 w-4" /> Sort
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-lg bg-secondary/30 p-3">
        <div className="flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
          <span className="text-sm">AI-assisted priority recommendations</span>
        </div>
        <div className="flex items-center">
          <label htmlFor="ai-priority" className="mr-2 text-sm">
            {useAIPriority ? "Using AI priority" : "Using manual priority"}
          </label>
          <button
            role="switch"
            aria-checked={useAIPriority}
            onClick={() => setUseAIPriority(!useAIPriority)}
            className={cn(
              "relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
              useAIPriority ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                useAIPriority ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
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
                  Client
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
                  Created
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-muted-foreground"
                >
                  Assigned To
                </th>
                <th scope="col" className="relative px-3 py-3.5">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
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
                  <td className="whitespace-nowrap px-3 py-4 text-sm">{ticket.client}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        getPriorityColor(useAIPriority ? ticket.aiPriority : ticket.priority)
                      )}
                    >
                      {useAIPriority ? ticket.aiPriority : ticket.priority}
                    </span>
                    {useAIPriority && ticket.priority !== ticket.aiPriority && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (was {ticket.priority})
                      </span>
                    )}
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
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                    {ticket.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {ticket.assignedTo || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm">
                    <button className="rounded-md bg-secondary px-2 py-1 text-xs hover:bg-secondary/80">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketSystem;
