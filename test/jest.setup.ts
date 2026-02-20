// test/jest.setup.ts
jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
    runTransaction: jest.fn(),
    batch: jest.fn(() => ({ commit: jest.fn() })),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});