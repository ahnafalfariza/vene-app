import { useQuery } from "@tanstack/react-query";
import Category from "../components/category";
import EventList from "../components/events";
import LocalEvent from "../components/localevent";
import { getEvents } from "../services/EventService";
import { useSearchParams } from "react-router";

const Home = () => {
  const {
    data: eventList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const eventListFiltered = eventList.events.filter((event) => {
    if (searchParams.has("filter")) {
      return event.category === searchParams.get("filter");
    }
    return true;
  });

  const EmptyState = () => (
    <div className="text-center py-12">
      <p className="text-gray-500">No events found</p>
      {searchParams.has("filter") && (
        <button
          onClick={() => {
            searchParams.delete("filter");
            setSearchParams(searchParams);
          }}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          Clear filter
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <Category />
      <div className="flex justify-between items-baseline">
        <h1 className="my-7 font-bold text-xl">Upcoming Event</h1>
        <p>See more</p>
      </div>
      {eventListFiltered.length > 0 ? (
        <EventList events={eventListFiltered} />
      ) : (
        <EmptyState />
      )}
      <h1 className="my-7 font-bold text-xl">Explore Local Events</h1>
      <LocalEvent />
    </div>
  );
};

export default Home;
