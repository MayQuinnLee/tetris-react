import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ gameOver, text }) => (
  <StyledDisplay color={`${gameOver ? "red" : "#999"}`}>{text}</StyledDisplay>
);

export default Display;
