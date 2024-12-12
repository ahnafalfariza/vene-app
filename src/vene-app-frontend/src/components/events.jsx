import { MapPin } from "lucide-react";

const EventList = () => {
  const events = [
    {
      id: 1,
      title: "Neckdeep Tour 2024",
      date: { month: "Aug", day: "12" },
      image: "https://picsum.photos/1200/900",
      venue: "Grha Sabha Pramana",
      attendees: 41,
    },
    {
      id: 2,
      title: "GenAI Day",
      date: { month: "Aug", day: "12" },
      image: "https://picsum.photos/1201/900",
      venue: "Jogja Digital Valley",
      attendees: 156,
    },
    {
      id: 3,
      title: "Web3 x AI Hackathon",
      date: { month: "Aug", day: "12" },
      image: "https://picsum.photos/1202/900",
      venue: "Hartono Mall Yogyakarta",
      attendees: 89,
    },
    {
      id: 4,
      title: "MMIT Tech Conference",
      date: { month: "Aug", day: "12" },
      image: "https://picsum.photos/1203/900",
      venue: "Ambarrukmo Plaza",
      attendees: 212,
    },
    {
      id: 5,
      title: "Startup Weekend Yogyakarta",
      date: { month: "Sep", day: "15" },
      image: "https://picsum.photos/1204/900",
      venue: "The Alana Yogyakarta",
      attendees: 178,
    },
    {
      id: 6,
      title: "UGM Tech Festival",
      date: { month: "Sep", day: "20" },
      image: "https://picsum.photos/1205/900",
      venue: "Fakultas Teknik UGM",
      attendees: 325,
    },
    {
      id: 7,
      title: "Digital Marketing Workshop",
      date: { month: "Oct", day: "05" },
      image: "https://picsum.photos/1206/900",
      venue: "Royal Ambarrukmo Hotel",
      attendees: 94,
    },
    {
      id: 8,
      title: "Blockchain Summit 2024",
      date: { month: "Oct", day: "12" },
      image: "https://picsum.photos/1207/900",
      venue: "Sheraton Mustika Yogyakarta",
      attendees: 267,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

const EventItem = ({ event }) => {
  return (
    <div className="overflow-hidden">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-60 object-cover rounded-2xl"
        />
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 text-center">
          <div className="text-xs font-semibold">{event.date.month}</div>
          <div className="font-bold">{event.date.day}</div>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-5 h-5" />
          <p className="text-sm">{event.venue}</p>
        </div>
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
            {event.attendees}+ attendees
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventList;
