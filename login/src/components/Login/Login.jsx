import classes from "./Login.module.css";

import { useState } from "react";
import { Input, Button, Notification } from "../../common";
import { processRequest } from "../../services/processRequest";
import { defineLoginResponse } from "../../services/defineServerResponse";
import { SERVER_ACTION, MESSAGE } from "../../constants/serverConstants";

export const Login = () => {
  const initServer = {
    isRequestError: false,
    isRequestSent: false,
    isServerPending: false,
    serverResponse: "",
  };
  const [serverState, setServerState] = useState(initServer);
  const [loginForm, setLoginForm] = useState({
    login: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setLoginForm({ ...loginForm, ...{ [e.target.id]: e.target.value } });
  };
  const onFocusHandler = () => {
    setServerState(initServer);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const userData = {
      login: loginForm.login,
      password: loginForm.password,
    };

    if (userData.login && userData.password) {
      setServerState({
        ...serverState,
        isRequestSent: true,
        isServerPending: true,
      });

      let serverResponse = await processRequest(SERVER_ACTION.LOGIN, userData);
      if (serverResponse.success)
        serverResponse = defineLoginResponse(serverResponse.response);

      setServerState({
        isRequestSent: true,
        isServerPending: false,
        isRequestError: !serverResponse.isCorrect,
        serverResponse: serverResponse.message,
      });
    } else {
      setServerState({
        ...serverState,
        isRequestError: true,
        serverResponse: MESSAGE.EMPTY_DATA,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => submitLogin(e)}
      className={classes.loginForm}
      name="loginForm"
    >
      <h1 className="heading">Login</h1>
      <Input
        id="login"
        placeholder="Enter username"
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />
      <Input
        id="password"
        placeholder="Enter password"
        type="password"
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />
      <div className="centered">
        <Button text="Log in" onClick={(e) => submitLogin(e)} />
      </div>
      {serverState.isRequestSent && serverState.isServerPending && (
        <Notification>{MESSAGE.LOADING}</Notification>
      )}
      {serverState.isRequestSent &&
        !serverState.isServerPending &&
        !serverState.isRequestError && (
          <Notification>{serverState.serverResponse}</Notification>
        )}
      {serverState.isRequestError && (
        <Notification error="true">{serverState.serverResponse}</Notification>
      )}
    </form>
  );
};
