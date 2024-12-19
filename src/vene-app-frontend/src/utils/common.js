export const generateLocalEventImage = (seed) => {
  return `https://api.dicebear.com/9.x/shapes/svg?seed=${seed.toLowerCase()}&flip=true&rotate=40&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,d1d4f9,c0aede,ffd5dc,ffdfbf,b6e3f4&backgroundRotation=0,360,30,40&shape1=ellipse,ellipseFilled,line,polygon,polygonFilled`;
};

export const generateAvatarImage = (seed) => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${seed}&backgroundColor=f1f4dc,f88c49,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,transparent`;
};

export const formatEventUrl = (title, id) => {
  return `/event/${title.toLowerCase().replace(/\s+/g, "-")}-${id}`;
};

export const generateCalendarLink = ({
  name,
  eventDate,
  description,
  location,
}) => {
  const formatToGoogleCalendar = (date) => {
    return date
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replace(".000", "");
  };

  const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);
  const formattedDates = `${formatToGoogleCalendar(
    eventDate
  )}/${formatToGoogleCalendar(endDate)}`;

  return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${name}&dates=${formattedDates}&details=${description}&location=${location}`;
};

export const capitalize = (s) =>
  s && String(s[0]).toUpperCase() + String(s).slice(1);
