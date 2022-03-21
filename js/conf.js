const cellSize = 64;
const bulletSize = 8;

const gameTimerInterval = 1000;

const directionSet = ["right", "left", "up", "down"];

const moveKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
// const moveKeys = ["d", "a", "w", "s"];

const directionKeys = directionSet.reduce((obj, dir, i) => {
  obj[dir] = moveKeys[i];
  return obj;
}, {});

export {
  cellSize,
  bulletSize,
  gameTimerInterval,
  directionSet,
  moveKeys,
  directionKeys,
};
