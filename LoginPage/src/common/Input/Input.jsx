import classes from "./Input.module.css";

export const Input = ({ type = "text", id, ...props }) => (
  <label className={classes.row} data-testid="label">
    <input
      className={classes.input}
      type={type}
      id={id}
      {...props}
      data-testid={id}
    />
  </label>
);
