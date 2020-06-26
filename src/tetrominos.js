export const TETROMINOS = {
  0: { shape: [[0]], color: "rgba(0,0,0,0.8)" },
  I: {
    //refer to useStage
    shape: [
      [0, "I", 0, 0], //1st forEach, y=0  1st forEach, value=0  2nd forEach, value="I"
      [0, "I", 0, 0], //2nd forEach, y=1
      [0, "I", 0, 0], //3rd forEach, y=2
      [0, "I", 0, 0], //4th forEach, y=3
    ],
    color: "rgba(80,227,230,0.8)",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "rgba(36,95,223,0.8)",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "rgba(223,173,36,0.8)",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "rgba(223,217,36,0.8)",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "rgba(48,211,56,0.8)",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "rgba(132,51,198,0.8)",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "rgba(227,78,78,0.8)",
  },
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)]; //select by index
  return TETROMINOS[randTetromino];
};
