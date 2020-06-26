import React, { useState } from "react";
import { createStage } from "../../gameHelpers"; // create clean state

import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";

import classes from "./Tetris.module.css";

const Tetris = (props) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

  const movePlayer = (direction) => {
    updatePlayerPos({ x: direction, y: 0 });
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    //destructuring 'keycode' from event (if not, use e.keycode)
    console.log(keyCode);
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    } // TODO: add space bar
  };

  return (
    <div
      className={classes.TetrisWrapper}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
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
          <StartButton onClick={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
