import { Link } from "react-router";
import { generateLocalEventImage } from "../utils/common";

const LocalEventData = [
  "Jakarta",
  "Bandung",
  "Bogor",
  "Surabaya",
  "Yogyakarta",
  "Bali",
];

const LocalEvent = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {LocalEventData.map((loc) => (
        <Link
          to={`/location/${loc.toLowerCase()}`}
          className="flex items-center gap-3"
          key={loc}
        >
          <img
            className="h-20 w-20 rounded-xl"
            src={generateLocalEventImage(loc)}
          />
          <div>
            <p className="font-semibold">{loc}</p>
            <p className="text-xs text-black/80">{loc.length} events</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LocalEvent;
