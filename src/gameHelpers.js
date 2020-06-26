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

// console.log(createStage());
// [[[0,'clear']],[[0,'clear']],[[0,'clear']],[[0,'clear']] *12],
// [],
// [],
// [] *20
