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
    <a className="grid grid-cols-4 gap-6">
      {LocalEventData.map((loc) => (
        <div className="flex items-center gap-3" key={loc}>
          <img
            className="h-20 w-20 rounded-xl"
            src={generateLocalEventImage(loc)}
          />
          <div>
            <p className="font-semibold">{loc}</p>
            <p className="text-xs text-black/80">{loc.length} events</p>
          </div>
        </div>
      ))}
    </a>
  );
};

export default LocalEvent;
