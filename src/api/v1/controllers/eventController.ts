import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";

type IdParams = { id: string };

export const createEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const created = await eventService.createEvent(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: "Event created", data: created });
  } catch (error: unknown) {
    next(error);
  }
};

export const getAllEventsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getEventByIdHandler = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await eventService.getEventById(req.params.id);


    res.status(HTTP_STATUS.OK).json({ message: "Event retrieved", data: event });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateEventHandler = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await eventService.updateEvent(req.params.id, req.body);
};

export const deleteEventHandler = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const ok = await eventService.deleteEvent(req.params.id);
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error: unknown) {
    next(error);
  }
};