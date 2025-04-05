
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Kanban,
  Calendar,
  Ticket,
  Settings,
  ChevronLeft,
  Users,
  LogOut,
  PanelLeft,
  BrainCircuit,
  GitMerge,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: Kanban,
    },
    {
      name: "AI Task Manager",
      href: "/tasks",
      icon: BrainCircuit,
    },
    {
      name: "SDLC",
      href: "/sdlc",
      icon: GitMerge,
    },
    {
      name: "Schedule",
      href: "/schedule",
      icon: Calendar,
    },
    {
      name: "Tickets",
      href: "/tickets",
      icon: Ticket,
    },
    {
      name: "Team",
      href: "/team",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn("relative flex items-center", collapsed ? "justify-center p-3" : "px-4 py-3")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-synergy-purple to-synergy-blue" />
            <span className="text-lg font-semibold text-white">Dwel</span>
          </div>
        )}
        {collapsed && (
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-synergy-purple to-synergy-blue" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <PanelLeft size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex h-10 w-full items-center rounded-md px-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )}
                aria-hidden="true"
              />
              {!collapsed && <span>{item.name}</span>}
              {isActive && !collapsed && (
                <div className="absolute left-0 h-10 w-1 rounded-r-lg bg-primary"></div>
              )}
              {isActive && collapsed && (
                <div className="absolute left-0 h-10 w-1 rounded-r-lg bg-primary"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border p-3">
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
