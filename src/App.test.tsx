import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  const { getByText } = render(<App />);
  expect(await getByText(/App will go here/i)).toBeInTheDocument();
});
