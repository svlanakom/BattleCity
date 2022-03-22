import { cellSize } from "./conf.js";

export default class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mapRow = this.x / cellSize;
    this.mapColumn = this.y / cellSize;
    this.elem = document.createElement("div");
    this.elem.className += `game-object game-object__wall wall${this.mapColumn}${this.mapRow}`;
    this.elem.style["top"] = `${this.y}px`;
    this.elem.style["left"] = `${this.x}px`;
  }
}
