import React from "react";
import { TETROMINOS } from "../tetrominos";

const Cell = (props) => (
  <div
    type={props.type}
    style={{
      backgroundColor: `${TETROMINOS[props.type].color}`,
      boxSizing: "border-box",
      border: `${TETROMINOS[props.type] === 0 ? "0px" : "1px solid #f3f3"}`,
      padding: "15px 10px",
    }}
  ></div>
);

export default React.memo(Cell);
//React.memo memoized the cell, and only re-renders cell that changes (cell that changes are the cell with tetris moving)
