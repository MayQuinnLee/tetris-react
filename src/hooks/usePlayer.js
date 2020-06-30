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
    //1. Make the rows become columns (transpose)
    const rotatedTetris = tetromino.map((_, index) =>
      tetromino.map((col) => col[index])
    );
    //2. Reverse each row to get a rotated tetris
    // with every 'up' button, direction will +1
    if (direction > 0) return rotatedTetris.map((row) => row.reverse());
    //with collision, direction will be -1
    return rotatedTetris.reverse();
  };
  //3. Fix rotating out of the stage
  const playerRotate = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const pos = clonedPlayer.pos.x; //position of the player on the stage
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      //while checkCollision is true
      console.log(offset);
      clonedPlayer.pos.x += offset;
      console.log(clonedPlayer.pos.x);
      //to keep track how many steps we moved right and left
      offset = -(offset + (offset > 0 ? 1 : -1));
      console.log(offset);
      //if clonedPlayer.pos.x already exited the collision area, will not enter the loop below
      if (offset > clonedPlayer.tetromino[0].length) {
        console.log("entered to if statement");
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
