import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
    expect(app).toHaveClass("app");
  });
});
