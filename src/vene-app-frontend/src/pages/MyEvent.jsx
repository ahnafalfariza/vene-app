import { Button } from "@/components/ui/button";
import { MapPin, CalendarPlus, ScanQrCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import QRCodeDialog from "../components/qrcode-dialog";
import { generateCalendarLink } from "../utils/common";
import EventDropdown from "../components/event-dropdown";
import { useAuth } from "../components/auth";
import { getUserRegisterdEvents } from "../services/EventService";
import { useQuery } from "@tanstack/react-query";
import HostedEvent from "../components/hosted-event";

const MyEvent = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("registered");
  const { data: myEvent } = useQuery({
    enabled: Boolean(user && user?.key),
    queryKey: ["myevent", user?.key],
    queryFn: () => getUserRegisterdEvents(),
  });

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setActiveTab("registered")}
              variant={activeTab === "registered" ? "default" : "custom"}
              className="rounded-full"
            >
              Registred
            </Button>
            <Button
              onClick={() => setActiveTab("hosted")}
              variant={activeTab === "hosted" ? "default" : "custom"}
              className="rounded-full"
            >
              Hosted
            </Button>
          </div>
        </header>

        {activeTab === "registered" && <RegisteredEvent myEvent={myEvent} />}
        {activeTab === "hosted" && <HostedEvent events={myEvent} />}
      </div>
    </div>
  );
};

const RegisteredEvent = ({ myEvent }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="space-y-6">
      {myEvent?.ok.map((event, index) => {
        const date = new Date(parseInt(event.eventDate) / 1000000);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });

        return (
          <div key={index} className="flex gap-6">
            {/* Date Column */}
            <div className="w-36">
              <div className="text-xl font-bold">{formattedDate}</div>
              <div className="text-sm text-black/70">{formattedTime}</div>
            </div>

            {/* Event Card */}
            <div className="flex-1 rounded-lg p-6 pt-0 flex gap-4">
              <div className="flex-1">
                <div className="mb-1 text-black/70 ">{formattedTime}</div>
                <h2 className="text-2xl font-semibold mb-3">
                  {event.eventName}
                </h2>

                <div className="flex items-center gap-2 mb-2 text-black/60">
                  <span>By</span>
                  <span>{event.creator.toString()}</span>
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
                        <Button
                          variant="secondary"
                          onClick={() => setShowQRCode(true)}
                        >
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
                        <Button
                          onClick={() =>
                            window.open(
                              generateCalendarLink({
                                name: event.eventName,
                                description: event.description,
                                location: event.location,
                                eventDate: date,
                              }),
                              "_blank"
                            )
                          }
                          variant="outline"
                        >
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
                  src={event.coverPhoto}
                  alt={event.eventName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <EventDropdown />
            </div>
          </div>
        );
      })}
      <QRCodeDialog
        showQRCode={showQRCode}
        setShowQRCode={setShowQRCode}
        eventId={null}
      />
    </div>
  );
};

export default MyEvent;
