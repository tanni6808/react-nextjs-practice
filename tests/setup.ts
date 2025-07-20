import "@testing-library/jest-dom/vitest";

vi.mock("../app/page.module.css", () => ({
  default: {
    cardTitle: "cardTitle",
  },
}));
