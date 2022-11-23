import {
  SERVER_ACTION,
  SERVER_STATUS,
  MESSAGE,
} from "../constants/serverConstants";
import * as requests from "./sendRequest";
import { processRequest } from "./processRequest";

jest.mock("./sendRequest");

describe("Function processRequest", () => {
  const requestType = SERVER_ACTION.LOGIN;
  const userData = {
    login: "mock",
    password: "mock",
  };
  test("To receive success response", async () => {
    const serverResponseSuccess = {
      status: SERVER_STATUS.OK,
    };
    const resultSuccess = {
      success: true,
      response: {
        status: SERVER_STATUS.OK,
      },
    };
    requests.sendRequest = jest.fn().mockResolvedValue(serverResponseSuccess);
    const response = await processRequest(requestType, userData);
    expect(response).toEqual(resultSuccess);
  });

  test("To receive error response 404 - Not found", async () => {
    const serverResponseError = new Error();
    serverResponseError.response = {
      status: SERVER_STATUS.NOT_FOUND,
    };
    const resultError = {
      isCorrect: false,
      message: MESSAGE.NOT_FOUND,
    };
    requests.sendRequest = jest.fn().mockRejectedValue(serverResponseError);
    const response = await processRequest(requestType, userData);
    expect(response).toEqual(resultError);
  });

  test("To receive Unknown error", async () => {
    const serverResponseError = new Error();
    serverResponseError.response = {
      status: "123",
    };
    const resultError = {
      isCorrect: false,
      message: MESSAGE.UNKNOWN,
    };
    requests.sendRequest = jest.fn().mockRejectedValue(serverResponseError);
    const response = await processRequest(requestType, userData);
    expect(response).toEqual(resultError);
  });

  test("To receive error response 503 - No answer", async () => {
    const serverError = new Error();
    serverError.status = SERVER_STATUS.NO_ANSWER;
    const resultError = {
      isCorrect: false,
      message: MESSAGE.NO_ANSWER,
    };
    requests.sendRequest = jest.fn().mockRejectedValue(serverError);
    const response = await processRequest(requestType, userData);
    expect(response).toEqual(resultError);
  });
});
