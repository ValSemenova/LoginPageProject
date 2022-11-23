import axios from "axios";
import {
  SERVER_ACTION,
  API_ROUTE,
  SERVER_BASE_URL,
} from "../constants/serverConstants";

axios.defaults.baseURL = SERVER_BASE_URL;

export const sendRequest = async (type, payload) => {
  const requests = {
    [SERVER_ACTION.LOGIN]: (payload) => axios.post(API_ROUTE.LOGIN, payload),
  };

  return await requests[type](payload);
};
