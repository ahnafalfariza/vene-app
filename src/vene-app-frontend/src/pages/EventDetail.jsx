import { Button } from "../components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../services/EventService";
import { useParams } from "react-router";

const EventDetail = () => {
  const params = useParams();
  const eventId =
    params.eventId.split("-")[params.eventId.split("-").length - 1];

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
  });

  console.log("params", params);
  console.log("id", eventId);
  console.log("event", event);
  console.log("error", error);
  console.log("isloading", isLoading);

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

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <p className="text-sm text-gray-600">Hosted by</p>
            <p className="font-medium">Ahnaf Alfariza</p>
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
            <p className="text-gray-700">{event.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Agenda</h2>
            <div className="space-y-3"></div>
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
                  <div className="bg-gray-200 w-full h-[200px]"></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                    >
                      {/* Avatar images would go here */}
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {10}+ attendees
                </span>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">Registration</p>
              <p className="text-sm mb-4">
                Welcome! To join the event, please register below.
              </p>
              <Button className="w-full">Register</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
