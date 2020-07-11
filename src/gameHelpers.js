export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// function to create the stage
//multi-dimensional array to create the grid
//Array from something, another array 'stageHeight'
//for each row, create a new array 'stageWidth, and fill it with another array
//fill 0 means nothing, clear going to merge, tetromino that collided
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino.length; x += 1) {
      //1. Check that we're on a actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          //2. Check that our move is inside the game area (y)
          !stage[y + player.pos.y + moveY] ||
          //3. Check that our move is inside the game area width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //4. Check that the call we're moving is set to 'clear'
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true; //the above happen then it is collided 'true'
        }
      }
    }
  }
};

// console.log(createStage());
// [[[0,'clear']],[[0,'clear']],[[0,'clear']],[[0,'clear']] *12],
// [],
// [],
// [] *20
