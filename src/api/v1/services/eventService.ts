import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION = "events";

const pad6 = (n: number) => String(n).padStart(6, "0");

const generateEventId = async (): Promise<string> => {
  const snapshot = await firestoreRepository.getDocuments(EVENTS_COLLECTION);
  const nextNum = snapshot.size + 1;
  return `evt_${pad6(nextNum)}`;
};

export const createEvent = async (
  payload: Omit<Event, "id" | "createdAt" | "updatedAt">
): Promise<Event> => {
  const nowIso = new Date().toISOString();
  const id = await generateEventId();

  const event: Event = {
    id,
    ...payload,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  await firestoreRepository.createDocument<Event>(EVENTS_COLLECTION, event, id);
  return event;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const snapshot = await firestoreRepository.getDocuments(EVENTS_COLLECTION);
  return snapshot.docs.map((d) => d.data() as Event);
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const doc = await firestoreRepository.getDocumentById(EVENTS_COLLECTION, id);
  return doc ? (doc.data() as Event) : null;
};

export const updateEvent = async (
  id: string,
  updates: Partial<Event>
): Promise<Event | null> => {
  const existing = await getEventById(id);
  if (!existing) return null;

  const updated: Event = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };

  await firestoreRepository.updateDocument<Event>(EVENTS_COLLECTION, id, updated);
  return updated;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const existing = await getEventById(id);
  if (!existing) return false;

  await firestoreRepository.deleteDocument(EVENTS_COLLECTION, id);
  return true;
};