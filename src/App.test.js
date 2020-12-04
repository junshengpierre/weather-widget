import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

test("renders app logo", () => {
  const { getByAltText, getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByAltText(/logo/i)).toBeInTheDocument();
  expect(getByText(/search/i)).toBeInTheDocument();
  expect(getByTestId("search-input")).toBeInTheDocument();
});
