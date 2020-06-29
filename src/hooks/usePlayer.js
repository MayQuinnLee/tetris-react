import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = (props) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (tetromino, direction) => {
    //Make the rows become columns (transpose)
    const rotatedTetris = tetromino.map((_, index) =>
      tetromino.map((col) => col[index])
    );
    //Reverse each row to get a rotated tetris
    // console.log(rotatedTetris);
    // console.log(rotatedTetris.reverse());
    if (direction > 0) return rotatedTetris.map((row) => row.reverse());
    return rotatedTetris.reverse();
  };

  const playerRotate = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    //fix rotating out of the stage
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      console.log("check-collision");
      clonedPlayer.pos.x += offset;
      //create the back and forth movement check
      offset = -(offset + (offset > 0 ? 1 : -1));
      console.log(offset);
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.pos.x = pos;
        console.log(pos);
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
