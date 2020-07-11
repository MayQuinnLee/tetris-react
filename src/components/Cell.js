import React from "react";
import { TETROMINOS } from "../tetrominos";
import { StyledCell } from "./styles/StyledCell";

const Cell = (props) => (
  <StyledCell type={props.type} color={`${TETROMINOS[props.type].color}`} />
);

export default React.memo(Cell);
//React.memo memoized the cell, and only re-renders cell that changes (cell that changes are the cell with tetris moving)
