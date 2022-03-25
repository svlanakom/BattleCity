import { cellSize } from "./conf.js";

export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static colision(pos1, size1, pos2, size2) {
    let [x1, y1] = [
      Math.floor(pos1.x / cellSize),
      Math.floor(pos1.y / cellSize),
    ];
    let [x2, y2] = [
      Math.floor((pos1.x + size1) / cellSize),
      Math.floor((pos1.y + size1) / cellSize),
    ];
    if (
      (pos2.x / cellSize === x1 && pos2.y / cellSize === y1) ||
      (pos2.x / cellSize === x2 && pos2.y / cellSize === y2)
    ) {
      return true;
    }
    return false;
  }
}
