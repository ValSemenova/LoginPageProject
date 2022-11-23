import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  test("renders default Button component", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button");
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
  test("renders Button component with props", () => {
    render(<Button text="Login" />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
