export const SERVER_BASE_URL = "https://localhost:3001";

export const SERVER_ACTION = {
  LOGIN: "LOGIN",
};

export const API_ROUTE = {
  LOGIN: "/login",
};

export const SERVER_STATUS = {
  OK: 200,
  NO_CONTENT: 204,
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  NO_ANSWER: 503,
};

export const MESSAGE = {
  INCORRECT_LOGIN: "Invalid credentials, please try again",
  INCORRECT_DATA: "Incorrect data",
  EMPTY_DATA: "Empty username or password, try again",
  NOT_FOUND: "Not found. Check the request path",
  NO_ANSWER: "Server doesn't answer",
  USER_LOGGED_IN: "Logged in",
  LOADING: "Loading...",
  UNKNOWN: "Unknown",
};
