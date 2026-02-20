import { validateRequest } from "../src/api/v1/middleware/validate";
import { eventSchemas } from "../src/api/v1/validation/eventSchemas";
import { Request, Response, NextFunction } from "express";

const futureIso = () => new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // +1 day

const makeRes = () => {
  const res: Partial<Response> = { headersSent: false };

  res.status = jest.fn().mockImplementation(() => {
    res.headersSent = true;
    return res as Response;
  });

  res.json = jest.fn().mockImplementation(() => {
    res.headersSent = true;
    return res as Response;
  });

  return res as Response;
};

describe("Event Create Validation", () => {
  it('should fail when "name" is missing', () => {
    const req = {
      body: { date: futureIso(), capacity: 200 },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;

    const mw = validateRequest(eventSchemas.create);

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation error: "name" is required',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should fail when "capacity" is not an integer', () => {
    const req = {
      body: { name: "Test Event", date: futureIso(), capacity: 50.5 },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;
    const mw = validateRequest(eventSchemas.create);

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation error: "capacity" must be an integer',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should fail when "status" is invalid', () => {
    const req = {
      body: {
        name: "Test Event",
        date: futureIso(),
        capacity: 100,
        status: "pending",
      },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;
    const mw = validateRequest(eventSchemas.create);

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        'Validation error: "status" must be one of [active, cancelled, completed]',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should apply defaults when optional fields are missing", () => {
    const req = {
      body: { name: "ABC", date: futureIso(), capacity: 100 },
      params: {},
      query: {},
    } as Partial<Request> as Request;

    const res = makeRes();
    const next = jest.fn() as NextFunction;
    const mw = validateRequest(eventSchemas.create);

    mw(req, res, next);

    expect(next).toHaveBeenCalled();
    expect((req.body as any).registrationCount).toBe(0);
    expect((req.body as any).status).toBe("active");
    expect((req.body as any).category).toBe("general");
  });
});