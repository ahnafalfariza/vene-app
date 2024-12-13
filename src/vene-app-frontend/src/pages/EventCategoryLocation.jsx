import { useParams } from "react-router";
import EventList from "../components/events";
import { capitalize, generateLocalEventImage } from "../utils/common";

const EventCategoryLocation = () => {
  const { locationId } = useParams();

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <div className="rounded-xl overflow-hidden mb-12 bg-black relative">
        <img
          src={generateLocalEventImage(locationId)}
          alt="Event cover"
          className="w-full h-[320px] object-cover opacity-70"
        />
        <div className="text-white absolute inset-0 px-16 p-8 flex flex-col justify-center">
          <p>Explore event on</p>
          <h1 className="font-bold text-4xl capitalize">{locationId}</h1>
          <div className="h-1 w-24 bg-white my-4" />
          <p className="whitespace-pre-line">
            {`Discover the hottest events in ${capitalize(
              locationId
            )}, and get\nnotified of new events before they sell out.`}
          </p>
        </div>
      </div>
      <div className="px-12">
        <EventList />
      </div>
    </div>
  );
};

export default EventCategoryLocation;
