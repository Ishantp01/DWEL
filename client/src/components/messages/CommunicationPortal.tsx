
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Send, User } from "lucide-react";

// Mock data
const clients = [
  {
    id: 1,
    name: "Acme Corp",
    lastMessage: "When will the new update be available?",
    unread: 2,
    timestamp: "15m",
    online: true,
  },
  {
    id: 2,
    name: "TechStart Inc",
    lastMessage: "Thanks for resolving our issue so quickly!",
    unread: 0,
    timestamp: "1h",
    online: false,
  },
  {
    id: 3,
    name: "StyleHub",
    lastMessage: "We need to discuss the product catalog issue.",
    unread: 1,
    timestamp: "3h",
    online: true,
  },
  {
    id: 4,
    name: "Global Services Ltd",
    lastMessage: "Please provide an update on ticket #1004.",
    unread: 0,
    timestamp: "5h",
    online: false,
  },
  {
    id: 5,
    name: "MediaMax",
    lastMessage: "The email notification issue is still occurring.",
    unread: 0,
    timestamp: "1d",
    online: false,
  },
];

type Message = {
  id: number;
  text: string;
  sender: "user" | "client";
  timestamp: string;
};

// Mock conversation
const conversation: Message[] = [
  {
    id: 1,
    text: "Hello, we're having issues with the payment processing on our checkout page. Customers are unable to complete purchases.",
    sender: "client",
    timestamp: "10:32 AM",
  },
  {
    id: 2,
    text: "I'm sorry to hear that. Could you provide more details about the error messages customers are seeing?",
    sender: "user",
    timestamp: "10:35 AM",
  },
  {
    id: 3,
    text: "They're seeing 'Transaction Failed' after entering payment details. It started happening after yesterday's update.",
    sender: "client",
    timestamp: "10:38 AM",
  },
  {
    id: 4,
    text: "Thank you for the information. I've created ticket #1001 and assigned it to our payment team with high priority. They'll begin working on it right away.",
    sender: "user",
    timestamp: "10:40 AM",
  },
  {
    id: 5,
    text: "That's great, thank you! How long do you think it will take to resolve?",
    sender: "client",
    timestamp: "10:42 AM",
  },
  {
    id: 6,
    text: "The team is investigating now. I'll have an update for you within the next hour. In the meantime, we're implementing a temporary solution that should restore basic functionality.",
    sender: "user",
    timestamp: "10:45 AM",
  },
  {
    id: 7,
    text: "We appreciate the quick response. When will the new update be available?",
    sender: "client",
    timestamp: "11:15 AM",
  },
];

const CommunicationPortal = () => {
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-border">
      {/* Client list sidebar */}
      <div className="flex w-64 flex-col border-r border-border">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search clients..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={cn(
                "flex w-full items-start border-b border-border p-3 text-left transition-colors hover:bg-secondary/20",
                selectedClient.id === client.id && "bg-secondary/30"
              )}
            >
              <div className="relative mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5 text-foreground" />
                {client.online && (
                  <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.timestamp}</p>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{client.lastMessage}</p>
              </div>
              {client.unread > 0 && (
                <div className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {client.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center">
            <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <User className="h-5 w-5 text-foreground" />
              {selectedClient.online && (
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium">{selectedClient.name}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedClient.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80">
              View Tickets
            </button>
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              Create Ticket
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {conversation.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-md rounded-lg px-4 py-2 text-sm shadow",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "glass"
                  )}
                >
                  <p>{message.text}</p>
                  <p className="mt-1 text-right text-xs opacity-80">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border p-3">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-md bg-primary hover:opacity-90">
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPortal;
