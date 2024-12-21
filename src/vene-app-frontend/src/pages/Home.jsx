import { useQuery } from "@tanstack/react-query";
import Category from "../components/category";
import EventList from "../components/events";
import LocalEvent from "../components/localevent";
import { getEvents } from "../services/EventService";

const Home = () => {
  const {
    data: eventList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <Category />
      <div className="flex justify-between items-baseline">
        <h1 className="my-7 font-bold text-xl">Upcoming Event</h1>
        <p>See more</p>
      </div>
      <EventList events={eventList.events} />
      <h1 className="my-7 font-bold text-xl">Explore Local Events</h1>
      <LocalEvent />
    </div>
  );
};

export default Home;
