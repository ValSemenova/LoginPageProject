import classes from "./Button.module.css";

export const Button = ({ text = "Submit", ...props }) => (
  <button className={classes.button} {...props}>
    {text}
  </button>
);
