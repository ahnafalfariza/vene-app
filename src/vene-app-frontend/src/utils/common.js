export const generateLocalEventImage = (seed) => {
  return `https://api.dicebear.com/9.x/shapes/svg?seed=${seed.toLowerCase()}&flip=true&rotate=40&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,d1d4f9,c0aede,ffd5dc,ffdfbf,b6e3f4&backgroundRotation=0,360,30,40&shape1=ellipse,ellipseFilled,line,polygon,polygonFilled`;
};

export const formatEventUrl = (title, id) => {
  return `/event/${title.toLowerCase().replace(/\s+/g, "-")}-${id}`;
};

export const capitalize = (s) =>
  s && String(s[0]).toUpperCase() + String(s).slice(1);
