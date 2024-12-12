import Category from "../components/category";
import EventList from "../components/events";
import LocalEvent from "../components/localevent";

const Home = () => {
  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <Category />
      <div className="flex justify-between items-baseline">
        <h1 className="my-7 font-bold text-xl">Upcoming Event</h1>
        <p>See more</p>
      </div>
      <EventList />
      <h1 className="my-7 font-bold text-xl">Explore Local Events</h1>
      <LocalEvent />
    </div>
  );
};

export default Home;
