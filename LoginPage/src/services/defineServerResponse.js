import { SERVER_STATUS, MESSAGE } from "../constants/serverConstants";

export const defineErrorResponse = (error) => {
  let definedResponse;
  switch (error.status) {
    case SERVER_STATUS.NOT_FOUND:
      definedResponse = {
        isCorrect: false,
        message: MESSAGE.NOT_FOUND,
      };
      break;
    case SERVER_STATUS.INCORRECT_DATA:
      definedResponse = {
        isCorrect: false,
        message: MESSAGE.INCORRECT_DATA,
      };
      break;
    default:
      definedResponse = {
        isCorrect: false,
        message: MESSAGE.UNKNOWN,
      };
  }
  return definedResponse;
};

export const defineLoginResponse = (response) => {
  let definedResponse;
  switch (response.status) {
    case SERVER_STATUS.OK:
      definedResponse = {
        isCorrect: true,
        message: MESSAGE.USER_LOGGED_IN,
      };
      break;
    case SERVER_STATUS.NO_CONTENT:
      definedResponse = {
        isCorrect: false,
        message: MESSAGE.INCORRECT_LOGIN,
      };
      break;
    default:
      definedResponse = {
        isCorrect: false,
        message: MESSAGE.UNKNOWN,
      };
  }
  return definedResponse;
};
