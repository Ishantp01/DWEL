
import { Bell, MessageSquare, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header = ({ sidebarCollapsed }: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-40 flex h-16 border-b border-border bg-background/80 backdrop-blur transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-56"
      )}
    >
      <div className="flex flex-1 items-center justify-between px-4 sm:px-6">
        <div className="flex flex-1">
          <div className="relative flex h-9 w-full max-w-md rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors">
            <Search className="my-auto mr-2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="flex h-full w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-1 text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <button className="relative rounded-full p-1 text-muted-foreground hover:text-foreground">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              5
            </span>
          </button>

          <div className="ml-2 h-8 w-px bg-border" />

          <button className="flex items-center gap-2 rounded-full p-1 text-sm font-medium hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-secondary">
              <User className="h-4 w-4 text-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
