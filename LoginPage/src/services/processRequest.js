import { MESSAGE } from "../constants/serverConstants";
import { sendRequest } from "./sendRequest";
import { defineErrorResponse } from "./defineServerResponse";

export const processRequest = async (type, payload) => {
  try {
    let response = await sendRequest(type, payload);
    return {
      success: true,
      response: response,
    };
  } catch (error) {
    return error.response
      ? defineErrorResponse(error.response)
      : {
          isCorrect: false,
          message: MESSAGE.NO_ANSWER,
        };
  }
};
