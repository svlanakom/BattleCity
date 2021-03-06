import { cellSize } from "./conf.js";
import Point from "./Point.js";

export default class Wall {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.mapRow = this.pos.x / cellSize;
    this.mapColumn = this.pos.y / cellSize;
    this.elem = document.createElement("div");
    this.elem.className += `game-object game-object__wall wall${this.mapColumn}${this.mapRow}`;
    this.elem.style["top"] = `${this.pos.y}px`;
    this.elem.style["left"] = `${this.pos.x}px`;
  }
}
