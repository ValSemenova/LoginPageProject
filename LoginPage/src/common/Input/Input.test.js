import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  test("renders default Input component", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("input");
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByTestId("label")).toHaveClass("row");
  });
  test("renders Input component with props", () => {
    render(<Input id="login" name="login" placeholder="Username" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "login");
    expect(input).toHaveAttribute("name", "login");
    expect(input).toHaveAttribute("placeholder", "Username");
  });
});
