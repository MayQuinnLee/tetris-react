import React, { useState } from "react";
import { createStage, checkCollision } from "../gameHelpers"; // create clean state

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

const Tetris = (props) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  // console.log("re-render");

  //Moving tetromino left or right
  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0 });
    }
  };

  //Reset everything
  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //Increase level and dropTime when every 10 rows are cleared
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
      //TODO: Amend dropTime
    }

    //if checkCollision is false, 'not collided'
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Check if game over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  //on keyup
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        drop();
        setDropTime(1000 / (level + 1) + 200);
        console.log("set-interval on");
      }
    }
  };

  //onkey down
  const dropPlayer = () => {
    drop();
    setDropTime(null);
    console.log("set-interval off");
  };

  //on space bar
  const dropDown = () => {
    //y+1 until collided === true
    while (!checkCollision(player, stage, { x: 0, y: 1 })) {
      player.pos.y++;
    }
  };

  const move = (e) => {
    //destructuring 'keycode' from event (if not, use e.keycode)
    console.log(e.keyCode);
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropPlayer();
      } else if (e.keyCode === 32) {
        e.preventDefault();
        dropDown();
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} /> {/*initially is createStage() */}
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton start={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
