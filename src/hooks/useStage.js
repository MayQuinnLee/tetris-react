import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      //first clear 'flush' the stage
      const newStage = prevStage.map((
        row //multidimensional array hence 2 maps, if performance is priority use for loop
      ) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)));
      //refer to gamehelper for cell[1]

      //draw the tetromino, getting to know the tetromino pass down
      //player from usePlayer() to Tetris.js to useStage
      //y is the index number
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              //the coordinate on the stage
              value,
              `${player.collided ? "merged" : "clear"}`, //checking the stage to merge with the tetromino or not
            ];
            // console.log(newStage);
          }
        });
      });
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.pos.y, player.pos.x, player.tetromino, player.collided]);

  return [stage, setStage];
};
