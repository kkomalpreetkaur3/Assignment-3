import { validateRequest } from "../src/api/v1/middleware/validate";
import { eventSchemas } from "../src/api/v1/validation/eventSchemas";
import { Request, Response, NextFunction } from "express";

const makeRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

describe("Event Create Validation", () => {
  it('should fail when "name" is missing', () => {
    // Arrange
    const req = {
      body: { date: "2025-12-25T09:00:00.000Z", capacity: 200 },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;

    const mw = validateRequest(eventSchemas.create);

    // Act
    mw(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation error: "name" is required',
    });
    expect(next).not.toHaveBeenCalled();
  });