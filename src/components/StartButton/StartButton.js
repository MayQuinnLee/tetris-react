import React from "react";
import classes from "./StartButton.module.css";

const StartButton = ({ callback }) => (
  <button className={classes.Start} onClick={callback}>
    Start
  </button>
);

export default StartButton;
