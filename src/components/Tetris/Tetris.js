import React, { useState } from "react";
import { createStage, checkCollision } from "../../gameHelpers"; // create clean state

import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";

import classes from "./Tetris.module.css";

const Tetris = (props) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  // console.log("re-render");

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0 });
      console.log("move tetris");
    }
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      //if checkCollision is false, 'not collided'
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("game over");
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
        setDropTime(1000);
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

  const move = ({ keyCode }) => {
    //destructuring 'keycode' from event (if not, use e.keycode)
    // console.log(keyCode);
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    } // TODO: add space bar
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div
      className={classes.TetrisWrapper}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <div className={classes.Tetris}>
        <Stage stage={stage} /> {/*initially is createStage() */}
        <aside className={classes.Sidebar}>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
