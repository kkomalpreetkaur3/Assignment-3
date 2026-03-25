import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export interface HealthCheck {
  status: "OK";
  uptime: number;
  timestamp: string;
  version: string;
}

export const healthHandler = (req: Request, res: Response) => {
  const payload: HealthCheck = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  res.status(HTTP_STATUS.OK).json(payload);
};
