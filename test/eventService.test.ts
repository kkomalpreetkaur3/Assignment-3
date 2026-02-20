import * as eventService from "../src/api/v1/services/eventService";
import * as repo from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service", () => {
  it("createEvent should call createDocument", async () => {
    // Arrange
    (repo.getDocuments as jest.Mock).mockResolvedValue({ size: 0, docs: [] });
    (repo.createDocument as jest.Mock).mockResolvedValue("evt_000001");

    const payload = {
      name: "ABC",
      date: "2025-12-25T09:00:00.000Z",
      capacity: 100,
      registrationCount: 0,
      status: "active",
      category: "general",
    };

    // Act
    const created = await eventService.createEvent(payload as any);

    // Assert
    expect(repo.createDocument).toHaveBeenCalled();
    expect(created.id).toBe("evt_000001");
  });

  it("getAllEvents should call getDocuments", async () => {
    // Arrange
    (repo.getDocuments as jest.Mock).mockResolvedValue({ docs: [] });

    // Act
    const events = await eventService.getAllEvents();

    // Assert
    expect(repo.getDocuments).toHaveBeenCalled();
    expect(events).toEqual([]);
  });

  it("getEventById should call getDocumentById", async () => {
    // Arrange
    (repo.getDocumentById as jest.Mock).mockResolvedValue(null);

    // Act
    const event = await eventService.getEventById("evt_000001");

    // Assert
    expect(repo.getDocumentById).toHaveBeenCalled();
    expect(event).toBeNull();
  });