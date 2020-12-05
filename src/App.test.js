import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

test("renders app logo", () => {
  const { getByAltText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByAltText(/logo/i)).toBeInTheDocument();
});

test("renders search input", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByTestId("search-input")).toBeInTheDocument();
});

test("renders search button", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/search/i)).toBeInTheDocument();
});

test("renders result container", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByTestId("result-container")).toBeInTheDocument();
});

test("renders loader", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByTestId("loader")).toBeInTheDocument();
});

test("renders initial city weather data", async () => {
  const { getByText, queryByTestId, queryByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => expect(getByText(/singapore/i)).toBeInTheDocument());
  expect(queryByTestId("loader")).not.toBeInTheDocument();
  expect(queryByText(/city not found/i)).not.toBeInTheDocument();
});

test("renders city not found when query is invalid", async () => {
  const { getByText, queryByTestId, queryByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(getByText(/search/i));

  await waitFor(() => expect(getByText(/city not found/i)).toBeInTheDocument());
  expect(queryByTestId("loader")).not.toBeInTheDocument();
  expect(queryByText(/singapore/i)).not.toBeInTheDocument();
});

test("renders new city query weather data", async () => {
  const { getByText, getByTestId, queryByText, queryByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.change(getByTestId("search-input"), { target: { value: "hanoi" } });

  fireEvent.click(getByText(/search/i));

  await waitFor(() => expect(getByText(/hanoi/i)).toBeInTheDocument());
  expect(queryByTestId("loader")).not.toBeInTheDocument();
  expect(queryByText(/city not found/i)).not.toBeInTheDocument();
});
