import React from "react";
import classes from "./StartButton.module.css";

const StartButton = (props) => (
  <button className={classes.Start} onClick={props.callback}>
    Start
  </button>
);

export default StartButton;
