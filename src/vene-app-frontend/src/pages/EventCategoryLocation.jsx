import EventList from "../components/events";

const EventCategoryLocation = () => {
  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <div className="rounded-xl overflow-hidden mb-12 bg-black relative">
        <img
          src="https://picsum.photos/1201/900"
          alt="Event cover"
          className="w-full h-[320px] object-cover opacity-50"
        />
        <div className="text-white absolute inset-0 px-16 p-8 flex flex-col justify-center">
          <p>Explore event on</p>
          <h1 className="font-bold text-4xl">Jakarta</h1>
          <div className="h-1 w-24 bg-white my-4" />
          <p className="whitespace-pre-line">
            {`Discover the hottest events in Jakarta, and get\nnotified of new events before they sell out.`}
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
