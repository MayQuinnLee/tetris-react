import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (
      newStage //map through newStage with reduce, creating new array
    ) =>
      newStage.reduce((acc, row) => {
        //there is 12 arrays in each row with (0,clear) or ('S', merged)
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          console.log(row);
          //if we find a row to clear
          setRowsCleared((prev) => prev + 1); //remove row
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          //add new row
          //for each iteration in the reducer, return accumulator
          return acc;
        }
        //no row to be cleared
        acc.push(row);
        return acc;
      }, []);

    const updateStage = (prevStage) => {
      //first clear 'flush' the stage
      //multidimensional array hence 2 maps, if performance is priority use for loop
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );
      //refer to gamehelper for cell[1]

      //draw the tetromino, getting to know the tetromino pass down
      //player from usePlayer() to Tetris.js to useStage
      //y is the index number
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            //if it is not 0 means there is a tetromino
            newStage[y + player.pos.y][x + player.pos.x] = [
              //the coordinate on the stage
              value,
              `${player.collided ? "merged" : "clear"}`,
              //checking the stage to merge with the tetromino or not
            ];
            // console.log(value);
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        //move the player to the top, and the old tetromino will stay at the bottom
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);
  // }, [player.pos.y, player.pos.x, player.tetromino, player.collided]);
  //if the tetromino happen to be the same, then it will not appear (bug)

  return [stage, setStage, rowsCleared];
};
