import { vene_app_backend } from "../../../declarations/vene-app-backend";

export const createEvent = async ({
  eventName,
  description,
  location,
  category,
  coverPhoto,
  eventDate,
  ticketType,
  ticketPrice,
  maxParticipants,
}) => {
  const res = await vene_app_backend.createEvent(
    eventName,
    description,
    location,
    category,
    coverPhoto,
    parseInt(eventDate),
    ticketType === "free" ? { free: null } : { paid: null },
    ticketPrice ? [parseInt(ticketPrice)] : [],
    parseInt(maxParticipants),
    parseInt(eventDate)
  );

  return res;
};

export const registerEvent = async (eventId) => {
  const res = await vene_app_backend.registerForEvent(eventId);
  return res;
};

export const getEvents = async (skip = 0, limit = 10) => {
  const res = await vene_app_backend.getAllEvents(skip, limita);
  return res;
};

export const getEvent = async (eventId) => {
  const res = await vene_app_backend.getEvent(eventId);
  return res[0];
};

export const getEventParticipants = async (eventId) => {
  const res = await vene_app_backend.getEventParticipants(eventId);
  return res;
};