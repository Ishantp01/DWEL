
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  sidebarCollapsed: boolean;
}

const PageContainer = ({ children, sidebarCollapsed }: PageContainerProps) => {
  return (
    <main
      className={cn(
        "pt-16 transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-56"
      )}
    >
      <div className="container max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
