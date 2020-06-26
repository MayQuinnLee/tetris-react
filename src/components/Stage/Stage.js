import React from "react";
import Cell from "../Cell";
import classes from "./Stage.module.css";

const Stage = (props) => (
  <div
    className={classes.StageWrapper}
    style={{
      gridTemplateRows: `repeat(${props.stage.length} calc(30vw/${props.stage[0].length}))`,
      gridTemplateColumns: `repeat(${props.stage[0].length}, auto)`,
      //refer to gameHelper on the grid height and width
    }}
  >
    {props.stage.map((row) =>
      row.map((cell, x) => {
        // console.log(cell[0]);
        return <Cell key={x} type={cell[0]} />;
      })
    )}

    {/* For each cell, it is going to have the property of <Cell/> , cell[0] links to gameHelper, which is set to '0' initially*/}
  </div>
);

export default Stage;
