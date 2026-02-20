import express from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";
import * as eventController from "../controllers/eventController";

const router = express.Router();

// Create event - Validates request body
router.post(
  "/",
  validateRequest(eventSchemas.create),
  eventController.createEventHandler
);

// Get all events
router.get(
  "/",
  eventController.getAllEventsHandler
);

// Get single event - Validates :id param
router.get(
  "/:id",
  validateRequest(eventSchemas.idParam),
  eventController.getEventByIdHandler
);

// Update event - Validates :id param and request body
router.put(
  "/:id",
  validateRequest(eventSchemas.update),
  eventController.updateEventHandler
);

// Delete event - Validates :id param
router.delete(
  "/:id",
  validateRequest(eventSchemas.idParam),
  eventController.deleteEventHandler
);

export default router;