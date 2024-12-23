import { Button } from "../components/ui/button";
import {
  Calendar,
  CalendarPlus,
  Loader2,
  MapPin,
  ScanQrCode,
  Share,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getEvent,
  getEventParticipants,
  isRegisteredForEvent,
  registerEvent,
} from "../services/EventService";
import { useParams } from "react-router";
import { useAuth } from "../components/auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import QRCodeDialog from "../components/qrcode-dialog";
import { generateAvatarImage, generateCalendarLink } from "../utils/common";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const EventDetail = () => {
  const params = useParams();
  const eventId = params.eventId.split("-").pop();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
  });

  const { data: isRegistered, refetch } = useQuery({
    enabled: Boolean(user && user?.key && eventId),
    queryKey: ["isRegistered", user?.key, eventId],
    queryFn: () => isRegisteredForEvent(eventId),
  });

  const { data: eventParticipant, refetch: refetchEventParticipant } = useQuery(
    {
      queryKey: ["eventParticipants", eventId],
      queryFn: () => getEventParticipants(event.id),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const date = new Date(parseInt(event.eventDate) / 1000000);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const register = async () => {
    try {
      setIsRegistering(true);
      const res = await registerEvent(eventId);
      console.log(res);
      refetch();
      refetchEventParticipant();
      toast({
        title: "Success!",
        description: "You have successfully registered for this event.",
      });
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full">
            <img
              src={generateAvatarImage(event.creator.toText())}
              className="rounded-lg h-10 w-10 bg-slate-500 select-none cursor-pointer"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hosted by</p>
            <p className="font-medium">{event.creator.toText()}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-8">
        <img
          src={event.coverPhoto}
          alt="Event cover"
          className="w-full h-[400px] object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">About the event</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
          </section>
        </div>

        <div className="space-y-6 col-span-2">
          <div className="bg-white p-4">
            <div className="flex gap-3 items-center mb-4">
              <Calendar />
              <div>
                <p className="font-bold">{formattedDate}</p>
                <p className="text-gray-600 text-sm">{formattedTime}</p>
              </div>
            </div>
            <div className="flex gap-3 mb-4">
              <MapPin />
              <div className="w-full">
                <p className="font-bold">{event.location}</p>
                <div className="mt-2 rounded-lg overflow-hidden">
                  <div className="w-full h-[200px]">
                    <MapContainer
                      center={[-6.1944, 106.8229]}
                      zoom={13}
                      className="h-full w-full -z-0"
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[-6.1944, 106.8229]}>
                        <Popup>Event Location</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              {eventParticipant?.ok?.length > 0 && (
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {eventParticipant.ok.slice(0, 5).map((user, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                      >
                        <img
                          src={generateAvatarImage(user.userId.toString())}
                          alt="Avatar"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {eventParticipant.ok.length}+ attendees
                  </span>
                </div>
              )}
            </div>
            {isRegistered ? (
              <div>
                <p className="font-bold mb-1">You're in</p>
                <p className="text-sm mb-4">
                  Add to calendar and see your ticket below
                </p>
                <div className="flex gap-3">
                  <Button className="grow" onClick={() => setShowQRCode(true)}>
                    <ScanQrCode />
                    My Ticket
                  </Button>
                  <Button
                    variant="outline"
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
                  >
                    <CalendarPlus />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "Link copied",
                        description: "Event link copied to clipboard",
                      });
                    }}
                  >
                    <Share />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold mb-1">Registration</p>
                <p className="text-sm mb-4">
                  Welcome! To join the event, please register below.
                </p>
                <Button
                  onClick={register}
                  disabled={isRegistering}
                  className="w-full"
                >
                  {isRegistering && <Loader2 />}
                  Register
                </Button>
              </div>
            )}
            <QRCodeDialog
              showQRCode={showQRCode}
              setShowQRCode={setShowQRCode}
              eventId={eventId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
