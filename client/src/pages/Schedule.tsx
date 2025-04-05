
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "meeting" | "deadline" | "reminder";
}

const Schedule = () => {
  useEffect(() => {
    document.title = "SynergyOS | Schedule";
  }, []);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Standup",
      date: new Date(),
      time: "09:00 AM",
      type: "meeting"
    },
    {
      id: "2",
      title: "Client Presentation",
      date: new Date(),
      time: "11:30 AM",
      type: "meeting"
    },
    {
      id: "3",
      title: "Project Alpha Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "05:00 PM",
      type: "deadline"
    },
    {
      id: "4",
      title: "Review Design Documents",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      time: "02:00 PM",
      type: "reminder"
    }
  ]);

  const currentDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  // Function to get event type styling
  const getEventTypeStyle = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "border-blue-500 bg-blue-500/10 text-blue-500";
      case "deadline":
        return "border-red-500 bg-red-500/10 text-red-500";
      case "reminder":
        return "border-amber-500 bg-amber-500/10 text-amber-500";
      default:
        return "border-gray-500 bg-gray-500/10 text-gray-500";
    }
  };

  // Function to navigate between days
  const navigateDate = (direction: "prev" | "next") => {
    if (!date) return;
    
    const newDate = new Date(date);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setDate(newDate);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your meetings, deadlines, and reminders
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar Section */}
        <div className="rounded-xl bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Calendar</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex h-9 w-9 p-0">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Open calendar</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        {/* Events Section */}
        <div className="md:col-span-2 rounded-xl bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateDate("prev")}
                className="rounded-full p-1 hover:bg-secondary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-medium">
                {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
              </h2>
              <button 
                onClick={() => navigateDate("next")}
                className="rounded-full p-1 hover:bg-secondary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </div>

          {currentDateEvents.length > 0 ? (
            <div className="space-y-3">
              {currentDateEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border-l-4 bg-card p-4 shadow-sm hover:bg-secondary/20",
                    getEventTypeStyle(event.type)
                  )}
                >
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <div>
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-muted-foreground">
                No events scheduled for this day
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedule;
