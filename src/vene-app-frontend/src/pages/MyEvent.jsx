import { Button } from "@/components/ui/button";
import { MapPin, CalendarPlus, ScanQrCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MyEvent = () => {
  const events = [
    {
      date: new Date(2023, 11, 13), // December 13
      time: "12:00 PM",
      title: "GenAI Day in Jakarta | TGB x Microsoft",
      organizers: ["Shivang Gupta (TGB)", "Julie Bulaklak", "Abhilash LR"],
      location: "Indonesia Stock Exchange Building, Tower 2, 18th Fl",
      imageUrl: "https://picsum.photos/1207/900",
      status: "Going",
    },
    {
      date: new Date(2023, 11, 11), // December 11
      time: "5:30 PM",
      title: "Supabase meetup #1",
      organizers: ["Supabase", "Adam Eba", "Lai Kai Yong", "Tharshen A/L"],
      location: "Xendit Malaysia",
      imageUrl: "https://picsum.photos/1207/901",
      status: "Going",
      attendees: 113,
    },
    // Add more events as needed
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          <div className="flex gap-4">
            <Button variant="custom" className="rounded-full">
              Upcoming
            </Button>
            <Button variant="custom" className="rounded-full">
              Past
            </Button>
          </div>
        </header>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="flex gap-6">
              {/* Date Column */}
              <div className="w-24">
                <div className="text-xl font-bold">
                  {/* {format(event.date, 'MMM d')} */}
                  Dec 12
                </div>
                <div className="text-sm text-black/70">
                  {/* {format(event.date, 'EEEE')} */}
                  Friday
                </div>
              </div>

              {/* Event Card */}
              <div className="flex-1 rounded-lg p-6 pt-0 flex gap-4">
                <div className="flex-1">
                  <div className="mb-1 text-black/70 ">{event.time}</div>
                  <h2 className="text-2xl font-semibold mb-3">{event.title}</h2>

                  <div className="flex items-center gap-2 mb-2 text-black/60">
                    <span>By</span>
                    {event.organizers.map((organizer, idx) => (
                      <span key={idx}>
                        {organizer}
                        {idx < event.organizers.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-1 mb-4 text-black/70 stroke-black/70 text-sm">
                      <MapPin className="w-5 h-5" />
                      {event.location}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="secondary">
                            <ScanQrCode />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-secondary">
                          <p>Show QR code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline">
                            <CalendarPlus />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-secondary">
                          <p>Add to calendar</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Event Image */}
                <div className="w-32 h-32">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvent;
