import { MapPin } from "lucide-react";
import { Link } from "react-router";
import { formatEventUrl, generateAvatarImage } from "../utils/common";
import { getEventParticipants } from "../services/EventService";
import { useQuery } from "@tanstack/react-query";

const EventList = ({ events = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

const EventItem = ({ event }) => {
  const { data: eventParticipant } = useQuery({
    queryKey: ["eventParticipants", event.id],
    queryFn: () => getEventParticipants(event.id),
  });

  const date = new Date(parseInt(event.eventDate) / 1000000);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.toLocaleString("en-US", { day: "numeric" });

  return (
    <Link
      to={formatEventUrl(event.eventName, event.id)}
      className="overflow-hidden"
    >
      <div className="relative">
        <img
          src={event.coverPhoto}
          alt={event.eventName}
          className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
        />
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 text-center">
          <div className="text-xs font-semibold">{month}</div>
          <div className="font-bold">{day}</div>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-semibold mb-2">{event.eventName}</h3>
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-5 h-5" />
          <p className="text-sm">{event.location}</p>
        </div>
        {eventParticipant?.ok?.length > 0 && (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {eventParticipant.ok.map((user, i) => (
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
    </Link>
  );
};

export default EventList;
