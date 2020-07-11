import React from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";

const Stage = (props) => (
  <StyledStage height={props.stage.length} width={props.stage[0].length}>
    {props.stage.map((row) =>
      row.map((cell, x) => {
        // console.log(cell[0]);
        return <Cell key={x} type={cell[0]} />;
      })
    )}

    {/* For each cell, it is going to have the property of <Cell/> , cell[0] links to gameHelper, which is set to '0' initially*/}
  </StyledStage>
);

export default Stage;
