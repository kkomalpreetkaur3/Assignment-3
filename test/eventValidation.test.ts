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

  it('should fail when "capacity" is not an integer', () => {
    // Arrange
    const req = {
      body: { name: "Test Event", date: "2025-12-25T09:00:00.000Z", capacity: 50.5 },
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
      message: 'Validation error: "capacity" must be an integer',
    });
  });

  it('should fail when "status" is invalid', () => {
    // Arrange
    const req = {
      body: {
        name: "Test Event",
        date: "2025-12-25T09:00:00.000Z",
        capacity: 100,
        status: "pending",
      },
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
      message:
        'Validation error: "status" must be one of [active, cancelled, completed]',
    });
  });

  it("should apply defaults when optional fields are missing", () => {
    // Arrange
    const req = {
      body: { name: "ABC", date: "2025-12-25T09:00:00.000Z", capacity: 100 },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;
    const mw = validateRequest(eventSchemas.create);

    // Act
    mw(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect((req.body as any).registrationCount).toBe(0);
    expect((req.body as any).status).toBe("active");
    expect((req.body as any).category).toBe("general");
  });
});