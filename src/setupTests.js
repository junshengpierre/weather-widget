// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server.js";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
