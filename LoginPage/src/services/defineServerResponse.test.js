import { SERVER_STATUS, MESSAGE } from "../constants/serverConstants";
import {
  defineLoginResponse,
  defineErrorResponse,
} from "./defineServerResponse";

describe("Function defineErrorResponse", () => {
  test("To receive response from server: status 404 - Not found", () => {
    const serverResponse = {
      status: SERVER_STATUS.NOT_FOUND,
    };
    const resultSuccess = {
      isCorrect: false,
      message: MESSAGE.NOT_FOUND,
    };
    expect(defineErrorResponse(serverResponse)).toEqual(resultSuccess);
  });
  test("To receive response from server: status 400 - Incorrect data", () => {
    const serverResponse = {
      status: SERVER_STATUS.INCORRECT_DATA,
    };
    const resultSuccess = {
      isCorrect: false,
      message: MESSAGE.INCORRECT_DATA,
    };
    expect(defineErrorResponse(serverResponse)).toEqual(resultSuccess);
  });
  test("Returns default result when received unknown error response from server", () => {
    const serverResponse = {
      status: "Unknown response",
    };
    const resultSuccess = {
      isCorrect: false,
      message: MESSAGE.UNKNOWN,
    };
    expect(defineErrorResponse(serverResponse)).toEqual(resultSuccess);
  });
});

describe("Function defineLoginResponse", () => {
  test("To receive response from server: status 200 - OK", () => {
    const serverResponse = {
      status: SERVER_STATUS.OK,
    };
    const resultSuccess = {
      isCorrect: true,
      message: MESSAGE.USER_LOGGED_IN,
    };
    expect(defineLoginResponse(serverResponse)).toEqual(resultSuccess);
  });
  test("To receive response from server: status 204 - No content", () => {
    const serverResponse = {
      status: SERVER_STATUS.NO_CONTENT,
    };
    const resultSuccess = {
      isCorrect: false,
      message: MESSAGE.INCORRECT_LOGIN,
    };
    expect(defineLoginResponse(serverResponse)).toEqual(resultSuccess);
  });
  test("Returns default result when received unknown success response from server", () => {
    const serverResponse = {
      status: "Unknown response",
    };
    const resultSuccess = {
      isCorrect: false,
      message: MESSAGE.UNKNOWN,
    };
    expect(defineLoginResponse(serverResponse)).toEqual(resultSuccess);
  });
});
