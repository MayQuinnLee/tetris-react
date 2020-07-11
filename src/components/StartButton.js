import React from "react";
import { StyledButton } from "./styles/StyledDisplay";

const StartButton = (props) => (
  <StyledButton onClick={props.callback}>Start</StyledButton>
);

export default StartButton;
