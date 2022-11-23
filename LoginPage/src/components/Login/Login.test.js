import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Login } from "./Login";
import * as request from "../../services/processRequest";
import { MESSAGE, SERVER_STATUS } from "../../constants/serverConstants";

jest.mock("../../services/processRequest");

describe("Login", () => {
  test("Login component should have form and heading", () => {
    render(<Login />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("loginForm");

    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("heading");
  });
  test("Login component should have 2 inputs and Submit button", () => {
    render(<Login />);
    const inputLogin = screen.getByTestId("login");
    expect(inputLogin).toBeInTheDocument();
    expect(inputLogin).toHaveAttribute("type", "text");
    expect(inputLogin).toHaveAttribute("placeholder", "Enter username");

    const inputPassword = screen.getByTestId("password");
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute("type", "password");
    expect(inputPassword).toHaveAttribute("placeholder", "Enter password");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/log in/i);
  });
  test("Login component should show warning message when form filds are empty", async () => {
    render(<Login />);
    userEvent.click(screen.getByRole("button"));
    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(MESSAGE.EMPTY_DATA);
  });
  test("Login component received answer for correct login and displays success message", async () => {
    const serverResponseSuccess = {
      success: true,
      response: { status: SERVER_STATUS.OK },
    };
    request.processRequest = jest.fn().mockReturnValue(serverResponseSuccess);
    render(<Login />);
    await act(async () => {
      fireEvent.change(screen.getByTestId("login"), {
        target: { value: "Not Empty" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "Not Empty" },
      });
      userEvent.click(screen.getByRole("button"));
    });
    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(MESSAGE.USER_LOGGED_IN);
  });
  test("Login component received answer for invalid credentials and displays error message", async () => {
    const serverResponseError = {
      success: true,
      response: { status: SERVER_STATUS.NO_CONTENT },
    };
    request.processRequest = jest.fn().mockReturnValue(serverResponseError);
    render(<Login />);
    await act(async () => {
      fireEvent.change(screen.getByTestId("login"), {
        target: { value: "Not Empty" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "Not Empty" },
      });
      userEvent.click(screen.getByRole("button"));
    });
    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(MESSAGE.INCORRECT_LOGIN);
  });
  test("Login component received error 404 and displays error message", async () => {
    const serverResponseError = {
      isCorrect: false,
      message: MESSAGE.NOT_FOUND,
    };
    request.processRequest = jest.fn().mockReturnValue(serverResponseError);
    render(<Login />);
    await act(async () => {
      fireEvent.change(screen.getByTestId("login"), {
        target: { value: "Not Empty" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "Not Empty" },
      });
      userEvent.click(screen.getByRole("button"));
    });
    const notification = screen.getByTestId("notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(MESSAGE.NOT_FOUND);
  });
});
