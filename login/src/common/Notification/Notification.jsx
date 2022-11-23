import React from "react";

import classes from "./Notification.module.css";

export const Notification = ({ error = false, children }) => {
  const classesList = [classes.message];
  if (error) classesList.push(classes.errorMessage);
  if (!children) {
    children = error ? "Error" : "Loading...";
  }
  return (
    <strong className={classesList.join(" ")} data-testid="notification">
      {children}
    </strong>
  );
};
