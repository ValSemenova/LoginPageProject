import React from "react";
import { render, screen } from "@testing-library/react";

import { Notification } from "./Notification";

describe("Notification", () => {
  test("renders default Notification component", () => {
    render(<Notification />);
    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveClass("message");
    expect(notification).toHaveTextContent(/Loading/);
  });
  test("renders Notification component with error attribute", () => {
    render(<Notification error="true" />);
    const notification = screen.getByTestId("notification");
    expect(notification).toHaveClass("errorMessage");
    expect(notification).toHaveTextContent(/Error/);
  });
  test("renders Notification component with children", () => {
    render(<Notification>Message</Notification>);
    expect(screen.getByText("Message")).toBeInTheDocument();
  });
});
