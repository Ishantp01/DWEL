
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import TicketSystem from "@/components/tickets/TicketSystem";

const Tickets = () => {
  useEffect(() => {
    document.title = "SynergyOS | Ticket System";
  }, []);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Ticket System</h1>
        <p className="text-muted-foreground">
          Manage support requests with AI-assisted prioritization
        </p>
      </div>

      <TicketSystem />
    </AppLayout>
  );
};

export default Tickets;
