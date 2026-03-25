import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatePart = (schema: ObjectSchema, data: any, strip: boolean) => {
        const { error, value } = schema.validate(data, {
          abortEarly: true,
          stripUnknown: strip,
        });

        if (error) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: `Validation error: ${error.details[0].message}`,
          });
        }
        return strip ? value : data;
      };

      if (schemas.body) {
        req.body = validatePart(schemas.body, req.body, true);
        if (res.headersSent) return;
      }

      if (schemas.params) {
        req.params = validatePart(schemas.params, req.params, false);
        if (res.headersSent) return;
      }

      if (schemas.query) {
        req.query = validatePart(schemas.query, req.query, true);
        if (res.headersSent) return;
      }

      next();
    } catch (error: unknown) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  };
};