import React from "react";
import classes from "./Display.module.css";

const Display = ({ gameOver, text }) => (
  <div
    className={classes.Display}
    style={{
      color: `${gameOver ? "red" : "#999"}`,
    }}
  >
    {text}
  </div>
);

export default Display;
