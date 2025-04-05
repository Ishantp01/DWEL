
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CommunicationPortal from "@/components/messages/CommunicationPortal";

const Messages = () => {
  useEffect(() => {
    document.title = "SynergyOS | Communication Portal";
  }, []);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Communication Portal</h1>
        <p className="text-muted-foreground">
          Client communication and feedback management
        </p>
      </div>

      <CommunicationPortal />
    </AppLayout>
  );
};

export default Messages;
