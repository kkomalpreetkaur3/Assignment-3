import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEvent:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: Tech Conference
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-01T10:00:00Z
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: conference
 *
 *     UpdateEvent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Updated Event Name
 *         date:
 *           type: string
 *           format: date-time
 *         capacity:
 *           type: integer
 *         registrationCount:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 */

export const eventSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      date: Joi.date().iso().greater("now").required(),
      capacity: Joi.number().integer().min(5).required(),

      registrationCount: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref("capacity"))
        .default(0),

      status: Joi.string()
        .valid("active", "cancelled", "completed")
        .default("active"),

      category: Joi.string()
        .valid("conference", "workshop", "meetup", "seminar", "general")
        .default("general"),
    }),
  },

  idParam: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },

  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).optional(),
      date: Joi.date().iso().greater("now").optional(),
      capacity: Joi.number().integer().min(5).optional(),
      registrationCount: Joi.number().integer().min(0).optional(),
      status: Joi.string().valid("active", "cancelled", "completed").optional(),
      category: Joi.string()
        .valid("conference", "workshop", "meetup", "seminar", "general")
        .optional(),
    }),
  },
};